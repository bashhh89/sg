'use client';

import React, { useState } from 'react';

interface QuestionAnswer {
  question: string;
  answer: string;
  answerSource?: string;
  reasoningText?: string;
  phaseName?: string;
}

interface AssessmentQABreakdownSectionProps {
  questionAnswerHistory: QuestionAnswer[];
}

const AssessmentQABreakdownSection: React.FC<AssessmentQABreakdownSectionProps> = ({ 
  questionAnswerHistory 
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  
  // Group questions by phase if available
  const questionsByPhase: Record<string, QuestionAnswer[]> = {};
  
  questionAnswerHistory.forEach(qa => {
    const phase = qa.phaseName || 'Other';
    if (!questionsByPhase[phase]) {
      questionsByPhase[phase] = [];
    }
    questionsByPhase[phase].push(qa);
  });

  // If no phases are available, just render all questions
  const hasPhases = Object.keys(questionsByPhase).length > 1;

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#004851] mb-3">Assessment Questions and Answers</h3>
        <p className="text-gray-600">Below is a breakdown of all questions from your assessment and the responses provided.</p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#f8faf9] to-[#e6fbf1] p-6 rounded-xl shadow-sm border border-[#e6fbf1]">
          <div className="text-3xl font-bold text-[#004851] mb-2">{questionAnswerHistory.length}</div>
          <div className="text-gray-600">Questions Answered</div>
        </div>
        <div className="bg-gradient-to-br from-[#f8faf9] to-[#e6fbf1] p-6 rounded-xl shadow-sm border border-[#e6fbf1]">
          <div className="text-3xl font-bold text-[#004851] mb-2">{Object.keys(questionsByPhase).length}</div>
          <div className="text-gray-600">Assessment Categories</div>
        </div>
        <div className="bg-gradient-to-br from-[#f8faf9] to-[#e6fbf1] p-6 rounded-xl shadow-sm border border-[#e6fbf1]">
          <div className="text-3xl font-bold text-[#004851] mb-2">100%</div>
          <div className="text-gray-600">Completion Rate</div>
        </div>
      </div>

      {hasPhases ? (
        // Render questions grouped by phase
        Object.entries(questionsByPhase).map(([phase, questions], phaseIndex) => (
          <div key={phase} className="mb-10">
            <h4 className="text-xl font-bold text-[#004851] mb-4 pb-2 border-b border-[#68F6C8]/30">{phase}</h4>
            <div className="space-y-4">
              {questions.map((qa, qaIndex) => {
                const globalIndex = questionAnswerHistory.findIndex(q => q === qa);
                return (
                  <div 
                    key={qaIndex} 
                    className={`border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 ${expandedQuestion === globalIndex ? 'ring-2 ring-[#68F6C8]/50' : ''}`}
                  >
                    <div 
                      className="flex items-start gap-3 p-5 cursor-pointer" 
                      onClick={() => toggleQuestion(globalIndex)}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68F6C8] flex items-center justify-center text-[#004851] font-bold mt-0.5">
                        {globalIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-[#004851]">{qa.question}</h5>
                        <p className="text-gray-700 mt-2 font-medium">
                          {typeof qa.answer === 'string' ? qa.answer : JSON.stringify(qa.answer)}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-gray-400">
                        {expandedQuestion === globalIndex ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {expandedQuestion === globalIndex && qa.reasoningText && (
                      <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-gray-50">
                        <div className="ml-11">
                          <p className="text-sm font-medium text-gray-500 mb-1">Assessment Reasoning:</p>
                          <p className="text-sm text-gray-600 whitespace-pre-line">{qa.reasoningText}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        // Render all questions without phases
        <div className="space-y-4">
          {questionAnswerHistory.length > 0 ? (
            questionAnswerHistory.map((qa, index) => (
              <div 
                key={index} 
                className={`border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 ${expandedQuestion === index ? 'ring-2 ring-[#68F6C8]/50' : ''}`}
              >
                <div 
                  className="flex items-start gap-3 p-5 cursor-pointer" 
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#68F6C8] flex items-center justify-center text-[#004851] font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-[#004851]">{qa.question}</h5>
                    <p className="text-gray-700 mt-2 font-medium">
                      {typeof qa.answer === 'string' ? qa.answer : JSON.stringify(qa.answer)}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-gray-400">
                    {expandedQuestion === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {expandedQuestion === index && qa.reasoningText && (
                  <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-gray-50">
                    <div className="ml-11">
                      <p className="text-sm font-medium text-gray-500 mb-1">Assessment Reasoning:</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{qa.reasoningText}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No assessment data available</h3>
              <p className="mt-1 text-gray-500">The assessment data could not be found or has not been generated yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentQABreakdownSection; 