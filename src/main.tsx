import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import './i18n/config'
import App from './App.tsx'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--color-text-secondary)' }}>Loading...</div>}>
          <App />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
