import { useEffect, useState } from 'react'
import { Paginate } from './paginate'
import { Record } from '../types/type'
import { Modal } from './modal'
import { API, BASE_URL } from '../api/base'
import { userStore } from '../stores/user'
import ReactPlayer from 'react-player/lazy'

interface RecordListProps {
  records: Record[];
}

export const RecordList = ({ records: originalRecords }: RecordListProps) => {
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
  const handleShowVideo = (recordId: number) => {
    setShowVideoModal(true)
    setSelectedRecordId(recordId)
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
          {filteredRecords.map((record) => (
            <tr
              key={record.id}
              className="cursor-pointer"
              onClick={() => handleShowVideo(record.id)}
            >
              <td className="text-center border px-3 py-2">
                {record.file_name}
              </td>
              <td className="text-center border px-3 py-2">
                {record.created_at}
              </td>
              <td className="text-center border px-3 py-2">
                {record.approved_at ? '반출승인됨' : '승인안됨'}
              </td>
            </tr>
          ))}
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
      </Modal>
    </>
  )
}
