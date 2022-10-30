import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../api/base'
import { userStore } from '../stores/user'
import { toast } from 'react-toastify'

export const LoginPage = () => {
  const navigate = useNavigate()

  const [sn, setSN] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await API.get(`/user?sn=${sn}`)
      userStore.login(res.data[0])
      navigate('/')
    } catch (e) {
      console.log(e)
      toast.error('로그인에 실패했습니다.')
    }
  }

  return (
    <div className="bg-primary">
      <div className="px-3 min-h-screen flex flex-col items-center justify-center mx-auto">
        <h1 className="text-3xl mb-7">
          국방 <span className="font-black">블랙</span>박스
        </h1>
        <div className="max-w-sm w-full bg-white p-7 rounded-3xl shadow-lg">
          <form className="flex flex-col items-center" onSubmit={handleLogin}>
            <h1 className="font-bold text-xl mb-4">로그인</h1>
            <input
              value={sn}
              onChange={(e) => setSN(e.currentTarget.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3"
              type="text"
              placeholder="군번을 입력하세요."
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="w-full border rounded-lg px-3 py-2 mb-10"
              type="password"
              placeholder="비밀번호를 입력하세요."
            />
            <button
              className="w-full bg-primary text-white font-bold px-3 py-2 rounded-lg mb-4"
              type="submit"
            >
              로그인
            </button>
            <button className="w-full text-primary text-sm" type="button">
              계정신청
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
