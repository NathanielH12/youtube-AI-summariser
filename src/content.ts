import React from 'react'
import { createRoot } from 'react-dom/client'
import { Sidebar } from './sidebar/Sidebar'

// 1. Wait for YouTube to load
setTimeout(() => {
  const titleElement = document.querySelector('yt-formatted-string.title') as HTMLElement
  const transcriptButton = document.querySelector('[aria-label*="Show transcript"]') as HTMLElement
  
  if (!titleElement || !transcriptButton) return
  
  // 2. Click transcript + extract
  transcriptButton.click()
  
  setTimeout(() => {
    // 3. Type-safe transcript extraction
    const lines = document.querySelectorAll('[class*="yt-core-attributed-string"]') as NodeListOf<HTMLElement>
    const title = titleElement.textContent?.trim() || 'Unknown Video'
    
    const transcriptLines: string[] = Array.from(lines)
      .map((line: HTMLElement) => line.textContent?.trim() || '')
      .filter(line => line.length > 0)
    
    const transcript = transcriptLines.join('\n')
    
    // 4. Inject sidebar (FIXED)
    const container = document.createElement('div')
    container.id = 'youtube-ai-sidebar'
    document.body.appendChild(container)
    
    const root = createRoot(container)
    root.render(React.createElement(Sidebar, { title, transcript }))
  }, 1500)
}, 3000)
