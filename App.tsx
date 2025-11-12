import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { NicheForm } from './components/NicheForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { generateBusinessNames } from './services/geminiService';
import type { NameGenerationResponse } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<NameGenerationResponse | null>(null);

  const handleGenerate = useCallback(async (niche: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const generatedNames = await generateBusinessNames(niche);
      setResults(generatedNames);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleClear = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow">
        <Header />
        <main className="flex-grow">
          <NicheForm onGenerate={handleGenerate} onClear={handleClear} isLoading={isLoading} />
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {results && <ResultsDisplay results={results} />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;