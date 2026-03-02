import React from 'react'
import ReactDOM from 'react-dom/client'
import { Sidebar } from './Sidebar'

export const injectSidebar = (title: string, transcript: string) => {
  // Check if sidebar already exists (YouTube is SPA)
  const existing = document.getElementById('ai-summariser')
  if (existing) return

  // Create container for React
  const sidebarContainer = document.createElement('div')
  sidebarContainer.id = 'ai-summariser'
  document.body.appendChild(sidebarContainer)

  // Mount React Sidebar
  const root = ReactDOM.createRoot(sidebarContainer)
  root.render(<Sidebar title={title} transcript={transcript} />)
}
