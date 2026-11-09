// Campus seed data for students, skills, transactions, and bookings

export const INITIAL_USERS = [
  {
    id: 'usr_aarav',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    major: 'Computer Science',
    gradYear: '2025',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior CS student passionate about full-stack web dev, Python algorithms, and competitive programming. Eager to pick up acoustic guitar and Spanish conversational skills!',
    creditBalance: 4,
    rating: 4.9,
    reviewsCount: 14,
    sessionsTaught: 8,
    sessionsLearned: 4,
    badges: ['Top Mentor', 'Code Wizard', 'Punctual Scholar']
  },
  {
    id: 'usr_elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@campus.edu',
    major: 'Fine Arts & Digital Media',
    gradYear: '2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Junior specializing in UI/UX in Figma and 3D sculpting in Blender. Wanting to learn fundamental Data Structures and French conversation.',
    creditBalance: 3,
    rating: 5.0,
    reviewsCount: 11,
    sessionsTaught: 6,
    sessionsLearned: 3,
    badges: ['Design Master', 'Community Star']
  },
  {
    id: 'usr_marcus',
    name: 'Marcus Chen',
    email: 'marcus.chen@campus.edu',
    major: 'Business Analytics & Finance',
    gradYear: '2027',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Sophomore helping peers with Financial Modeling, Advanced Excel, and Macroeconomics. Looking for personal fitness guidance and Python automation basics.',
    creditBalance: 2,
    rating: 4.8,
    reviewsCount: 8,
    sessionsTaught: 4,
    sessionsLearned: 2,
    badges: ['Finance Whiz', 'Consistent Helper']
  },
  {
    id: 'usr_priya',
    name: 'Priya Patel',
    email: 'priya.patel@campus.edu',
    major: 'Linguistics & Pre-Med',
    gradYear: '2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Fluent in Spanish & Hindi. Tutoring General Biology and Organic Chem. Excited to learn video editing for my campus medical club!',
    creditBalance: 5,
    rating: 4.95,
    reviewsCount: 19,
    sessionsTaught: 12,
    sessionsLearned: 7,
    badges: ['Polyglot', 'Top Academic Tutor']
  }
];

export const INITIAL_SKILLS = [
  {
    id: 'sk_1',
    userId: 'usr_aarav',
    userName: 'Aarav Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    userMajor: 'Computer Science',
    userRating: 4.9,
    type: 'teaching',
    title: 'Full-Stack Web Development with React & Tailwind',
    category: 'Programming & Tech',
    level: 'Intermediate to Advanced',
    description: 'Learn modern React hooks, state management, component architecture, and responsive Tailwind styling. I will walk you through building a real mini-project from scratch.',
    location: 'Engineering Computer Lab 3 / Online',
    availability: 'Tuesday & Thursday afternoons, Weekends',
    creditsCost: 1,
    createdAt: '2026-10-28T14:30:00Z'
  },
  {
    id: 'sk_2',
    userId: 'usr_elena',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    userMajor: 'Fine Arts & Digital Media',
    userRating: 5.0,
    type: 'teaching',
    title: 'Figma UI/UX Prototyping & Design Systems',
    category: 'Design & Arts',
    level: 'All Levels',
    description: 'Master wireframing, interactive micro-animations, typography, and building reusable design system components in Figma. Perfect for app and web projects!',
    location: 'Design Studio B or Campus Quad Cafe',
    availability: 'Monday & Wednesday 4:00 PM - 7:00 PM',
    creditsCost: 1,
    createdAt: '2026-10-29T10:15:00Z'
  },
  {
    id: 'sk_3',
    userId: 'usr_priya',
    userName: 'Priya Patel',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    userMajor: 'Linguistics & Pre-Med',
    userRating: 4.95,
    type: 'teaching',
    title: 'Conversational Spanish & Grammar Essentials',
    category: 'Languages',
    level: 'Beginner to Intermediate',
    description: 'Practical daily speaking practice, pronunciation drill, verb conjugations, and cultural context. Great for travel, academic requirements, or personal growth.',
    location: 'Main University Library 2nd Floor Quiet Zone',
    availability: 'Weekday mornings 9:00 AM - 11:30 AM',
    creditsCost: 1,
    createdAt: '2026-10-30T16:00:00Z'
  },
  {
    id: 'sk_4',
    userId: 'usr_marcus',
    userName: 'Marcus Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userMajor: 'Business Analytics & Finance',
    userRating: 4.8,
    type: 'teaching',
    title: 'Advanced Microsoft Excel & Financial Modeling',
    category: 'Academic & Tutoring',
    level: 'Intermediate',
    description: 'VLOOKUP/XLOOKUP, INDEX-MATCH, Pivot Tables, dynamic charts, and financial discounted cash flow (DCF) models for business and economics courses.',
    location: 'Business School Atrium / Discord',
    availability: 'Friday afternoons & Saturday',
    creditsCost: 1,
    createdAt: '2026-11-01T11:20:00Z'
  },
  {
    id: 'sk_5',
    userId: 'usr_aarav',
    userName: 'Aarav Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    userMajor: 'Computer Science',
    userRating: 4.9,
    type: 'learning',
    title: 'Seeking Tutor: Acoustic Guitar Fingerpicking & Chords',
    category: 'Music & Creative',
    level: 'Absolute Beginner',
    description: 'I bought an acoustic guitar and want to learn basic chord transitions (C, G, Em, Am, D) and basic strumming patterns. Will barter 1 credit/hr!',
    location: 'Student Activity Center Music Rooms',
    availability: 'Evenings after 6:00 PM',
    creditsCost: 1,
    createdAt: '2026-11-02T18:00:00Z'
  },
  {
    id: 'sk_6',
    userId: 'usr_elena',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    userMajor: 'Fine Arts & Digital Media',
    userRating: 5.0,
    type: 'learning',
    title: 'Seeking Tutor: Python Data Structures & Algorithmic Logic',
    category: 'Programming & Tech',
    level: 'Beginner',
    description: 'Need help understanding arrays, dictionaries, loops, and recursive thinking for an interactive media art installation script.',
    location: 'Campus Library or Google Meet',
    availability: 'Flexible on weekends',
    creditsCost: 1,
    createdAt: '2026-11-03T12:00:00Z'
  }
];

