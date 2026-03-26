import React from 'react'
import { createRoot } from 'react-dom/client'
import { Sidebar } from './sidebar/Sidebar'

async function fetchTranscript(videoId: string): Promise<string> {
  try {
    const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      credentials: 'include'
    })
    const html = await pageResponse.text()

    const captionsMatch = html.match(/"captionTracks":(\[.*?\])/)
    if (!captionsMatch) return ''

    const captionTracks = JSON.parse(captionsMatch[1])
    if (!captionTracks.length) return ''

    const track = captionTracks.find((t: any) =>
      t.languageCode === 'en' || t.vssId?.includes('.en')
    ) || captionTracks[0]

    const decodedUrl = track.baseUrl.replace(/\\u0026/g, '&')

    const transcriptResponse = await fetch(decodedUrl, {
      credentials: 'include'
    })
    const xml = await transcriptResponse.text()

    return (xml.match(/<text[^>]*>(.*?)<\/text>/g) || [])
      .map(tag => tag
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
      )
      .join(' ')

  } catch (err) {
    return ''
  }
}

setTimeout(async () => {
  const videoId = new URLSearchParams(window.location.search).get('v')

  const titleElement = (
    document.querySelector('h1.ytd-video-primary-info-renderer yt-formatted-string') ||
    document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata') ||
    document.querySelector('#title h1 yt-formatted-string') ||
    document.querySelector('h1.style-scope.ytd-watch-metadata')
  ) as HTMLElement

  if (!videoId) return

  const title = titleElement?.textContent?.trim() || 'Unknown Video'
  const transcript = await fetchTranscript(videoId)

  const existing = document.getElementById('youtube-ai-sidebar')
  if (existing) existing.remove()

  const container = document.createElement('div')
  container.id = 'youtube-ai-sidebar'
  document.body.appendChild(container)

  const root = createRoot(container)
  root.render(React.createElement(Sidebar, { title, transcript }))

}, 3000)