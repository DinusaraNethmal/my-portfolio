document.addEventListener('DOMContentLoaded', () => {

    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'light');
        }
    }

    // Check for saved theme in localStorage or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        setTheme(!document.documentElement.classList.contains('dark'));
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust top offset to trigger active link slightly earlier
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // Run on load

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            // Trigger when element is 100px from the bottom of the viewport
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on load

    // --- Hero Typing Animation ---
    if (typeof Typed !== 'undefined') {
        // 👇 UPDATED THIS SECTION
        new Typed('.typing-text', {
            strings: ['An undergraduate at SLIIT', 'ML/DL Explorer', 'Building the Future'],
            typeSpeed: 70,
            backSpeed: 70,
            loop: true
        });
        // 👆 END OF UPDATE
    } else {
        console.error('Typed.js script not loaded');
    }

    // --- Gemini API Contact Form Helper ---

    // --- Modal Elements and Functions ---
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    const closeErrorModalBtn = document.getElementById('close-error-modal');
    const errorModalOkBtn = document.getElementById('error-modal-ok');

    function showErrorModal(message) {
        errorMessage.textContent = message;
        errorModal.classList.remove('hidden');
    }

    function closeErrorModal() {
        errorModal.classList.add('hidden');
    }

    closeErrorModalBtn.addEventListener('click', closeErrorModal);
    errorModalOkBtn.addEventListener('click', closeErrorModal);

    // --- API Elements and Config ---
    const generateDraftBtn = document.getElementById('generate-draft-btn');
    const generateDraftText = document.getElementById('generate-draft-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const promptInput = document.getElementById('prompt-idea');
    const messageTextarea = document.getElementById('message');
    
    // NOTE: Per instructions, apiKey is an empty string.
    // The Canvas environment will handle authentication.
    const apiKey = "AIzaSyCyujjmSvxNlYb4cB-GR5plZpP9_s1Cq9U"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    // --- Exponential Backoff Fetch ---
    /**
     * Fetches a resource with exponential backoff retries.
     * @param {string} url - The URL to fetch.
     * @param {object} options - The fetch options.
     * @param {number} retries - Number of retries left.
     * @param {number} delay - Current delay in ms.
     * @returns {Promise<Response>}
     */
    async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                // Don't retry on client-side errors (4xx)
                if (response.status >= 400 && response.status < 500) {
                    throw new Error(`Client Error: ${response.status} ${response.statusText}`);
                }
                // Retry on server-side errors (5xx)
                throw new Error(`Server Error: ${response.status} ${response.statusText}`);
            }
            return response;
        } catch (error) {
            if (retries > 0) {
                // This console.log is for debugging, not an error to the user
                console.log(`Retrying... attempts left: ${retries}. Delay: ${delay}ms`);
                await new Promise(res => setTimeout(res, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            } else {
                throw error; // All retries failed
            }
        }
    }

    // --- Generate Draft Function ---
    async function handleGenerateDraft() {
        const userPrompt = promptInput.value;
        
        if (!userPrompt.trim()) {
            showErrorModal("Please enter a brief idea for your message.");
            return;
        }

        // Set loading state
        generateDraftText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        generateDraftBtn.disabled = true;
        messageTextarea.value = "Generating draft...";

        // This is the prompt for the LLM
        const systemPrompt = `You are a helpful assistant writing on behalf of a person (a potential client or recruiter) who wants to contact "Dinusara Nethmal", a professional developer.
The user's core idea for the message is: "${userPrompt}".
Based on this idea, write a concise, professional, and friendly message draft (around 3-4 sentences) that the user can send in this contact form.
- Start with a polite greeting (e.g., "Hello Dinusara,").
- Clearly state the purpose of the message based on the user's idea.
- End with a professional closing (e.g., "Best regards," or "I look forward to hearing from you,").
- Do NOT use markdown or any special formatting. Just plain text.`;

        const payload = {
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: [{
                parts: [{ text: "Please generate the message draft." }]
            }],
        };

        try {
            const response = await fetchWithBackoff(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                messageTextarea.value = text;
            } else {
                messageTextarea.value = "";
                showErrorModal("Could not generate a draft. The response was empty. Please try again.");
            }

        } catch (error) {
            console.error("Error generating draft:", error);
            messageTextarea.value = "";
            showErrorModal(`An error occurred: ${error.message}. Please check your connection and try again.`);
        } finally {
            // Unset loading state
            generateDraftText.classList.remove('hidden');
            loadingSpinner.classList.add('hidden');
            generateDraftBtn.disabled = false;
        }
    }

    generateDraftBtn.addEventListener('click', handleGenerateDraft);

});