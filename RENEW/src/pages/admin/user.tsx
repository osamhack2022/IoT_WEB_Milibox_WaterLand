import { observer } from 'mobx-react'
import { FormEvent, useEffect, useState } from 'react'
import { API } from '../../api/base'
import { User } from '../../types/type'

export const AdminUserPage = observer(() => {
  const [query, setQuery] = useState<string>('')
  const [searchedUsers, setSearchedUsers] = useState<User[]>([])

  useEffect(() => {
    API.get('/user/search?name=').then((res) => setSearchedUsers(res.data))
  }, [])

  const handleUserSearch = async (e: FormEvent) => {
    e.preventDefault()
    const res = await API.get(`/user/search?name=${query}`)
    setSearchedUsers(res.data)
  }

  return (
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
              <tr key={sn}>
                <td className="border py-2 px-3 text-center">{sn}</td>
                <td className="border py-2 px-3 text-center">{rk}</td>
                <td className="border py-2 px-3 text-center">{nm}</td>
                <td className="border py-2 px-3 text-center">
                  {type === 'MASTER' ? '관리자' : '사용자'}
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
})
