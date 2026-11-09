import React from 'react';
import { useSkillBarter } from '../context/SkillBarterContext';
import { BarChart2, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function SkillCard({ skill, onBook }) {
  const { currentUser, deleteSkill } = useSkillBarter();
  const isOwnSkill = skill.userId === currentUser.id;
  const isTeaching = skill.type === 'teaching';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      
      {/* Top Portion */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
            {skill.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
            isTeaching 
              ? 'bg-emerald-50 text-accent-700 border border-emerald-200' 
              : 'bg-purple-50 text-purple-700 border border-purple-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isTeaching ? 'bg-emerald-500' : 'bg-purple-500'}`}></span>
            {isTeaching ? 'Offering to Teach' : 'Seeking Tutor'}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-2 leading-snug">
          {skill.title}
        </h3>

        <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
          {skill.description}
        </p>

        <div className="mt-4 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Level: <strong>{skill.level}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{skill.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{skill.availability}</span>
          </div>
        </div>
      </div>

      {/* Bottom Student Info & Action */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <img
            src={skill.userAvatar}
            alt={skill.userName}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300"
          />
          <div>
            <div className="text-xs font-semibold text-slate-800 leading-tight">
              {skill.userName}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span>★ {skill.userRating || '5.0'}</span>
              <span>•</span>
              <span className="truncate max-w-[100px]">{skill.userMajor}</span>
            </div>
          </div>
        </div>

        <div>
          {isOwnSkill ? (
            <button
              onClick={() => deleteSkill(skill.id)}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 transition"
            >
              Delete
            </button>
          ) : (
            <button
              onClick={() => onBook(skill)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition ${
                isTeaching
                  ? 'bg-brand-600 hover:bg-brand-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>{isTeaching ? 'Book Session (-1 cr)' : 'Offer to Teach (+1 cr)'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
