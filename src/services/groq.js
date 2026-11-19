// ============================================================
// Groq AI Service
// ============================================================
// Usage: import { generateRecruiterMessage } from '../services/groq';
// Requires: VITE_GROQ_API_KEY in your .env file
// ============================================================

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

/**
 * Generates a professional recruiter message tailored to a job type.
 * @param {string} jobType - e.g. "Frontend internship", "AI Engineer internship"
 * @returns {Promise<string>} - The generated message text
 */
export const generateRecruiterMessage = async (jobType) => {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured. Please add VITE_GROQ_API_KEY to your .env file.');
  }

  const prompt = `Generate a professional, highly personalized outreach message written from the perspective of a RECRUITER, HIRING MANAGER, or COMPANY REPRESENTATIVE visiting the portfolio of Dinusara Nethmal. The visitor is reaching out to Dinusara regarding a "${jobType}" opportunity.

The message must be structured as follows:
1. Professional greeting addressed to Dinusara (e.g., "Dear Dinusara," or "Hi Dinusara,")
2. Introduction: The recruiter introduces themselves and their company using clear, editable placeholders (e.g., "My name is [Your Name], representing [Company Name]..."), and mentions they came across his impressive portfolio.
3. Profile Alignment: Express genuine interest in Dinusara's background. Tailor this paragraph to how his skills (such as React, Python, Spring Boot, LangChain, Gemini API, or RAG) or outstanding projects (like his Plant Disease Detector, Spring Boot E-Commerce Mall, or n8n Autonomous Football Blog) match the "${jobType}" role.
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

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) throw new Error('No content returned from Groq API.');
  return text.trim();
};
