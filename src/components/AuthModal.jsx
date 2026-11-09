import React, { useState } from 'react';
import { useSkillBarter } from '../context/SkillBarterContext';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [authMode, setAuthMode] = useState(initialMode);
  const { currentUser, login, signUp } = useSkillBarter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex border-b border-slate-200 mb-6 text-sm font-bold">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 pb-3 text-center border-b-2 transition ${
              authMode === 'login' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Campus Login
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 pb-3 text-center border-b-2 transition ${
              authMode === 'signup' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            New Student Sign Up
          </button>
        </div>

        {authMode === 'login' ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            if (login(formData.get('email'))) {
              onClose();
            }
          }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campus Email</label>
              <input
                type="email"
                name="email"
                required
                defaultValue={currentUser.email}
                placeholder="e.g. aarav.sharma@campus.edu"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                defaultValue="student123"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
            >
              Sign In to Time-Bank
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            signUp({
              name: formData.get('name'),
              email: formData.get('email'),
              major: formData.get('major'),
              gradYear: formData.get('gradYear'),
              bio: formData.get('bio')
            });
            onClose();
          }} className="space-y-3.5">
            
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <span className="text-base">🎁</span>
              <span><strong>Campus Verification Bonus:</strong> You receive 3 free time credits upon registration!</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Maya Lin"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campus Email (.edu / university)</label>
              <input
                type="email"
                name="email"
                required
                placeholder="maya.lin@campus.edu"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Major / Department</label>
                <input
                  type="text"
                  name="major"
                  required
                  placeholder="e.g. Bioengineering"
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
                <input
                  type="text"
                  name="gradYear"
                  required
                  placeholder="2027"
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio</label>
              <input
                type="text"
                name="bio"
                placeholder="What do you love studying or teaching?"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
            >
              Complete Sign-Up & Claim 3 Credits
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
