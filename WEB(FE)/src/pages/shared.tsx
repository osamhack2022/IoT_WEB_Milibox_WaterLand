import { useEffect, useState } from 'react'
import { API } from '../api/base'
import { Record } from '../types/type'
import { userStore } from '../stores/user'
import { RecordList } from '../components/record-list'

export const SharedPage = () => {
  // records
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    API.get('/records/shared/list', {
      headers: {
        sn: userStore.user?.sn,
      },
    }).then((res) => setRecords(res.data))
  }

  return (
    <>
      <div className="px-5 py-5">
        <div className="bg-white rounded-xl border p-5">
          <RecordList records={records} onUpdate={() => handleData()} role="shared" />
        </div>
      </div>
    </>
  )
}
