import React, { useState, useEffect } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

interface ScorecardQuestionDisplayProps {
  question: string;
  answerType: string; // 'text', 'single-choice', 'multiple-choice', 'scale'
  options: string[] | null;
  onSubmitAnswer: (answer: any) => void; // Callback to submit the answer
  isLoading: boolean; // To disable inputs/button during API calls
  currentPhaseName: string; // To display phase info later
  currentQuestionNumber: number; // e.g., 1, 2, 3...
  maxQuestions: number; // The total expected questions (~20)
  assessmentPhases: string[]; // Array of phase names for timeline display
  reasoningText?: string; // Added reasoning text prop
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
  reasoningText
}) => {
  // State to hold the user's current answer before submission
  const [currentAnswer, setCurrentAnswer] = useState<any>(answerType === 'multiple-choice' ? [] : '');
  
  // Use the typing effect for reasoning text
  const { displayedText, isComplete } = useTypingEffect(reasoningText, 30);
  
  // Reset the answer when the question or answer type changes
  useEffect(() => {
    if (answerType === 'multiple-choice') {
      setCurrentAnswer([]); // Reset to empty array for checkboxes
    } else {
      setCurrentAnswer(''); // Reset to empty string for text, radio, scale
    }
  }, [question, answerType]);
  
  // Handle multiple-choice answers (checkboxes)
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
    switch (answerType) {
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
      case 'single-choice':
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
      case 'multiple-choice':
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
        return <p style={{ color: 'red', marginTop: '10px' }}>Error: Unsupported answer type '{answerType}'</p>;
    }
  };
  
  // Determine if the submit button should be disabled
  const isAnswerValid = () => {
    if (answerType === 'multiple-choice') {
      // Check if it's an array and has items
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    } else if (typeof currentAnswer === 'string') {
      // Check if it's a non-empty string after trimming
      return currentAnswer.trim() !== '';
    }
    // Default to invalid if type is unexpected
    return false;
  };
  
  const isSubmitDisabled = isLoading || !isAnswerValid();
  
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
                AI Processing
              </div>
              {reasoningText && (
                <div style={{
                  padding: '18px',
                  backgroundColor: '#0a3d3d',
                  color: 'white',
                  fontStyle: 'italic',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  boxShadow: '0 2px 12px 0 rgba(10,61,61,0.10)',
                  border: '2px solid #A6F4C5',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#A6F4C5', fontStyle: 'normal', fontSize: '1.08rem' }}>
                    AI thinking...
                  </div>
                  {displayedText}
                  {!isComplete && <span style={{ marginLeft: '4px' }}>▋</span>}
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
              <button
                onClick={() => onSubmitAnswer(currentAnswer)}
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

export default ScorecardQuestionDisplay; 