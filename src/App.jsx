import React, { useState } from 'react';
import { useSkillBarter } from './context/SkillBarterContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard/Dashboard';
import BookSessionModal from './components/BookSessionModal';
import CompletionModal from './components/CompletionModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

export default function App() {
  const { createBooking, completeSession } = useSkillBarter();
  const [currentView, setCurrentView] = useState('marketplace'); // 'landing', 'marketplace', 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('profile');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [bookingSkill, setBookingSkill] = useState(null);
  const [completionSession, setCompletionSession] = useState(null);

  const handleBookingSubmit = (data) => {
    const success = createBooking(data);
    if (success) {
      setBookingSkill(null);
      setCurrentView('dashboard');
      setDashboardTab('sessions');
    }
  };

  const handleCompletionSubmit = (session, rating, review) => {
    completeSession(session, rating, review);
    setCompletionSession(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      <Toast />

      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        setDashboardTab={setDashboardTab}
        onOpenAuth={() => {
          setAuthMode('login');
          setIsAuthModalOpen(true);
        }}
      />

      {currentView === 'landing' && (
        <HeroSection 
          onExplore={() => setCurrentView('marketplace')}
          onSignUp={() => {
            setAuthMode('signup');
            setIsAuthModalOpen(true);
          }}
          onOfferSkill={() => {
            setCurrentView('dashboard');
            setDashboardTab('add-skill');
          }}
        />
      )}

      {currentView === 'marketplace' && (
        <Marketplace 
          onBookSkill={(skill) => setBookingSkill(skill)}
          onNavigateToAddSkill={() => {
            setCurrentView('dashboard');
            setDashboardTab('add-skill');
          }}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard 
          activeTab={dashboardTab}
          setActiveTab={setDashboardTab}
          onOpenCompletionModal={(session) => setCompletionSession(session)}
          onNavigateToMarketplace={() => setCurrentView('marketplace')}
        />
      )}

      {/* Modals */}
      <BookSessionModal 
        skill={bookingSkill}
        onClose={() => setBookingSkill(null)}
        onSubmit={handleBookingSubmit}
      />

      <CompletionModal 
        session={completionSession}
        onClose={() => setCompletionSession(null)}
        onConfirm={handleCompletionSubmit}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SkillBarter Campus</span>
            <span>•</span>
            <span>On-Campus Peer Time-Banking Network</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Semester 3 Mini Project</span>
            <span>•</span>
            <span>1 Hour Taught = +1 Credit | 1 Hour Learned = -1 Credit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
