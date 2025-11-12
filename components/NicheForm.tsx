import React, { useState } from 'react';

interface NicheFormProps {
  onGenerate: (niche: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export const NicheForm: React.FC<NicheFormProps> = ({ onGenerate, onClear, isLoading }) => {
  const [niche, setNiche] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (niche.trim()) {
      onGenerate(niche.trim());
    }
  };
  
  const handleClear = () => {
    setNiche('');
    onClear();
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 mb-8">
      <form onSubmit={handleSubmit}>
        <label htmlFor="niche" className="block text-lg font-semibold text-slate-200 mb-2">
          Your Niche or Industry
        </label>
        <input
          id="niche"
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g., sustainable fashion, mobile dog grooming, AI-powered recipe app"
          className="w-full px-4 py-3 bg-black/20 border border-slate-500 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow duration-200 text-white placeholder:text-slate-400"
          required
          disabled={isLoading}
        />
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <button
            type="submit"
            disabled={isLoading || !niche.trim()}
            className="w-full sm:w-auto flex-grow px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 disabled:bg-indigo-400/50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
             '✨ Generate Names'
            )}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-white/10 text-slate-200 font-semibold rounded-xl border border-white/20 hover:bg-white/20 disabled:opacity-50 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};