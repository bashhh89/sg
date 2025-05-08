'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface KeyFindingsSectionProps {
  markdownContent: string;
}

const KeyFindingsSection: React.FC<KeyFindingsSectionProps> = ({ markdownContent }) => {
  // Split markdown into strengths and weaknesses
  // Assuming weaknesses section always starts with "**Weaknesses:**"
  // and strengths are before that, under the "## Key Findings" heading.
  const parts = markdownContent.split(/\n\*\*Weaknesses:\*\*\n/i);
  const strengthsMarkdown = parts[0]
    .replace(/^##\s*Key Findings\s*\n+/i, '') // Remove "## Key Findings" heading
    .replace(/\*\*Strengths:\*\*\n/i, '')      // Remove "**Strengths:**" subheading
    .trim();
  const weaknessesMarkdown = parts[1] ? parts[1].trim() : '';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Strengths Card */}
      <div className="bg-gradient-to-br from-[#68F6C8]/20 to-transparent border border-[#68F6C8]/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-1.5 h-7 md:h-8 bg-[#68F6C8] rounded-full"></div>
          <h3 className="text-[#004851] font-bold text-lg md:text-xl">Strengths</h3>
        </div>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h2: () => null, // Already handled
            h3: () => null, // Already handled
            strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
            ul: ({node, ...props}) => <ul className="list-none space-y-2.5 md:space-y-3 text-gray-700" {...props} />,
            li: ({node, children, ...props}) => (
              <li className="flex items-start gap-2.5 md:gap-3" {...props}>
                <div className="mt-1.5 w-2 h-2 bg-[#68F6C8] rounded-full flex-shrink-0"></div>
                <span className="text-sm md:text-base">{children}</span>
              </li>
            ),
            p: ({node, ...props}) => <p className="mb-3 md:mb-4 text-gray-700 text-sm md:text-base" {...props} />,
          }}
        >
          {strengthsMarkdown}
        </ReactMarkdown>
      </div>
      
      {/* Weaknesses Card */}
      <div className="bg-gradient-to-br from-red-500/15 to-transparent border border-red-500/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-1.5 h-7 md:h-8 bg-red-400 rounded-full"></div>
          <h3 className="text-red-600 font-bold text-lg md:text-xl">Weaknesses</h3>
        </div>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h2: () => null, // Already handled
            h3: () => null, // Already handled
            strong: ({node, ...props}) => <strong className="font-semibold text-red-600" {...props} />,
            ul: ({node, ...props}) => <ul className="list-none space-y-2.5 md:space-y-3 text-gray-700" {...props} />,
            li: ({node, children, ...props}) => (
              <li className="flex items-start gap-2.5 md:gap-3" {...props}>
                <div className="mt-1.5 w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm md:text-base">{children}</span>
              </li>
            ),
            p: ({node, ...props}) => <p className="mb-3 md:mb-4 text-gray-700 text-sm md:text-base" {...props} />,
          }}
        >
          {weaknessesMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default KeyFindingsSection; 