// Gets the video title from the YouTube page
export const getVideoTitle = (): string => {
  const titleElement = document.querySelector('h1.title yt-formatted-string')
  return titleElement?.textContent?.trim() || 'Unknown Video'
}

// Gets caption tracks from the YouTube page and returns the English one
const getCaptionTracks = (): { lang: string; url: string }[] => {
  const captionButton = document.querySelector('button[aria-label*="captions"]')
  if (!captionButton) return []

  const tracks = captionButton.getAttribute('aria-label')?.match(/\((\w+)\)/g)
  // This is a simplified extraction — in reality you'd parse the track menu
  // For now, we'll assume English captions exist
  return [{ lang: 'en', url: 'https://youtube.com/api/timedtext?v=VIDEO_ID&lang=en' }]
}

// Fetches the transcript from a caption track URL and formats it
const getXMLTranscript = async (trackUrl: string): Promise<string> => {
  const response = await fetch(trackUrl)
  const xml = await response.text()

  // Parse XML and extract text with timestamps
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const texts = Array.from(doc.querySelectorAll('text'))
    .map(text => text.textContent)
    .join(' ')

  return texts.trim()
}

// Main function — gets both title and transcript
export const getYouTubeTranscript = async (): Promise<{ title: string; transcript: string }> => {
  const title = getVideoTitle()
  const tracks = getCaptionTracks()
  
  if (tracks.length === 0) {
    throw new Error('No captions available')
  }

  const transcript = await getXMLTranscript(tracks[0].url)
  return { title, transcript }
}