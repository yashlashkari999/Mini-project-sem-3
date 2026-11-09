import React from 'react';
import { Compass, Sparkles, ShieldCheck, ArrowRight, Award, Scale, MapPin } from 'lucide-react';

export default function HeroSection({ onExplore, onSignUp, onOfferSkill }) {
  return (
    <div className="flex-1">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-slate-50 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold border border-brand-200 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-600"></span>
            Campus Time-Banking Peer Exchange
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Exchange Skills on Campus <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Without Spending a Dime.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Teach what you're great at to earn <strong>+1 Time Credit</strong> per hour. Spend your credits to learn anything from fellow students. Verified campus emails only.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-500/25 flex items-center gap-2 hover:-translate-y-0.5 transition active:translate-y-0"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Skills Marketplace</span>
            </button>

            <button
              onClick={onSignUp}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold border border-slate-300 shadow-xs flex items-center gap-2 transition"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Join with Campus Email (+3 Free Credits)</span>
            </button>
          </div>

          {/* Time-Banking Graphic */}
          <div className="mt-14 max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              How The Campus Time-Bank Ledger Operates
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              
              <div className="bg-emerald-50/80 rounded-xl p-5 border border-emerald-200 text-left">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-xs">
                  +1
                </div>
                <h4 className="font-bold text-slate-900 text-base">Teach 1 Hour</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Tutor Python, guide Spanish dialogues, or teach guitar chords to another student.
                </p>
                <div className="mt-3 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[11px] font-semibold">
                  Earn +1 Credit
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-slate-400">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600 font-bold">
                  ⇄
                </div>
                <span className="text-[11px] font-mono text-slate-500 mt-1">Equal 1:1 Value</span>
              </div>

              <div className="bg-indigo-50/80 rounded-xl p-5 border border-indigo-200 text-left">
                <div className="w-10 h-10 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-xs">
                  -1
                </div>
                <h4 className="font-bold text-slate-900 text-base">Learn 1 Hour</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Book a 1-on-1 session with a peer for Organic Chem prep, Figma UI design, or Excel modeling.
                </p>
                <div className="mt-3 inline-block px-2 py-0.5 bg-brand-100 text-brand-800 rounded text-[11px] font-semibold">
                  Spend 1 Credit
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero cash involved — time is the campus currency.</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-brand-600">
                <span>Protected by transparent ledger escrow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Built Specifically For Campus Life</h2>
            <p className="text-slate-600 mt-2">No awkward fee negotiations or subscription paywalls. Simple, fair, and collaborative.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Everyone Has Something To Teach</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you're an A-grade student in Calculus, a self-taught video editor, bilingual in Japanese, or an avid gym trainer, your knowledge is high-value to your campus peers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-accent-600 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Time-Banking Ledger</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Credits are only settled when both students confirm the session took place. Complete audit trail with timestamps, preventing no-shows and ensuring accountability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Safe Campus Locations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Meet where you already spend your days: the campus library study rooms, science center lounges, university dining hall, or virtually via Google Meet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-14 bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight">Ready to barter your first skill?</h2>
          <p className="text-slate-300 mt-2 max-w-xl mx-auto">
            Sign up with your campus email address today and receive 3 bonus credits immediately.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onExplore}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold shadow-md transition"
            >
              Browse Marketplace
            </button>
            <button
              onClick={onOfferSkill}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-xs border border-white/20 transition"
            >
              Offer a Skill Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
