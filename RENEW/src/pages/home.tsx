import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { API, BASE_URL } from '../api/base'
import { Modal } from '../components/modal'
import { Record } from '../types/type'
import { Paginate } from '../components/paginate'
import { toast } from 'react-toastify'
import { userStore } from '../stores/user'
import { observer } from 'mobx-react'
import { RecordList } from '../components/record-list'

export const HomePage = observer(() => {
  // records
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    API.get('/records/list', {
      headers: {
        sn: userStore.user?.sn,
      },
    }).then((res) => setRecords(res.data))
  }

  // modal
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  // dropzone
  const [files, setFiles] = useState<File[]>([])
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = []
    for (let i = 0; i < acceptedFiles.length; i++) {
      newFiles.push(acceptedFiles[i])
    }
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

  const handleUpload = async () => {
    try {
      await Promise.all(
        files.map((file) => {
          const formData = new FormData()
          formData.append('record', file)
          return API.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              sn: userStore.user?.sn,
            },
          })
        })
      )
      setShowUploadModal(false)
      setFiles([])
      handleData()
    } catch (e) {
      console.error(e)
      toast.error('오류가 발생했습니다.')
    }
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
          <RecordList records={records} onUpdate={() => handleData()} />
        </div>
      </div>
      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <div className="w-80 p-5">
          <div
            className="relative max-w-md min-h-[200px] mb-4"
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {files.length > 0 ? (
              <div className="">
                {files.map((file, index) => (
                  <div
                    key={file.name}
                    className="w-full flex justify-between items-center py-2 border-b"
                  >
                    <span className="font-bold mr-2">{file.name}</span>
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
              <div className="text-center absolute left-0 top-0 w-full h-full bg-white bg-opacity-50 border-4 border-dashed rounded-xl p-5 flex justify-center items-center">
                업로드할 영상 파일을
                <br />
                드래그하세요.
              </div>
            )}
            {isDragActive && (
              <div className="text-center absolute left-0 top-0 w-full h-full bg-white bg-opacity-50 border-4 border-dashed rounded-xl p-5 flex justify-center items-center">
                <p>
                  업로드할 영상 파일을
                  <br />
                  드래그하세요.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-primary text-white font-bold px-3 py-2 rounded-lg"
              onClick={handleUpload}
            >
              {files.length}개의 영상 업로드
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
})
