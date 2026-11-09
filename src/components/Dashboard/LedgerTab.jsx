import React from 'react';
import { useSkillBarter } from '../../context/SkillBarterContext';
import { ShieldCheck } from 'lucide-react';

export default function LedgerTab() {
  const { currentUser, ledger } = useSkillBarter();
  const userLedger = ledger.filter(l => l.userId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Bank Balance</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
            {currentUser.creditBalance} Credits
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Ready to spend on learning</span>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-emerald-950 shadow-xs">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Lifetime Hours Taught</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-800 mt-1">
            +{currentUser.sessionsTaught || 0} Credits
          </div>
          <span className="text-xs text-emerald-700 mt-1 block">Peer tutoring completed</span>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200 text-indigo-950 shadow-xs">
          <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Lifetime Hours Learned</span>
          <div className="text-2xl font-extrabold font-mono text-brand-800 mt-1">
            -{currentUser.sessionsLearned || 0} Credits
          </div>
          <span className="text-xs text-indigo-700 mt-1 block">Peer sessions received</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Campus Time-Banking Ledger</h3>
            <p className="text-xs text-slate-500">Immutable audit log for student {currentUser.name}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ledger Integrity Verified</span>
          </div>
        </div>

        {userLedger.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No ledger transactions recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Transaction / Description</th>
                  <th className="py-3 px-4 font-semibold">Counterparty</th>
                  <th className="py-3 px-4 font-semibold">Credit Change</th>
                  <th className="py-3 px-4 font-semibold">New Balance</th>
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {userLedger
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(tx => {
                    const isPositive = tx.amount > 0;
                    return (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              tx.type === 'credit_bonus' ? 'bg-amber-100 text-amber-700' :
                              isPositive ? 'bg-emerald-100 text-accent-700' : 'bg-brand-100 text-brand-700'
                            }`}>
                              {tx.type === 'credit_bonus' ? '🎁' : isPositive ? '+' : '-'}
                            </span>
                            <span>{tx.description}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {tx.partnerName}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-sm">
                          <span className={isPositive ? 'text-accent-600' : 'text-indigo-600'}>
                            {isPositive ? `+${tx.amount}` : tx.amount} cr
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700">
                          {tx.balanceAfter} cr
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                            Settled
                          </span>
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
