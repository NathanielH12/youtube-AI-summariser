const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const getLLMSummary = async (
  title: string,
  transcript: string
): Promise<string> => {

  const prompt = `You are a helpful assistant. 
Summarise the following YouTube video in clear, concise bullet points.

Video Title: ${title}

Transcript:
${transcript}`

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 500
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}
