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
  
  // Render the appropriate input based on answerType
  const renderAnswerInput = () => {
    switch (normalizedAnswerType) {
      case 'text':
        return (
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg mt-2 min-h-[100px] focus:ring-2 focus:ring-[#A6F4C5] focus:border-[#A6F4C5] text-gray-800 font-sans shadow-sm transition-all"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={isLoading}
          />
        );
      case 'radio':
        return (
          <div className="flex flex-col gap-3">
            {options?.map((option) => {
              const selected = currentAnswer === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => setCurrentAnswer(option)}
                  disabled={isLoading}
                  className={
                    `w-full flex items-center px-4 py-3 rounded-lg shadow-sm border-2 transition-all duration-150 text-base font-semibold ` +
                    (selected
                      ? 'bg-[#A6F4C5] border-[#A6F4C5] text-[#0a3d3d] scale-[1.03]'
                      : 'bg-white border-gray-200 text-gray-800 hover:bg-[#0a3d3d] hover:text-white hover:border-[#A6F4C5]')
                  }
                  style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                  <span className="mr-3">
                    <span className={
                      `inline-block w-4 h-4 rounded-full border-2 align-middle mr-1 ` +
                      (selected
                        ? 'bg-[#0a3d3d] border-[#0a3d3d]'
                        : 'bg-white border-[#A6F4C5]')
                    }></span>
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex flex-col gap-3">
            {options?.map((option) => {
              const checked = (currentAnswer as string[]).includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => {
                    if (checked) {
                      setCurrentAnswer((prev: string[]) => prev.filter(item => item !== option));
                    } else {
                      setCurrentAnswer((prev: string[]) => [...prev, option]);
                    }
                  }}
                  disabled={isLoading}
                  className={
                    `w-full flex items-center px-4 py-3 rounded-lg shadow-sm border-2 transition-all duration-150 text-base font-semibold ` +
                    (checked
                      ? 'bg-[#A6F4C5] border-[#A6F4C5] text-[#0a3d3d] scale-[1.03]'
                      : 'bg-white border-gray-200 text-gray-800 hover:bg-[#0a3d3d] hover:text-white hover:border-[#A6F4C5]')
                  }
                  style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                  <span className="mr-3">
                    <span className={
                      `inline-block w-4 h-4 rounded border-2 align-middle mr-1 ` +
                      (checked
                        ? 'bg-[#0a3d3d] border-[#0a3d3d]'
                        : 'bg-white border-[#A6F4C5]')
                    }></span>
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        );
      case 'scale':
        return (
          <div className="flex justify-center gap-3 mt-2">
            {options?.map((option) => {
              const selected = currentAnswer === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => setCurrentAnswer(option)}
                  disabled={isLoading}
                  className={
                    `flex items-center justify-center px-4 py-2 rounded-lg shadow-sm border-2 transition-all duration-150 text-base font-semibold min-w-[48px] ` +
                    (selected
                      ? 'bg-[#A6F4C5] border-[#A6F4C5] text-[#0a3d3d] scale-[1.07]'
                      : 'bg-white border-gray-200 text-gray-800 hover:bg-[#0a3d3d] hover:text-white hover:border-[#A6F4C5]')
                  }
                  style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        );
      default:
        return <p style={{ color: 'red', marginTop: '10px' }}>Error: Unsupported answer type '{normalizedAnswerType}'</p>;
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
      <div style={{ marginBottom: '1.5rem', padding: '12px', border: '1px dashed #cbd5e0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem', color: '#4a5568' }}>
          <span style={{ marginRight: '4px' }}>🧪</span> Testing Tools (Internal Use Only)
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ marginRight: '10px', fontSize: '0.9rem', color: '#666' }}>
            Select Test Persona Tier:
          </label>
          <select
            value={testPersonaTier}
            onChange={(e) => setTestPersonaTier(e.target.value as 'Dabbler' | 'Enabler' | 'Leader')}
            disabled={isAutoCompleting || isLoading}
            style={{
              padding: '0.4rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              color: '#333',
              cursor: isAutoCompleting || isLoading ? 'not-allowed' : 'pointer',
              opacity: isAutoCompleting || isLoading ? 0.6 : 1
            }}
          >
            <option value="Dabbler">Dabbler</option>
            <option value="Enabler">Enabler</option>
            <option value="Leader">Leader</option>
          </select>
        </div>
        
        <div style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '10px', fontStyle: 'italic' }}>
          Note: Auto-complete is for testing purposes only. It simulates answers based on selected persona tier.
        </div>
        
        {/* Auto-Complete Button for Testing */}
        <button
          onClick={handleStartAutoComplete}
          disabled={isAutoCompleting || isLoading}
          style={{
            background: '#f59e42',
            color: '#fff',
            fontSize: '0.9rem',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            marginBottom: '0.5rem',
            width: '100%',
            display: isAutoCompleting ? 'none' : 'block',
            opacity: isAutoCompleting || isLoading ? 0.6 : 1,
            cursor: isAutoCompleting || isLoading ? 'not-allowed' : 'pointer',
            border: 'none',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
          }}
        >
          {isAutoCompleting ? 'Auto-Completing...' : 'Auto-Complete Assessment (Testing Only)'}
        </button>
        
        {/* Emergency Stop Button - only shown during auto-complete */}
        {isAutoCompleting && (
          <button
            onClick={() => {
              setIsAutoCompleting(false);
              setAutoCompleteError('Auto-complete manually stopped by user');
            }}
            style={{
              background: '#e53e3e',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              width: '100%',
              border: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}
          >
            <span style={{ marginRight: '6px' }}>⚠️</span> Stop Auto-Complete
          </button>
        )}
        
        {/* Auto-Complete Status - show count during auto-complete */}
        {isAutoCompleting && (
          <div style={{
            padding: '8px 12px',
            background: '#f7fafc',
            borderRadius: '6px',
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: '#4a5568',
            border: '1px dashed #cbd5e0',
            textAlign: 'center'
          }}>
            Auto-completing: {autoCompleteCount} questions processed
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 24px 0 rgba(10,61,61,0.10)' }}>
        <tbody>
          <tr>
            <td style={{ width: '170px', backgroundColor: '#0a3d3d', color: 'white', verticalAlign: 'top', padding: '20px 10px', borderRadius: '18px', boxShadow: '0 2px 12px 0 rgba(10,61,61,0.08)' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', letterSpacing: '0.02em', fontSize: '1.1rem', color: '#A6F4C5' }}>
                Assessment Phases
              </div>
              <div className="flex flex-col items-center w-full relative" style={{ minHeight: '320px' }}>
                {assessmentPhases.map((phase, idx) => {
                  const isCurrent = phase === currentPhaseName;
                  const currentIdx = assessmentPhases.indexOf(currentPhaseName);
                  const isPast = idx < currentIdx;
                  const isFuture = idx > currentIdx;
                  return (
                    <div key={phase} className="flex flex-col items-center w-full relative">
                      {/* Timeline circle */}
                      <div className={
                        `flex items-center justify-center rounded-full border-2 transition-all duration-200 mb-1 ` +
                        (isCurrent
                          ? 'bg-[#A6F4C5] border-[#A6F4C5] w-6 h-6 shadow-lg'
                          : isPast
                            ? 'bg-[#A6F4C5] border-[#A6F4C5] w-5 h-5'
                            : 'bg-transparent border-[#A6F4C5] w-5 h-5')
                      }>
                        {isPast && (
                          <span className="block w-2 h-2 bg-[#0a3d3d] rounded-full"></span>
                        )}
                        {isCurrent && (
                          <span className="block w-2.5 h-2.5 bg-[#0a3d3d] rounded-full"></span>
                        )}
                      </div>
                      {/* Timeline line (except after last step) */}
                      {idx < assessmentPhases.length - 1 && (
                        <div className="w-1 bg-[#A6F4C5]" style={{ height: '36px', minHeight: '36px' }}></div>
                      )}
                      {/* Phase name */}
                      <span className={
                        `mt-1 mb-4 text-center transition-all duration-200 block ` +
                        (isCurrent
                          ? 'font-bold text-[#A6F4C5] text-base drop-shadow'
                          : isPast
                            ? 'text-white opacity-90 text-base'
                            : 'text-white opacity-60 text-base')
                      }>
                        {phase}
                      </span>
                    </div>
                  );
                })}
              </div>
            </td>
            <td style={{ width: '275px', verticalAlign: 'top', padding: '20px', borderRight: '1px solid #e5e7eb', background: 'white' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px', color: '#0a3d3d', fontWeight: 600, fontSize: '1.08rem', letterSpacing: '0.01em' }}>
                AI Thinking Process
              </div>
              {reasoningText ? (
                <div style={{
                  padding: '18px',
                  backgroundColor: '#0a3d3d',
                  color: 'white',
                  fontStyle: 'italic',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 12px 0 rgba(10,61,61,0.10)',
                  border: '2px solid #A6F4C5',
                  height: '200px',
                  maxHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#A6F4C5', fontStyle: 'normal', fontSize: '1.08rem' }}>
                    <span style={{ marginRight: '4px' }}>💭</span> AI Reasoning:
                  </div>
                  <div style={{
                    overflowY: 'auto',
                    width: '100%',
                    height: '160px',
                    paddingRight: '8px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#A6F4C5 #0a3d3d'
                  }}>
                    {displayedText}
                    {!isComplete && <span style={{ marginLeft: '4px' }}>▋</span>}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30px',
                    background: 'linear-gradient(to bottom, transparent, #0a3d3d)',
                    pointerEvents: 'none'
                  }}></div>
                </div>
              ) : (
                <div style={{
                  padding: '18px',
                  backgroundColor: '#f5f7f7',
                  color: '#666',
                  fontStyle: 'italic',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '8px',
                  border: '1px dashed #ccc'
                }}>
                  AI thinking process will appear here...
                </div>
              )}
            </td>
            <td style={{ verticalAlign: 'top', padding: '28px 24px 24px 24px', background: 'white' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#0a3d3d', fontSize: '1.15rem' }}>
                {currentPhaseName} Phase
              </div>
              <div style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '15px' }}>
                Question {currentQuestionNumber} of ~{maxQuestions}
              </div>
              <div style={{ marginBottom: '20px', color: '#222', fontSize: '1.08rem' }}>
                {question}
              </div>
              <div style={{ marginBottom: '24px' }}>
                {renderAnswerInput()}
              </div>
              {/* Test Persona Selector */}
              {renderTestPersonaTierSelector()}
              <button
                data-testid="scorecard-submit-btn"
                onClick={() => onSubmitAnswer(currentAnswer, 'Manual')}
                disabled={isSubmitDisabled}
                className={
                  `w-full py-3 px-6 rounded-lg font-bold text-lg shadow-md transition-all duration-150 ` +
                  (isSubmitDisabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                    : 'bg-[#A6F4C5] text-[#0a3d3d] hover:bg-[#7be6a7] hover:scale-[1.03] active:scale-100')
                }
                style={{ letterSpacing: '0.01em' }}
              >
                {isLoading ? 'Submitting...' : 'Submit Answer'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ScorecardQuestionDisplay);