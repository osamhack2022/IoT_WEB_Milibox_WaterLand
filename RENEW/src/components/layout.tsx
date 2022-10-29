import { PropsWithChildren, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Navbar } from './navbar'
import { userStore } from '../stores/user'
import { useNavigate } from 'react-router-dom'

export const Layout = observer(({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userStore.loggedIn) navigate('/login')
  }, [userStore.loggedIn])

  return (
    <div className="bg-gray-100 w-screen h-screen flex">
      <Navbar />
      <div className="w-full">
        <nav className="flex justify-end w-full bg-white border-b py-5 px-5">
          <span className="font-bold mr-2">{userStore.user?.nm}</span>님
        </nav>
        {children}
      </div>
    </div>
  )
})
