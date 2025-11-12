
import React from 'react';
import type { NameGenerationResponse, NameCategories } from '../types';
import { NameCard } from './NameCard';
import { TopPicksCard } from './TopPicksCard';
import { DomainChecker } from './DomainChecker';

interface ResultsDisplayProps {
  results: NameGenerationResponse;
}

const categoryTitles: Record<keyof NameCategories, string> = {
  classic_trustworthy: 'Classic & Trustworthy',
  modern_bold: 'Modern & Bold',
  creative_punny: 'Creative & Punny',
  abstract_unique: 'Abstract & Unique',
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const allNames = Object.values(results.categories).flat();

  return (
    <div className="space-y-8 animate-fade-in">
        <TopPicksCard topPicks={results.top3} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(Object.keys(results.categories) as Array<keyof NameCategories>).map((key) => (
                <NameCard key={key} title={categoryTitles[key]} names={results.categories[key]} />
            ))}
        </div>

        <DomainChecker allNames={allNames} />
    </div>
  );
};
