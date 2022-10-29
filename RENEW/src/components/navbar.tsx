import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  return (
    <>
      <Drawer open={isDrawerOpen} direction="left" className="">
        <NavbarContent />
      </Drawer>
      <div className="border-r">
        <NavbarContent />
      </div>
    </>
  )
}

const NavbarContent = () => {
  const activeLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `${
      isActive ? 'bg-primary text-white font-bold' : 'text-gray-800'
    } block py-3 px-4 rounded-lg mb-2`

  return (
    <nav className="w-64 h-full bg-white flex-none px-3 py-5">
      <div className="mb-8">
        <Link to="/">
          <h1 className="flex justify-center items-center text-gray-800">
            <i className="fa-solid fa-video text-3xl mr-2" />
            <span className="font-bold font-jua text-xl mt-0.5">국방 블랙박스</span>
          </h1>
        </Link>
      </div>

      <NavLink to="/" className={activeLinkClassName}>
        <i className="fa-solid fa-box-archive mr-3"/>블랙박스 영상 조회
      </NavLink>
      <NavLink to="/apply" className={activeLinkClassName}>
        <i className="fa-solid fa-shuffle mr-3" />영상 복호화 신청내역
      </NavLink>
    </nav>
  )
}
