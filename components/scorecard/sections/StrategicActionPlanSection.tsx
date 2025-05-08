'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface StrategicActionPlanSectionProps {
  markdownContent: string;
}

const StrategicActionPlanSection: React.FC<StrategicActionPlanSectionProps> = ({ markdownContent }) => {
  // Remove the main heading
  const content = markdownContent.replace(/^##\s*Strategic Action Plan\s*\n+/i, '');

  return (
    <div className="space-y-6">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h2: () => null, // Already handled
          h3: () => null, // Handle numbered lists differently
          strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
          ul: ({node, ...props}) => <ul className="list-none space-y-4 text-gray-700" {...props} />,
          ol: ({node, ...props}) => <ol className="list-none space-y-6 md:space-y-8" {...props} />,
          li: ({node, children, index, ...props}) => {
            // Check if this is a top-level ordered list item by seeing if it starts with a number followed by a period
            const isTopLevelItem = React.Children.toArray(children)
              .some(child => {
                if (typeof child === 'string') {
                  return /^\d+\.\s+/.test(child);
                }
                return false;
              });

            if (isTopLevelItem) {
              // Extract the number for the top-level item
              let number = '';
              let content = children;
              
              React.Children.forEach(children, child => {
                if (typeof child === 'string') {
                  const match = child.match(/^(\d+)\.\s+(.*)/);
                  if (match) {
                    number = match[1];
                    // Replace the child with just the content part
                    content = match[2];
                  }
                }
              });
              
              return (
                <li className="bg-white border border-gray-100 rounded-xl p-6 shadow-md mb-8 relative" {...props}>
                  <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#68F6C8] text-[#004851] flex items-center justify-center rounded-full text-xl font-bold shadow-md">
                    {number}
                  </div>
                  <div className="ml-4 mt-2">
                    {content}
                  </div>
                </li>
              );
            }
            
            // Default list item styling for nested items
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

export default StrategicActionPlanSection; 