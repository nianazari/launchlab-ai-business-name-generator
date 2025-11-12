import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center mb-8">
    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
      LaunchLab<span className="text-yellow-300">™</span>
    </h1>
    <p className="mt-2 text-lg text-indigo-200">Free AI Business Name Generator</p>
    <p className="mt-2 text-sm text-indigo-300 max-w-2xl mx-auto">
      Powered by Gemini. Names are "available-sounding" only and do not constitute a legal availability check. Always perform your own due diligence.
    </p>
  </header>
);