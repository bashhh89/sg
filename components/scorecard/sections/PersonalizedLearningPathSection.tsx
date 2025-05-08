'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface PersonalizedLearningPathSectionProps {
  markdownContent: string;
}

const PersonalizedLearningPathSection: React.FC<PersonalizedLearningPathSectionProps> = ({ markdownContent }) => {
  const content = markdownContent.replace(/^##\s*Your Personalized AI Learning Path\s*\n+/i, '')
                               .replace(/^##\s*Personalized Learning Path\s*\n+/i, ''); // Covering both possible titles

  return (
    <div className="space-y-6 md:space-y-8">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h2: () => null, // Main section title handled by header
          h3: ({node, children, ...props}) => (
            <div className="mb-1 md:mb-2" {...props}>
              <h3 className="text-lg md:text-xl font-bold text-[#004851]">
                {children}
              </h3>
            </div>
          ),
          p: ({node, children, ...props}) => {
            const textContent = React.Children.toArray(children).map(child => {
                if (typeof child === 'string') return child;
                 // @ts-ignore
                if (child && child.props && child.props.children) {
                    // @ts-ignore
                    return React.Children.toArray(child.props.children).flat().join('');
                }
                return '';
            }).join('');

            if (textContent.startsWith('_Why this is relevant for you:_')) {
              return (
                <p className="text-gray-700 italic text-sm md:text-base mb-2 md:mb-3" {...props}>
                  <span className="font-semibold not-italic text-gray-600">Why this is relevant for you:</span>
                  {textContent.replace('_Why this is relevant for you:_', '').trim()}
                </p>
              );
            }
            return <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3 md:mb-4" {...props}>{children}</p>;
          },
          a: ({node, children, href, ...props}) => {
            if (href && href.startsWith('/learning-hub')) {
              return (
                <div className="mt-3 md:mt-4 mb-4 md:mb-6">
                  <a 
                    href={href} 
                    className="inline-flex items-center gap-2 bg-[#68F6C8] text-[#004851] px-4 py-2.5 md:px-5 md:py-3 rounded-lg hover:bg-[#68F6C8]/90 transition-all font-semibold text-sm md:text-base shadow-sm hover:shadow-md"
                    target="_blank" rel="noopener noreferrer" 
                    {...props}
                  >
                    {children}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              );
            }
            return (
              <a 
                href={href}
                className="text-[#68F6C8] hover:text-[#004851]/80 underline underline-offset-2 hover:underline-offset-4 font-medium transition-colors"
                target="_blank" rel="noopener noreferrer" 
                {...props}
              >
                {children}
              </a>
            );
          },
          strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
          ul: ({node, ...props}) => <ul className="space-y-2 list-disc pl-5 text-gray-700 text-sm md:text-base" {...props} />,
          li: ({node, ...props}) => <li className="mb-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PersonalizedLearningPathSection; 