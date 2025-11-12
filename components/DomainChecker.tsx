
import React, { useState, useCallback } from 'react';
import { checkDomains } from '../services/domainService';
import type { DomainCheckResults } from '../types';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

interface DomainCheckerProps {
  // FIX: Changed type from `string[]` to `unknown[]` to make the component more robust
  // against potentially malformed API data, which resolves the type error.
  allNames: unknown[];
}

const DomainResultsDisplay: React.FC<{ results: DomainCheckResults }> = ({ results }) => (
    <div className="mt-6 space-y-4">
        {Object.entries(results).map(([name, tldResults]) => (
            <div key={name} className="bg-black/20 border border-white/10 p-4 rounded-xl">
                <h4 className="font-bold text-slate-100 text-lg">{name}</h4>
                <ul className="mt-2 space-y-2 text-sm">
                    {Object.entries(tldResults).map(([tld, result]) => (
                        <li key={tld} className="flex flex-wrap items-center gap-x-3">
                            <span className="font-mono text-slate-300">{result.domain}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${result.likely_free ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                {result.likely_free ? '✨ Likely Free' : '🚫 Likely Taken'}
                            </span>
                             <span className="text-slate-400 text-xs">({result.note})</span>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        <p className="mt-4 text-xs text-center text-slate-400">
            <strong>Disclaimer:</strong> This is a simulation using random data and does not reflect real domain availability. Always verify at a domain registrar.
        </p>
    </div>
);


export const DomainChecker: React.FC<DomainCheckerProps> = ({ allNames }) => {
  const [tlds, setTlds] = useState('com, io, co');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DomainCheckResults | null>(null);

  const handleCheckDomains = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      // FIX: The `allNames` array, derived from an API response, might contain non-string values, causing a type error.
      // Explicitly mapping each element to a string ensures `uniqueNames` is a `string[]`, which is required by `checkDomains`.
      const uniqueNames = Array.from(new Set(allNames.map(name => String(name)))).slice(0, 25);
      const tldList = tlds.split(',').map(s => s.trim().replace(/^\./, '')).filter(Boolean).slice(0, 5);
      if (uniqueNames.length === 0 || tldList.length === 0) {
        throw new Error('No names or TLDs to check.');
      }
      const domainResults = await checkDomains(uniqueNames, tldList);
      setResults(domainResults);
    } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('An unknown error occurred during domain check simulation.');
    } finally {
      setIsLoading(false);
    }
  }, [allNames, tlds]);

  return (
    <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10">
      <h3 className="text-xl font-bold text-slate-100">Suggest Likely-Free Domains</h3>
      <p className="text-sm text-slate-400 mt-1">
        This is a <strong className="text-slate-300">simulation</strong> to demonstrate UI. It does not perform real DNS lookups.
      </p>
      
      <div className="mt-4">
        <label htmlFor="tlds" className="block text-sm font-medium text-slate-300 mb-1">
          TLDs (comma separated)
        </label>
        <input
          id="tlds"
          type="text"
          value={tlds}
          onChange={(e) => setTlds(e.target.value)}
          className="w-full px-3 py-2 bg-black/20 border border-slate-500 rounded-lg focus:ring-1 focus:ring-indigo-400 text-white placeholder:text-slate-400"
          disabled={isLoading}
        />
      </div>
      
      <div className="mt-5">
        <button 
            onClick={handleCheckDomains} 
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:bg-slate-500 transition-colors"
        >
            {isLoading ? 'Checking...' : 'Check Domains'}
        </button>
      </div>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {results && <DomainResultsDisplay results={results} />}

    </div>
  );
};
