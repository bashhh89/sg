import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Enhanced history entry interface to include phase information and reasoning
export interface HistoryEntry {
  question: string;
  answer: any;
  phaseName?: string;
  answerType?: string;
  options?: string[] | null;
  reasoningText?: string | null;
}

export interface ScorecardResultsDisplayProps {
  reportMarkdown: string;
  questionAnswerHistory?: HistoryEntry[];
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

export default function ScorecardResultsDisplay({ reportMarkdown, questionAnswerHistory = [] }: ScorecardResultsDisplayProps) {
  // State to toggle display of Q&A history - default to collapsed but always present
  const [showQAHistory, setShowQAHistory] = useState(false);
  
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

  // Format answer for display - improved for better readability
  const formatAnswer = (answer: any): string => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    } else if (typeof answer === 'boolean') {
      return answer ? 'Yes' : 'No';
    } else if (typeof answer === 'number') {
      return answer.toString();
    } else if (typeof answer === 'object' && answer !== null) {
      try {
        return JSON.stringify(answer, null, 2);
      } catch (e) {
        return '[Complex Object]';
      }
    }
    return String(answer);
  };

  // Group Q&A history by phase using actual phase data when available
  const groupedHistory = useMemo(() => {
    const grouped: Record<string, Array<{ question: string; answer: any; index: number; answerType?: string; options?: string[] | null }>> = {};
    
    questionAnswerHistory.forEach((item, index) => {
      // Use provided phase name or fallback to placeholder
      const phase = item.phaseName || 'Assessment';
      
      if (!grouped[phase]) {
        grouped[phase] = [];
      }
      
      grouped[phase].push({
        ...item, 
        index
      });
    });
    
    return grouped;
  }, [questionAnswerHistory]);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-0 py-10">
      {/* Header and Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-sg-dark-teal tracking-tight font-geist-sans mb-1">AI Efficiency Scorecard Report</h1>
          <div className="text-base md:text-lg text-gray-500 font-medium">Generated for your organization</div>
        </div>
        {/* Action bar with Q&A history toggle */}
        <div className="flex gap-2 items-center min-h-[48px]">
          {questionAnswerHistory.length > 0 && (
            <button 
              onClick={() => setShowQAHistory(!showQAHistory)}
              className="bg-sg-dark-teal text-white rounded-lg px-4 py-2 font-semibold hover:bg-opacity-90 transition-colors"
            >
              {showQAHistory ? 'Hide Q&A History' : 'Show Q&A History'}
            </button>
          )}
          <button className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-gray-400 font-semibold cursor-not-allowed" disabled>Download PDF (coming soon)</button>
        </div>
      </div>

      {/* Question & Answer History Section - Always present but collapsible */}
      {questionAnswerHistory.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center">
              <span className="text-sg-dark-teal text-xl font-bold font-geist-sans tracking-tight">Assessment Q&A Breakdown</span>
              <span className="bg-sg-mint-green text-sg-dark-teal text-xs font-medium px-2 py-1 rounded-full ml-2">
                {questionAnswerHistory.length} Questions
              </span>
            </div>
            <button 
              onClick={() => setShowQAHistory(!showQAHistory)}
              className="text-sm font-medium text-sg-dark-teal hover:underline flex items-center"
            >
              {showQAHistory ? 'Collapse' : 'Expand'} 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`ml-1 transition-transform ${showQAHistory ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          
          {/* Collapsible content */}
          {showQAHistory && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div className="overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-sg-dark-teal/20 scrollbar-track-transparent">
                {/* Display history grouped by phases */}
                {Object.entries(groupedHistory).map(([phase, items]) => (
                  <div key={phase} className="mb-6 last:mb-0">
                    <div className="bg-sg-dark-teal text-white px-4 py-2 rounded-lg font-medium mb-3">
                      {phase} Phase
                    </div>
                    <div className="space-y-4">
                      {items.map((qa) => (
                        <div key={qa.index} className="border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 mb-4">
                          <div className="font-medium text-sg-dark-teal mb-2">
                            Q{qa.index + 1}: {qa.question}
                          </div>
                          <div className="pl-4 border-l-2 border-sg-mint-green">
                            <div className="text-gray-700 whitespace-pre-wrap break-words">
                              <span className="font-medium text-gray-600">Response:</span> {formatAnswer(qa.answer)}
                            </div>
                            
                            {/* Display answer type and options if available */}
                            {qa.answerType && (
                              <div className="mt-1 text-xs text-gray-500">
                                <span className="font-medium">Type:</span> {qa.answerType}
                                {qa.options && qa.options.length > 0 && (
                                  <span className="ml-2">
                                    <span className="font-medium">Options:</span> {qa.options.join(', ')}
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {/* Display AI reasoning if available */}
                            {qa.reasoningText && (
                              <div className="mt-3 pt-2 border-t border-gray-100">
                                <details className="group">
                                  <summary className="text-sm font-medium text-sg-dark-teal cursor-pointer hover:underline flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    AI Reasoning Process
                                  </summary>
                                  <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md italic whitespace-pre-wrap">
                                    {qa.reasoningText}
                                  </div>
                                </details>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* When collapsed, show preview of first few Q&As */}
          {!showQAHistory && questionAnswerHistory.length > 0 && (
            <div className="space-y-2">
              <div className="text-gray-600 text-sm mb-3">
                Preview of first 3 questions (click "Expand" to view all {questionAnswerHistory.length} questions)
              </div>
              
              {questionAnswerHistory.slice(0, 3).map((qa, idx) => (
                <div key={idx} className="border-b border-gray-100 py-2 last:border-0">
                  <div className="font-medium text-gray-700 text-sm">
                    Q{idx + 1}: {qa.question}
                  </div>
                  <div className="pl-3 border-l border-gray-200 text-gray-500 text-sm mt-1 truncate">
                    {formatAnswer(qa.answer).substring(0, 100)}{formatAnswer(qa.answer).length > 100 ? '...' : ''}
                  </div>
                  {qa.reasoningText && (
                    <div className="mt-1 ml-3 text-xs text-gray-400 italic">
                      <span className="inline-block w-4 h-4 bg-gray-100 rounded-full mr-1 align-middle text-center text-gray-500">i</span>
                      Includes AI reasoning
                    </div>
                  )}
                </div>
              ))}
              
              {questionAnswerHistory.length > 3 && (
                <div className="text-gray-500 italic text-sm pt-2">
                  + {questionAnswerHistory.length - 3} more questions...
                </div>
              )}
            </div>
          )}
        </div>
      )}

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