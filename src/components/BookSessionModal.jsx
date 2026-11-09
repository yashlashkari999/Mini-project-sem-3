import React from 'react';
import { CalendarPlus, X } from 'lucide-react';

export default function BookSessionModal({ skill, onClose, onSubmit }) {
  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <CalendarPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {skill.type === 'teaching' ? 'Request Barter Session' : 'Offer to Teach Peer'}
            </h3>
            <p className="text-xs text-slate-500">
              With {skill.userName} ({skill.userMajor})
            </p>
          </div>
        </div>

        {/* Skill summary */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 mb-5 text-xs">
          <div className="font-semibold text-slate-800">{skill.title}</div>
          <div className="text-slate-500 mt-1">Suggested location: {skill.location}</div>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-200/80">
            <span className="text-slate-500">Time-Bank Ledger Transfer:</span>
            <span className="font-bold text-brand-600">
              {skill.type === 'teaching' ? '-1 Credit (From You)' : '+1 Credit (To You)'}
            </span>
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          onSubmit({
            skill,
            date: formData.get('date'),
            time: formData.get('time'),
            locationType: 'in-person',
            locationDetails: formData.get('locationDetails'),
            notes: formData.get('notes')
          });
        }} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Date</label>
              <input
                type="date"
                name="date"
                required
                defaultValue="2026-11-15"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Time</label>
              <input
                type="time"
                name="time"
                required
                defaultValue="14:00"
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Meeting Format & Place</label>
            <input
              type="text"
              name="locationDetails"
              required
              defaultValue={skill.location}
              className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Message / Learning Goals</label>
            <textarea
              name="notes"
              rows="2"
              placeholder="Share what specific questions or topics you want to prioritize during this session..."
              className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
            >
              Send Barter Proposal
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
