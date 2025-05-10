'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import ScorecardQuestionDisplay from '@/components/ScorecardQuestionDisplay';
import ScorecardResultsDisplay from '@/components/ScorecardResultsDisplay';
import LeadCaptureForm from '@/components/scorecard/LeadCaptureForm';
import NoSidebarLayout from '@/components/NoSidebarLayout';

// Define the ScorecardState interface
type AnswerSourceType = 'Groq Llama 3 8B' | 'Pollinations Fallback' | 'Groq API Failed' | 'Fallback Failed' | 'Manual';
interface ScorecardHistoryEntry {
  question: string;
  answer: any;
  phaseName?: string;
  answerType?: string;
  options?: string[] | null;
  reasoningText?: string | null;
  answerSource?: AnswerSourceType;
}
interface ScorecardState {
  currentPhaseName: string;
  currentQuestion: string | null;
  answerType: string | null;
  options: string[] | null;
  history: ScorecardHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  overall_status: string; // 'assessment-in-progress' | 'assessment-completed' | 'results-generated' etc.
  reportMarkdown: string | null;
  reasoningText: string | null; // Added for AI thinking display
  industry: string;
  currentQuestionNumber: number;
  maxQuestions: number;
  assessmentPhases: string[];
}

// Define the industry selection UI component with enhanced design
const IndustrySelection = ({ 
  industries, 
  selectedIndustry, 
  handleIndustryChange, 
  startAssessment 
}: { 
  industries: string[], 
  selectedIndustry: string, 
  handleIndustryChange: (industry: string) => void, 
  startAssessment: () => void 
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sg-dark-teal mb-3">
          AI Efficiency Scorecard
        </h1>
        <p className="text-lg text-sg-dark-teal/80">
          Assess your organization's AI maturity and receive a personalized action plan
        </p>
      </div>
      
      <div className="sg-card-featured mb-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-sg-dark-teal">Start Your Assessment</h2>
            <p className="text-sm text-sg-dark-teal/70 mt-1">Select your industry to receive tailored recommendations</p>
          </div>
          <div className="p-3 bg-sg-bright-green/10 rounded-full">
            <svg className="w-6 h-6 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-sg-dark-teal mb-2">
            Your Industry
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => handleIndustryChange(industry)}
                className={`
                  p-4 rounded-lg transition-all duration-200 text-left font-medium text-sm h-full
                  ${selectedIndustry === industry 
                    ? 'bg-sg-bright-green/20 border-2 border-sg-bright-green text-sg-dark-teal shadow-md' 
                    : 'bg-white border-2 border-gray-100 text-sg-dark-teal/70 hover:border-sg-bright-green/50 hover:bg-sg-light-mint'}
                `}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-sm text-sg-dark-teal/70">
            <svg className="w-5 h-5 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>The assessment takes approximately 8-10 minutes to complete</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-sg-dark-teal/70">
            <svg className="w-5 h-5 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Your responses are confidential and securely stored</span>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={startAssessment}
            className="w-full sg-button-primary flex items-center justify-center"
          >
            <span>Start Assessment</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="sg-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-sg-orange/10 rounded-full">
              <svg className="w-5 h-5 text-sg-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-sg-dark-teal">Assess</h3>
          </div>
          <p className="text-sm text-sg-dark-teal/70">Evaluate your current AI maturity across key dimensions</p>
        </div>
        
        <div className="sg-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-sg-light-blue/10 rounded-full">
              <svg className="w-5 h-5 text-sg-light-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-sg-dark-teal">Analyze</h3>
          </div>
          <p className="text-sm text-sg-dark-teal/70">Receive detailed insights about your AI strengths and gaps</p>
        </div>
        
        <div className="sg-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-sg-bright-green/10 rounded-full">
              <svg className="w-5 h-5 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="font-medium text-sg-dark-teal">Act</h3>
          </div>
          <p className="text-sm text-sg-dark-teal/70">Get a customized action plan to improve your AI capabilities</p>
        </div>
      </div>
    </div>
  );
};

