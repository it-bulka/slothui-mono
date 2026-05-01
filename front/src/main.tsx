import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import "./app/styles/index.scss"
import "./app/styles/tailwind.css"

// Apply saved theme before render to avoid flash of unstyled content
const savedTheme = localStorage.getItem('theme') ?? 'light'
document.documentElement.setAttribute('data-theme', savedTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
