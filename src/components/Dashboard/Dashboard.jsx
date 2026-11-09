import React from 'react';
import { useSkillBarter } from '../../context/SkillBarterContext';
import ProfileTab from './ProfileTab';
import LedgerTab from './LedgerTab';
import SessionsTab from './SessionsTab';
import AddSkillTab from './AddSkillTab';
import { Check, ArrowUpRight, ArrowDownLeft, User, Receipt, Calendar, PlusCircle } from 'lucide-react';

export default function Dashboard({ activeTab, setActiveTab, onOpenCompletionModal, onNavigateToMarketplace }) {
  const { currentUser, ledger, sessions } = useSkillBarter();
  const userLedger = ledger.filter(l => l.userId === currentUser.id);
  const userSessions = sessions.filter(s => s.teacherId === currentUser.id || s.learnerId === currentUser.id);
  const pendingCount = userSessions.filter(s => s.status === 'pending').length;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{currentUser.name}</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified Student
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-1">
                {currentUser.major} • Class of {currentUser.gradYear} • {currentUser.email}
              </p>
              
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {(currentUser.badges || []).map((badge, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-slate-200 text-[10px] font-medium backdrop-blur-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Time-Bank Credit Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 flex items-center gap-6 self-start md:self-auto">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                Time-Bank Ledger
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold font-mono text-white">
                  {currentUser.creditBalance}
                </span>
                <span className="text-xs text-slate-300 font-medium">Credits</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                = {currentUser.creditBalance} Hours of peer tutoring available
              </span>
            </div>

            <div className="border-l border-white/15 pl-4 space-y-1 text-xs">
              <div className="text-emerald-300 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{currentUser.sessionsTaught || 0} hrs taught (+{currentUser.sessionsTaught || 0})</span>
              </div>
              <div className="text-indigo-300 flex items-center gap-1 font-medium">
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>{currentUser.sessionsLearned || 0} hrs learned (-{currentUser.sessionsLearned || 0})</span>
              </div>
              <div className="text-amber-300 flex items-center gap-1 text-[11px]">
                <span>★ {currentUser.rating} ({currentUser.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Wishlist</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'ledger'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Credit Ledger / History</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
            {userLedger.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'sessions'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Bookings & Sessions</span>
          {pendingCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-brand-600"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('add-skill')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            activeTab === 'add-skill'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add / Manage Skills</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'profile' && <ProfileTab onNavigateToAddSkill={() => setActiveTab('add-skill')} />}
      {activeTab === 'ledger' && <LedgerTab />}
      {activeTab === 'sessions' && (
        <SessionsTab 
          onOpenCompletionModal={onOpenCompletionModal} 
          onNavigateToMarketplace={onNavigateToMarketplace}
        />
      )}
      {activeTab === 'add-skill' && <AddSkillTab onSuccess={onNavigateToMarketplace} />}
    </div>
  );
}
