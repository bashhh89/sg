'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import ScorecardQuestionDisplay from '@/components/ScorecardQuestionDisplay';
import ScorecardResultsDisplay from '@/components/ScorecardResultsDisplay';
import LeadCaptureForm from '@/components/scorecard/LeadCaptureForm';
import NoSidebarLayout from '@/components/NoSidebarLayout';
import { db } from '@/final/lib/firebase'; // Correct path to firebase.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation'; // For navigating to results page with reportId

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
  memoizedSetAutoCompleteError: (msg: string | null) => void; // Corrected prop name
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
  // Router for navigation
  const router = useRouter();
  
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
  // Add state for storing lead name for personalization
  const [leadName, setLeadName] = useState<string>('');
  
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

  // Moved function definitions earlier to avoid linter errors
  const startActualAssessment = useCallback(async () => {
    console.log('Frontend: Starting assessment with industry:', selectedIndustry);
    setScorecardState({ ...initialScorecardState, industry: selectedIndustry });
    setIsAutoCompleting(false);
    setAutoCompleteError(null);
    setScorecardState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPhaseName: initialScorecardState.currentPhaseName,
          history: initialScorecardState.history,
          industry: selectedIndustry
        }),
      });
      console.log('Frontend: Initial API call sent for industry:', selectedIndustry);
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
  }, [selectedIndustry, initialScorecardState]); // Added initialScorecardState dependency

  const handlePostAssessmentLeadCaptureSuccess = useCallback(() => {
    console.log("Post-assessment lead capture successful. Moving to results.");
    setCurrentStep('results');
  }, []);

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

  // Modified lead capture success handler to store lead name and start assessment
  const handleLeadCaptureSuccess = useCallback((capturedName: string) => {
    setLeadCaptured(true);
    setLeadName(capturedName);
    
    // Store the name in sessionStorage for use in results page
    sessionStorage.setItem('scorecardUserName', capturedName);
    
    // Start the assessment after capturing the lead information
    startActualAssessment();
  }, [startActualAssessment]); 

  // --- EXISTING FUNCTIONS (generateReport, handleAnswerSubmit, handleStartAutoComplete) --- //
  // Ensure generateReport, handleAnswerSubmit, handleStartAutoComplete are also defined above if they are used in deps by later hooks

  // --- Stabilize generateReport (Dependency: selectedIndustry) ---
  const generateReport = useCallback(async (finalHistory: ScorecardHistoryEntry[]) => {
    console.log('>>> FRONTEND: generateReport function called.');
    setIsGeneratingFinalReport(true);
    try {
      // Limit the history to exactly 20 items before generating the report
      const limitedHistory = finalHistory.slice(0, MAX_QUESTIONS); // Use MAX_QUESTIONS constant
      console.log(`>>> FRONTEND: Generating report with ${limitedHistory.length} question/answer pairs`);
      
      // Retrieve the user name for the report
      const userName = sessionStorage.getItem('scorecardUserName') || leadName;
      console.log(`>>> FRONTEND: Using userName for report: ${userName}`);

      console.log('>>> FRONTEND: Calling backend API for report generation.');
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateReport',
          history: limitedHistory,
          industry: selectedIndustry,
          userName: userName // Include the user's name for personalization
        }),
      });
      console.log(`>>> FRONTEND: Backend API responded with status: ${response.status}`);
      
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('>>> FRONTEND: Backend Report Generation API Error Response Body:', errorBody);
        throw new Error(`Failed to generate report. Status: ${response.status}. Body: ${errorBody}`);
      }
      
      const data = await response.json();
      console.log('>>> FRONTEND: Parsed backend report generation response data:', data);

      if (data && data.reportMarkdown) {
        console.log('>>> FRONTEND: Report markdown received successfully.');
        console.log('>>> FRONTEND: Setting overall_status to completed and preparing to navigate.');
        
        // First update scorecardState with the reportMarkdown and completed status
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          reportMarkdown: data.reportMarkdown,
          overall_status: 'completed'
        }));
        
        // Get lead information from the lead capture form
        const leadEmail = sessionStorage.getItem('scorecardLeadEmail') || '';
        const leadCompany = sessionStorage.getItem('scorecardLeadCompany') || '';
        const leadPhone = sessionStorage.getItem('scorecardLeadPhone') || '';
        
        // Use the userAITier directly from the API response
        const extractedTier = data.userAITier || 'Unknown';
        console.log('>>> FRONTEND: Using extractedTier from API response:', extractedTier);

        // Prepare data for Firestore
        const reportData = {
          leadName: userName || null,
          leadCompany: leadCompany || null,
          leadEmail: leadEmail || null,
          leadPhone: leadPhone || null,
          industry: selectedIndustry,
          userAITier: extractedTier, // Include the extracted tier
          aiTier: extractedTier,
          reportMarkdown: data.reportMarkdown,
          questionAnswerHistory: limitedHistory,
          systemPromptUsed: data.systemPromptUsed, // Include the system prompt
          createdAt: serverTimestamp(),
          overallStatus: 'completed'
        };
        
        console.log('>>> FRONTEND: Preparing to save report to Firestore.');
        try {
          // Save to Firestore
          const docRef = await addDoc(collection(db, "scorecardReports"), reportData);
          const reportID = docRef.id;
          console.log(">>> FRONTEND: Report saved to Firestore with ID: ", reportID);
          
          // Store reportID in sessionStorage for immediate access
          sessionStorage.setItem('currentReportID', reportID);
          console.log(`>>> FRONTEND: Stored reportID ${reportID} in sessionStorage.`);

          // Store data in sessionStorage and navigate directly to results
          try {
            // Store the data in sessionStorage
            sessionStorage.setItem('reportMarkdown', data.reportMarkdown);
            sessionStorage.setItem('questionAnswerHistory', JSON.stringify(limitedHistory));
            sessionStorage.setItem('systemPromptUsed', data.systemPromptUsed); // Store system prompt
            
            // Also store in localStorage as backup
            localStorage.setItem('reportMarkdown', data.reportMarkdown);
            localStorage.setItem('questionAnswerHistory', JSON.stringify(limitedHistory));
            localStorage.setItem('systemPromptUsed', data.systemPromptUsed); // Store system prompt
            
            console.log('>>> FRONTEND: Successfully saved report data to sessionStorage and localStorage.');
            
            // Hide the loading modal
            setIsGeneratingFinalReport(false);
            console.log('>>> FRONTEND: isGeneratingFinalReport set to false.');

            console.log('>>> FRONTEND: 💥💥💥 Navigating to results page directly 💥💥💥');
            
            // Get reportID from sessionStorage (should be available now)
            const finalReportID = sessionStorage.getItem('currentReportID');
            
            // Navigate directly to results page with reportId if available
            if (finalReportID) {
              const navigateUrl = `/scorecard/results?reportId=${finalReportID}`;
              console.log(`>>> FRONTEND: Attempting to navigate to: ${navigateUrl}`);
              // Use window.location.href for a hard redirect instead of Next.js router
              window.location.href = navigateUrl;
              return; // Stop execution here to prevent further state updates
            } else {
               console.error('>>> FRONTEND: No reportID found in sessionStorage after saving to Firestore. Navigating without ID.');
               window.location.href = `/scorecard/results`; // Hard redirect without ID as fallback
               return; // Stop execution here
            }
            
          } catch (storageError: any) {
            console.error('>>> FRONTEND: Failed to save to sessionStorage/localStorage:', storageError);
            // Still hide the modal even if storage fails
            setIsGeneratingFinalReport(false);
            console.log('>>> FRONTEND: isGeneratingFinalReport set to false after storage error.');

            // Attempt to navigate directly to results page even without stored data
            console.log('>>> FRONTEND: Attempting to navigate to results page after storage error.');
            // Use window.location.href instead of router.push
            window.location.href = `/scorecard/results`;
            return; // Stop execution here
          }

        } catch (firestoreError: any) {
          console.error(">>> FRONTEND: Error saving report to Firestore: ", firestoreError);
          // Continue with normal flow even if Firestore save fails, but log the error
          setIsGeneratingFinalReport(false);
          console.log('>>> FRONTEND: isGeneratingFinalReport set to false after Firestore error.');
          
          // Attempt to navigate directly to results page even if Firestore save fails
          console.log('>>> FRONTEND: Attempting to navigate to results page after Firestore error.');
          // Use window.location.href instead of router.push
          window.location.href = `/scorecard/results`;
          return; // Stop execution here
        }
        
      } else {
        setIsGeneratingFinalReport(false);
        console.log('>>> FRONTEND: isGeneratingFinalReport set to false because report data was missing.');
        throw new Error('Report data missing from API response');
      }
    } catch (error: any) {
      console.error('>>> FRONTEND: Report generation failed:', error);
      setIsGeneratingFinalReport(false);
      console.log('>>> FRONTEND: isGeneratingFinalReport set to false after report generation failure.');
      setScorecardState(prev => ({
        ...prev,
        error: `Failed to generate report: ${error.message || 'Unknown error'}`
      }));
      // Do not change currentStep here, let the error message handle user action
    }
  }, [selectedIndustry, leadName, router, MAX_QUESTIONS]); // Added MAX_QUESTIONS to dependencies

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
        
        // CRITICAL FIX: EXPLICIT additional check to ensure we change step when hitting MAX_QUESTIONS
        console.log(`MAX_QUESTIONS REACHED: Direct transition enforcement in handleAnswerSubmit`);
        
        // Generate the report with exactly MAX_QUESTIONS answers
        generateReport(updatedHistory.slice(0, MAX_QUESTIONS));
        
        // The generateReport function now handles navigation directly with window.location.href
        return;
      }

      // Only fetch the next question if we haven't reached MAX_QUESTIONS
      try {
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
          console.error('>>> FRONTEND: Raw API Error Response Body:', errorBody); // Add this log
          const detailedErrorMessage = `Failed to submit answer. Status: ${response.status}. Body: ${errorBody}`;
          console.error(detailedErrorMessage);
          setScorecardState(prev => ({
            ...prev,
            isLoading: false,
            error: detailedErrorMessage + ". Please try restarting the assessment."
          }));
          if (isAutoCompleting) {
             console.log('Stopping auto-complete due to API error');
             setIsAutoCompleting(false);
             setAutoCompleteError(`Auto-complete failed: ${detailedErrorMessage}`);
          }
          return;
        }
        
        const data = await response.json();
        if (data.overall_status) {
          console.log('API response overall_status:', data.overall_status);
        }

        // Check if we should generate the report based on API response or if MAX_QUESTIONS is reached during auto-complete
        if (
          (data.overall_status === 'assessment-completed' ||
          data.overall_status === 'completed' ||
          data.overall_status.includes('complet')) ||
          (isAutoCompleting && updatedHistory.length >= MAX_QUESTIONS) // Explicitly check history length for auto-complete
        ) {
          if (isAutoCompleting) {
            console.log('[Parent] Assessment completed detected or MAX_QUESTIONS reached, disabling auto-complete.');
            setIsAutoCompleting(false);
          }
          setScorecardState(prev => ({
            ...prev,
            isLoading: false,
            overall_status: data.overall_status // Use API status or force 'completed' if MAX_QUESTIONS reached? Let's stick to API status for now.
          }));
          
          // Ensure we use exactly MAX_QUESTIONS answers for the report
          generateReport(updatedHistory.slice(0, MAX_QUESTIONS));
        }
        // Otherwise, update state with the next question
        else {
          if (!data.questionText) {
            throw new Error("API returned success but no question was provided");
          }
          
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
      } catch (apiError: any) {
        console.error('API error in handleAnswerSubmit:', apiError);
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          error: `Error getting next question: ${apiError.message}. Please try restarting the assessment.`
        }));
        if (isAutoCompleting) {
          setIsAutoCompleting(false);
          setAutoCompleteError(`Auto-complete failed: ${apiError.message || 'Unknown error'}`);
        }
      }
    } catch (error: any) {
      console.error('Error in handleAnswerSubmit:', error);
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred: ${error.message || 'Unknown error'}. Please try restarting the assessment.`
      }));
      if (isAutoCompleting) {
        console.log('Stopping auto-complete due to error');
        setIsAutoCompleting(false);
        setAutoCompleteError(`Auto-complete failed: ${error.message || 'Unknown error'}`);
      }
    }
  }, [selectedIndustry, isAutoCompleting, generateReport, setIsAutoCompleting, setAutoCompleteError, MAX_QUESTIONS, currentStep, scorecardState.overall_status]);

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
  
  const startAssessment = async () => {
    // Instead of starting the assessment directly, show the lead capture form first
    setCurrentStep('leadCapture');
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
    console.log(`RENDER_CONTENT: currentStep=${currentStep}, overall_status=${scorecardState.overall_status}, hasReport=${!!scorecardState.reportMarkdown}, isGeneratingFinalReport=${isGeneratingFinalReport}, leadCaptured=${leadCaptured}`);

    // === Primary Flow for Completed Assessment ===
    if (scorecardState.overall_status === 'completed' && scorecardState.reportMarkdown) {
      console.log(`RENDER_CONTENT (Completed Flow): currentStep is '${currentStep}'`);

      // First check: Are we still generating the report?
      if (isGeneratingFinalReport) {
        console.log("RENDER_CONTENT: (Completed Flow) Still generating report - showing loading modal");
        return <div className="max-w-4xl mx-auto text-center p-8">Generating your report... Please wait. (This message is a fallback if modal fails)</div>;
      }

      // Check if we have a reportId in sessionStorage and redirect immediately
      const reportId = sessionStorage.getItem('currentReportID');
      if (reportId) {
        console.log(`RENDER_CONTENT: Found reportId ${reportId}, redirecting immediately`);
        // Use setTimeout to ensure this runs after render
        setTimeout(() => {
          window.location.href = `/scorecard/results?reportId=${reportId}`;
        }, 0);
        return <div className="max-w-4xl mx-auto text-center p-8">Redirecting to your results...</div>;
      }

      // Now handle based on currentStep
      if (currentStep === 'results') {
        console.log("RENDER_CONTENT: Showing ScorecardResultsDisplay");
        const finalReportMarkdown = scorecardState.reportMarkdown;
        
        // Diagnostic logging to check if reportMarkdown exists
        console.log("REPORT CHECK: reportMarkdown in state =", 
          finalReportMarkdown ? `${finalReportMarkdown.substring(0, 50)}...` : "NULL/UNDEFINED");
        
        // Try to get report from sessionStorage if not in state
        const storedReport = sessionStorage.getItem('reportMarkdown');
        console.log("REPORT CHECK: reportMarkdown in sessionStorage =", 
          storedReport ? `${storedReport.substring(0, 50)}...` : "NULL/UNDEFINED");
        
        // Use whichever one is available (prefer state version first)
        const reportToUse = finalReportMarkdown || storedReport || "";
        
        const finalHistory = scorecardState.history.length === MAX_QUESTIONS 
          ? scorecardState.history 
          : (JSON.parse(sessionStorage.getItem('questionAnswerHistory') || '[]'));
          
        console.log("FINAL REPORT LENGTH:", reportToUse.length);
        console.log("FINAL HISTORY LENGTH:", finalHistory.length);
        
        return (
          <ScorecardResultsDisplay 
            reportMarkdown={reportToUse}
            questionAnswerHistory={finalHistory}
          />
        );
      } else {
        // This is the error path - we should never be here if generateReport correctly sets currentStep
        console.error(`RENDER_CONTENT ERROR: (Completed Flow) Unexpected currentStep='${currentStep}'. Expecting 'results'.`);
        
        // Force redirect to results
        console.log(`EMERGENCY FIX: Setting currentStep from '${currentStep}' to 'results'`);
        setCurrentStep('results');
        
        // Don't wait for a re-render, directly show the results
        const reportToUse = scorecardState.reportMarkdown || sessionStorage.getItem('reportMarkdown') || "";
        const finalHistory = scorecardState.history.length === MAX_QUESTIONS 
          ? scorecardState.history 
          : (JSON.parse(sessionStorage.getItem('questionAnswerHistory') || '[]'));
        
        return (
          <ScorecardResultsDisplay 
            reportMarkdown={reportToUse}
            questionAnswerHistory={finalHistory}
          />
        );
      }
    }

    // === Flow for Assessment IN PROGRESS (overall_status !== 'completed' or no reportMarkdown) ===
    if (isGeneratingFinalReport) {
      console.log("RENDER_CONTENT: Showing report generation loading");
      return <div className="max-w-4xl mx-auto text-center p-8">Generating your report... Please wait.</div>;
    }

    // == NEW FLOW: Industry Selection -> Lead Capture -> Assessment -> Results ==
    
    // Step 1: Industry Selection
    if (currentStep === 'industrySelection') {
      console.log("RENDER_CONTENT: Rendering IndustrySelection.");
      return (
        <IndustrySelection
          industries={industries}
          selectedIndustry={selectedIndustry}
          handleIndustryChange={handleIndustryChange}
          startAssessment={startAssessment} // Note: this now leads to lead capture form
        />
      );
    }
    
    // Step 2: Lead Capture (after industry selection, before assessment)
    if (currentStep === 'leadCapture') {
      console.log("RENDER_CONTENT: Showing PRE-assessment LeadCaptureForm");
      return (
        <LeadCaptureForm
          aiTier={null} // No tier available yet
          onSubmitSuccess={(capturedName) => handleLeadCaptureSuccess(capturedName)}
          reportMarkdown={null} // No report available yet
          questionAnswerHistory={[]} // No questions answered yet
        />
      );
    }
    
    // Step 3: Assessment Questions
    if (currentStep === 'assessment') {
      console.log("RENDER_CONTENT: Rendering AssessmentQuestion.");
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
              <div className="mt-4 pl-7">
                <button 
                  onClick={startActualAssessment}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Restart Assessment
                </button>
              </div>
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

    // Fallback for any other unhandled state when assessment is not completed
    console.warn(`RENDER_CONTENT: Unhandled state. currentStep='${currentStep}'. Reverting to IndustrySelection as default.`);
    return (
      <IndustrySelection
        industries={industries}
        selectedIndustry={selectedIndustry}
        handleIndustryChange={handleIndustryChange}
        startAssessment={startAssessment}
      />
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
