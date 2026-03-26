import React, { useState } from 'react'
import { getLLMSummary } from '../open-ai'

interface SidebarProps {
  title: string
  transcript: string
}

export const Sidebar: React.FC<SidebarProps> = ({ title, transcript }) => {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const toggleBox = async () => {
    setOpen(!open)
    if (!open && !summary) {
      setLoading(true)
      try {
        const result = await getLLMSummary(title, transcript)
        setSummary(result)
      } catch (error) {
        setSummary('Error generating summary')
      }
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 9999 }}>
      <div
        onClick={toggleBox}
        style={{
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          border: '2px solid #e5e7eb',
          width: open ? '320px' : '64px',
          height: open ? '380px' : '64px',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {open ? (
          <>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#111' }}>AI Summary</h3>
            {loading ? (
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Generating summary...</p>
            ) : summary ? (
              <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', overflowY: 'auto' }}>
                {summary.split('\n').map((line, i) => (
                  <p key={i} style={{ marginBottom: '4px' }}>{line}</p>
                ))}
              </div>
            ) : (
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>Click to summarise</p>
            )}
          </>
        ) : (
          <div style={{ fontSize: '28px', textAlign: 'center', lineHeight: '32px' }}>🤖</div>
        )}
      </div>
    </div>
  )
}
