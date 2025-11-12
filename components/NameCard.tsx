import React from 'react';

interface NameCardProps {
  title: string;
  names: string[];
}

const Icon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


export const NameCard: React.FC<NameCardProps> = ({ title, names }) => (
  <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 h-full">
    <h3 className="text-xl font-bold text-slate-100 mb-4">{title}</h3>
    <ul className="space-y-3">
      {names && names.length > 0 ? (
        names.map((name, index) => (
          <li key={index} className="flex items-center gap-3 text-slate-300">
            <Icon />
            <span>{name}</span>
          </li>
        ))
      ) : (
        <li className="text-slate-400">No names generated for this category.</li>
      )}
    </ul>
  </div>
);