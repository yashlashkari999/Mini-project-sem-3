import React, { useState, useMemo } from 'react';
import { useSkillBarter } from '../context/SkillBarterContext';
import { CATEGORIES } from '../data/mockData';
import SkillCard from './SkillCard';
import { Search, PlusCircle, X, SearchX } from 'lucide-react';

export default function Marketplace({ onBookSkill, onNavigateToAddSkill }) {
  const { skills } = useSkillBarter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [skillTypeFilter, setSkillTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesQuery = 
        skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' || skill.category === selectedCategory;
      const matchesType = skillTypeFilter === 'all' || skill.type === skillTypeFilter;

      return matchesQuery && matchesCategory && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.userRating || 0) - (a.userRating || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [skills, searchQuery, selectedCategory, skillTypeFilter, sortBy]);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Campus Skills Marketplace</h1>
          <p className="text-slate-500 text-sm mt-1">
            Discover skills offered by fellow students or find requests you can teach to earn time credits.
          </p>
        </div>
        
        <div>
          <button
            onClick={onNavigateToAddSkill}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List a Skill (Teach or Learn)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="relative md:col-span-6">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills, topics (e.g. Python, Spanish, Guitar), or student names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSkillTypeFilter('all')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                skillTypeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Listings ({skills.length})
            </button>
            <button
              onClick={() => setSkillTypeFilter('teaching')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                skillTypeFilter === 'teaching' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Available to Teach
            </button>
            <button
              onClick={() => setSkillTypeFilter('learning')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                skillTypeFilter === 'learning' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🙋 Seeking Tutors
            </button>
          </div>

          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest">Sort: Recently Added</option>
              <option value="rating">Sort: Highest Student Rating</option>
            </select>
          </div>

        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching skills found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
            Try searching for different keywords or clear your category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSkillTypeFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} onBook={onBookSkill} />
          ))}
        </div>
      )}
    </div>
  );
}
