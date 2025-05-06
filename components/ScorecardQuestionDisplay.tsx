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
            className="w-full p-2 border rounded mt-2 min-h-[100px] focus:ring-sg-mint-green focus:border-sg-mint-green"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={isLoading}
          />
        );
      case 'single-choice':
        return (
          <div className="space-y-2 mt-2">
            {options?.map((option) => (
              <label key={option} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="single-choice-answer"
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  disabled={isLoading}
                  className="text-sg-mint-green focus:ring-sg-mint-green"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'multiple-choice':
        return (
          <div className="space-y-2 mt-2">
            {options?.map((option) => (
              <label key={option} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={(currentAnswer as string[]).includes(option)}
                  onChange={(e) => handleMultiChoiceChange(option, e.target.checked)}
                  disabled={isLoading}
                  className="text-sg-mint-green rounded focus:ring-sg-mint-green"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'scale':
        return (
          <div className="flex space-x-2 mt-2 justify-center">
            {options?.map((option) => (
              <label 
                key={option} 
                className={`flex items-center justify-center p-2 border rounded min-w-[40px] cursor-pointer transition-colors
                  ${currentAnswer === option ? 'bg-sg-mint-green text-sg-dark-teal font-bold' : 'hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name="scale-answer"
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  disabled={isLoading}
                  className="sr-only" // Hide the actual radio button, style the label
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return <p className="text-red-500 mt-2">Error: Unsupported answer type '{answerType}'</p>;
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
    <div className="w-full max-w-7xl mx-auto border rounded-lg shadow-md overflow-hidden">
      {/* Progress bar at the top */}
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-sg-mint-green h-2"
          style={{ width: `${(currentQuestionNumber / maxQuestions) * 100}%` }}
        ></div>
      </div>
      
      {/* Main content area with three columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
        {/* Column 1: Timeline/Phases sidebar */}
        <div className="md:col-span-1 border-r border-gray-200 pr-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-4">Assessment Phases</h3>
          <ul className="space-y-4">
            {assessmentPhases.map((phase, index) => {
              // Determine if this phase is active, completed, or pending
              const isActive = phase === currentPhaseName;
              // We consider a phase completed if it's before the current phase
              const isCompleted = assessmentPhases.indexOf(phase) < assessmentPhases.indexOf(currentPhaseName);
              
              return (
                <li key={phase} className="flex items-center">
                  {/* Phase indicator dot */}
                  <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 
                    ${isActive ? 'bg-sg-mint-green' : isCompleted ? 'bg-gray-400' : 'bg-gray-200'}`}>
                  </div>
                  
                  {/* Phase name */}
                  <span className={`text-sm 
                    ${isActive ? 'font-bold text-sg-dark-teal' : isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
                    {phase}
                  </span>
                  
                  {/* Show connector line for all except the last phase */}
                  {index < assessmentPhases.length - 1 && (
                    <div className="absolute ml-2 w-0.5 bg-gray-200 h-8 mt-6"></div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* Column 2: AI Thinking display */}
        <div className="md:col-span-1">
          <h3 className="text-sm font-semibold text-gray-500 mb-4">AI Processing</h3>
          {reasoningText && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-100 text-sky-800 italic text-sm shadow-md">
              <span className="font-semibold text-sky-800">AI thinking... </span> 
              {displayedText}
              {!isComplete && <span className="ml-1 animate-pulse">▋</span>}
            </div>
          )}
        </div>
        
        {/* Column 3: Question and answer area */}
        <div className="md:col-span-3">
          {/* Question header with phase info and progress indicator */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-sg-dark-teal">
              {currentPhaseName} Phase
            </h2>
            <p className="text-sm text-gray-500">
              Question {currentQuestionNumber} of ~{maxQuestions}
            </p>
          </div>
          
          {/* Question text */}
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="font-medium">{question}</p>
          </div>
          
          {/* Dynamic answer input area */}
          <div className="mb-6">
            <div className="p-4 border border-gray-200 rounded-md">
              {renderAnswerInput()}
            </div>
          </div>
          
          {/* Submit button */}
          <button
            onClick={() => onSubmitAnswer(currentAnswer)}
            disabled={isSubmitDisabled}
            className="py-3 px-6 bg-sg-mint-green text-sg-dark-teal font-semibold rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit Answer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScorecardQuestionDisplay; 