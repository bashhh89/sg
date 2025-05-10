import React, { useState, useEffect, useMemo } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

// Add interface for history entries needed for AI-driven answers
interface HistoryEntry {
  question: string;
  answer: any;
  phaseName?: string;
  answerType?: string;
  options?: string[] | null;
}

// Update prop type for onSubmitAnswer
type AnswerSourceType = 'Groq Llama 3 8B' | 'Pollinations Fallback' | 'Groq API Failed' | 'Fallback Failed' | 'Manual';
interface ScorecardQuestionDisplayProps {
  question: string;
  answerType: string; // 'text', 'single-choice', 'multiple-choice', 'scale'
  options: string[] | null;
  onSubmitAnswer: (answer: any, answerSource?: AnswerSourceType) => void; // Callback to submit the answer
  isLoading: boolean; // To disable inputs/button during API calls
  currentPhaseName: string; // To display phase info later
  currentQuestionNumber: number; // e.g., 1, 2, 3...
  maxQuestions: number; // The total expected questions (~20)
  assessmentPhases: string[]; // Array of phase names for timeline display
  reasoningText?: string; // Added reasoning text prop
  isAutoCompleting: boolean;
  setIsAutoCompleting: (val: boolean) => void;
  setAutoCompleteError: (msg: string | null) => void;
  handleStartAutoComplete: () => void;
  overallStatus: string;
  questionAnswerHistory?: HistoryEntry[]; // History for AI context
  industry: string;
}

