import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

export interface ScorecardResultsDisplayProps {
  reportMarkdown: string;
}

// Helper to extract sections from the Markdown string
function extractSections(markdown: string) {
  // Split by H2s (## ...), keep the heading as part of the section
  const sectionRegex = /(^##\s+.*$)/gim;
  const parts = markdown.split(sectionRegex).filter(Boolean);
  // parts: [ '', '## Overall Tier: ...', '...', '## Key Findings', '...', ... ]
  const sections: Record<string, string> = {};
  let current = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('##')) {
      current = part.replace(/^##\s*/, '').trim();
      // If it's 'Overall Tier: ...', treat as a special section
      if (current.toLowerCase().startsWith('overall tier:')) {
        sections['Overall Tier'] = part + (parts[i + 1] || '');
        i++;
      } else {
        sections[current] = part + (parts[i + 1] || '');
        i++;
      }
    }
  }
  return sections;
}

export default function ScorecardResultsDisplay({ reportMarkdown }: ScorecardResultsDisplayProps) {
  // Parse the report into sections
  const sections = useMemo(() => extractSections(reportMarkdown), [reportMarkdown]);
  const extractedTier = useMemo(() => {
    if (!sections['Overall Tier']) return null;
    const tierRegex = /^##\s*Overall Tier:\s*(.*)$/im;
    const match = sections['Overall Tier'].match(tierRegex);
    return match ? match[1].trim() : null;
  }, [sections]);

  // Card order for display
  const cardOrder = [
    'Overall Tier',
    'Key Findings',
    'Strategic Action Plan',
    'Getting Started & Resources',
    'Illustrative Benchmarks',
  ];

  // Card titles for display
  const cardTitles: Record<string, string> = {
    'Overall Tier': 'Your AI Tier',
    'Key Findings': 'Key Findings',
    'Strategic Action Plan': 'Strategic Action Plan',
    'Getting Started & Resources': 'Getting Started & Resources',
    'Illustrative Benchmarks': 'Illustrative Benchmarks',
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-0 py-10">
      {/* Header and Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-sg-dark-teal tracking-tight font-geist-sans mb-1">AI Efficiency Scorecard Report</h1>
          <div className="text-base md:text-lg text-gray-500 font-medium">Generated for your organization</div>
        </div>
        {/* Action bar placeholder */}
        <div className="flex gap-2 items-center min-h-[48px]">
          {/* Future: PDF, Share, etc. */}
          <button className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-gray-400 font-semibold cursor-not-allowed" disabled>Download PDF (coming soon)</button>
        </div>
      </div>
      {/* Card layout */}
      <div className="flex flex-col gap-6">
        {/* Overall Tier Card */}
        {sections['Overall Tier'] && (
          <div className="bg-gradient-to-br from-sg-mint-green/10 to-white border border-sg-mint-green/30 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-32 bg-sg-dark-teal/90 rounded-2xl shadow-lg">
              <span className="text-sg-mint-green text-4xl font-extrabold mb-2">{extractedTier || '?'}</span>
              <span className="text-white text-sm font-semibold uppercase tracking-wider">AI Tier</span>
            </div>
            <div className="flex-1">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  h2: () => null, // Hide the H2 in this card
                  p: ({node, ...props}) => <p className="text-lg text-sg-dark-teal font-semibold mb-2" {...props} />,
                }}
              >
                {sections['Overall Tier']}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {/* Other Cards */}
        {cardOrder.filter(key => key !== 'Overall Tier').map((key) => (
          sections[key] && (
            <div key={key} className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sg-dark-teal text-xl font-bold font-geist-sans tracking-tight">{cardTitles[key]}</span>
              </div>
              {/* Special layout for Key Findings: split Strengths/Weaknesses */}
              {key === 'Key Findings' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-sg-mint-green/10 border border-sg-mint-green/20 rounded-xl p-4">
                    <span className="block text-sg-dark-teal font-semibold mb-2">Strengths</span>
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h2: () => null,
                        strong: ({node, ...props}) => <strong className="font-semibold text-sg-dark-teal" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 text-gray-900" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-1" {...props} />,
                      }}
                    >
                      {/* Extract only Strengths bullet points */}
                      {sections[key].split('**Weaknesses:**')[0].replace(/^##\s*Key Findings\s*/i, '').replace('**Strengths:**', '').trim()}
                    </ReactMarkdown>
                  </div>
                  {/* Weaknesses */}
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <span className="block text-red-700 font-semibold mb-2">Weaknesses</span>
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h2: () => null,
                        strong: ({node, ...props}) => <strong className="font-semibold text-red-700" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 text-gray-900" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-1" {...props} />,
                      }}
                    >
                      {/* Extract only Weaknesses bullet points */}
                      {sections[key].split('**Weaknesses:**')[1]?.trim() || ''}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    h2: () => null,
                    a: ({node, ...props}) => <a className="text-sg-mint-green underline underline-offset-2 hover:opacity-80 transition-all font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-sg-dark-teal" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-sg-dark-teal/80" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 text-gray-900" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 text-gray-900" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    p: ({node, ...props}) => <p className="mb-1" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-sg-mint-green bg-sg-mint-green/10 pl-6 py-2 rounded-r-lg my-4 text-gray-800" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-t border-sg-dark-teal/20 my-8" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sg-dark-teal/90 text-sm" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto" {...props} />,
                  }}
                >
                  {sections[key]}
                </ReactMarkdown>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
} 