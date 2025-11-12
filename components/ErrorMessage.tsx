import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-500/20 border-l-4 border-red-400 text-red-200 p-4 rounded-r-lg my-6" role="alert">
    <p className="font-bold text-red-100">Error</p>
    <p>{message}</p>
  </div>
);