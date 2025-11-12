import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 mb-6">
      <p className="text-sm text-indigo-300/60">
        a Division of LaunchLab™ @2025 - Viral Brands Digital ┃{' '}
        <a 
          href="https://www.getlaunchlabgpt.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-indigo-200 underline transition-colors"
        >
          https://www.getlaunchlabgpt.com/
        </a>
      </p>
    </footer>
  );
};
