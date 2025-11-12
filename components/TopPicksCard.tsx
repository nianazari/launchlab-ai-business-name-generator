
import React from 'react';
import type { TopPick } from '../types';

interface TopPicksCardProps {
  topPicks: TopPick[];
}

export const TopPicksCard: React.FC<TopPicksCardProps> = ({ topPicks }) => (
  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-2xl text-white">
    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Top 3 Picks
    </h3>
    <ul className="space-y-4">
      {topPicks && topPicks.length > 0 ? (
        topPicks.map((pick, index) => (
          <li key={index} className="border-l-4 border-yellow-300 pl-4">
            <p className="font-bold text-lg">{pick.name}</p>
            <p className="text-indigo-100 italic">"{pick.tagline}"</p>
          </li>
        ))
      ) : (
         <li className="text-indigo-200">No top picks were generated.</li>
      )}
    </ul>
  </div>
);
