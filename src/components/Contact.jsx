import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaCheck, FaMagic } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { generateRecruiterMessage } from '../services/gemini';

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' });
  const [jobType, setJobType]     = useState('');
  const [generated, setGenerated] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError]     = useState('');
  const [copied, setCopied]       = useState(false);

  const handleFormChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGenerate = async () => {
    if (!jobType.trim()) return;
    setAiLoading(true);
    setAiError('');
    setGenerated('');
    try {
      const msg = await generateRecruiterMessage(jobType.trim());
      setGenerated(msg);
    } catch (err) {
      setAiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:dinusaranethmal@email.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)}`;

  // Shared input class
  const inputClass = `w-full bg-gray-50 dark:bg-gray-800/60
                      border border-gray-300 dark:border-white/10
                      text-gray-900 dark:text-gray-200 text-sm rounded-xl px-4 py-3
                      focus:outline-none focus:border-blue-500
                      placeholder:text-gray-400 dark:placeholder:text-gray-600
                      transition-colors`;

  return (
    <section
      id="contact"
      className="section-padding bg-gray-50 dark:bg-gray-950 relative transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom max-w-5xl" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <span className="text-blue-500 text-sm font-mono tracking-widest uppercase">Get in touch</span>
          <h2 className="section-heading text-gray-900 dark:text-white mt-2">
            Contact <span className="text-gradient">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-md mx-auto">
            Have an opportunity, question, or project idea? I'd love to hear from you.
          </p>
          <div className="glow-line w-24 mx-auto mt-3" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left — Contact info + AI generator */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {/* Contact details */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Reach Me At</h3>
              <div className="space-y-3">
                {[
                  { icon: FaEnvelope, label: 'Email',    value: 'dinusaranethmal@email.com',   href: 'mailto:dinusaranethmal@email.com' },
                  { icon: FaGithub,   label: 'GitHub',   value: 'DinusaraNethmal',             href: 'https://github.com/DinusaraNethmal' },
                  { icon: FaLinkedin, label: 'LinkedIn', value: 'dinusara-nethmal',             href: 'https://linkedin.com/in/dinusara-nethmal' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl
                               hover:bg-blue-50 dark:hover:bg-blue-500/10
                               border border-transparent hover:border-blue-200 dark:hover:border-blue-500/20
                               transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10
                                    border border-blue-200 dark:border-blue-500/20
                                    flex items-center justify-center flex-shrink-0">
                      <Icon className="text-blue-500" size={15} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{label}</div>
                      <div className="text-gray-700 dark:text-gray-300 text-sm
                                      group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* AI Message Generator */}
            <div className="glass rounded-2xl p-6 border border-blue-500/15">
              <div className="flex items-center gap-2 mb-1">
                <HiSparkles className="text-blue-500" size={18} />
                <h3 className="text-gray-900 dark:text-white font-semibold">AI Recruiter Message</h3>
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10
                                 text-blue-600 dark:text-blue-400 text-xs rounded-full
                                 border border-blue-200 dark:border-blue-500/20">
                  Gemini
                </span>
              </div>
              <p className="text-gray-500 text-xs mb-4">
                Type a job type → Gemini writes a professional outreach message for you.
              </p>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={jobType}
                  onChange={e => setJobType(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  placeholder='e.g. "AI internship", "React developer"'
                  className={inputClass}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGenerate}
                  disabled={!jobType.trim() || aiLoading}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700
                             disabled:bg-blue-300 dark:disabled:bg-blue-900/50
                             disabled:cursor-not-allowed text-white text-sm rounded-xl font-medium
                             transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  {aiLoading ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Generating
                    </span>
                  ) : (
                    <><FaMagic size={12} /> Generate</>
                  )}
                </motion.button>
              </div>

              {aiError && (
                <div className="mb-3 p-3 bg-red-50 dark:bg-red-500/10
                                border border-red-200 dark:border-red-500/20
                                rounded-xl text-red-600 dark:text-red-400 text-xs">
                  {aiError}
                </div>
              )}

              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <textarea
                    value={generated}
                    onChange={e => setGenerated(e.target.value)}
                    rows={8}
                    className={`${inputClass} resize-none border-green-300 dark:border-green-500/20 leading-relaxed`}
                  />
                  <button
                    onClick={handleCopy}
                    className={`absolute top-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5
                      text-xs rounded-lg font-medium transition-all
                      ${copied
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-500/30'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10'
                      }`}
                  >
                    {copied ? <><FaCheck size={10} /> Copied!</> : <><FaCopy size={10} /> Copy</>}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="glass rounded-2xl p-6 h-full">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-5">Send a Message</h3>
              <div className="space-y-4">
                {[
                  { name: 'name',    label: 'Your Name',     type: 'text',  placeholder: 'John Smith'              },
                  { name: 'email',   label: 'Email Address', type: 'email', placeholder: 'john@company.com'        },
                  { name: 'subject', label: 'Subject',       type: 'text',  placeholder: 'Internship Opportunity'  },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-gray-600 dark:text-gray-400 text-xs mb-1.5">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleFormChange}
                      placeholder={placeholder}
                      className={inputClass}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 text-xs mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleFormChange}
                    rows={5}
                    placeholder="Tell me about the opportunity..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <motion.a
                  href={mailtoLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600
                             hover:bg-blue-700 text-white rounded-xl font-semibold text-sm
                             transition-colors shadow-lg shadow-blue-600/25"
                >
                  <FaEnvelope size={14} />
                  Send via Email Client
                </motion.a>
                <p className="text-center text-gray-500 text-xs">
                  Or email directly at{' '}
                  <a href="mailto:dinusaranethmal@email.com" className="text-blue-500 hover:underline">
                    dinusaranethmal@email.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
