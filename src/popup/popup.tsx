import React from 'react'
import ReactDOM from 'react-dom/client'

const Popup = () => {
  return (
    <div style={{ width: '300px', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold' }}>
        YouTube AI Summariser
      </h1>
      <p style={{ fontSize: '13px', color: '#555', marginTop: '8px' }}>
        Navigate to any YouTube video with captions and click the sidebar to get an AI summary.
      </p>
      <img
        src="header-image.png"
        alt=""
        style={{ width: '100%', marginTop: '12px', borderRadius: '8px' }}
      />
    </div>
  )
}

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(<Popup />)
}