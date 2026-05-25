// ============================================================
// PROJECTS DATA — Edit this file to add/update your projects
// ============================================================
// To add a new project, copy one of the objects below and
// fill in your own details. The portfolio renders automatically.
// Image: place your image in public/images/projects/ and reference as:
//        image: '/images/projects/your-image.png'
// ============================================================

export const projects = [
  {
    id: 1,
    title: 'Plant Disease Detection',
    image: '/images/projects/Screenshot 2025-11-13 184256.png',
    description:
      'A Flask-based web app using a CNN model to detect plant diseases from leaf images. Built with Python, TensorFlow, and PlantVillage dataset for accurate, real-time predictions. AI for smart agriculture.',
    technologies: ['Python', 'Flask', 'FastAPI', 'Keras', 'HTML', 'CSS'],
    github: 'https://github.com/DinusaraNethmal/Plant-Disease-Detection',
    demo: '',
    status: 'completed',
    category: 'AI',
    features: [
      'Upload a plant image and get instant predictions',
      'Shows disease name and confidence level',
      'Simple and clean user interface',
    ],
  },
  {
    id: 2,
    title: 'Automated football blogging platform',
    image: '/images/projects/N8N.png',
    description:
      'A modern, automated football blogging platform that uses Artificial Intelligence to stay updated with the latest trending stories. This project replaces manual content creation with an autonomous pipeline that fetches, analyzes, and publishes news every morning.',
    technologies: ['React.js (Hooks, Router, Axios)', 'Node.js', 'Express', 'MongoDB', 'N8N', 'NewsAPI.org'],
    github: 'https://github.com/DinusaraNethmal/Blog-Project',
    demo: '',
    status: 'completed',
    category: 'AI',
    features: [
      'AI Automation: Automatically selects and writes blog posts at 7:00 AM daily.',
      'Gemini chatbot: Gemini chat assistant to get more informations.',
      'Real-time News: Integrates with NewsAPI to fetch global football headlines.',
      'MERN Stack: Robust architecture using MongoDB, Express, React, and Node.js.',
      'Smart Content: Uses Google Gemini 1.5 Pro to generate engaging, human-like fan commentary.',
    ],
  },
  {
    id: 3,
    title: 'E-Commerce Shopping System',
    image: '/images/projects/Shopping.png',
    description:
      'This project is a fully functional web-based shopping mall designed to facilitate e-commerce operations. It is built using Java Spring Boot, MySQL, and a dynamic HTML/CSS/JavaScript frontend.',
    technologies: ['Java 21', 'Spring Boot (Web, Data JPA', 'MySQL', 'HTML', 'CSS', 'MVC (Model-View-Controller)'],
    github: 'https://github.com/DinusaraNethmal/Shopping-Cart-Management',
    demo: '',
    status: 'completed',
    category: 'Full Stack',
    features: [
      'The system implements six core modules covering the entire buying cycle including,',
      'User Management',
      'Product Catalog',
      'Shopping Cart',
      'Role-based access for Customers (to browse and buy) and Administrators (to manage inventory and orders).',
    ],
  },
];

// Filter categories shown in the Projects section
export const projectCategories = ['All', 'AI', 'Full Stack', 'Java', 'React'];
