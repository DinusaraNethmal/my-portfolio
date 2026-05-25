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
    title: 'AI RAG Chatbot',
    image: '/images/projects/rag-chatbot.png',
    description:
      'An intelligent chatbot using Retrieval-Augmented Generation (RAG) with LangChain and Gemini API. Users can upload documents and ask contextual questions with accurate AI-generated answers.',
    technologies: ['Python', 'LangChain', 'FastAPI', 'Gemini API', 'ChromaDB', 'React'],
    github: 'https://github.com/DinusaraNethmal',
    demo: '',
    status: 'completed',
    category: 'AI',
    features: [
      'Document ingestion & vectorization pipeline',
      'Semantic search with ChromaDB vector store',
      'Gemini API for high-quality response generation',
      'REST API backend with FastAPI',
      'React frontend for chat interface',
    ],
  },
  {
    id: 2,
    title: 'Food Reservation Platform',
    image: '/images/projects/food-reservation.png',
    description:
      'Full-stack MERN food reservation system with real-time table management, Stripe payment integration, and a complete admin dashboard for restaurant owners.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com/DinusaraNethmal',
    demo: '',
    status: 'completed',
    category: 'Full Stack',
    features: [
      'Real-time table availability management',
      'Stripe payment gateway integration',
      'Admin dashboard with analytics',
      'Email confirmation notifications',
      'Mobile-responsive design',
    ],
  },
  {
    id: 3,
    title: 'Hotel Room Booking App',
    image: '/images/projects/hotel-booking.png',
    description:
      'MERN stack hotel booking application with room management, JWT authentication, Cloudinary image uploads, and a fully featured booking management system.',
    technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Cloudinary', 'Express'],
    github: 'https://github.com/DinusaraNethmal',
    demo: '',
    status: 'completed',
    category: 'Full Stack',
    features: [
      'Secure JWT-based user authentication',
      'Room image upload via Cloudinary',
      'Booking management & availability calendar',
      'Admin panel for hotel staff',
      'Role-based access control',
    ],
  },
];

// Filter categories shown in the Projects section
export const projectCategories = ['All', 'AI', 'Full Stack', 'Java', 'React'];
