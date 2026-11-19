// ============================================================
// Groq AI Service
// ============================================================
// Usage: import { generateRecruiterMessage } from '../services/groq';
// The API key is kept in the Vercel server-side function.
// ============================================================

/**
 * Generates a professional recruiter message tailored to a job type.
 * @param {string} jobType - e.g. "Frontend internship", "AI Engineer internship"
 * @returns {Promise<string>} - The generated message text
 */
export const generateRecruiterMessage = async (jobType) => {
  const response = await fetch('/api/generate-recruiter-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobType }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || `API error: ${response.status}`);
  }

  const text = data?.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('No content returned from Groq API.');
  }

  return text.trim();
};
