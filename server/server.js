/**
 * SkillBarter Campus - Express.js REST API Backend
 * Implements the Time-Banking Credit Ledger logic and handles all barter state.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database (can be swapped with MongoDB, PostgreSQL, or SQLite)
const db = {
  users: [
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
  ],
  skills: [
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
    }
  ],
  ledger: [
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
    }
  ],
  sessions: []
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SkillBarter API', time: new Date() });
});

// Users
app.get('/api/users', (req, res) => {
  res.json(db.users);
});

// Skills
app.get('/api/skills', (req, res) => {
  res.json(db.skills);
});

app.post('/api/skills', (req, res) => {
  const newSkill = {
    id: 'sk_' + Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.skills.unshift(newSkill);
  res.status(201).json(newSkill);
});

// Sessions
app.get('/api/sessions', (req, res) => {
  res.json(db.sessions);
});

app.post('/api/sessions/book', (req, res) => {
  const newSession = {
    id: 'ses_' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.sessions.unshift(newSession);
  res.status(201).json(newSession);
});

// TIME-BANKING COMPLETION & CREDIT TRANSFER
app.post('/api/sessions/complete', (req, res) => {
  const { sessionId, rating = 5, review = 'Great session!' } = req.body;
  const session = db.sessions.find(s => s.id === sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const teacher = db.users.find(u => u.id === session.teacherId);
  const learner = db.users.find(u => u.id === session.learnerId);

  if (!teacher || !learner) {
    return res.status(400).json({ error: 'Participants not found' });
  }

  if (learner.creditBalance < 1) {
    return res.status(400).json({ error: 'Learner has insufficient credits' });
  }

  // 1. Double-Entry Balance Adjustment
  teacher.creditBalance += 1;
  teacher.sessionsTaught += 1;
  learner.creditBalance -= 1;
  learner.sessionsLearned += 1;

  const nowIso = new Date().toISOString();
  session.status = 'completed';
  session.completedAt = nowIso;
  session.ratingGiven = rating;
  session.reviewText = review;

  // 2. Append Ledger Audit Entries
  db.ledger.unshift({
    id: 'tx_' + Date.now() + '_t',
    userId: teacher.id,
    type: 'credit_earned',
    amount: 1,
    description: `Taught "${session.skillTitle}" to ${learner.name}`,
    partnerName: learner.name,
    sessionId,
    timestamp: nowIso,
    balanceAfter: teacher.creditBalance,
    status: 'settled'
  });

  db.ledger.unshift({
    id: 'tx_' + Date.now() + '_l',
    userId: learner.id,
    type: 'credit_spent',
    amount: -1,
    description: `Learned "${session.skillTitle}" from ${teacher.name}`,
    partnerName: teacher.name,
    sessionId,
    timestamp: nowIso,
    balanceAfter: learner.creditBalance,
    status: 'settled'
  });

  res.json({ success: true, session });
});

// Ledger
app.get('/api/ledger', (req, res) => {
  res.json(db.ledger);
});

app.listen(PORT, () => {
  console.log(`SkillBarter Express Server running on http://localhost:${PORT}`);
});
