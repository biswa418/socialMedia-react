import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import './styles/index.css'
import './styles/page404.css'
import { AuthProvider } from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
