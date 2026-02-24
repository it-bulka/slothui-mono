import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import "./app/styles/index.scss"
import "./app/styles/tailwind.css"

//swiper
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
