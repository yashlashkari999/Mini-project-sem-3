import React from 'react';
import { useSkillBarter } from '../../context/SkillBarterContext';
import { Calendar, MapPin, Check, CheckCircle, CheckCheck } from 'lucide-react';

export default function SessionsTab({ onOpenCompletionModal, onNavigateToMarketplace }) {
  const { currentUser, sessions, acceptSession, declineSession } = useSkillBarter();
  const userSessions = sessions.filter(s => s.teacherId === currentUser.id || s.learnerId === currentUser.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">My Barter Bookings & Sessions</h3>
          <p className="text-xs text-slate-500">
            Confirm completion of past sessions to automatically transfer +1/-1 credit in the ledger.
          </p>
        </div>

        <div className="text-xs bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-slate-700">
            Total Sessions: {userSessions.length}
          </span>
        </div>
      </div>

      {userSessions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No active bookings yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Go to the Marketplace to book a tutor or propose teaching a fellow student.
          </p>
          <button
            onClick={onNavigateToMarketplace}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700"
          >
            Explore Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userSessions.map(session => {
            const isTeacher = session.teacherId === currentUser.id;
            const partnerName = isTeacher ? session.learnerName : session.teacherName;
            const partnerAvatar = isTeacher ? session.learnerAvatar : session.teacherAvatar;
            const roleLabel = isTeacher ? 'Teaching (You will earn +1 credit)' : 'Learning (You will spend -1 credit)';

            return (
              <div
                key={session.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition ${
                  session.status === 'pending' ? 'border-amber-200 bg-amber-50/20' :
                  session.status === 'confirmed' ? 'border-brand-200' :
                  session.status === 'completed' ? 'border-emerald-200' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        session.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        session.status === 'confirmed' ? 'bg-indigo-100 text-brand-800 border border-brand-200' :
                        session.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        ● {session.status}
                      </span>

                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        isTeacher ? 'bg-emerald-50 text-accent-700 border border-emerald-200' : 'bg-brand-50 text-brand-700 border border-brand-200'
                      }`}>
                        {roleLabel}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {session.skillTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <img src={partnerAvatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                        <span>Partner: <strong>{partnerName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{session.scheduledDate} at {session.scheduledTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{session.locationDetails}</span>
                      </div>
                    </div>

                    {session.notes && (
                      <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2">
                        <strong>Notes:</strong> {session.notes}
                      </div>
                    )}

                    {session.status === 'completed' && session.reviewText && (
                      <div className="text-xs text-emerald-800 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/60 mt-2">
                        <strong>Review ({session.ratingGiven} ★):</strong> "{session.reviewText}"
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                    {session.status === 'pending' && (
                      <>
                        <button
                          onClick={() => acceptSession(session.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Proposal</span>
                        </button>
                        <button
                          onClick={() => declineSession(session.id)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {session.status === 'confirmed' && (
                      <button
                        onClick={() => onOpenCompletionModal(session)}
                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Completed & Settle Credits</span>
                      </button>
                    )}

                    {session.status === 'completed' && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCheck className="w-4 h-4" />
                        <span>Credit Settled</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
