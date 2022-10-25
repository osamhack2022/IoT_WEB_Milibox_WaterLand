## rr-client.py 
import argparse
from datetime import datetime
from random import normalvariate, choice
import struct
import sys
import time
import traceback
from uuid import UUID

import pigpio
from nrf24 import *

CODE_CHECK = 0x01
CODE_IN = 0x02
CODE_OUT = 0x03

def communicate(CODE):
    hostname = 'localhost'
    port = 8888
    client = '1CLNT'
    server = '1SRVR'

    # Connect to pigpiod
    print(f'GPIO daemon 연결중.. {hostname}:{port} ...')
    pi = pigpio.pi(hostname, port)
    if not pi.connected:
        print("통신 모듈이 연결되지않았습니다.")
        sys.exit()

    # Create NRF24 object.
    # PLEASE NOTE: PA level is set to MIN, because test sender/receivers are often close to each other, and then MIN works better.
    nrf = NRF24(pi, ce=25, payload_size=RF24_PAYLOAD.DYNAMIC, channel=100, data_rate=RF24_DATA_RATE.RATE_250KBPS, pa_level=RF24_PA.MIN)
    nrf.set_address_bytes(len(client))

    # Open the server address as a writing pipe (request).
    nrf.open_writing_pipe(server)

    # Open the client address as a reading pipe (response). 
    nrf.open_reading_pipe(RF24_RX_ADDR.P1, client)
    
    # Display the content of NRF24L01 device registers.
    nrf.show_registers()

    try:
        print(f'Send to {server}, with reply to {client}')
    
        # Pack the request.
        request = struct.pack('<H6p', CODE, bytes(client, 'ascii'))
        print(f'Request: command={CODE}, reply_to={client}, {":".join(f"{c:02x}" for c in request)}')
        
        # Send the request.

        nrf.reset_packages_lost()
        nrf.send(request)
        try:
            nrf.wait_until_sent()
        except:
            print("주변에 위병소가 없습니다. 다시 통신시도합니다.")
            continue

        if nrf.get_packages_lost() == 0:
            print(f'Success: lost={nrf.get_packages_lost()}, retries={nrf.get_retries()}')
        else:
            print(f'Error: lost={nrf.get_packages_lost()}, retries={nrf.get_retries()}')

        if nrf.get_packages_lost() == 0:
            # 송신 성공 통신 수신모드로 변경
            nrf.power_up_rx()

            reply_start = time.monotonic()
            while True:                    

                if nrf.data_ready():
                    response = nrf.get_payload()

                    if response[0] == CODE:
                        # 위병소 확인 응답
                        command, data_bytes = struct.unpack('<H17p', response)
                        data = data_bytes.decode('utf-8')
                        print(f'Response: command={command}, 응답={data}')
                        return True, data
                    else:
                        # Invalid response.
                        print('통신에 실패하였습니다: 잘못된 응답')

                if time.monotonic() - reply_start > 1:
                    # If we have waited more than 1 second on a response, we time out. 
                    print('Timeout waiting for response.')
                    return False
        
    except:
        traceback.print_exc()
        nrf.power_down()
        pi.stop()


if __name__ == '__main__':
    while True:
        result, data = communicate(CODE_CHECK)
        if result:
            military_unit_code = data
            result, data = communicate(CODE_IN)