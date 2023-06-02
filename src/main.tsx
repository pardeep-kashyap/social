import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { Analytics } from '@vercel/analytics/react';
console.log()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    {
      import.meta.env.PROD && <Analytics />
    }

  </React.StrictMode>,
)
