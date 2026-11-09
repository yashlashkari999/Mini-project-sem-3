import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function CompletionModal({ session, onClose, onConfirm }) {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Confirm Session Completion</h3>
          <p className="text-xs text-slate-500 mt-1">
            This action will immediately execute the Time-Banking Credit Ledger transfer.
          </p>
        </div>

        {/* Ledger breakdown */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2 mb-5">
          <div className="font-semibold text-slate-900">{session.skillTitle}</div>
          <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
            <span>Teacher ({session.teacherName}):</span>
            <span className="font-bold text-accent-600 font-mono">+1.0 Credit</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Learner ({session.learnerName}):</span>
            <span className="font-bold text-indigo-600 font-mono">-1.0 Credit</span>
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const rating = Number(formData.get('rating') || 5);
          const review = formData.get('review') || 'Great peer session!';
          onConfirm(session, rating, review);
        }} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Student Rating</label>
            <select
              name="rating"
              defaultValue="5"
              className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
            >
              <option value="5">★★★★★ 5 Stars (Exceptional Mentor)</option>
              <option value="4">★★★★☆ 4 Stars (Very Good)</option>
              <option value="3">★★★☆☆ 3 Stars (Satisfactory)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Feedback / Testimonial</label>
            <textarea
              name="review"
              rows="2"
              required
              defaultValue="Very helpful and clear explanation. Highly recommend!"
              className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
            >
              Verify & Settle Time-Bank Credits
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
