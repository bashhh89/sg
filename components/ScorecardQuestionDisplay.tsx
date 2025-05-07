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
  isAutoCompleting: boolean;
  setIsAutoCompleting: (val: boolean) => void;
  setAutoCompleteError: (msg: string | null) => void;
  handleStartAutoComplete: () => void;
  overallStatus: string;
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
  overallStatus
}) => {
  // Add state for test persona tier
  const [testPersonaTier, setTestPersonaTier] = useState<'Dabbler' | 'Enabler' | 'Leader'>('Enabler');
  
  // Add a function to map between API answerType and component answerType
  const normalizeAnswerType = (apiAnswerType: string): string => {
    console.log('Normalizing API answer type:', apiAnswerType);
    
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
    
    console.log('Unknown answer type, defaulting to text:', apiAnswerType);
    return 'text'; // Default to text input if unknown
  };

  // Normalize the answerType for component use
  const normalizedAnswerType = normalizeAnswerType(answerType);
  
  // State to hold the user's current answer before submission
  const [currentAnswer, setCurrentAnswer] = useState<any>(normalizedAnswerType === 'checkbox' ? [] : '');
  
  // Use the typing effect for reasoning text
  const { displayedText, isComplete } = useTypingEffect(reasoningText, 30);
  
  // Log reasoning text for debugging
  useEffect(() => {
    console.log('Reasoning text received:', reasoningText ? reasoningText.substring(0, 50) + '...' : 'None');
  }, [reasoningText]);
  
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
  
  const isSubmitDisabled = isLoading || !isAnswerValid();
  
  // Add local state for visual cue
  const [isAutoAnswering, setIsAutoAnswering] = useState(false);
  const [autoCompleteCount, setAutoCompleteCount] = useState(0);
  
  // Auto-complete functionality
  useEffect(() => {
    // Don't proceed if auto-complete is not active or if we're already loading
    if (!isAutoCompleting || isLoading) return;
    
    // Stop if assessment is complete or max questions reached
    if (overallStatus === 'completed' || 
        overallStatus === 'assessment-completed' || 
        overallStatus === 'results-generated' ||
        autoCompleteCount >= 30) {
      console.log('Auto-complete stopping due to completion or max count, status:', overallStatus);
      setIsAutoCompleting(false);
      return;
    }
    
    // If there's a current question, process it
    if (question) {
      console.log('Auto-complete processing question:', question.substring(0, 30));
      console.log('Question details:', {
        answerType: answerType,
        options: options ? options.slice(0, 2).join(', ') + (options.length > 2 ? '...' : '') : 'none',
        phase: currentPhaseName,
        status: overallStatus,
        testPersonaTier: testPersonaTier // Log the current persona tier
      });
      
      // Define a variable to hold the answer with appropriate type
      let autoAnswer: string | string[] = '';
      
      try {
        // Use a persona-driven approach based on answer type
        const type = (answerType || '').toLowerCase();
        
        // Define persona-specific text answers
        const dabblerTextAnswers = [
          "We're really just at the beginning stages of exploring AI for this.",
          "No formal process in place for this yet, still learning.",
          "Budget is a significant constraint for advanced solutions here.",
          "Mainly using free or basic AI tools for simple tasks.",
          "Lack of internal expertise is a challenge we're facing."
        ];
        
        const enablerTextAnswers = [
          "We have a few AI initiatives underway and are seeing some positive results.",
          "Looking to optimize our current AI tools and scale their usage.",
          "Our team has moderate AI skills, and we're investing in further training.",
          "Data integration is a current focus to improve our AI model inputs.",
          "We're aiming to achieve better efficiency and ROI with our AI projects."
        ];
        
        const leaderTextAnswers = [
          "Our AI strategy is mature and well-integrated with business goals.",
          "We leverage advanced AI platforms and custom models for a competitive edge.",
          "Governance, ethics, and ROI measurement are key components of our AI framework.",
          "Continuously exploring cutting-edge AI to maintain market leadership.",
          "Our dedicated AI team drives innovation across multiple departments."
        ];
        
        if (type === 'radio') {
          // Radio buttons - choose option based on persona tier
          if (options && options.length > 0) {
            if (testPersonaTier === 'Dabbler') {
              // Dabbler typically selects basic/beginning options
              // Look for keywords that might indicate basic options
              const basicOptionIndex = options.findIndex(option => 
                option.toLowerCase().includes('basic') || 
                option.toLowerCase().includes('beginner') || 
                option.toLowerCase().includes('starting') ||
                option.toLowerCase().includes('limited') ||
                option.toLowerCase().includes('no ') ||
                option.toLowerCase().includes('not '));
              
              if (basicOptionIndex !== -1) {
                autoAnswer = options[basicOptionIndex];
              } else {
                // If no keyword found, select from first half of options
                const index = Math.floor(Math.random() * Math.ceil(options.length / 2));
                autoAnswer = options[index];
              }
            } else if (testPersonaTier === 'Enabler') {
              // Enabler typically selects middle-ground options
              // Look for keywords that indicate moderate progress
              const moderateOptionIndex = options.findIndex(option => 
                option.toLowerCase().includes('moderate') || 
                option.toLowerCase().includes('partial') || 
                option.toLowerCase().includes('some') ||
                option.toLowerCase().includes('developing') ||
                option.toLowerCase().includes('planned'));
              
              if (moderateOptionIndex !== -1) {
                autoAnswer = options[moderateOptionIndex];
              } else {
                // If no keyword found, select from middle of options
                const middleIndex = Math.floor(options.length / 2);
                const rangeStart = Math.max(0, middleIndex - 1);
                const rangeEnd = Math.min(options.length - 1, middleIndex + 1);
                const index = rangeStart + Math.floor(Math.random() * (rangeEnd - rangeStart + 1));
                autoAnswer = options[index];
              }
            } else { // Leader
              // Leader typically selects advanced/mature options
              // Look for keywords that indicate advanced progress
              const advancedOptionIndex = options.findIndex(option => 
                option.toLowerCase().includes('advanced') || 
                option.toLowerCase().includes('mature') || 
                option.toLowerCase().includes('complete') ||
                option.toLowerCase().includes('full') ||
                option.toLowerCase().includes('extensive'));
              
              if (advancedOptionIndex !== -1) {
                autoAnswer = options[advancedOptionIndex];
              } else {
                // If no keyword found, select from second half of options
                const startIndex = Math.floor(options.length / 2);
                const index = startIndex + Math.floor(Math.random() * (options.length - startIndex));
                autoAnswer = options[index];
              }
            }
          } else {
            autoAnswer = '';
          }
          console.log('Selected radio option:', autoAnswer);
        }
        else if (type === 'checkbox') {
          // Checkbox - select options based on persona tier
          if (options && options.length > 0) {
            if (testPersonaTier === 'Dabbler') {
              // Dabbler selects fewer options (1-2)
              const numOptions = Math.min(options.length, 1 + Math.floor(Math.random() * 2));
              autoAnswer = [];
              
              // Try to find basic options first
              const basicOptions = options.filter(option => 
                option.toLowerCase().includes('basic') || 
                option.toLowerCase().includes('beginner') || 
                option.toLowerCase().includes('simple'));
              
              if (basicOptions.length > 0) {
                for (let i = 0; i < Math.min(numOptions, basicOptions.length); i++) {
                  (autoAnswer as string[]).push(basicOptions[i]);
                }
              }
              
              // If we need more options, randomly select from the first half
              while ((autoAnswer as string[]).length < numOptions) {
                const halfLength = Math.ceil(options.length / 2);
                const randomIndex = Math.floor(Math.random() * halfLength);
                const randomOption = options[randomIndex];
                
                if (!(autoAnswer as string[]).includes(randomOption)) {
                  (autoAnswer as string[]).push(randomOption);
                }
              }
            } else if (testPersonaTier === 'Enabler') {
              // Enabler selects a moderate number of options (2-3)
              const numOptions = Math.min(options.length, 2 + Math.floor(Math.random() * 2));
              autoAnswer = [];
              
              // Randomly select options, with preference for middle-range options
              while ((autoAnswer as string[]).length < numOptions) {
                let index;
                // Bias toward the middle third of options
                if (Math.random() < 0.6) {
                  const thirdLength = Math.floor(options.length / 3);
                  index = thirdLength + Math.floor(Math.random() * thirdLength);
                } else {
                  index = Math.floor(Math.random() * options.length);
                }
                
                const option = options[index];
                if (!(autoAnswer as string[]).includes(option)) {
                  (autoAnswer as string[]).push(option);
                }
              }
            } else { // Leader
              // Leader selects more options (3-4 or more)
              const numOptions = Math.min(options.length, 3 + Math.floor(Math.random() * 2));
              autoAnswer = [];
              
              // Try to find advanced options first
              const advancedOptions = options.filter(option => 
                option.toLowerCase().includes('advanced') || 
                option.toLowerCase().includes('complete') || 
                option.toLowerCase().includes('comprehensive'));
              
              if (advancedOptions.length > 0) {
                for (let i = 0; i < Math.min(numOptions, advancedOptions.length); i++) {
                  (autoAnswer as string[]).push(advancedOptions[i]);
                }
              }
              
              // If we need more options, prefer options from the second half
              while ((autoAnswer as string[]).length < numOptions) {
                const halfLength = Math.floor(options.length / 2);
                const randomIndex = halfLength + Math.floor(Math.random() * (options.length - halfLength));
                const randomOption = options[randomIndex];
                
                if (!(autoAnswer as string[]).includes(randomOption)) {
                  (autoAnswer as string[]).push(randomOption);
                }
              }
            }
          } else {
            autoAnswer = [];
          }
          console.log('Selected checkbox options:', autoAnswer);
        }
        else if (type === 'scale') {
          // Scale - select based on persona tier
          if (options && options.length > 0) {
            let index = 0;
            if (testPersonaTier === 'Dabbler') {
              // Dabbler: lower range (1-2 on a 1-5 scale)
              index = Math.floor(Math.random() * Math.ceil(options.length * 0.4));
            } else if (testPersonaTier === 'Enabler') {
              // Enabler: middle range (2-4 on a 1-5 scale)
              const lowIndex = Math.floor(options.length * 0.2);
              const highIndex = Math.floor(options.length * 0.8);
              index = lowIndex + Math.floor(Math.random() * (highIndex - lowIndex));
            } else { // Leader
              // Leader: higher range (4-5 on a 1-5 scale)
              index = Math.floor(options.length * 0.6) + Math.floor(Math.random() * Math.ceil(options.length * 0.4));
            }
            
            // Ensure index is within bounds
            index = Math.min(Math.max(0, index), options.length - 1);
            autoAnswer = options[index];
          } else {
            autoAnswer = '';
          }
          console.log('Selected scale option:', autoAnswer);
        }
        else {
          // Text or any other type - provide persona-specific answer
          if (testPersonaTier === 'Dabbler') {
            autoAnswer = dabblerTextAnswers[Math.floor(Math.random() * dabblerTextAnswers.length)];
          } else if (testPersonaTier === 'Enabler') {
            autoAnswer = enablerTextAnswers[Math.floor(Math.random() * enablerTextAnswers.length)];
          } else { // Leader
            autoAnswer = leaderTextAnswers[Math.floor(Math.random() * leaderTextAnswers.length)];
          }
          console.log('Generated text answer for type:', type, 'Persona:', testPersonaTier);
        }
        
        // Set the answer and prepare for submission
        setCurrentAnswer(autoAnswer);
        setIsAutoAnswering(true);
        
        // Wait a short delay then submit
        const timer = setTimeout(() => {
          if (!isLoading) {
            console.log('Auto-complete submitting answer:', 
                       typeof autoAnswer === 'string' ? autoAnswer : JSON.stringify(autoAnswer));
            
            onSubmitAnswer(autoAnswer);
            setAutoCompleteCount(prev => prev + 1);
            setIsAutoAnswering(false);
          } else {
            console.log('Auto-complete skipping submission due to loading state');
          }
        }, 2000); // Longer delay to ensure state updates properly
        
        return () => clearTimeout(timer);
      } catch (error: unknown) {
        console.error('Error in auto-complete processing:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setAutoCompleteError(`Auto-complete error: ${errorMessage}`);
        setIsAutoCompleting(false);
      }
    }
  }, [isAutoCompleting, question, answerType, options, isLoading, overallStatus, testPersonaTier]);
  
  // Reset counter when auto-complete starts/stops
  useEffect(() => {
    if (!isAutoCompleting) setAutoCompleteCount(0);
  }, [isAutoCompleting]);
  
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
                  height: '200px', // Fixed height
                  maxHeight: '200px', // Maximum height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  position: 'relative',
                  overflow: 'hidden' // Hide overflow content
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
                  height: '200px', // Match height with the reasoning container
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
              
              {/* Test Persona Tier Selector */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label style={{ marginRight: '10px', fontSize: '0.95rem', color: '#666' }}>
                  Select Test Persona Tier:
                </label>
                <select
                  value={testPersonaTier}
                  onChange={(e) => setTestPersonaTier(e.target.value as 'Dabbler' | 'Enabler' | 'Leader')}
                  disabled={isAutoCompleting || isLoading}
                  style={{
                    padding: '0.5rem',
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
              
              {/* Auto-Complete Button for Testing */}
              <button
                onClick={handleStartAutoComplete}
                disabled={isAutoCompleting || isLoading}
                style={{
                  background: '#f59e42',
                  color: '#fff',
                  fontSize: '0.95rem',
                  borderRadius: '6px',
                  padding: '0.5rem 1.2rem',
                  marginBottom: '1rem',
                  marginLeft: 'auto',
                  display: 'block',
                  opacity: isAutoCompleting || isLoading ? 0.6 : 1,
                  cursor: isAutoCompleting || isLoading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
                }}
              >
                {isAutoCompleting ? 'Auto-Completing...' : 'Auto-Complete Assessment (Testing Only)'}
              </button>
              <button
                data-testid="scorecard-submit-btn"
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
                {isAutoAnswering ? `Auto-Answering...` : isLoading ? 'Submitting...' : 'Submit Answer'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScorecardQuestionDisplay; 