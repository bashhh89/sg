'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface OverallTierSectionProps {
  markdownContent: string;
  extractedTier: string | null;
}

const OverallTierSection: React.FC<OverallTierSectionProps> = ({ markdownContent, extractedTier }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="relative flex-shrink-0">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#68F6C8] to-[#004851]/60 blur-xl rounded-full transform scale-110 z-0"></div>
        <div className="relative flex flex-col items-center justify-center w-64 h-64 bg-white rounded-full border-4 border-[#68F6C8] z-10 shadow-xl">
          <div className="text-center">
            <span className="text-[#004851] text-6xl font-black tracking-tighter">
              {extractedTier || '?'}
            </span>
            <span className="block text-gray-600 text-base font-medium uppercase tracking-widest mt-1">
              AI TIER
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-6 md:mt-0">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h2: () => null, // Hide the "Overall Tier:" title since we display it elsewhere
            p: ({node, ...props}) => <p className="text-gray-700 text-lg leading-relaxed mb-4" {...props} />,
          }}
        >
          {markdownContent.replace(/^##\s*Overall Tier:.*?\n+/im, '')} 
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default OverallTierSection; 