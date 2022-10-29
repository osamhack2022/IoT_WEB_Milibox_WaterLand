import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { API } from '../../api/base'
import { Paginate } from '../../components/paginate'
import { Org, Record } from '../../types/type'

export const AdminHomePage = observer(() => {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [selectedOrg, setSelectedOrg] = useState<string>('')

  const [records, setRecords] = useState<Record[]>([])
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([])

  useEffect(() => {
    API.get<Record[]>('/admin/list').then((res) => setRecords(res.data))
    API.get<Org[]>('/org').then((res) =>
      setOrgs(res.data.filter((org) => org.parent === null))
    )
  }, [])

  return (
    <div className="px-5 py-5">
      <div className="mb-4">
        <Select
          options={orgs.map((org) => ({ label: org.name, value: org.name }))}
          placeholder="부대를 선택하세요."
        />
      </div>

      <div className="bg-white rounded-xl border p-5">
        <table className="w-full table-auto mb-5">
          <thead>
            <tr className="border-b">
              <th className="py-2">파일이름</th>
              <th className="py-2">추가일시</th>
              <th className="py-2">반출여부</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="text-center py-2">{record.file_name}</td>
                <td className="text-center py-2">{record.created_at}</td>
                <td className="text-center py-2">
                  {record.approved_at ? '반출승인됨' : '승인안됨'}
                </td>
                <td className="text-center py-2">
                  <button onClick={handleApprove}>
                    <i className="fa-solid fa-circle-check text-xl text-green-500" />
                  </button>
                  <button onClick={handleReject}>
                    <i className="fa-solid fa-circle-xmark text-xl text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Paginate
          items={records}
          pageCount={0}
          onPaginate={(items) => setFilteredRecords(items)}
        />
      </div>
    </div>
  )
})
