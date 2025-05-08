'use client';

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from 'react';
import ScorecardQuestionDisplay from '@/components/ScorecardQuestionDisplay';
import ScorecardResultsDisplay from '@/components/ScorecardResultsDisplay';

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

// --- TEMPORARY FOR TESTING RESULTS PAGE ---
// const sampleMarkdownReport = `
// ## Overall Tier: Enabler
//
// ## Key Findings
// **Strengths:**
// - Some data infrastructure exists.
// - Leadership is curious about AI potential.
// **Weaknesses:**
// - Lack of clear, documented AI strategy.
// - Limited internal AI skills/team.
// - Processes are mostly manual.
//
// ## Strategic Action Plan
// 1.  **Develop & Document Strategy:** Define clear goals, use cases, and roadmap for AI adoption relevant to the Property/Real Estate sector.
// 2.  **Identify Pilot Projects:** Select 1-2 low-risk, high-impact pilot projects (e.g., automating specific reports, lead scoring).
// 3.  **Invest in Foundational Training:** Provide basic AI literacy training for key stakeholders.
//
// ## Getting Started & Resources
// - [Example Resource: AI Strategy Template](#)
// - [Example Resource: Intro to AI for Business](#)
//
// ## Illustrative Benchmarks
// * Companies at the 'Enabler' stage in Property/Real Estate often use AI for basic market analysis or automating back-office tasks.
// * 'Leaders' might leverage predictive analytics for property valuation or personalized tenant communication.
// `;
// --- END TEMPORARY DATA ---

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

  // --- Stabilize generateReport (Dependency: selectedIndustry) ---
  const generateReport = useCallback(async (finalHistory: Array<{ question: string; answer: any }>) => {
    setScorecardState(prev => ({ ...prev, isLoading: true, error: null }));
    setIsGeneratingFinalReport(true); // Show final report loading indicator
    
    try {
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateReport',
          history: finalHistory,
          industry: selectedIndustry
        }),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        const detailedErrorMessage = `Failed to generate report. Status: ${response.status}. Body: ${errorBody}`;
        console.error(detailedErrorMessage);
        setScorecardState(prev => ({ ...prev, isLoading: false, error: detailedErrorMessage }));
        setIsGeneratingFinalReport(false); // Hide loading indicator on error
        return;
      }
      const data = await response.json();
      console.log('Successfully received report data from API:', data);
      
      // Store report data in localStorage or sessionStorage to share between pages
      if (data.reportMarkdown) {
        sessionStorage.setItem('reportMarkdown', data.reportMarkdown);
        sessionStorage.setItem('questionAnswerHistory', JSON.stringify(finalHistory));
        
        // Redirect to the new dashboard design page
        window.location.href = '/scorecard/results';
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

      // If we've reached MAX_QUESTIONS, force completion and generate report
      if (updatedHistory.length >= MAX_QUESTIONS) {
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          overall_status: 'completed'
        }));
        generateReport(updatedHistory);
        return;
      }

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

      // Only generate report if API says completed AND we've hit MAX_QUESTIONS
      if (
        (data.overall_status === 'assessment-completed' ||
         data.overall_status === 'completed' ||
         data.overall_status.includes('complet')) &&
        updatedHistory.length >= MAX_QUESTIONS
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
        generateReport(updatedHistory);
      } else if (data.overall_status === 'completed' && updatedHistory.length < MAX_QUESTIONS) {
        // If backend says completed but we haven't hit max, keep going
        // Just fetch the next question as normal
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          currentQuestion: data.questionText,
          answerType: data.answerType,
          options: data.options,
          currentPhaseName: data.currentPhaseName,
          overall_status: data.overall_status,
          reasoningText: data.reasoning_text,
          currentQuestionNumber: updatedHistory.length + 1
        }));
      } else {
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          currentQuestion: data.questionText,
          answerType: data.answerType,
          options: data.options,
          currentPhaseName: data.currentPhaseName,
          overall_status: data.overall_status,
          reasoningText: data.reasoning_text,
          currentQuestionNumber: updatedHistory.length + 1
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
  }, [selectedIndustry, isAutoCompleting, generateReport, setIsAutoCompleting, setAutoCompleteError]);

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
  
  // In the results step, stop auto-completing if needed
  if (currentStep === 'results' && isAutoCompleting) {
    setIsAutoCompleting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8faf9] text-gray-900 font-sans">
      <div className="w-full max-w-5xl mx-4 my-8 bg-white rounded-2xl shadow-xl p-0 flex flex-col items-center">
        <main className="flex flex-col gap-6 items-center w-full p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0a3d3d] text-center mt-2 mb-2">
            Social Garden AI Efficiency Scorecard
          </h1>
          {/* Subtitle for all screens */}
          <p className="text-center text-gray-600 mb-2 text-base">
            Assess your organization's AI maturity and get personalized recommendations
          </p>
          {/* Display errors if any - shown on all steps */}
          {scorecardState.error && (
            <div className="w-full mt-2 p-4 bg-[#e6fbf1] border-l-4 border-[#A6F4C5] text-[#0a3d3d] rounded shadow-md">
              <p className="font-bold">An Error Occurred:</p>
              <p className="break-words">{scorecardState.error}</p>
            </div>
          )}
          {currentStep === 'industrySelection' && (
            <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center border border-[#e5e7eb]">
              <div className="w-full">
                <h2 className="text-lg font-bold text-[#0a3d3d] mb-2">Select Your Industry</h2>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6F4C5] focus:border-[#A6F4C5] text-gray-800 font-sans shadow-sm transition-all"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={startAssessment}
                className={
                  `w-full py-3 px-6 rounded-lg font-bold text-lg shadow-md transition-all duration-150 ` +
                  (scorecardState.isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                    : 'bg-[#A6F4C5] text-[#0a3d3d] hover:bg-[#7be6a7] hover:scale-[1.03] active:scale-100')
                }
                disabled={scorecardState.isLoading}
                style={{ letterSpacing: '0.01em' }}
              >
                {scorecardState.isLoading ? 'Loading...' : 'Start Assessment'}
              </button>
            </div>
          )}
          {currentStep === 'assessment' && (
            <div className="w-full">
              {/* Show auto-complete error if present */}
              {autoCompleteError && (
                <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '10px', borderRadius: '6px', background: '#fff5f5' }}>
                  <strong>Auto-Complete Error:</strong> {autoCompleteError}
                </div>
              )}
              {/* Show ScorecardQuestionDisplay when we have a question */}
              {scorecardState.currentQuestion && (
                <ScorecardQuestionDisplay
                  question={typeof scorecardState.currentQuestion === 'string' ? scorecardState.currentQuestion : ''}
                  answerType={typeof scorecardState.answerType === 'string' ? scorecardState.answerType : ''}
                  options={Array.isArray(scorecardState.options) ? scorecardState.options : null}
                  onSubmitAnswer={handleAnswerSubmit}
                  isLoading={scorecardState.isLoading}
                  currentPhaseName={scorecardState.currentPhaseName}
                  currentQuestionNumber={scorecardState.currentQuestionNumber}
                  maxQuestions={scorecardState.maxQuestions}
                  assessmentPhases={scorecardState.assessmentPhases}
                  reasoningText={scorecardState.reasoningText || undefined}
                  isAutoCompleting={isAutoCompleting}
                  setIsAutoCompleting={setIsAutoCompleting}
                  setAutoCompleteError={setAutoCompleteError}
                  handleStartAutoComplete={handleStartAutoComplete}
                  overallStatus={scorecardState.overall_status}
                  questionAnswerHistory={scorecardState.history}
                  industry={scorecardState.industry}
                />
              )}
              {/* Show loading placeholder if loading and no question yet */}
              {!scorecardState.currentQuestion && scorecardState.isLoading && (
                <div className="w-full p-6 border rounded-lg shadow-md text-gray-800 bg-white">
                  <p>Loading assessment questions...</p>
                </div>
              )}
              {/* In the assessment step, show a message if no question is present */}
              {currentStep === 'assessment' && !scorecardState.currentQuestion && !scorecardState.isLoading && (
                <div className="w-full p-6 border rounded-lg shadow-md text-gray-800 bg-white">
                  <p>No question available. The assessment may be complete or failed to load. Please restart the assessment.</p>
                </div>
              )}
            </div>
          )}
          {currentStep === 'results' && scorecardState.reportMarkdown && (
            <ScorecardResultsDisplay 
              reportMarkdown={scorecardState.reportMarkdown} 
              questionAnswerHistory={scorecardState.history}
            />
          )}
          {currentStep === 'results' && !scorecardState.reportMarkdown && scorecardState.isLoading && (
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-[#e5e7eb] text-gray-800 text-center">
              <p className="text-lg font-semibold">Generating your results...</p>
            </div>
          )}
        </main>
      </div>
      {/* Show final loading state when generating report (just before results page) */}
      {isGeneratingFinalReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 border-4 border-[#68F6C8] border-t-[#004851] rounded-full animate-spin mx-auto"></div>
            </div>
            <h3 className="text-2xl font-bold text-[#004851] mb-3">Generating Your AI Scorecard</h3>
            <p className="text-gray-600 mb-2">This may take a moment as we analyze your answers and create a personalized report.</p>
            <p className="text-gray-500 text-sm">Please don't close this window.</p>
          </div>
        </div>
      )}
    </div>
  );
}