export const INITIAL_LEDGER = [
  {
    id: 'tx_101',
    userId: 'usr_aarav',
    type: 'credit_bonus',
    amount: 3,
    description: 'Welcome Time-Bank Grant for Campus Verification',
    partnerName: 'SkillBarter Campus Network',
    sessionId: 'SYS-WELCOME',
    timestamp: '2026-10-20T08:00:00Z',
    balanceAfter: 3,
    status: 'settled'
  },
  {
    id: 'tx_102',
    userId: 'usr_aarav',
    type: 'credit_earned',
    amount: 1,
    description: 'Taught "Python Basics & Algorithms" to Marcus Chen',
    partnerName: 'Marcus Chen',
    sessionId: 'ses_901',
    timestamp: '2026-10-25T16:30:00Z',
    balanceAfter: 4,
    status: 'settled'
  },
  {
    id: 'tx_103',
    userId: 'usr_aarav',
    type: 'credit_spent',
    amount: -1,
    description: 'Learned "Figma UI Prototyping" from Elena Rostova',
    partnerName: 'Elena Rostova',
    sessionId: 'ses_902',
    timestamp: '2026-10-27T14:00:00Z',
    balanceAfter: 3,
    status: 'settled'
  }
];

export const INITIAL_SESSIONS = [
  {
    id: 'ses_active_1',
    skillId: 'sk_1',
    skillTitle: 'Full-Stack Web Development with React & Tailwind',
    teacherId: 'usr_aarav',
    teacherName: 'Aarav Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    learnerId: 'usr_marcus',
    learnerName: 'Marcus Chen',
    learnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'confirmed',
    scheduledDate: '2026-11-12',
    scheduledTime: '15:30',
    durationHours: 1,
    locationType: 'in-person',
    locationDetails: 'Main Campus Library, Group Study Room 4A',
    notes: 'Help building an analytics dashboard frontend with responsive charts.',
    creditAmount: 1,
    createdAt: '2026-11-06T10:00:00Z'
  }
];

export const CATEGORIES = [
  'All Categories',
  'Programming & Tech',
  'Academic & Tutoring',
  'Languages',
  'Design & Arts',
  'Music & Creative',
  'Fitness & Wellness',
  'Career & Professional'
];
