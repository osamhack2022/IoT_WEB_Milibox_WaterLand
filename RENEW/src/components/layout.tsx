import { PropsWithChildren, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Navbar } from './navbar'
import { userStore } from '../stores/user'
import { useNavigate } from 'react-router-dom'

export const Layout = observer(({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  useEffect(() => {
    if (!userStore.loggedIn) navigate('/login')
  }, [userStore.loggedIn])

  return (
    <div className="bg-gray-100 w-screen h-screen flex">
      <Navbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <div className="w-full">
        <nav className="flex justify-between md:justify-end w-full bg-white border-b py-5 px-5">
          <i className="fa-solid fa-bars text-lg cursor-pointer block md:hidden" onClick={() => setShowDrawer(true)} />
          <span>
            <span className="font-bold mr-2">{userStore.user?.nm}</span>님
          </span>
        </nav>
        {children}
      </div>
    </div>
  )
})
