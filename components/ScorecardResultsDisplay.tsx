import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

export interface ScorecardResultsDisplayProps {
  reportMarkdown: string;
}

export default function ScorecardResultsDisplay({ reportMarkdown }: ScorecardResultsDisplayProps) {
  const extractedTier = useMemo(() => {
    if (!reportMarkdown) return null;
    // Regex to find "## Overall Tier: TierName" (case insensitive, multiline)
    const tierRegex = /^##\s*Overall Tier:\s*(.*)$/im;
    const match = reportMarkdown.match(tierRegex);
    return match ? match[1].trim() : null;
  }, [reportMarkdown]);

  // For debugging
  console.log("Extracted Tier:", extractedTier);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-sg-dark-teal mb-6 text-center">Your AI Efficiency Scorecard Results</h2>
      {extractedTier && (
        <div className="mb-6 text-center p-4 bg-sg-dark-teal/5 border border-sg-dark-teal/10 rounded-lg">
          <p className="text-sm font-semibold uppercase text-sg-dark-teal/80 tracking-wider mb-1">Your AI Tier</p>
          <p className="text-3xl font-bold text-sg-dark-teal">{extractedTier}</p>
        </div>
      )}
      {/* Visual Placeholder */}
      <div className="mx-auto mb-6 w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs text-center">
        Visual Placeholder
      </div>
      <article className="prose prose-lg max-w-none prose-headings:text-sg-dark-teal prose-a:text-sg-mint-green hover:prose-a:opacity-80">
        <ReactMarkdown>{reportMarkdown}</ReactMarkdown>
      </article>
    </div>
  );
} 