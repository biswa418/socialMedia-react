import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import './styles/index.css'
import './styles/page404.css'
import { AuthProvider, PostProvider } from './providers'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>
)
