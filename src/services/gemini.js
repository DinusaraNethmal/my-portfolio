// ============================================================
// Gemini AI Service
// ============================================================
// Usage: import { generateRecruiterMessage } from '../services/gemini';
// Requires: VITE_GEMINI_API_KEY in your .env file
// ============================================================

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Generates a professional recruiter message tailored to a job type.
 * @param {string} jobType - e.g. "Frontend internship", "AI Engineer internship"
 * @returns {Promise<string>} - The generated message text
 */
export const generateRecruiterMessage = async (jobType) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
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

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2000,
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
