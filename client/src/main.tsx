import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SetData from "./context/Auth/SetData.jsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SetData>
      <App />
    </SetData>
  </React.StrictMode>,
)
