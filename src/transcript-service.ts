export const getVideoTitle = async (videoId: string): Promise<string> => {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`)
  const html = await response.text()
  const match = html.match(/<title>(.*?)<\/title>/)
  return match ? match[1].replace(' - YouTube', '').trim() : 'Unknown Video'
}

const getCaptionTracks = async (videoId: string): Promise<any[]> => {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`)
  const html = await response.text()
  const match = html.match(/"captionTracks":(\[.*?\])/)
  if (!match) return []
  return JSON.parse(match[1])
}

const getXMLTranscript = async (baseUrl: string): Promise<string> => {
  const decodedUrl = baseUrl.replace(/\\u0026/g, '&')

  const response = await fetch(decodedUrl, { credentials: 'include' })
  const xml = await response.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const texts = Array.from(doc.querySelectorAll('text'))
    .map(el => el.textContent)
    .join(' ')

  return texts.trim()
}

export const getYouTubeTranscript = async (videoId: string): Promise<{ title: string; transcript: string }> => {
  const [title, captionTracks] = await Promise.all([
    getVideoTitle(videoId),
    getCaptionTracks(videoId)
  ])

  if (captionTracks.length === 0) throw new Error('No captions available')

  const track = captionTracks.find((t: any) =>
    t.languageCode === 'en' || t.vssId?.includes('.en')
  ) || captionTracks[0]

  const transcript = await getXMLTranscript(track.baseUrl)
  return { title, transcript }
}