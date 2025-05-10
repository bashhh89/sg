'use client';
import React, { useMemo, useState, useEffect } from 'react';
import ReportSidebar from '@/components/scorecard/ReportSidebar';
import MainContentHeader from '@/components/scorecard/MainContentHeader';
import OverallTierSection from '@/components/scorecard/sections/OverallTierSection';
import KeyFindingsSection from '@/components/scorecard/sections/KeyFindingsSection';
import StrategicActionPlanSection from '@/components/scorecard/sections/StrategicActionPlanSection';
import GettingStartedResourcesSection from '@/components/scorecard/sections/GettingStartedResourcesSection';
import IllustrativeBenchmarksSection from '@/components/scorecard/sections/IllustrativeBenchmarksSection';
import PersonalizedLearningPathSection from '@/components/scorecard/sections/PersonalizedLearningPathSection';
import AssessmentQABreakdownSection from '@/components/scorecard/sections/AssessmentQABreakdownSection';
import LearningHubDirectionSection from '@/components/scorecard/sections/LearningHubDirectionSection';
import ScorecardResultsDisplay from '@/components/ScorecardResultsDisplay';
import { Loader } from '@/components/learning-hub/loader';

// Helper to extract sections from the Markdown string
function extractSections(markdown: string): Record<string, string> {
  if (!markdown) return {};
  const sectionRegex = /(^##\s+.*$)/gim;
  const parts = markdown.split(sectionRegex).filter(Boolean);
  const sections: Record<string, string> = {};
  let currentTitleKey = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (part.startsWith('##')) {
      currentTitleKey = part.replace(/^##\s*/, '').trim();
      // Ensure 'Overall Tier' is specifically captured if its title is slightly different in markdown
      if (currentTitleKey.toLowerCase().startsWith('overall tier')) {
        sections['Overall Tier'] = (sections['Overall Tier'] || '') + part + '\n\n' + (parts[i + 1] || '');
      } else {
        sections[currentTitleKey] = (sections[currentTitleKey] || '') + part + '\n\n' + (parts[i + 1] || '');
      }
      i++; // Skip next part as it's content of current section
    } else if (currentTitleKey) {
      // Append content if it was split unexpectedly
      sections[currentTitleKey] = (sections[currentTitleKey] || '') + '\n\n' + part;
    }
  }
  return sections;
}

const cardOrder = [
  'Overall Tier',
  'Key Findings',
  'Strategic Action Plan',
  'Getting Started & Resources',
  'Illustrative Benchmarks',
  'Personalized Learning Path',
  'Learning Hub',
  'Assessment Q&A Breakdown',
];

const cardTitles: Record<string, string> = {
  'Overall Tier': 'Your AI Tier',
  'Key Findings': 'Key Findings',
  'Strategic Action Plan': 'Strategic Action Plan',
  'Getting Started & Resources': 'Getting Started & Resources',
  'Illustrative Benchmarks': 'Illustrative Benchmarks',
  'Personalized Learning Path': 'Personalized Learning Path',
  'Learning Hub': 'Continue Your Journey',
  'Assessment Q&A Breakdown': 'Assessment Q&A Breakdown',
};

// Define the history entry interface
interface HistoryEntry {
  question: string;
  answer: any;
  phaseName?: string;
}

export default function ScorecardResultsPage() {
  const [reportMarkdown, setReportMarkdown] = useState<string | null>(null);
  const [questionAnswerHistory, setQuestionAnswerHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading your AI scorecard results...");
  const [error, setError] = useState<string | null>(null);
  const [tabChanging, setTabChanging] = useState(false);

  useEffect(() => {
    // Fetch report markdown content
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        // Try to get data from sessionStorage first
        const reportData = sessionStorage.getItem('reportMarkdown');
        const historyData = sessionStorage.getItem('questionAnswerHistory');
        
        if (reportData && historyData) {
          console.log('FRONTEND: Using cached data from sessionStorage');
          setReportMarkdown(reportData);
          const parsedHistory = JSON.parse(historyData);
          setQuestionAnswerHistory(parsedHistory);
          console.log('FRONTEND: Loaded question history with', parsedHistory.length, 'items');
          setIsLoading(false);
          return;
        }
        
        // If not in sessionStorage, try localStorage
        const localReportData = localStorage.getItem('reportMarkdown');
        const localHistoryData = localStorage.getItem('questionAnswerHistory');
        
        if (localReportData && localHistoryData) {
          console.log('FRONTEND: Using cached data from localStorage');
          setReportMarkdown(localReportData);
          const parsedHistory = JSON.parse(localHistoryData);
          setQuestionAnswerHistory(parsedHistory);
          console.log('FRONTEND: Loaded question history with', parsedHistory.length, 'items from localStorage');
          
          // Also update sessionStorage for next time
          sessionStorage.setItem('reportMarkdown', localReportData);
          sessionStorage.setItem('questionAnswerHistory', localHistoryData);
          
          setIsLoading(false);
          return;
        }
        
        // If we reach here, no data was found in storage
        setError("Could not find your scorecard results. Please complete the assessment first.");
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading scorecard results:', error);
        setError('An error occurred while loading your results. Please try again.');
        setIsLoading(false);
      }
    };

    fetchReport();
  }, []);

  const sections = useMemo(() => {
    const extracted = extractSections(reportMarkdown || '');
    console.log('FRONTEND: Extracted sections:', extracted);
    return extracted;
  }, [reportMarkdown]);
  
  const extractedTier = useMemo(() => {
    if (!sections['Overall Tier']) return null;
    const tierRegex = /^##\s*Overall Tier:\s*(.*)$/im;
    const match = sections['Overall Tier']?.match(tierRegex);
    return match ? match[1].trim() : null;
  }, [sections]);

  const [activeTab, setActiveTab] = useState(cardOrder[0]);
  
  // Handle tab change with animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    setTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabChanging(false);
    }, 200);
  };
  
  // Effect to reset to the first tab if reportMarkdown changes
  useEffect(() => {
    setActiveTab(cardOrder[0]);
  }, [reportMarkdown]);

  const currentSectionMarkdown = sections[activeTab] || '';

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader size="large" />
        <p className="mt-4 text-sg-dark-teal/80">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-sg-bright-green text-white font-semibold rounded-lg shadow-md hover:bg-sg-bright-green/90 transition-colors"
          >
            Back to Assessment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {reportMarkdown && questionAnswerHistory ? (
        <ScorecardResultsDisplay 
          reportMarkdown={reportMarkdown} 
          questionAnswerHistory={questionAnswerHistory}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-sg-dark-teal mb-4">No Results Found</h1>
            <p className="text-gray-700 mb-6">
              Please complete the AI Efficiency Scorecard assessment to view your results.
            </p>
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-sg-bright-green text-white font-semibold rounded-lg shadow-md hover:bg-sg-bright-green/90 transition-colors"
            >
              Take the Assessment
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 