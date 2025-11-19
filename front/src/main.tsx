import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import "./app/styles/index.scss"
import "./app/styles/tailwind.css"
import { CustomToastContainer } from '@/shared/ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <CustomToastContainer />
  </StrictMode>,
)
