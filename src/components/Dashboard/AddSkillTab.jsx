import React from 'react';
import { useSkillBarter } from '../../context/SkillBarterContext';
import { CATEGORIES } from '../../data/mockData';

export default function AddSkillTab({ onSuccess }) {
  const { addSkill } = useSkillBarter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addSkill({
      type: formData.get('type'),
      title: formData.get('title'),
      category: formData.get('category'),
      level: formData.get('level'),
      description: formData.get('description'),
      location: formData.get('location'),
      availability: formData.get('availability')
    });
    if (onSuccess) onSuccess();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-slate-900">List a New Campus Skill</h3>
        <p className="text-xs text-slate-500 mt-1">
          Choose whether you want to teach a skill to earn credits, or post a learning request for a tutor.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Listing Goal
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/40">
              <input type="radio" name="type" value="teaching" defaultChecked className="text-emerald-600 focus:ring-emerald-500" />
              <div>
                <div className="text-xs font-bold text-slate-900">🎓 I Want to TEACH</div>
                <div className="text-[11px] text-slate-500">Earn +1 Credit per hour</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50/40">
              <input type="radio" name="type" value="learning" className="text-purple-600 focus:ring-purple-500" />
              <div>
                <div className="text-xs font-bold text-slate-900">🙋 I Want to LEARN</div>
                <div className="text-[11px] text-slate-500">Spend 1 Credit per hour</div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Skill Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Data Structures in C++, Conversational Japanese, Guitar Basics..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            >
              {CATEGORIES.filter(c => c !== 'All Categories').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Proficiency / Target Level</label>
            <select
              name="level"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            >
              <option value="Beginner">Beginner Friendly</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels Welcome</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description & What We Will Cover</label>
          <textarea
            name="description"
            required
            rows="3"
            placeholder="Outline what you can teach (or what you need help with), topics, prerequisites, and expected outcomes..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Location</label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Science Library, Campus Quad, Online (Zoom)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Weekly Availability</label>
            <input
              type="text"
              name="availability"
              required
              placeholder="e.g. Weekday afternoons, Weekend mornings"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
          >
            Publish Skill to Campus Marketplace
          </button>
        </div>
      </form>
    </div>
  );
}
