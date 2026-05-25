// ============================================================
// Gemini AI Service
// ============================================================
// Usage: import { generateRecruiterMessage } from '../services/gemini';
// Requires: VITE_GEMINI_API_KEY in your .env file
// ============================================================

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Generates a professional recruiter message tailored to a job type.
 * @param {string} jobType - e.g. "Frontend internship", "AI Engineer internship"
 * @returns {Promise<string>} - The generated message text
 */
export const generateRecruiterMessage = async (jobType) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const prompt = `Generate a professional, personalized message from Dinusara Nethmal (an undergraduate AI & Data Science / Full Stack Developer student from Sri Lanka) reaching out about a "${jobType}" opportunity.

The message should:
1. Start with a professional greeting
2. Briefly introduce Dinusara as a passionate undergraduate student (don't mention the university name)
3. Highlight 3-4 most relevant skills for "${jobType}" from: React, Node.js, Python, LangChain, FastAPI, MongoDB, Tailwind CSS, Spring Boot, Gemini API, RAG systems
4. Express genuine and specific interest in the role
5. Include a professional closing with a call to action

Constraints:
- Length: 180-220 words
- Tone: professional yet personable, NOT robotic or template-like
- Do NOT use phrases like "I hope this message finds you well" or overly generic openers
- Make it feel like Dinusara wrote it himself

Output ONLY the message text, no explanations or labels.`;

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 500,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error('No content returned from Gemini API.');
  return text.trim();
};
