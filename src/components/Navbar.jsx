import React from 'react';
import { useSkillBarter } from '../context/SkillBarterContext';
import { Repeat, Home, Compass, LayoutDashboard, UserPlus, RotateCcw } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, setDashboardTab, onOpenAuth }) {
  const { users, currentUser, switchUser, resetData } = useSkillBarter();

  return (
    <>
      {/* Top Demo Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold text-[11px] border border-brand-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Campus Time-Bank Simulator
            </span>
            <span className="hidden sm:inline text-slate-400">Switch students to simulate barter transactions:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {users.map(u => (
              <button
                key={u.id}
                onClick={() => switchUser(u.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition flex items-center gap-1.5 shrink-0 ${
                  u.id === currentUser.id 
                    ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-400' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <img src={u.avatar} className="w-4 h-4 rounded-full object-cover" alt="" />
                <span>{u.name.split(' ')[0]}</span>
                <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-amber-300 font-mono font-bold">
                  {u.creditBalance} cr
                </span>
              </button>
            ))}
            <button
              onClick={resetData}
              title="Reset campus seed data"
              className="px-2 py-1 rounded text-slate-400 hover:text-red-300 hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition">
                  Skill<span className="text-brand-600">Barter</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  Campus
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">1 Hour Taught = 1 Time Credit</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                currentView === 'landing' ? 'bg-slate-100 text-brand-600 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">How It Works</span>
            </button>

            <button
              onClick={() => setCurrentView('marketplace')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                currentView === 'marketplace' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Marketplace</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('profile');
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                currentView === 'dashboard' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Credit Ledger Pill */}
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('ledger');
              }}
              title="View Time-Bank Credit Ledger"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition shadow-xs group"
            >
              <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:rotate-12 transition">
                ⚡
              </div>
              <div className="text-left">
                <span className="text-xs font-bold font-mono text-amber-950">
                  {currentUser.creditBalance}
                </span>
                <span className="text-[11px] text-amber-800 ml-1 hidden sm:inline font-medium">Credits</span>
              </div>
            </button>

            {/* Profile Avatar */}
            <div 
              className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer"
              onClick={() => {
                setCurrentView('dashboard');
                setDashboardTab('profile');
              }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/40"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight flex items-center gap-1">
                  {currentUser.name}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[120px]">
                  {currentUser.major}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAuth}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              title="Campus Login / Sign Up"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