// Create an enhanced Question Card component
interface AssessmentQuestionProps {
  scorecardState: ScorecardState;
  memoizedOptions: string[] | null;
  memoizedReasoningText: string | null;
  handleAnswerSubmit: (answer: any, answerSource?: AnswerSourceType) => void;
  isAutoCompleting: boolean;
  memoizedSetIsAutoCompleting: (val: boolean) => void;
  memoizedSetAutoCompleteError: (msg: string | null) => void;
  handleStartAutoComplete: () => void;
  autoCompleteCount: number;
  memoizedHistory: ScorecardHistoryEntry[];
  selectedIndustry: string;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({ 
  scorecardState, 
  memoizedOptions, 
  memoizedReasoningText,
  handleAnswerSubmit,
  isAutoCompleting,
  memoizedSetIsAutoCompleting,
  memoizedSetAutoCompleteError,
  handleStartAutoComplete,
  autoCompleteCount,
  memoizedHistory,
  selectedIndustry,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sg-dark-teal mb-3">
          AI Efficiency Scorecard Assessment
        </h1>
        <p className="text-lg text-sg-dark-teal/70">
          Answer the following questions to receive your personalized scorecard
        </p>
      </div>
      
      {/* Assessment Progress Timeline */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="text-lg font-medium text-sg-dark-teal">
            {scorecardState.currentPhaseName} Phase
          </div>
          <div className="text-sm text-sg-dark-teal/70">
            Question {scorecardState.currentQuestionNumber} of {scorecardState.maxQuestions}
          </div>
        </div>
        
        <div className="sg-progress-container">
          <div 
            className="sg-progress-bar" 
            style={{ width: `${(scorecardState.currentQuestionNumber / scorecardState.maxQuestions) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2">
          {scorecardState.assessmentPhases.map((phase, index) => (
            <div 
              key={phase} 
              className={`text-xs font-medium ${scorecardState.currentPhaseName === phase ? 'text-sg-bright-green' : 'text-gray-400'}`}
            >
              {phase}
            </div>
          ))}
        </div>
      </div>
      
      {/* Question Card */}
      <div className="sg-assessment-card mb-6">
        <div className="sg-assessment-card-header">
          <h2 className="text-xl font-medium text-white">
            Question {scorecardState.currentQuestionNumber}
          </h2>
        </div>
        
        <div className="sg-assessment-card-body">
          <ScorecardQuestionDisplay
            question={scorecardState.currentQuestion || ''}
            answerType={scorecardState.answerType || 'text'}
            options={memoizedOptions}
            onSubmitAnswer={handleAnswerSubmit}
            isLoading={scorecardState.isLoading}
            currentPhaseName={scorecardState.currentPhaseName}
            currentQuestionNumber={scorecardState.currentQuestionNumber}
            maxQuestions={scorecardState.maxQuestions}
            assessmentPhases={scorecardState.assessmentPhases}
            reasoningText={memoizedReasoningText || undefined}
            isAutoCompleting={isAutoCompleting}
            setIsAutoCompleting={memoizedSetIsAutoCompleting}
            setAutoCompleteError={memoizedSetAutoCompleteError}
            handleStartAutoComplete={handleStartAutoComplete}
            overallStatus={scorecardState.overall_status}
            questionAnswerHistory={memoizedHistory}
            industry={selectedIndustry}
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // --- TEMPORARY FOR TESTING RESULTS PAGE ---
  const [currentStep, setCurrentStep] = useState<string>('industrySelection'); // Start at industry selection
  // --- END TEMPORARY CHANGES ---
  
  // Define state for selected industry
  const [selectedIndustry, setSelectedIndustry] = useState<string>("Property/Real Estate");
  
  // Define the initial state for the scorecard
  const initialScorecardState: ScorecardState = {
    currentPhaseName: "Strategy", // Default to first phase
    currentQuestion: null,
    answerType: null,
    options: null,
    history: [],
    isLoading: false,
    error: null,
    reportMarkdown: null, // No pre-populated report
    overall_status: 'assessment-in-progress', // Start in progress
    reasoningText: null, // Initialize as null
    industry: "Property/Real Estate",
    currentQuestionNumber: 1,
    maxQuestions: 20,
    assessmentPhases: ["Strategy", "Data", "Tech", "Team/Process", "Governance"],
  };
  
  // Define state for scorecard
  const [scorecardState, setScorecardState] = useState<ScorecardState>(initialScorecardState);
  
  // Define state for lead capture
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);
  
  // Define the list of industries
  const industries = [
    "Property/Real Estate", "Higher Education", "B2B Tech/SaaS",
    "Financial Services", "Automotive", "E-commerce", "B2B",
    "Not for Profit", "Aged Care", "Retired Living", "Other"
  ];
  
  // Define constants
  const MAX_QUESTIONS = 20; // Match the value in the API route
  const ASSESSMENT_PHASES = ["Strategy", "Data", "Tech", "Team/Process", "Governance"]; // Match API phases
  
  // Define isAutoCompleting state
  const [isAutoCompleting, setIsAutoCompleting] = useState(false);
  // Add autoCompleteError state
  const [autoCompleteError, setAutoCompleteError] = useState<string | null>(null);
  
  // Memoize reasoningText to prevent unnecessary re-renders of ScorecardQuestionDisplay
  const memoizedReasoningText = useMemo(() => scorecardState.reasoningText, [scorecardState.reasoningText]);
  
  // Memoize options array
  const memoizedOptions = useMemo(
    () => scorecardState.options ? [...scorecardState.options] : [],
    [scorecardState.options]
  );

  // Memoize history array
  const memoizedHistory = useMemo(
    () => scorecardState.history ? [...scorecardState.history] : [],
    [scorecardState.history]
  );

  // Memoize question object (if you want to pass as a single object)
  const memoizedQuestion = useMemo(
    () => scorecardState.currentQuestion
      ? {
          questionText: scorecardState.currentQuestion,
          answerType: scorecardState.answerType,
          options: scorecardState.options,
        }
      : null,
    [scorecardState.currentQuestion, scorecardState.answerType, scorecardState.options]
  );

  // Memoize setIsAutoCompleting
  const memoizedSetIsAutoCompleting = useCallback(setIsAutoCompleting, []);
  // Memoize setAutoCompleteError
  const memoizedSetAutoCompleteError = useCallback(setAutoCompleteError, []);

  // Add new state for final report generation loading indicator
  const [isGeneratingFinalReport, setIsGeneratingFinalReport] = useState(false);
  const [autoCompleteCount, setAutoCompleteCount] = useState(0);

  // Extract tier from report markdown if available
  const extractedTier = useMemo(() => {
    if (!scorecardState.reportMarkdown) return null;
    
    const tierMatch = scorecardState.reportMarkdown.match(/## Overall Tier:?\s*(.+?)($|\n)/i);
    if (tierMatch && tierMatch[1]) {
      return tierMatch[1].trim();
    }
    
    // Fallback to searching for Leader, Enabler, or Dabbler in the markdown
    const tierKeywords = ["Leader", "Enabler", "Dabbler"];
    for (const keyword of tierKeywords) {
      if (scorecardState.reportMarkdown.includes(keyword)) {
        return keyword;
      }
    }
    
    return null;
  }, [scorecardState.reportMarkdown]);

  // Handle successful lead capture form submission
  const handleLeadCaptureSuccess = useCallback(() => {
    setLeadCaptured(true);
    
    // Start the assessment after capturing the lead information
    startActualAssessment();
    
  }, []);

  // --- EXISTING FUNCTIONS (generateReport, handleAnswerSubmit, handleStartAutoComplete) --- //

  // --- Stabilize generateReport (Dependency: selectedIndustry) ---
  const generateReport = useCallback(async (finalHistory: ScorecardHistoryEntry[]) => {
    console.log('Generating final report...');
    setIsGeneratingFinalReport(true);
    try {
      // Limit the history to exactly 20 items before generating the report
      const limitedHistory = finalHistory.slice(0, 20);
      console.log(`Generating report with ${limitedHistory.length} question/answer pairs`);
      
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateReport',
          history: limitedHistory,
          industry: selectedIndustry
        }),
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to generate report. Status: ${response.status}. Body: ${errorBody}`);
      }
      
      const data = await response.json();
      if (data && data.reportMarkdown) {
        console.log('💥💥💥 Report generated successfully 💥💥💥');
        console.log('Setting overall_status to completed and waiting for lead capture');
        
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          reportMarkdown: data.reportMarkdown,
          overall_status: 'completed'
        }));
        
        // Store data in sessionStorage but DON'T redirect - let the lead capture form show first
        try {
          // Store the data in sessionStorage
          sessionStorage.setItem('reportMarkdown', data.reportMarkdown);
          sessionStorage.setItem('questionAnswerHistory', JSON.stringify(limitedHistory));
          
          // Also store in localStorage as backup
          localStorage.setItem('reportMarkdown', data.reportMarkdown);
          localStorage.setItem('questionAnswerHistory', JSON.stringify(limitedHistory));
          
          console.log('Successfully saved report data to sessionStorage and localStorage');
          console.log('💥💥💥 WAITING FOR LEAD CAPTURE - You should see the lead form now 💥💥💥');
          
          // Hide the loading modal
          setIsGeneratingFinalReport(false);
        } catch (storageError) {
          console.error('Error saving to sessionStorage:', storageError);
          setIsGeneratingFinalReport(false);
        }
      } else {
        console.error('Report data received but reportMarkdown is missing');
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Report generation completed but data was invalid'
        }));
        setIsGeneratingFinalReport(false);
      }
    } catch (error: any) {
      console.error('Detailed error in generateReport:', error);
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred in generateReport: ${error.message || 'Unknown error'}`
      }));
      setIsGeneratingFinalReport(false); // Hide loading indicator on error
    }
  }, [selectedIndustry]); // Only depends on selectedIndustry

  // --- Stabilize handleAnswerSubmit using Functional Updates ---
  const handleAnswerSubmit = useCallback(async (answer: any, answerSource?: AnswerSourceType) => {
    let submittedQuestion = '';
    let currentPhase = '';
    let currentAnswerType: string | null = null;
    let currentOptions: string[] | null = null;
    let currentReasoning: string | null = null;

    // Capture current history length to check if we need to proceed after adding this answer
    let currentHistoryLength = 0;

    setScorecardState(prev => {
      if (!prev.currentQuestion) {
        console.error('Submit attempted with no current question (inside functional update)');
        return prev;
      }
      submittedQuestion = prev.currentQuestion;
      currentPhase = prev.currentPhaseName;
      currentAnswerType = prev.answerType ?? '';
      currentOptions = prev.options;
      currentReasoning = prev.reasoningText;
      currentHistoryLength = prev.history.length;

      const newHistory = [...prev.history, {
        question: submittedQuestion,
        answer: answer,
        phaseName: currentPhase,
        answerType: currentAnswerType,
        options: currentOptions,
        reasoningText: currentReasoning,
        answerSource: answerSource || 'Manual',
      }];
      return { ...prev, isLoading: true, error: null, history: newHistory };
    });

    try {
      const updatedHistory = (await new Promise<ScorecardState>(resolve => setScorecardState(prev => { resolve(prev); return prev; }))).history;
      
      // After adding this answer, check if we've reached MAX_QUESTIONS
      // currentHistoryLength + 1 should be the new length after adding one answer
      if (currentHistoryLength + 1 >= MAX_QUESTIONS) {
        console.log(`Reached maximum questions (${MAX_QUESTIONS}). Completing assessment.`);
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          overall_status: 'completed'
        }));
        
        // Stop auto-complete if it's running
        if (isAutoCompleting) {
          console.log('[Parent] Assessment completed, disabling auto-complete.');
          setIsAutoCompleting(false);
        }
        
        // Generate the report with exactly MAX_QUESTIONS answers
        generateReport(updatedHistory.slice(0, MAX_QUESTIONS));
        return;
      }

      // Only fetch the next question if we haven't reached MAX_QUESTIONS
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPhaseName: currentPhase,
          history: updatedHistory,
          industry: selectedIndustry
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        const detailedErrorMessage = `Failed to submit answer. Status: ${response.status}. Body: ${errorBody}`;
        console.error(detailedErrorMessage);
        setScorecardState(prev => ({ ...prev, isLoading: false, error: detailedErrorMessage }));
        return;
      }
      const data = await response.json();
      if (data.overall_status) {
        console.log('API response overall_status:', data.overall_status);
      }

      // Check if we should generate the report based on API response
      if (
        (data.overall_status === 'assessment-completed' ||
         data.overall_status === 'completed' ||
         data.overall_status.includes('complet'))
      ) {
        if (isAutoCompleting) {
          console.log('[Parent] Assessment completed detected, disabling auto-complete.');
          setIsAutoCompleting(false);
        }
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          overall_status: data.overall_status
        }));
        
        // Ensure we use exactly MAX_QUESTIONS answers for the report
        generateReport(updatedHistory.slice(0, MAX_QUESTIONS));
      } 
      // Otherwise, update state with the next question
      else {
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          currentQuestion: data.questionText,
          answerType: data.answerType,
          options: data.options,
          currentPhaseName: data.currentPhaseName,
          overall_status: data.overall_status,
          reasoningText: data.reasoning_text,
          currentQuestionNumber: Math.min(updatedHistory.length + 1, MAX_QUESTIONS)
        }));
      }
    } catch (error: any) {
      console.error('Error in handleAnswerSubmit:', error);
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred: ${error.message || 'Unknown error'}`
      }));
      if (isAutoCompleting) {
        console.log('Stopping auto-complete due to error');
        setIsAutoCompleting(false);
        setAutoCompleteError(`Auto-complete failed: ${error.message || 'Unknown error'}`);
      }
    }
  }, [selectedIndustry, isAutoCompleting, generateReport, setIsAutoCompleting, setAutoCompleteError, MAX_QUESTIONS]);

  // --- Stabilize handleStartAutoComplete (Dependency: scorecardState values it READS) ---
  const handleStartAutoComplete = useCallback(() => {
    setAutoCompleteError(null);
    const { isLoading, overall_status, currentQuestion } = scorecardState; // Destructure needed values
    if (isLoading) {
      setAutoCompleteError("Cannot start auto-complete while loading");
      return;
    }
    if (overall_status === 'completed' || 
        overall_status === 'results-generated' ||
        overall_status === 'report-generated') {
      setAutoCompleteError("Assessment is already complete");
      return;
    }
    if (!currentQuestion) {
      setAutoCompleteError("No current question to answer");
      return;
    }
    console.log("Starting auto-complete process");
    setIsAutoCompleting(true);
  }, [scorecardState.isLoading, scorecardState.overall_status, scorecardState.currentQuestion, setIsAutoCompleting, setAutoCompleteError]); // Depend on specific state fields read
  
  // --- startAssessment doesn't need useCallback as it's usually called once ---
  const startAssessment = async () => {
    // Show lead capture form first, don't start assessment yet
    setCurrentStep('leadCapture');
  };
  
  // Function to start the actual assessment after lead capture
  const startActualAssessment = async () => {
    // Reset state to initial before starting
    setScorecardState({ ...initialScorecardState, industry: selectedIndustry });
    setIsAutoCompleting(false);
    setAutoCompleteError(null);
    // Set loading state
    setScorecardState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Make the initial POST request to the API
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPhaseName: initialScorecardState.currentPhaseName,
          history: [],
          industry: selectedIndustry
        }),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        const detailedErrorMessage = `Failed to start assessment. Status: ${response.status}. Body: ${errorBody}`;
        setScorecardState(prev => ({ ...prev, isLoading: false, error: detailedErrorMessage }));
        return;
      }
      const data = await response.json();
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        currentQuestion: data.questionText,
        answerType: data.answerType,
        options: data.options,
        currentPhaseName: data.currentPhaseName,
        overall_status: data.overall_status,
        reasoningText: data.reasoning_text,
        currentQuestionNumber: 1
      }));
      setCurrentStep('assessment');
    } catch (error: any) {
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred in startAssessment: ${error.message || 'Unknown error'}`
      }));
    }
  };
  
  // Update industry selection handler
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    // Also update the scorecard state to reflect the industry
    setScorecardState(prev => ({
      ...prev,
      industry: industry
    }));
  };
  
  // In the results step, stop auto-completing if needed
  if (currentStep === 'results' && isAutoCompleting) {
    setIsAutoCompleting(false);
  }

  // Render content based on current step
  const renderContent = () => {
    if (currentStep === 'industrySelection') {
      return (
        <IndustrySelection
          industries={industries}
          selectedIndustry={selectedIndustry}
          handleIndustryChange={handleIndustryChange}
          startAssessment={startAssessment}
        />
      );
    }
    
    if (currentStep === 'leadCapture') {
      return (
        <LeadCaptureForm 
          aiTier={"Not Started"} // Assessment hasn't started yet
          onSubmitSuccess={handleLeadCaptureSuccess}
          reportMarkdown={null}
          questionAnswerHistory={[]}
        />
      );
    }
    
    if (currentStep === 'assessment') {
      return (
        <>
          <AssessmentQuestion 
            scorecardState={scorecardState}
            memoizedOptions={memoizedOptions}
            memoizedReasoningText={memoizedReasoningText}
            handleAnswerSubmit={handleAnswerSubmit}
            isAutoCompleting={isAutoCompleting}
            memoizedSetIsAutoCompleting={memoizedSetIsAutoCompleting}
            memoizedSetAutoCompleteError={memoizedSetAutoCompleteError}
            handleStartAutoComplete={handleStartAutoComplete}
            autoCompleteCount={autoCompleteCount}
            memoizedHistory={memoizedHistory}
            selectedIndustry={selectedIndustry}
          />
          
          {scorecardState.error && (
            <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-1 pl-7">{scorecardState.error}</p>
            </div>
          )}
          
          {autoCompleteError && (
            <div className="max-w-4xl mx-auto mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg text-amber-700">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Auto-Complete Error:</span>
              </div>
              <p className="mt-1 pl-7">{autoCompleteError}</p>
            </div>
          )}
        </>
      );
    }
    
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="sg-card p-12">
          <svg className="w-16 h-16 text-sg-bright-green mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-sg-dark-teal mb-4">Welcome to AI Efficiency Scorecard</h1>
          <p className="text-lg text-sg-dark-teal/70 mb-6">Start your assessment to receive a personalized AI maturity scorecard</p>
          <button 
            onClick={() => setCurrentStep('industrySelection')}
            className="sg-button-primary"
          >
            Get Started
          </button>
            </div>
      </div>
    );
  };

  return (
    <NoSidebarLayout>
      {renderContent()}
      
      {/* Report Generation Modal */}
      {isGeneratingFinalReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-sg-bright-green/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-sg-bright-green border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-sg-dark-teal mb-4">Creating Your Scorecard</h3>
              <p className="text-center text-sg-dark-teal/70 mb-6">
                We're analyzing your responses and generating a personalized AI maturity assessment with actionable recommendations.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-sg-bright-green h-2 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-sg-dark-teal/50">This may take a moment. Please don't close this window.</p>
            </div>
          </div>
        </div>
      )}
    </NoSidebarLayout>
  );
}
