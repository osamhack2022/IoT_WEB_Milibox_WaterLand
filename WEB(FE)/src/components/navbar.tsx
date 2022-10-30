import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Link, NavLink } from 'react-router-dom'
import { userStore } from '../stores/user'

export const Navbar = ({
  showDrawer,
  setShowDrawer,
}: {
  showDrawer: boolean;
  setShowDrawer: any;
}) => {
  return (
    <>
      <Drawer
        open={showDrawer}
        direction="left"
        className=""
        onClose={() => setShowDrawer(false)}
      >
        <NavbarContent />
      </Drawer>
      <div className="border-r hidden md:block">
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
            <span className="font-bold font-jua text-xl mt-0.5">
              국방 블랙박스
            </span>
          </h1>
        </Link>
      </div>

      <NavLink to="/" className={activeLinkClassName} end>
        <i className="fa-solid fa-box-archive mr-3" />
        블랙박스 영상 조회
      </NavLink>
      <NavLink to="/shared" className={activeLinkClassName}>
        <i className="fa-solid fa-share-nodes mr-3" />
        공유받은 영상
      </NavLink>
      {userStore.user?.type === 'MASTER' && (
        <>
          <NavLink to="/admin/user" className={activeLinkClassName} end>
            <i className="fa-solid fa-user-gear mr-3" />
            사용자 관리
          </NavLink>
          <NavLink to="/admin" className={activeLinkClassName} end>
            <i className="fa-solid fa-list-check mr-3" />
            영상 복호화 승인 관리
          </NavLink>
        </>
      )}
    </nav>
  )
}
