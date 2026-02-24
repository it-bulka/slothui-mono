import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import './toast.scss'
import { memo } from 'react';

export const CustomToastContainer = memo(() => {
  return (
    <ToastContainer
      position="bottom-right"
      transition={Slide}
      autoClose={1500}
      pauseOnHover
      limit={2}
      newestOnTop={true}
      style={{ zIndex: 9999999999999 }}
    />
  )
})