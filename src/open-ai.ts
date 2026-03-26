const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY = process.env.GROQ_API_KEY

export const getLLMSummary = async (
  title: string,
  transcript: string
): Promise<string> => {

  const prompt = transcript.length > 100
    ? `Summarise this YouTube video in clear, concise bullet points.

Video Title: ${title}

Transcript:
${transcript.slice(0, 6000)}`
    : `You are summarising a YouTube video based only on its title.
Be specific, confident and useful. Do NOT say "I don't have the transcript" or ask for more info.
Just give 4-5 bullet points about what this video likely covers.

Video Title: ${title}`

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}