import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components/layout'
import { AdminHomePage } from '../pages/admin/home'
import { AdminUserPage } from '../pages/admin/user'
import { HomePage } from '../pages/home'
import { LoginPage } from '../pages/login'
import { SharedPage } from '../pages/shared'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout><HomePage /></Layout>,
}, {
  path: '/shared',
  element: <Layout><SharedPage /></Layout>
}, {
  path: '/admin',
  children: [{
    index: true,
    element: <Layout><AdminHomePage /></Layout>,
  }, {
    path: 'user',
    element: <Layout><AdminUserPage /></Layout>,
  }]
}, {
  path: '/login',
  element: <LoginPage />
}])

export const Router = () => {
  return <RouterProvider router={router} />
}