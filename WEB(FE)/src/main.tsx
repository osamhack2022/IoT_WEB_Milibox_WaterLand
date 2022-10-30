import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-modal/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
    <ToastContainer />
  </React.StrictMode>
)
