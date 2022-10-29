import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { API } from '../api/base'
import { Modal } from '../components/modal'
import { Record } from '../types/type'
import { Paginate } from '../components/paginate'

export const HomePage = () => {
  // records
  const [records, setRecords] = useState<Record[]>([])
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([])

  useEffect(() => {
    API.get('/records/list').then((res) => setRecords(res.data))
  }, [])

  // modal
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  // dropzone
  const [files, setFiles] = useState<File[]>([])
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = []
    for (let i = 0; i < acceptedFiles.length; i++) {
      newFiles.push(acceptedFiles[i])
    }
    console.log(files, newFiles, [...files].concat(newFiles))
    setFiles([...files].concat(newFiles))
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleDeleteFile = (e: any, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    const filesCopy = [...files]
    filesCopy.splice(index, 1)
    setFiles(filesCopy)
  }

  return (
    <>
      <div className="px-5 py-5">
        <div className="mb-4">
          <button
            className="bg-primary text-white font-bold px-3 py-2 rounded-lg"
            onClick={() => setShowUploadModal(true)}
          >
            <i className="fa-solid fa-upload mr-2" />
            영상 업로드
          </button>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div>녹화일시</div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>녹화일시</th>
                <th>추가일시</th>
                <th>파일크기</th>
                <th>반출여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
          {records.map((record) => {
            const { id, file_name, created_at, approved_at } = record
            return (
              <div key={id}>
                {file_name}
                {created_at}
                {approved_at}
              </div>
            )
          })}
          {filteredRecords.map((record) => (
            <div key={record.id}>{record.file_name}</div>
          ))}
          <div className="flex justify-center">
            <Paginate
              items={records}
              pageCount={0}
              onPaginate={(items) => setFilteredRecords(items)}
            />
          </div>
        </div>
      </div>
      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <div className="w-64 p-5">
          <div className="relative max-w-md h-[200px]" {...getRootProps()}>
            <input {...getInputProps()} />

            {files.length > 0 ? (
              <div className="w-64 h-[200px]">
                {files.map((file, index) => (
                  <div
                    key={file.name}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <span className="font-bold">{file.name}</span>
                    <div className="flex-none">
                      <i
                        className="fa-solid fa-trash cursor-pointer"
                        onClick={(e) => handleDeleteFile(e, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='h-full flex justify-center items-center'>업로드할 영상 파일을 드래그하세요.</div>
            )}
            {isDragActive && (
              <div className="absolute left-0 top-0 w-full h-full bg-white bg-opacity-50 border-4 border-dashed rounded-xl p-5 flex justify-center items-center">
                <p>업로드할 영상 파일을 드래그하세요.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
