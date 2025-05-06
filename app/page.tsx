'use client';

import Image from "next/image";
import { useState } from 'react';
import ScorecardQuestionDisplay from '@/components/ScorecardQuestionDisplay';
import ScorecardResultsDisplay from '@/components/ScorecardResultsDisplay';

// Define the ScorecardState interface
interface ScorecardState {
  currentPhaseName: string;
  currentQuestion: string | null;
  answerType: string | null;
  options: string[] | null;
  history: Array<{ question: string; answer: any }>;
  isLoading: boolean;
  error: string | null;
  overall_status: string; // 'assessment-in-progress' | 'assessment-completed' | 'results-generated' etc.
  reportMarkdown: string | null;
  reasoningText: string | null; // Added for AI thinking display
}

export default function Home() {
  // Define state for current step in the assessment flow
  const [currentStep, setCurrentStep] = useState<string>('industrySelection');
  
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
    overall_status: 'not-started', // Indicate assessment hasn't begun
    reportMarkdown: null,
    reasoningText: null, // Initialize as null
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
  
  // Start the assessment process
  const startAssessment = async () => {
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
      
      // Check if the response is not OK
      if (!response.ok) {
        // Try to extract error details from the response
        const errorBody = await response.text();
        const detailedErrorMessage = `Failed to start assessment. Status: ${response.status}. Body: ${errorBody}`;
        console.error(detailedErrorMessage);
        
        // Update state with detailed error and exit the function
        setScorecardState(prev => ({ ...prev, isLoading: false, error: detailedErrorMessage }));
        return;
      }
      
      // Parse the successful response
      const data = await response.json();
      console.log('Successfully received data from API:', data);
      
      // Update state with the first question
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        currentQuestion: data.questionText,
        answerType: data.answerType,
        options: data.options,
        currentPhaseName: data.currentPhaseName,
        overall_status: data.overall_status,
        reasoningText: data.reasoningText // Store reasoning text
      }));
      
      // Change view to assessment
      setCurrentStep('assessment');
    } catch (error: any) {
      // Log the full error for debugging
      console.error('Detailed error in startAssessment:', error);
      
      // Update state with user-friendly error message
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred in startAssessment: ${error.message || 'Unknown error'}`
      }));
    }
  };
  
  // Handle submitting an answer
  const handleAnswerSubmit = async (answer: any) => {
    const currentQ = scorecardState.currentQuestion;
    if (!currentQ) return; // Should not happen if button is only shown when there's a question
    
    // Update history locally first and set loading state
    const newHistory = [...scorecardState.history, { question: currentQ, answer: answer }];
    console.log('Setting isLoading: true before API call');
    setScorecardState(prev => ({ ...prev, isLoading: true, error: null, history: newHistory }));
    
    try {
      // Make POST request to API
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPhaseName: scorecardState.currentPhaseName,
          history: newHistory,
          industry: selectedIndustry
        }),
      });
      
      // Check if the response is not OK
      if (!response.ok) {
        // Try to extract error details from the response
        const errorBody = await response.text();
        const detailedErrorMessage = `Failed to submit answer. Status: ${response.status}. Body: ${errorBody}`;
        console.error(detailedErrorMessage);
        
        // Update state with detailed error and exit the function
        console.log('Setting isLoading: false due to API error');
        setScorecardState(prev => ({ ...prev, isLoading: false, error: detailedErrorMessage }));
        return;
      }
      
      // Parse the successful response
      const data = await response.json();
      console.log('Successfully received answer data from API:', data);
      
      // Check if assessment is completed
      if (data.overall_status === 'assessment-completed') {
        console.log('>>> Assessment completed, setting isLoading: false before report generation');
        // Reset loading state before generating the report
        setScorecardState(prev => ({
          ...prev,
          isLoading: false,
          overall_status: data.overall_status
        }));
        console.log('<<< State update for COMPLETED assessment supposedly complete, now generating report');
        // Generate the report
        generateReport(newHistory);
      } else {
        console.log('>>> Updating state with NEXT question data:', data);
        // Update state with the next question
        setScorecardState(prev => ({
          ...prev,
          isLoading: false, // Explicitly ensure loading is set to false
          currentQuestion: data.questionText,
          answerType: data.answerType,
          options: data.options,
          currentPhaseName: data.currentPhaseName,
          overall_status: data.overall_status,
          reasoningText: data.reasoningText // Store reasoning text
        }));
        console.log('<<< State update for NEXT question supposedly complete.');
      }
    } catch (error: any) {
      // Log the full error for debugging
      console.error('Detailed error in handleAnswerSubmit:', error);
      
      // Update state with user-friendly error message
      console.log('Setting isLoading: false due to caught error');
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred in handleAnswerSubmit: ${error.message || 'Unknown error'}`
      }));
    }
  };
  
  // Generate the final report
  const generateReport = async (finalHistory: Array<{ question: string; answer: any }>) => {
    // Set loading state
    setScorecardState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Make POST request to API
      const response = await fetch('/api/scorecard-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateReport',
          history: finalHistory,
          industry: selectedIndustry
        }),
      });
      
      // Check if the response is not OK
      if (!response.ok) {
        // Try to extract error details from the response
        const errorBody = await response.text();
        const detailedErrorMessage = `Failed to generate report. Status: ${response.status}. Body: ${errorBody}`;
        console.error(detailedErrorMessage);
        
        // Update state with detailed error and exit the function
        setScorecardState(prev => ({ ...prev, isLoading: false, error: detailedErrorMessage }));
        return;
      }
      
      // Parse the successful response
      const data = await response.json();
      console.log('Successfully received report data from API:', data);
      
      // Update state with the report
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        reportMarkdown: data.reportMarkdown,
        overall_status: 'results-generated'
      }));
      
      // Change view to results
      setCurrentStep('results');
    } catch (error: any) {
      // Log the full error for debugging
      console.error('Detailed error in generateReport:', error);
      
      // Update state with user-friendly error message
      setScorecardState(prev => ({
        ...prev,
        isLoading: false,
        error: `An unexpected error occurred in generateReport: ${error.message || 'Unknown error'}`
      }));
    }
  };

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
              {/* Show ScorecardQuestionDisplay when we have a question */}
              {scorecardState.currentQuestion && (
                <ScorecardQuestionDisplay
                  question={scorecardState.currentQuestion}
                  answerType={scorecardState.answerType!}
                  options={scorecardState.options}
                  onSubmitAnswer={handleAnswerSubmit}
                  isLoading={scorecardState.isLoading}
                  currentPhaseName={scorecardState.currentPhaseName}
                  currentQuestionNumber={scorecardState.history.length + 1}
                  maxQuestions={MAX_QUESTIONS}
                  assessmentPhases={ASSESSMENT_PHASES}
                  reasoningText={scorecardState.reasoningText ?? undefined}
                />
              )}
              {/* Show loading placeholder if loading and no question yet */}
              {!scorecardState.currentQuestion && scorecardState.isLoading && (
                <div className="w-full p-6 border rounded-lg shadow-md text-gray-800 bg-white">
                  <p>Loading assessment questions...</p>
                </div>
              )}
            </div>
          )}
          {currentStep === 'results' && scorecardState.reportMarkdown && (
            <ScorecardResultsDisplay reportMarkdown={scorecardState.reportMarkdown} />
          )}
          {currentStep === 'results' && !scorecardState.reportMarkdown && scorecardState.isLoading && (
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-[#e5e7eb] text-gray-800 text-center">
              <p className="text-lg font-semibold">Generating your results...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
