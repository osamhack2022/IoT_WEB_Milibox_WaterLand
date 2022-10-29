import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components/layout'
import { HomePage } from '../pages/home'
import { LoginPage } from '../pages/login'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout><HomePage /></Layout>,
}, {
  path: '/login',
  element: <LoginPage />
}])

export const Router = () => {
  return <RouterProvider router={router} />
}