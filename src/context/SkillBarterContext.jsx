import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_USERS, INITIAL_SKILLS, INITIAL_LEDGER, INITIAL_SESSIONS } from '../data/mockData';

const SkillBarterContext = createContext(null);

export function SkillBarterProvider({ children }) {
  // LocalStorage-backed state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('sb_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    const saved = localStorage.getItem('sb_current_user');
    return saved || 'usr_aarav';
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('sb_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [ledger, setLedger] = useState(() => {
    const saved = localStorage.getItem('sb_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER;
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('sb_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('sb_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('sb_current_user', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('sb_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('sb_ledger', JSON.stringify(ledger));
  }, [ledger]);

  useEffect(() => {
    localStorage.setItem('sb_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const currentUser = useMemo(() => {
    return users.find(u => u.id === currentUserId) || users[0];
  }, [users, currentUserId]);

  const switchUser = (userId) => {
    setCurrentUserId(userId);
    const u = users.find(user => user.id === userId);
    showToast(`Switched account to ${u?.name}`, 'info');
  };

  // Create Barter Booking
  const createBooking = (bookingData) => {
    const { skill, date, time, locationType, locationDetails, notes } = bookingData;
    let teacherId, teacherName, teacherAvatar, learnerId, learnerName, learnerAvatar;

    if (skill.type === 'teaching') {
      if (currentUser.creditBalance < 1) {
        showToast("Insufficient credits! You need at least 1 credit to book a mentor.", "error");
        return false;
      }
      teacherId = skill.userId;
      teacherName = skill.userName;
      teacherAvatar = skill.userAvatar;
      learnerId = currentUser.id;
      learnerName = currentUser.name;
      learnerAvatar = currentUser.avatar;
    } else {
      teacherId = currentUser.id;
      teacherName = currentUser.name;
      teacherAvatar = currentUser.avatar;
      learnerId = skill.userId;
      learnerName = skill.userName;
      learnerAvatar = skill.userAvatar;
    }

    const newSession = {
      id: 'ses_' + Math.random().toString(36).substr(2, 9),
      skillId: skill.id,
      skillTitle: skill.title,
      teacherId,
      teacherName,
      teacherAvatar,
      learnerId,
      learnerName,
      learnerAvatar,
      status: 'pending',
      scheduledDate: date,
      scheduledTime: time,
      durationHours: 1,
      locationType,
      locationDetails,
      notes,
      creditAmount: 1,
      createdAt: new Date().toISOString()
    };

    setSessions([newSession, ...sessions]);
    showToast("Barter proposal sent successfully!", "success");
    return true;
  };

  const acceptSession = (sessionId) => {
    setSessions(sessions.map(s => s.id === sessionId ? { ...s, status: 'confirmed' } : s));
    showToast("Session confirmed!", "success");
  };

  const declineSession = (sessionId) => {
    setSessions(sessions.map(s => s.id === sessionId ? { ...s, status: 'declined' } : s));
    showToast("Session proposal declined.", "info");
  };

  // Complete Session & Execute Time-Banking Ledger Settlement
  const completeSession = (session, rating, reviewText) => {
    const { teacherId, learnerId, teacherName, learnerName, skillTitle, id: sessionId } = session;
    const teacher = users.find(u => u.id === teacherId);
    const learner = users.find(u => u.id === learnerId);

    if (!teacher || !learner) {
      showToast("Could not locate students.", "error");
      return;
    }

    if (learner.creditBalance < 1) {
      showToast(`${learnerName} does not have enough credits to settle.`, "error");
      return;
    }

    const nowIso = new Date().toISOString();

    // 1. Update balances
    const updatedUsers = users.map(u => {
      if (u.id === teacherId) {
        const newTotalTaught = (u.sessionsTaught || 0) + 1;
        const currentRatingsCount = u.reviewsCount || 0;
        const newRating = Number((((u.rating || 5) * currentRatingsCount + rating) / (currentRatingsCount + 1)).toFixed(2));
        return {
          ...u,
          creditBalance: u.creditBalance + 1,
          sessionsTaught: newTotalTaught,
          rating: newRating,
          reviewsCount: currentRatingsCount + 1
        };
      }
      if (u.id === learnerId) {
        return {
          ...u,
          creditBalance: u.creditBalance - 1,
          sessionsLearned: (u.sessionsLearned || 0) + 1
        };
      }
      return u;
    });

    // 2. Ledger double-entries
    const teacherTx = {
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      userId: teacherId,
      type: 'credit_earned',
      amount: 1,
      description: `Taught "${skillTitle}" to ${learnerName}`,
      partnerName: learnerName,
      sessionId,
      timestamp: nowIso,
      balanceAfter: teacher.creditBalance + 1,
      status: 'settled'
    };

    const learnerTx = {
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      userId: learnerId,
      type: 'credit_spent',
      amount: -1,
      description: `Learned "${skillTitle}" from ${teacherName}`,
      partnerName: teacherName,
      sessionId,
      timestamp: nowIso,
      balanceAfter: learner.creditBalance - 1,
      status: 'settled'
    };

    // 3. Mark session complete
    const updatedSessions = sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'completed',
          completedAt: nowIso,
          ratingGiven: rating,
          reviewText
        };
      }
      return s;
    });

    setUsers(updatedUsers);
    setLedger([teacherTx, learnerTx, ...ledger]);
    setSessions(updatedSessions);
    showToast(`Time-bank credits settled! +1 to ${teacherName}, -1 from ${learnerName}.`, "success");
  };

  const addSkill = (newSkillData) => {
    const skill = {
      id: 'sk_' + Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userMajor: currentUser.major,
      userRating: currentUser.rating,
      createdAt: new Date().toISOString(),
      creditsCost: 1,
      ...newSkillData
    };
    setSkills([skill, ...skills]);
    showToast("New skill listing published!", "success");
  };

  const deleteSkill = (skillId) => {
    setSkills(skills.filter(s => s.id !== skillId));
    showToast("Skill listing removed.", "info");
  };

  const signUp = (formData) => {
    const newUserId = 'usr_' + Math.random().toString(36).substr(2, 8);
    const newUser = {
      id: newUserId,
      name: formData.name,
      email: formData.email,
      major: formData.major,
      gradYear: formData.gradYear,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`,
      bio: formData.bio || `Student in ${formData.major}, Class of ${formData.gradYear}.`,
      creditBalance: 3,
      rating: 5.0,
      reviewsCount: 0,
      sessionsTaught: 0,
      sessionsLearned: 0,
      badges: ['New Scholar', 'Campus Verified']
    };

    const welcomeBonus = {
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      userId: newUserId,
      type: 'credit_bonus',
      amount: 3,
      description: 'Welcome Time-Bank Grant for Campus Verification',
      partnerName: 'SkillBarter Campus Network',
      sessionId: 'SYS-WELCOME',
      timestamp: new Date().toISOString(),
      balanceAfter: 3,
      status: 'settled'
    };

    setUsers([...users, newUser]);
    setLedger([welcomeBonus, ...ledger]);
    setCurrentUserId(newUserId);
    showToast(`Welcome ${newUser.name}! 3 Starting Credits granted.`, "success");
  };

  const login = (email) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUserId(found.id);
      showToast(`Welcome back, ${found.name}!`, "success");
      return true;
    }
    showToast("Email not found on campus roster.", "error");
    return false;
  };

  const resetData = () => {
    setUsers(INITIAL_USERS);
    setCurrentUserId('usr_aarav');
    setSkills(INITIAL_SKILLS);
    setLedger(INITIAL_LEDGER);
    setSessions(INITIAL_SESSIONS);
    localStorage.clear();
    showToast("Campus data reset to initial defaults.", "info");
  };

  return (
    <SkillBarterContext.Provider value={{
      users,
      currentUser,
      currentUserId,
      switchUser,
      skills,
      addSkill,
      deleteSkill,
      ledger,
      sessions,
      createBooking,
      acceptSession,
      declineSession,
      completeSession,
      signUp,
      login,
      resetData,
      toast,
      setToast,
      showToast
    }}>
      {children}
    </SkillBarterContext.Provider>
  );
}

export const useSkillBarter = () => useContext(SkillBarterContext);