const ScorecardQuestionDisplay: React.FC<ScorecardQuestionDisplayProps> = ({
  question,
  answerType,
  options,
  onSubmitAnswer,
  isLoading,
  currentPhaseName,
  currentQuestionNumber,
  maxQuestions,
  assessmentPhases,
  reasoningText,
  isAutoCompleting,
  setIsAutoCompleting,
  setAutoCompleteError,
  handleStartAutoComplete,
  overallStatus,
  questionAnswerHistory = [], // Default to empty array
  industry
}) => {
  // Add state for test persona tier
  const [testPersonaTier, setTestPersonaTier] = useState<'Dabbler' | 'Enabler' | 'Leader'>('Enabler');
  
  // Add a function to map between API answerType and component answerType
  const normalizeAnswerType = (apiAnswerType: string): string => {
    // Handle null or undefined
    if (!apiAnswerType) return 'text';
    
    const type = apiAnswerType.toLowerCase();
    
    if (type === 'radio') return 'radio';
    if (type === 'checkbox') return 'checkbox';
    if (type === 'scale') return 'scale';
    if (type === 'text') return 'text';
    
    // Handle possible mismatches between API and component
    if (type === 'single-choice') return 'radio';
    if (type === 'multiple-choice') return 'checkbox';
    
    return 'text'; // Default to text input if unknown
  };

  // Normalize the answerType for component use
  const normalizedAnswerType = normalizeAnswerType(answerType);
  
  // State to hold the user's current answer before submission
  const [currentAnswer, setCurrentAnswer] = useState<any>(normalizedAnswerType === 'checkbox' ? [] : '');
  
  // Use the typing effect for reasoning text
  const { displayedText, isComplete } = useTypingEffect(reasoningText, 30);
  
  // Reset the answer when the question or answer type changes
  useEffect(() => {
    if (normalizedAnswerType === 'checkbox') {
      setCurrentAnswer([]); // Reset to empty array for checkboxes
    } else {
      setCurrentAnswer(''); // Reset to empty string for text, radio, scale
    }
  }, [question, normalizedAnswerType]);
  
  // Handle checkbox answers (multiple-choice)
  const handleMultiChoiceChange = (option: string, checked: boolean) => {
    setCurrentAnswer((prev: string[]) => {
      if (checked) {
        return [...prev, option]; // Add option
      } else {
        return prev.filter(item => item !== option); // Remove option
      }
    });
  };
  
  // Update the checkbox/radio rendering to use grid layout
  const renderAnswerInput = () => {
    switch (normalizedAnswerType) {
      case 'text':
        return (
          <textarea
            className="w-full p-4 border border-gray-200 rounded-lg mt-3 min-h-[120px] focus:ring-2 focus:ring-sg-bright-green focus:border-sg-bright-green text-sg-dark-teal font-plus-jakarta shadow-sm transition-all"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={isLoading}
          />
        );
      case 'radio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {options?.map((option) => {
              const selected = currentAnswer === option;
              return (
                <div 
                  key={option}
                  className={`sg-answer-option ${selected ? 'selected' : ''}`}
                  onClick={() => !isLoading && setCurrentAnswer(option)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${selected ? 'border-sg-bright-green bg-white' : 'border-gray-300'}`}>
                    {selected && (
                      <div className="w-3 h-3 rounded-full bg-sg-bright-green"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              );
            })}
          </div>
        );
      case 'checkbox':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {options?.map((option) => {
              const checked = (currentAnswer as string[]).includes(option);
              return (
                <div 
                  key={option}
                  className={`sg-answer-option ${checked ? 'selected' : ''}`}
                  onClick={() => {
                    if (!isLoading) {
                      if (checked) {
                        setCurrentAnswer((prev: string[]) => prev.filter(item => item !== option));
                      } else {
                        setCurrentAnswer((prev: string[]) => [...prev, option]);
                      }
                    }
                  }}
                >
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${checked ? 'border-sg-bright-green bg-white' : 'border-gray-300'}`}>
                    {checked && (
                      <svg className="w-3 h-3 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              );
            })}
          </div>
        );
      case 'scale':
        return (
          <div className="my-6">
            <div className="flex justify-between mb-2 text-sm text-sg-dark-teal/70">
              <span>Not at all</span>
              <span>Very much</span>
            </div>
            <div className="flex justify-between gap-2">
              {options?.map((option) => {
                const selected = currentAnswer === option;
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setCurrentAnswer(option)}
                    disabled={isLoading}
                    className={`
                      relative flex-1 h-14 rounded-lg transition-all duration-200 font-semibold text-lg
                      ${selected 
                        ? 'bg-sg-bright-green text-white shadow-md transform -translate-y-1' 
                        : 'bg-white border border-gray-200 text-sg-dark-teal hover:bg-sg-light-mint hover:border-sg-bright-green/50'}
                    `}
                  >
                    {option}
                    {selected && (
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-sm font-normal">
                        <svg className="w-5 h-5 text-sg-bright-green mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
            <p>Error: Unsupported answer type '{normalizedAnswerType}'</p>
          </div>
        );
    }
  };
  
  // Determine if the submit button should be disabled
  const isAnswerValid = () => {
    // Handle different answer types
    if (normalizedAnswerType === 'checkbox') {
      // Check if it's an array and has items
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    } else if (normalizedAnswerType === 'radio') {
      // For radio, just check if it's not an empty string
      return typeof currentAnswer === 'string' && currentAnswer !== '';
    } else if (normalizedAnswerType === 'scale') {
      // For scale, just check if it's not an empty string
      return typeof currentAnswer === 'string' && currentAnswer !== '';
    } else if (normalizedAnswerType === 'text') {
      // For text, check if it's a string and not empty after trimming
      return typeof currentAnswer === 'string' && currentAnswer.trim() !== '';
    }
    // Default to invalid if type is unexpected
    return false;
  };
  
  // Only disable if loading or answer is invalid, NOT if overallStatus is completed but question is present
  const isSubmitDisabled = isLoading || !isAnswerValid() || !question;
  
  // Add local state for visual cue
  const [isAutoAnswering, setIsAutoAnswering] = useState(false);
  const [autoCompleteCount, setAutoCompleteCount] = useState(0);
  
  // Add local loading state for auto-complete
  const [isLoadingLocally, setIsLoadingLocally] = useState(false);
  
  // Robust auto-complete useEffect pattern
  useEffect(() => {
    if (isAutoCompleting && question && answerType && !isLoadingLocally && !isLoading) {
      // Check if we've reached or are about to reach the maximum number of questions
      // We check against maxQuestions - 1 because the current question being displayed
      // will be the final question when questionAnswerHistory.length is maxQuestions - 1
      if (questionAnswerHistory.length >= maxQuestions - 1) {
        console.log(`Auto-complete stopped: Reached ${questionAnswerHistory.length} questions out of max ${maxQuestions}`);
        setIsAutoCompleting(false);
        return;
      }
      
      if (autoCompleteCount >= 30) {
        setIsAutoCompleting(false);
        setAutoCompleteError('Auto-complete reached maximum question limit (30)');
        return;
      }
      handleSingleAutoAnswerAndSubmit();
    }
    // eslint-disable-next-line
  }, [isAutoCompleting, question, answerType]);
  
  // Single-step auto-answer and submit using Groq API
  const handleSingleAutoAnswerAndSubmit = async () => {
    setIsLoadingLocally(true);
    let currentAnswerSource: AnswerSourceType = 'Groq API Failed';
    try {
      const groqSystemPrompt = `You are simulating an answer from a Marketing Manager at the '${testPersonaTier}' level of AI adoption within the '${industry}' industry. Answer the following question concisely and appropriately for your persona, based *only* on the question itself. Provide ONLY the answer value. Format correctly based on Answer Type. Be plausible and professional.`;
      const userMessage = `Question: ${question}\nAnswer Type: ${answerType}\nAvailable Options (if applicable): ${JSON.stringify(options)}\nInstructions: For single-choice, output the chosen option text. For multiple-choice, output a JSON array with ONE relevant chosen option string. For text, provide ONE concise, relevant sentence in character. For scale (1-5), output a number appropriate for persona (Dabbler 1-2, Enabler 2-4, Leader 4-5).`;
      let generatedAnswer = '';
      let groqFailed = false;
      try {
        const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqApiKey}`
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: groqSystemPrompt },
              { role: 'user', content: userMessage }
            ],
            model: 'llama3-8b-8192'
          })
        });
        if (!groqResponse.ok) {
          groqFailed = true;
        } else {
          const groqData = await groqResponse.json();
          generatedAnswer = groqData.choices?.[0]?.message?.content?.trim() || '';
          if (!generatedAnswer) groqFailed = true;
          else currentAnswerSource = 'Groq Llama 3 8B';
        }
      } catch (err) {
        groqFailed = true;
      }
      // Fallback to Pollinations if Groq fails
      if (groqFailed) {
        try {
          const pollinationPrompt = `Simulate answer: Persona='${testPersonaTier}' Marketing Mgr, Industry='${industry}'. Q: ${question}. Type: ${answerType}. Options: ${JSON.stringify(options)}. Provide ONLY the concise answer value.`;
          const pollResponse = await fetch('https://text.pollinations.ai/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: "openai-large",
              messages: [
                { role: "system", content: "You provide concise simulated answers based on persona and question." },
                { role: "user", content: pollinationPrompt }
              ]
            }),
          });
          if (!pollResponse.ok) throw new Error('Pollinations API error');
          const pollData = await pollResponse.json();
          generatedAnswer = pollData.choices?.[0]?.message?.content?.trim() || '';
          if (!generatedAnswer) throw new Error('Pollinations returned empty answer');
          currentAnswerSource = 'Pollinations Fallback';
        } catch (pollErr) {
          currentAnswerSource = 'Fallback Failed';
          setAutoCompleteError('Both Groq and Pollinations answer generation failed.');
          setIsAutoCompleting(false);
          setIsLoadingLocally(false);
          return;
        }
      }
      setCurrentAnswer(generatedAnswer);
      setTimeout(async () => {
        try {
          await onSubmitAnswer(generatedAnswer, currentAnswerSource);
          setAutoCompleteCount(prev => prev + 1);
        } catch (submitErr) {
          setAutoCompleteError('Error during answer submission.');
          setIsAutoCompleting(false);
        } finally {
          setIsLoadingLocally(false);
        }
      }, 500);
    } catch (error) {
      setAutoCompleteError('AI answer generation failed.');
      setIsAutoCompleting(false);
      setIsLoadingLocally(false);
    }
  };
  
  // Test Persona Tier Selector
  const renderTestPersonaTierSelector = () => {
    return (
      <select
        value={testPersonaTier}
        onChange={(e) => setTestPersonaTier(e.target.value as 'Dabbler' | 'Enabler' | 'Leader')}
        disabled={isAutoCompleting || isLoading}
        className="text-sm border border-sg-bright-green/30 text-sg-dark-teal bg-sg-cream-1 rounded-lg focus:ring-sg-bright-green focus:border-sg-bright-green py-2 px-3"
      >
        <option value="Dabbler">Test: Dabbler</option>
        <option value="Enabler">Test: Enabler</option>
        <option value="Leader">Test: Leader</option>
      </select>
    );
  };
  
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6">
      <div className="lg:w-2/3">
        {/* Question Display */}
        <div className="mb-8 relative">
          <div className="absolute -left-10 top-0 flex items-center justify-center rounded-full w-8 h-8 bg-sg-bright-green text-white font-semibold">
            {currentQuestionNumber}
          </div>
          <h3 className="text-xl font-semibold text-sg-dark-teal mb-2">{question}</h3>
          <div className="text-sm text-sg-dark-teal/70 mb-4">
            Select the option that best describes your organization's current situation
          </div>
          {renderAnswerInput()}
        </div>

        {/* Submit and Auto-Complete Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <button
            type="button"
            onClick={() => onSubmitAnswer(currentAnswer)}
            disabled={isSubmitDisabled}
            className={`sg-button-primary flex items-center justify-center ${
              isSubmitDisabled
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Submit Answer
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          
          {/* Auto-Complete Section */}
          {!isAutoCompleting && !isLoading && currentQuestionNumber < maxQuestions && (
            <div className="flex items-center">
              {renderTestPersonaTierSelector()}
              <button
                onClick={handleStartAutoComplete}
                className="ml-2 sg-button-secondary text-sm px-4 py-2 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Auto-Complete
              </button>
            </div>
          )}
          
          {/* Auto-Complete in Progress UI */}
          {isAutoCompleting && !isLoading && (
            <div className="flex items-center p-3 bg-sg-light-mint rounded-lg">
              <span className="flex items-center text-sm text-sg-dark-teal">
                <svg className="animate-spin mr-2 h-4 w-4 text-sg-bright-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Auto-completing ({autoCompleteCount}/{maxQuestions - questionAnswerHistory.length})
              </span>
              <button
                onClick={() => setIsAutoCompleting(false)}
                className="ml-3 px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition-all text-sm font-medium"
              >
                Stop
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Reasoning Display - Now on the right side */}
      {reasoningText && (
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="sticky top-4 p-5 bg-sg-bright-green/10 border-l-4 border-sg-bright-green rounded-lg shadow-sm transition-all">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-sg-bright-green/20 mr-2">
                <svg className="w-5 h-5 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-base font-medium text-sg-dark-teal">AI Analysis</h4>
            </div>
            <div className="text-sm text-sg-dark-teal/80 prose prose-sm max-w-none whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2">
              {displayedText}
              {!isComplete && <span className="animate-pulse text-sg-bright-green">_</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ScorecardQuestionDisplay);