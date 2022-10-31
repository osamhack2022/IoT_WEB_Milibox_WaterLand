import { observer } from 'mobx-react'
import { FormEvent, useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { API } from '../../api/base'
import { Modal } from '../../components/modal'
import { Org, User } from '../../types/type'

export const AdminUserPage = observer(() => {
  const [query, setQuery] = useState<string>('')
  const [searchedUsers, setSearchedUsers] = useState<User[]>([])

  const [orgs, setOrgs] = useState<Org[]>([])
  const [selectedOrg, setSelectedOrg] = useState<number>()
  const [subOrgs, setSubOrgs] = useState<Org[]>([])

  const [type, setType] = useState<'User' | 'ADMIN' | 'MASTER'>()

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    API.get('/user/search?name=').then((res) => setSearchedUsers(res.data))
    API.get<Org[]>('/org').then((res) =>
      setOrgs(res.data.filter((org) => org.parent === null))
    )
  }

  const handleUserSearch = async (e: FormEvent) => {
    e.preventDefault()
    const res = await API.get(`/user/search?name=${query}`)
    setSearchedUsers(res.data)
  }

  // modals
  const [showUserModal, setShowUserModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User>()
  const handleShowUserModal = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
    setType(user.type)
  }

  const handleUpdate = async () => {
    try {
      await API.post('/admin', {
        sn: selectedUser?.sn,
        unit: selectedOrg,
        type,
      })
      toast.success('수정되었습니다!')
    } catch (e) {
      console.error(e)
      toast.error('오류가 발생하였습니다.')
    }
  }

  return (
    <>
      <div className="px-5 py-5">
        <div className="mb-4">
          <form onSubmit={handleUserSearch}>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              placeholder="사용자 이름으로 검색하세요."
            />
          </form>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <header className="mb-4">
            <h1 className="font-bold text-lg">사용자 관리</h1>
          </header>
          <table className="w-full table-auto border-collapse rounded-xl mb-5">
            <thead>
              <th className="border py-2 bg-gray-100">군번</th>
              <th className="border py-2 bg-gray-100">계급</th>
              <th className="border py-2 bg-gray-100">이름</th>
              <th className="border py-2 bg-gray-100">타입</th>
            </thead>
            {searchedUsers.map((user) => {
              const { rk, nm, sn, type } = user
              return (
                <tr
                  key={sn}
                  className="cursor-pointer"
                  onClick={() => handleShowUserModal(user)}
                >
                  <td className="border py-2 px-3 text-center">{sn}</td>
                  <td className="border py-2 px-3 text-center">{rk}</td>
                  <td className="border py-2 px-3 text-center">{nm}</td>
                  <td className="border py-2 px-3 text-center">
                    {type === 'MASTER' && '최고관리자'}
                    {type === 'ADMIN' && '부대관리자'}
                    {type === 'User' && '사용자'}
                  </td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
      <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
        <div className="p-5">
          <header className="mb-4">
            <h1 className="font-bold text-lg">사용자 정보</h1>
          </header>
          <table className="table-auto border-collapse mb-4">
            <tbody>
              <tr>
                <td className="border py-1 px-3">{selectedUser?.nm}</td>
                <td className="border py-1 px-3">{selectedUser?.rk}</td>
                <td className="border py-1 px-3">
                  {selectedUser?.type === 'MASTER' && '최고관리자'}
                  {selectedUser?.type === 'ADMIN' && '부대관리자'}
                  {selectedUser?.type === 'User' && '사용자'}
                </td>
                <td className="border py-1 px-3">{selectedUser?.sn}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center mb-4">
            <button
              className={`${
                type === 'User' ? 'bg-primary text-white' : 'bg-gray-100'
              } px-3 py-2 rounded-lg mx-3`}
              onClick={() => setType('User')}
            >
              사용자
            </button>
            <button
              className={`${
                type === 'ADMIN' ? 'bg-primary text-white' : 'bg-gray-100'
              } px-3 py-2 rounded-lg mx-3`}
              onClick={() => setType('ADMIN')}
            >
              부대관리자
            </button>
            <button
              className={`${
                type === 'MASTER' ? 'bg-primary text-white' : 'bg-gray-100'
              } px-3 py-2 rounded-lg mx-3`}
              onClick={() => setType('MASTER')}
            >
              최고관리자
            </button>
          </div>
          {type === 'ADMIN' && (
            <div className="mb-4">
              <Select
                options={orgs.map((org) => ({
                  label: org.name,
                  value: org.id,
                }))}
                placeholder="부대를 선택하세요."
                onChange={(data) => {
                  setSelectedOrg(data?.value)
                  API.get(`/org?parent=${data?.value}`).then((res) =>
                    setSubOrgs(res.data)
                  )
                }}
              />
              {subOrgs.length > 0 && (
                <Select
                  options={subOrgs.map((org) => ({
                    label: org.name,
                    value: org.id,
                  }))}
                  placeholder="부대를 선택하세요."
                  onChange={(data) => setSelectedOrg(data?.value)}
                  className="mt-2"
                />
              )}
            </div>
          )}
          <div className="flex justify-end">
            <button
              className="bg-primary text-white font-bold px-3 py-2 rounded-lg"
              onClick={handleUpdate}
            >
              수정하기
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
})
