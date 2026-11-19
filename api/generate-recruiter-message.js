const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const jobType = req.body?.jobType;
  if (typeof jobType !== 'string' || !jobType.trim() || jobType.length > 120) {
    return res.status(400).json({ error: 'Enter a job type of up to 120 characters.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not configured in the server environment.');
    return res.status(500).json({ error: 'Groq API key is not configured on the server.' });
  }

  const prompt = `Generate a professional, highly personalized outreach message written from the perspective of a RECRUITER, HIRING MANAGER, or COMPANY REPRESENTATIVE visiting the portfolio of Dinusara Nethmal. The visitor is reaching out to Dinusara regarding a "${jobType.trim()}" opportunity.

The message must be structured as follows:
1. Professional greeting addressed to Dinusara (e.g., "Dear Dinusara," or "Hi Dinusara,")
2. Introduction: The recruiter introduces themselves and their company using clear, editable placeholders (e.g., "My name is [Your Name], representing [Company Name]..."), and mentions they came across his impressive portfolio.
3. Profile Alignment: Express genuine interest in Dinusara's background. Tailor this paragraph to how his skills (such as React, Python, Spring Boot, LangChain, Gemini API, or RAG) or outstanding projects (like his Plant Disease Detector, Spring Boot E-Commerce Mall, or n8n Autonomous Football Blog) match the "${jobType.trim()}" role.
4. Next Steps / Call to Action: Invite Dinusara to schedule a brief call or connect to discuss details, asking for his availability.
5. Professional Sign-off: End with placeholders like:
   "Best regards,
   [Your Name]
   [Company Name]
   [Contact Information]"

Formatting Constraints:
- Separate paragraphs with clear double newlines so it is highly readable and easy to scan.
- DO NOT wrap the output in markdown code blocks or backticks.
- DO NOT include email subject lines or introductory explanations.
- Tone: warm, highly professional, and encouraging.
- Target word count: 120-160 words.

Output ONLY the raw message text, ready for the visitor to copy and send.`;

  let groqResponse;
  try {
    groqResponse = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });
  } catch (error) {
    console.error('Groq API request failed:', error);
    return res.status(502).json({ error: 'Could not connect to the Groq API. Please try again.' });
  }

  const data = await groqResponse.json().catch(() => null);
  if (!groqResponse.ok) {
    const message = data?.error?.message || `Groq API error: ${groqResponse.status}`;
    console.error('Groq API returned an error:', message);
    return res.status(502).json({ error: message });
  }

  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) {
    console.error('Groq API response did not contain generated text.');
    return res.status(502).json({ error: 'No content returned from Groq API.' });
  }

  return res.status(200).json({ text: text.trim() });
}
