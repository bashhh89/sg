import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface ScorecardResultsDisplayProps {
  reportMarkdown: string;
}

export default function ScorecardResultsDisplay({ reportMarkdown }: ScorecardResultsDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-sg-dark-teal mb-6 text-center">Your AI Efficiency Scorecard Results</h2>
      <article className="prose prose-lg max-w-none prose-headings:text-sg-dark-teal prose-a:text-sg-mint-green hover:prose-a:opacity-80">
        <ReactMarkdown>{reportMarkdown}</ReactMarkdown>
      </article>
    </div>
  );
} 