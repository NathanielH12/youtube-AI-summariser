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
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <div 
        className={`bg-white p-4 rounded-lg shadow-xl cursor-pointer border-2 border-gray-200 transition-all duration-200 hover:shadow-2xl ${
          open ? 'w-96 h-96' : 'w-20 h-20'
        }`}
        onClick={toggleBox}
      >
        {open ? (
          <>
            <h3 className="text-lg font-bold mb-2">AI Summary</h3>
            {loading ? (
              <p className="text-gray-500">Generating summary...</p>
            ) : summary ? (
              <div className="text-sm text-gray-700 leading-relaxed">
                {summary.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Click to summarise</p>
            )}
          </>
        ) : (
          <div className="text-2xl">🤖</div>
        )}
      </div>
    </div>
  )
}
