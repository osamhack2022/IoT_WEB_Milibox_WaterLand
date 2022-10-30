import { useEffect, useState } from 'react'
import { Paginate } from './paginate'
import { History, Record } from '../types/type'
import { Modal } from './modal'
import { API, BASE_URL } from '../api/base'
import { userStore } from '../stores/user'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react'

interface RecordListProps {
  records: Record[];
  role?: string;
  onUpdate: () => void;
}

export const RecordList = observer(
  ({ records: originalRecords, role, onUpdate }: RecordListProps) => {
    useEffect(() => {
      setRecords(originalRecords)
    }, [originalRecords])

    // records
    const [records, setRecords] = useState<Record[]>([])
    const [filteredRecords, setFilteredRecords] = useState<Record[]>([])

    // modals
    const [showVideoModal, setShowVideoModal] = useState<boolean>(false)

    // show video
    const [selectedRecordId, setSelectedRecordId] = useState<number>()
    const [comment, setComment] = useState<string>('')
    const [histories, setHistories] = useState<History[]>([])
    const handleShowVideo = async (recordId: number) => {
      setShowVideoModal(true)
      const res = await API.get(`/record/history?id=${recordId}`, {
        headers: {
          sn: userStore.user?.sn,
        },
      })
      setHistories(res.data)
      setSelectedRecordId(recordId)
    }

    const handleTakeout = async () => {
      try {
        const answer = confirm('해당 영상을 반출 신청하시겠습니까?')
        if (answer) {
          const res = await API.get(
            `/records/takeout?record_id=${selectedRecordId}&comment=${comment}`, {
              headers: {
                sn: userStore.user?.sn,
              },
            })
          toast.success('반출 신청되었습니다!')
          setShowVideoModal(false)
        }
      } catch (e) {
        console.error(e)
        toast.error('오류가 발생하였습니다.')
      } finally {
        onUpdate()
      }
    }

    const handleShare = async () => {
      try {
        const sn = prompt('공유할 사람의 군번을 입력하세요.')
        const res = await API.get(`/records/share?record_id=${selectedRecordId}&sn=${sn}`, {
          headers: {
            sn: userStore.user?.sn,
          },
        })
        toast.success('공유되었습니다!')
        setShowVideoModal(false)
      } catch (e) {
        console.error(e)
        toast.error('오류가 발생하였습니다.')
      } finally {
        onUpdate()
      }
    }

    const handleApprove = async () => {
      try {
        const answer = confirm('승인하시겠습니까?')
        if (answer) {
          const res = await API.get(`/admin/takeout?record_id=${selectedRecordId}&action=APPROVE`, {
            headers: {
              sn: userStore.user?.sn,
            },
          })
          toast.success('승인되었습니다!')
          setShowVideoModal(false)
        }
      } catch (e) {
        console.error(e)
        toast.error('오류가 발생하였습니다.')
      } finally {
        onUpdate()
      }
    }

    const handleReject = async () => {
      try {
        const answer = confirm('거절하시겠습니까?')
        if (answer) {
          const res = await API.get(`/admin/takeout?record_id=${selectedRecordId}&action=REJECT`, {
            headers: {
              sn: userStore.user?.sn,
            },
          })
          toast.success('거절되었습니다!')
          setShowVideoModal(false)
        }
      } catch (e) {
        console.error(e)
        toast.error('오류가 발생하였습니다.')
      } finally {
        onUpdate()
      }
    }

    return (
      <>
        <header className="mb-4">
          <h1 className="font-bold text-lg">영상목록</h1>
        </header>
        <table className="w-full table-auto mb-5">
          <thead>
            <tr className="border-b">
              <th className="border px-3 py-2 bg-gray-100">파일이름</th>
              <th className="border px-3 py-2 bg-gray-100">추가일시</th>
              <th className="border px-3 py-2 bg-gray-100">반출여부</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => {
              const { id, file_name, created_at, approval_status } = record
              return (
                <tr
                  key={id}
                  className="cursor-pointer"
                  onClick={() => handleShowVideo(id)}
                >
                  <td className="text-center border px-3 py-2">{file_name}</td>
                  <td className="text-center border px-3 py-2">
                    {format(new Date(created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  <td className="text-center border px-3 py-2">
                    {approval_status === 'APPROVED' && '승인됨'}
                    {approval_status === 'REJECTED' && '거절됨'}
                    {approval_status === 'PENDING' && '대기중'}
                    {approval_status === 'NOTHING' && '신청안함'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="flex justify-center">
          <Paginate
            items={records}
            pageCount={0}
            onPaginate={(items) => setFilteredRecords(items)}
          />
        </div>

        <Modal open={showVideoModal} onClose={() => setShowVideoModal(false)}>
          <video
            src={`${BASE_URL}/record?id=${selectedRecordId}&sn=${userStore.user?.sn}`}
            autoPlay
            controls
          />
          <section className="p-3 border-b">
            <header className="mb-3">
              <h1 className="font-bold text-lg">조회자 목록</h1>
            </header>
            <div className="h-[165px] overflow-y-scroll border-t">
              {histories.map((history) => {
                const { sn, ip_address, name, rank } = history
                return (
                  <div
                    key={ip_address}
                    className="flex border-b border-x px-3 py-1"
                  >
                    <span className="mr-4 font-bold">{ip_address}</span>
                    <span className="mr-2">{sn}</span>
                    <span className="mr-2">{name}</span>
                    <span className="mr-2">{rank}</span>
                  </div>
                )
              })}
            </div>
          </section>
          {role === 'admin' ? (
            <div className="p-3 flex justify-end">
              <button
                className="flex-none bg-green-500 text-white font-bold px-3 py-2 rounded-lg mr-3"
                onClick={handleApprove}
              >
                반출 승인
              </button>
              <button
                className="flex-none bg-red-500 text-white font-bold px-3 py-2 rounded-lg"
                onClick={handleReject}
              >
                반출 거절
              </button>
            </div>
          ) : (
            <div className="p-3 flex">
              <input
                className="w-full border rounded-lg mr-3 px-3 py-2"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
                placeholder="반출 사유를 입력하세요."
              />
              <button
                className="flex-none bg-primary text-white font-bold px-3 py-2 rounded-lg mr-3"
                onClick={handleTakeout}
              >
                반출 신청
              </button>
              <button
                className="flex-none bg-primary text-white font-bold px-3 py-2 rounded-lg"
                onClick={handleShare}
              >
                공유하기
              </button>
            </div>
          )}
        </Modal>
      </>
    )
  }
)
