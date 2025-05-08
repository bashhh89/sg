'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface IllustrativeBenchmarksSectionProps {
  markdownContent: string;
}

const IllustrativeBenchmarksSection: React.FC<IllustrativeBenchmarksSectionProps> = ({ markdownContent }) => {
  const content = markdownContent.replace(/^##\s*Illustrative Benchmarks\s*\n+/i, '');

  return (
    <div className="space-y-8">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h2: () => null, // Already handled
          h3: ({node, children, ...props}) => (
            <h3 className="text-xl font-bold text-[#004851] mb-4 mt-6" {...props}>
              {children}
            </h3>
          ),
          strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
          ul: ({node, ...props}) => <ul className="space-y-4" {...props} />,
          li: ({node, children, ...props}) => {
            // Check if this is a benchmark item with bold title
            const hasBoldTitle = React.Children.toArray(children)
              .some(child => {
                // @ts-ignore
                return child?.type === 'strong' || 
                  (typeof child === 'string' && child.includes('**'));
              });

            if (hasBoldTitle) {
              return (
                <li className="bg-white border border-gray-100 rounded-xl p-6 shadow-md mb-4 hover:shadow-lg transition-all" {...props}>
                  {children}
                </li>
              );
            }
            
            // Default list item styling
            return (
              <li className="flex items-start gap-3" {...props}>
                <div className="mt-1.5 w-2 h-2 bg-[#68F6C8] rounded-full flex-shrink-0"></div>
                <span>{children}</span>
              </li>
            );
          },
          p: ({node, ...props}) => <p className="mb-4 text-gray-700" {...props} />,
          a: ({node, ...props}) => (
            <a 
              className="text-[#004851] font-medium underline hover:text-[#68F6C8] transition-colors" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default IllustrativeBenchmarksSection; 