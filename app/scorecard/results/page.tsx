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

export default function ScorecardResultsPage() {
  // State to store the report and history data loaded from sessionStorage
  const [reportMarkdown, setReportMarkdown] = useState<string>('');
  const [questionAnswerHistory, setQuestionAnswerHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabChanging, setTabChanging] = useState(false);

  // Load data from sessionStorage when component mounts
  useEffect(() => {
    // Function to load data from sessionStorage
    const loadDataFromStorage = () => {
      try {
        const reportData = sessionStorage.getItem('reportMarkdown');
        const historyData = sessionStorage.getItem('questionAnswerHistory');
        
        if (reportData) {
          setReportMarkdown(reportData);
        } else {
          console.error('No report data found in sessionStorage');
        }
        
        if (historyData) {
          setQuestionAnswerHistory(JSON.parse(historyData));
        } else {
          console.error('No question history found in sessionStorage');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data from sessionStorage:', error);
        setIsLoading(false);
      }
    };
    
    // Load data if in browser environment
    if (typeof window !== 'undefined') {
      loadDataFromStorage();
    }
  }, []);

  const sections = useMemo(() => extractSections(reportMarkdown), [reportMarkdown]);
  
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

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-sg-off-white text-sg-dark-teal font-sans flex items-center justify-center">
        <div className="text-center animate-sg-fade-in">
          <div className="w-16 h-16 border-4 border-sg-mint-green border-t-sg-dark-teal rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-heading-2 font-bold">Loading Your Scorecard</h2>
          <p className="text-sg-gray-600 mt-2 text-body">Your results are being prepared...</p>
        </div>
      </div>
    );
  }

  // Show error state if no data was found
  if (!reportMarkdown) {
    return (
      <div className="min-h-screen bg-sg-off-white text-sg-dark-teal font-sans flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-sg-2xl shadow-sg-lg animate-sg-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 text-sg-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-heading-2 font-bold mb-4">Scorecard Not Found</h2>
          <p className="text-sg-gray-700 mb-6">We couldn't find your scorecard results. You may need to complete the assessment first.</p>
          <a 
            href="/" 
            className="sg-button-primary inline-block"
          >
            Start Assessment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sg-off-white text-sg-dark-teal font-sans">
      {/* Background subtle patterns */}
      <div className="absolute inset-0 bg-sg-off-white opacity-90 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-bl from-sg-mint-green/10 via-transparent to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-sg-mint-green/5 via-transparent to-transparent z-0"></div>
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-sg-mint-green/5 blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-sg-dark-teal/5 blur-3xl z-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Left sidebar with tabs */}
        <ReportSidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          cardOrder={cardOrder}
          cardTitles={cardTitles}
          companyName={undefined}
        />
        
        {/* Main content area */}
        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          {/* Header and Action Bar */}
          <MainContentHeader
            activeTabTitle={cardTitles[activeTab]}
            reportMarkdown={reportMarkdown}
          />
          
          {/* Content card with shadow */}
          <div className="relative mt-8 animate-sg-fade-in">
            {/* Shadow/glow effect for the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-sg-mint-green/20 to-sg-dark-teal/10 blur-xl rounded-sg-3xl transform translate-y-4 scale-95 z-0"></div>
            
            {/* Main content card */}
            <div className={`relative bg-white border border-gray-100 rounded-sg-3xl p-6 md:p-8 lg:p-10 shadow-sg-xl z-10 ${tabChanging ? 'opacity-0 transform translate-y-4 transition-all duration-200' : 'opacity-100 transform translate-y-0 transition-all duration-200'}`}>
              {/* Overall Tier Section */}
              {activeTab === 'Overall Tier' && sections['Overall Tier'] && (
                <OverallTierSection
                  markdownContent={sections['Overall Tier']}
                  extractedTier={extractedTier}
                />
              )}
              
              {/* Key Findings Section */}
              {activeTab === 'Key Findings' && sections['Key Findings'] && (
                <KeyFindingsSection markdownContent={sections['Key Findings']} />
              )}
              
              {/* Strategic Action Plan Section */}
              {activeTab === 'Strategic Action Plan' && sections['Strategic Action Plan'] && (
                <StrategicActionPlanSection markdownContent={sections['Strategic Action Plan']} />
              )}
              
              {/* Getting Started & Resources Section */}
              {activeTab === 'Getting Started & Resources' && sections['Getting Started & Resources'] && (
                <GettingStartedResourcesSection markdownContent={sections['Getting Started & Resources']} />
              )}
              
              {/* Illustrative Benchmarks Section */}
              {activeTab === 'Illustrative Benchmarks' && sections['Illustrative Benchmarks'] && (
                <IllustrativeBenchmarksSection markdownContent={sections['Illustrative Benchmarks']} />
              )}
              
              {/* Personalized Learning Path Section */}
              {activeTab === 'Personalized Learning Path' && sections['Personalized Learning Path'] && (
                <PersonalizedLearningPathSection markdownContent={sections['Personalized Learning Path']} />
              )}
              
              {/* Learning Hub Direction Section */}
              {activeTab === 'Learning Hub' && (
                <LearningHubDirectionSection tierLevel={extractedTier || undefined} />
              )}
              
              {/* Assessment Q&A Breakdown Section */}
              {activeTab === 'Assessment Q&A Breakdown' && (
                <AssessmentQABreakdownSection questionAnswerHistory={questionAnswerHistory} />
              )}
              
              {/* Fallback for empty/unknown sections */}
              {!currentSectionMarkdown && activeTab !== 'Assessment Q&A Breakdown' && activeTab !== 'Learning Hub' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 text-sg-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-heading-3 font-semibold text-sg-dark-teal mb-4">Content Not Available</h3>
                  <p className="text-sg-gray-600 max-w-md mx-auto">The content for the section "{cardTitles[activeTab]}" is currently not available or is being processed.</p>
                </div>
              )}
              
              {/* Back to top button (visible when scrolled down) */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-white text-sg-dark-teal p-3 rounded-full shadow-sg-md hover:shadow-sg-lg transition-all duration-200 opacity-80 hover:opacity-100"
                aria-label="Back to top"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 