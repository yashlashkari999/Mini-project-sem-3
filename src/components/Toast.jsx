import React from 'react';
import { useSkillBarter } from '../context/SkillBarterContext';
import { AlertCircle, Info, CheckCircle2, X } from 'lucide-react';

export default function Toast() {
  const { toast, setToast } = useSkillBarter();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-in">
      <div className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 border text-sm font-medium ${
        toast.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
        toast.type === 'info' ? 'bg-blue-50 text-blue-800 border-blue-200' :
        'bg-emerald-50 text-emerald-900 border-emerald-200'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          toast.type === 'error' ? 'bg-red-200 text-red-700' :
          toast.type === 'info' ? 'bg-blue-200 text-blue-700' :
          'bg-emerald-200 text-accent-700'
        }`}>
          {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {toast.type === 'info' && <Info className="w-5 h-5" />}
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
        </div>
        <div className="flex-1">{toast.message}</div>
        <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
