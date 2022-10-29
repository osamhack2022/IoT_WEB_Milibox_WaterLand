import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { API } from '../../api/base'
import { RecordList } from '../../components/record-list'
import { userStore } from '../../stores/user'
import { Org, Record } from '../../types/type'

export const AdminHomePage = observer(() => {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [selectedOrg, setSelectedOrg] = useState<string>('')

  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    API.get<Record[]>('/records/admin/list', {
      headers: {
        sn: userStore.user?.sn,
      },
    }).then((res) =>
      setRecords(
        res.data.filter((record) => record.approval_status !== 'NOTHING')
      )
    )
    API.get<Org[]>('/org').then((res) =>
      setOrgs(res.data.filter((org) => org.parent === null))
    )
  }

  return (
    <div className="px-5 py-5">
      {/* <div className="mb-4">
        <Select
          options={orgs.map((org) => ({ label: org.name, value: org.name }))}
          placeholder="부대를 선택하세요."
        />
      </div> */}

      <div className="bg-white rounded-xl border p-5">
        <RecordList records={records} role="admin" onUpdate={handleData} />
      </div>
    </div>
  )
})
