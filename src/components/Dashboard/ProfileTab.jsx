import React from 'react';
import { useSkillBarter } from '../../context/SkillBarterContext';
import { Info, Plus } from 'lucide-react';

export default function ProfileTab({ onNavigateToAddSkill }) {
  const { currentUser, skills, deleteSkill } = useSkillBarter();

  const teachingSkills = skills.filter(s => s.userId === currentUser.id && s.type === 'teaching');
  const learningSkills = skills.filter(s => s.userId === currentUser.id && s.type === 'learning');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bio & Verification */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-3">About Me</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {currentUser.bio}
          </p>
          
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Campus Email:</span>
              <span className="font-medium text-slate-800">{currentUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Major:</span>
              <span className="font-medium text-slate-800">{currentUser.major}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Class Year:</span>
              <span className="font-medium text-slate-800">{currentUser.gradYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Member Since:</span>
              <span className="font-medium text-slate-800">Fall 2026</span>
            </div>
          </div>
        </div>

        <div className="bg-brand-50/50 rounded-2xl p-5 border border-brand-100 text-xs text-brand-900">
          <div className="flex items-center gap-2 font-bold mb-2">
            <Info className="w-4 h-4 text-brand-600" />
            <span>Time-Banking Rules</span>
          </div>
          <p className="leading-relaxed text-brand-800">
            Every skill is valued equally at <strong>1 hour = 1 credit</strong>. Credit escrow ensures neither party loses time or credits without verified completion.
          </p>
        </div>
      </div>

      {/* Skills Offered & Wanted */}
      <div className="lg:col-span-2 space-y-6">
        {/* Skills I Offer */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Skills I Can Teach (+1 Credit)</h3>
              <p className="text-xs text-slate-500">Other students can book these to learn from you.</p>
            </div>
            <button
              onClick={onNavigateToAddSkill}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add New
            </button>
          </div>

          <div className="space-y-3">
            {teachingSkills.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500">
                You haven't listed any teaching skills yet. List a skill to start earning credits!
              </div>
            ) : (
              teachingSkills.map(skill => (
                <div key={skill.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{skill.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{skill.category}</span>
                      <span>•</span>
                      <span>{skill.level}</span>
                      <span>•</span>
                      <span>{skill.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 px-2 py-1 rounded hover:bg-rose-50"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Skills I Want to Learn (-1 Credit)</h3>
              <p className="text-xs text-slate-500">Campus tutors can see these and offer to teach you.</p>
            </div>
            <button
              onClick={onNavigateToAddSkill}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Post Request
            </button>
          </div>

          <div className="space-y-3">
            {learningSkills.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-xs text-slate-500">
                You have no active learning requests.
              </div>
            ) : (
              learningSkills.map(skill => (
                <div key={skill.id} className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/80 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{skill.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{skill.category}</span>
                      <span>•</span>
                      <span>{skill.level}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 px-2 py-1 rounded hover:bg-rose-50"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
