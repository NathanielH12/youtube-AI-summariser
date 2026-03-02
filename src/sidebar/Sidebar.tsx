import React, { useState } from 'react'

interface SidebarProps {
  title: string
  transcript: string
}

export const Sidebar: React.FC<SidebarProps> = ({ title, transcript }) => {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <button onClick={() => console.log('Summary clicked!')}>
          AI Summary
        </button>
        {loading && <p>Loading...</p>}
        {summary && <p>{summary}</p>}
      </div>
    </div>
  )
}
