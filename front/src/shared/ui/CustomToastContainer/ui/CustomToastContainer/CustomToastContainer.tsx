import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import './toast.scss'
import { Portal } from '../../../Portal/Portal.tsx'

export const CustomToastContainer = () => {
  return (
    <Portal>
      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={1500}
        pauseOnHover
        limit={2}
        newestOnTop={true}
      />
    </Portal>
  )
}