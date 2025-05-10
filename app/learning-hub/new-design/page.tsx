'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewLearningHubPage() {
  const [activeSection, setActiveSection] = useState('courses');
  const [sidebarHovered, setSidebarHovered] = useState(false);
  
  // Simple sections for the sidebar
  const sections = [
    { 
      id: 'courses', 
      title: 'Mini Courses', 
      description: 'Hands-on AI learning for marketers',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M9.75 8.75V15.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.25 8.75V15.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'checklists', 
      title: 'AI Checklists', 
      description: 'Step-by-step guides to implement AI',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            stroke="currentColor"
          />
        </svg>
      )
    },
    { 
      id: 'prompts', 
      title: 'Prompt Library', 
      description: 'Ready-to-use prompt templates',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.25 5.75C19.25 4.92157 18.5784 4.25 17.75 4.25H6.25C5.42157 4.25 4.75 4.92157 4.75 5.75V19.25L8.75 17.25L12.75 19.25L16.75 17.25L20.75 19.25V8.25" 
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
            stroke="currentColor"
          />
        </svg>
      )
    },
    { 
      id: 'tools', 
      title: 'Recommended Tools', 
      description: 'Curated AI tools for marketing',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 9.75C10.5 10.3023 10.0523 10.75 9.5 10.75C8.94772 10.75 8.5 10.3023 8.5 9.75C8.5 9.19772 8.94772 8.75 9.5 8.75C10.0523 8.75 10.5 9.19772 10.5 9.75Z" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M15.25 12C15.25 13.7949 13.7949 15.25 12 15.25C10.2051 15.25 8.75 13.7949 8.75 12C8.75 10.2051 10.2051 8.75 12 8.75C13.7949 8.75 15.25 10.2051 15.25 12Z" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      )
    },
    { 
      id: 'templates', 
      title: 'AI Templates', 
      description: 'Document and workflow templates',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.25 11.75L17.6644 6.20056C17.4191 5.34195 16.6344 4.75 15.7414 4.75H8.2586C7.36564 4.75 6.58087 5.34196 6.33555 6.20056L4.75 11.75" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M10.75 12.75H13.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.75 15.75H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.75 18.75H15.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.75 19.25V9.75H19.25V19.25H4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  // Sample checklists
  const aiChecklists = [
    {
      id: 'ai-adoption',
      title: 'AI Adoption Checklist',
      description: 'Essential steps to successfully adopt AI in your marketing team',
      items: ['Assess current processes', 'Define clear goals', 'Data readiness check', 'Select tools', 'Train team']
    },
    {
      id: 'content-creation',
      title: 'AI Content Creation Checklist',
      description: 'How to effectively use AI for creating engaging marketing content',
      items: ['Define brand voice', 'Prepare detailed briefs', 'Research audience', 'Create templates', 'Review & refine']
    },
  ];

  // Sample prompt templates
  const promptTemplates = [
    {
      id: 'email-campaign',
      title: 'Email Campaign Generator',
      description: 'Create compelling email campaigns that drive engagement',
      category: 'Email Marketing'
    },
    {
      id: 'social-posts',
      title: 'Social Media Content Calendar',
      description: 'Generate a month of varied social media content',
      category: 'Social Media'
    }
  ];

  // Sample AI tools
  const aiTools = [
    {
      id: 'tool-1',
      name: 'Undetectable AI',
      category: 'Content Creation',
      description: 'Advanced AI content detector that also offers a "Humanizer" feature'
    },
    {
      id: 'tool-2',
      name: 'Wispr Flow',
      category: 'Productivity',
      description: 'AI-powered voice dictation tool that transcribes speech to text across applications'
    }
  ];

  // Sample course modules
  const courseModules = [
    {
      id: 'ai-content-strategy',
      title: 'AI-Assisted Content Strategy',
      description: 'Planning & Personalization at Scale for content marketing strategies',
      tier: 'Enabler',
      icon: (
        <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      lessons: [
        {
          id: 'content-strategy-intro',
          title: 'Introduction to AI Content Strategy',
          duration: '10 min',
          completed: false,
          type: 'video'
        },
        {
          id: 'lesson-1',
          title: 'AI for Content Audit & Performance Analysis',
          duration: '20 min',
          completed: false,
          type: 'reading'
        },
        {
          id: 'lesson-2',
          title: 'AI-Powered Topic Clustering & Pillar Content Strategy',
          duration: '20 min',
          completed: false,
          type: 'exercise'
        },
        {
          id: 'lesson-3',
          title: 'AI for Content Gap Analysis & Competitor Insights',
          duration: '15 min',
          completed: false,
          type: 'reading'
        },
        {
          id: 'lesson-4',
          title: 'AI-Driven Content Personalization at Scale',
          duration: '20 min',
          completed: false,
          type: 'exercise'
        },
        {
          id: 'lesson-5',
          title: 'Integrating AI into Your Content Calendar & Planning',
          duration: '15 min',
          completed: false,
          type: 'reading'
        },
        {
          id: 'course-conclusion',
          title: 'Course Summary & Next Steps',
          duration: '10 min',
          completed: false,
          type: 'quiz'
        }
      ]
    },
    {
      id: 'ai-content-creation',
      title: 'AI Content Creation',
      description: 'Learn how to use AI to create high-quality marketing content at scale',
      tier: 'Dabbler',
      icon: (
        <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to AI Content Tools',
          duration: '15 min',
          completed: true,
          type: 'video'
        },
        {
          id: 'lesson-2',
          title: 'Crafting Effective Prompts',
          duration: '20 min',
          completed: true,
          type: 'reading'
        },
        {
          id: 'lesson-3',
          title: 'Editing and Refining AI Output',
          duration: '25 min',
          completed: false,
          type: 'exercise'
        },
        {
          id: 'lesson-4',
          title: 'Content Strategy with AI',
          duration: '18 min',
          completed: false,
          type: 'video'
        },
        {
          id: 'lesson-5',
          title: 'Knowledge Check',
          duration: '10 min',
          completed: false,
          type: 'quiz'
        }
      ]
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering Fundamentals',
      description: 'Master the art of creating prompts that generate exactly what you need',
      tier: 'Leader',
      icon: (
        <svg className="w-10 h-10 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      lessons: [
        {
          id: 'pe-lesson-1',
          title: 'Prompt Structure Basics',
          duration: '12 min',
          completed: false,
          type: 'video'
        },
        {
          id: 'pe-lesson-2',
          title: 'Context and Constraints',
          duration: '18 min',
          completed: false,
          type: 'reading'
        },
        {
          id: 'pe-lesson-3',
          title: 'Chain of Thought Prompting',
          duration: '22 min',
          completed: false,
          type: 'exercise'
        },
        {
          id: 'pe-lesson-4',
          title: 'Troubleshooting Common Issues',
          duration: '15 min',
          completed: false,
          type: 'video'
        }
      ]
    }
  ];

  // Add animation effects
  useEffect(() => {
    const sidebar = document.getElementById('learning-hub-sidebar');
    if (sidebar) {
      sidebar.classList.add('animate-slide-in-left');
    }
    
    const content = document.getElementById('learning-hub-content');
    if (content) {
      content.classList.add('animate-fade-in');
    }
  }, []);

  const handleLessonComplete = (lessonId: string) => {
    // In a real app, this would update the user's progress in a database
    console.log(`Lesson ${lessonId} marked as complete`);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'checklists':
        // If a checklist is selected, show its content
        if (selectedChecklistTitle) {
          // Use tieredChecklists for the first four checklists
          if (tieredChecklists[selectedChecklistTitle] && tieredChecklists[selectedChecklistTitle][currentUserTier]) {
            const tierContent = tieredChecklists[selectedChecklistTitle][currentUserTier];
            return (
              <KillerChecklistDisplay
                checklistTitle={tierContent.checklistTitle}
                introduction={tierContent.introduction}
                items={tierContent.items}
                onBack={() => setSelectedChecklistTitle(null)}
              />
            );
          }
          // Default: placeholder for other checklists
          return (
            <div className="w-full">
              <button
                className="mb-6 text-[#004851] hover:underline flex items-center gap-1 text-sm font-semibold"
                onClick={() => setSelectedChecklistTitle(null)}
              >
                ← Back to All Checklists
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#004851] mb-4">{selectedChecklistTitle}</h2>
              <div className="bg-[#f8faf9] border border-gray-200 rounded-lg p-6 text-gray-700 max-w-2xl">
                <p>
                  Detailed steps for '{selectedChecklistTitle}' will appear here. This checklist will guide you through the process step-by-step.
                </p>
              </div>
            </div>
          );
        }

        // Main checklists list view
        return (
          <div>
            <h2 className="text-3xl font-bold text-[#004851] mb-4">AI Implementation Checklists</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl">
              Select a checklist below to view step-by-step guidance for your AI initiatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checklistTitles.map((title) => (
                <div 
                  key={title}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleChecklistView(title)}
                >
                  <div className="h-1.5 bg-gradient-to-r from-[#68F6C8] to-[#01CEFE]"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#004851] mb-3">{title}</h3>
                    <p className="text-gray-600 mb-4">Step-by-step guide for implementing this AI strategy</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#004851]/70">
                        {tieredChecklists[title] && tieredChecklists[title][currentUserTier] 
                          ? tieredChecklists[title][currentUserTier].items.length 
                          : '8-12'} items
                      </span>
                      <span className="text-[#68F6C8] font-semibold hover:underline">View Checklist →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'prompts':
        // Filter prompts
        const filteredPrompts = samplePrompts.filter(p => {
          const tierMatch = selectedPromptTier === 'All' || p.tier === selectedPromptTier;
          const catMatch = selectedPromptCategory === 'All' || p.category === selectedPromptCategory;
          return tierMatch && catMatch;
        });

        // Prompt Detail View
        if (selectedPromptDetail) {
          const parsed = parsePromptText(selectedPromptDetail.fullText);
          return (
            <div className="w-full max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-8 relative animate-fade-in">
              <button
                className="inline-flex items-center gap-2 bg-[#68F6C8] text-[#004851] font-semibold py-2 px-4 rounded-lg shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#68F6C8] mb-8 transition-colors"
                onClick={() => setSelectedPromptDetail(null)}
                type="button"
                aria-label="Back to Prompts"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back to Prompts
              </button>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004851] mb-6">{selectedPromptDetail.title}</h2>
              <div className="mb-6">
                <span className="inline-block bg-[#68F6C8]/20 text-[#004851] font-semibold rounded px-3 py-1 mr-2 text-sm">{selectedPromptDetail.tier}</span>
                <span className="inline-block bg-[#004851]/10 text-[#004851] font-semibold rounded px-3 py-1 text-sm">{selectedPromptDetail.category}</span>
              </div>
              <div className="mb-8">
                <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 font-mono text-base min-h-[120px] leading-relaxed break-words">
                  {parsed.map((part, idx) => {
                    if (part.type === 'text') return <span key={idx}>{part.value}</span>;
                    if (part.type === 'placeholder' && part.key && selectedPromptDetail.placeholders[part.key]) {
                      const meta = selectedPromptDetail.placeholders[part.key];
                      return (
                        <InteractivePlaceholder
                          key={part.key}
                          placeholderKey={part.key}
                          value={customizedPromptValues[part.key] || ''}
                          guidance={meta.guidance}
                          examples={meta.examples}
                          onUpdate={val => setCustomizedPromptValues(v => ({ ...v, [part.key!]: val }))}
                        />
                      );
                    }
                    // Fallback for unknown placeholder
                    return <span key={idx} className="bg-red-100 text-red-700 px-1 rounded">{part.value}</span>;
                  })}
                </div>
              </div>
              <CopyPromptButton promptText={buildFinalPrompt(selectedPromptDetail.fullText, customizedPromptValues)} promptId={selectedPromptDetail.id} />
            </div>
          );
        }

        // Prompt List View
        return (
          <div>
            <h2 className="text-3xl font-bold text-[#004851] mb-4">Prompt Library</h2>
            <p className="text-gray-600 mb-6">
              Access our collection of ready-to-use AI prompts for marketing tasks. 
              Customize and copy them to use with your favorite AI tools.
            </p>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-xl shadow border border-gray-100">
              {/* Tier Filter */}
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <label htmlFor="prompt-tier-select" className="text-[#004851] font-semibold text-base mr-2">Tier:</label>
                <select
                  id="prompt-tier-select"
                  value={selectedPromptTier}
                  onChange={e => setSelectedPromptTier(e.target.value as any)}
                  className="p-2 rounded-lg border border-[#68F6C8] bg-white text-[#004851] font-semibold focus:ring-2 focus:ring-[#68F6C8] focus:outline-none shadow-sm"
                >
                  <option value="All">All Tiers</option>
                  <option value="Dabbler">Dabbler</option>
                  <option value="Enabler">Enabler</option>
                  <option value="Leader">Leader</option>
                </select>
              </div>
              {/* Category Filter */}
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <label htmlFor="prompt-category-select" className="text-[#004851] font-semibold text-base mr-2">Category:</label>
                <select
                  id="prompt-category-select"
                  value={selectedPromptCategory}
                  onChange={e => setSelectedPromptCategory(e.target.value)}
                  className="p-2 rounded-lg border border-[#68F6C8] bg-white text-[#004851] font-semibold focus:ring-2 focus:ring-[#68F6C8] focus:outline-none shadow-sm"
                >
                  {promptCategories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Prompt List */}
            <div className="space-y-4">
              {filteredPrompts.length === 0 ? (
                <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-100 shadow">
                  No prompts found for the selected filters.
                </div>
              ) : (
                filteredPrompts.map(prompt => (
                  <div key={prompt.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-[#004851]">{prompt.title}</h3>
                      <div className="flex space-x-2">
                        <span className="bg-[#68F6C8]/20 text-[#004851] text-xs font-semibold px-3 py-1 rounded-full">
                          {prompt.tier}
                        </span>
                        <span className="bg-[#004851]/10 text-[#004851] text-xs font-semibold px-3 py-1 rounded-full">
                          {prompt.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                      {prompt.fullText.split('\n')[0].substring(0, 100)}...
                    </p>
                    <button 
                      onClick={() => setSelectedPromptDetail(prompt)}
                      className="bg-[#68F6C8] hover:bg-[#68F6C8]/90 text-[#004851] px-4 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md flex items-center gap-2 ml-auto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Prompt
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      
      case 'tools':
        // Only show tools for the user's tier
        const tierFiltered = masterToolList.filter(tool => 
          tool.bestForTiers.includes(simulatedUserProfile.aiReadinessTier));

        // Filter by selected challenges (if any)
        const challengeFiltered = selectedChallenges.length === 0
          ? tierFiltered
          : tierFiltered.filter(tool => 
              tool.solvesChallenges.some(ch => selectedChallenges.includes(ch)));

        // Filter by category
        const categoryFiltered = selectedCategory === 'All'
          ? challengeFiltered
          : challengeFiltered.filter(tool => tool.uiCategory === selectedCategory);

        // Filter by search
        const filteredTools = categoryFiltered.filter(tool =>
          tool.toolName.toLowerCase().includes(search.toLowerCase()) ||
          tool.briefDescription.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div className="w-full py-6">
            <h2 className="text-3xl font-bold text-[#004851] mb-3">Recommended AI Tools for You</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Based on your AI readiness and identified needs, here are some tools that can help you make significant progress. Our pro tips will guide you on how to get the most out of them!
            </p>
            
            {/* Filter by Challenge */}
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold text-[#004851] text-base">Filter by Challenge</span>
              <button
                aria-label="What is a challenge filter?"
                className="text-[#68F6C8] hover:text-[#004851] focus:outline-none"
                onMouseEnter={() => setShowChallengeInfo(true)}
                onMouseLeave={() => setShowChallengeInfo(false)}
                onFocus={() => setShowChallengeInfo(true)}
                onBlur={() => setShowChallengeInfo(false)}
                tabIndex={0}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#68F6C8" strokeWidth="2" fill="white" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" stroke="#68F6C8" />
                </svg>
              </button>
              {showChallengeInfo && (
                <span className="ml-2 bg-white border border-gray-200 rounded px-3 py-2 text-xs text-gray-700 shadow-lg absolute z-30">
                  Filter tools by the problem you want to solve (e.g. "Reduce manual tasks").
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {topChallenges.map(challenge => (
                <button
                  key={challenge}
                  className={
                    'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ' +
                    (selectedChallenges.includes(challenge)
                      ? 'bg-[#68F6C8] text-[#004851] border-[#68F6C8] shadow'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-[#68F6C8]/10 hover:text-[#004851]')
                  }
                  onClick={() => setSelectedChallenges(selectedChallenges.includes(challenge)
                    ? selectedChallenges.filter(c => c !== challenge)
                    : [...selectedChallenges, challenge])}
                  type="button"
                >
                  {challenge.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
              {moreChallenges.length > 0 && (
                <div className="relative">
                  <button
                    className="px-3 py-1 rounded-full text-xs font-semibold border bg-white text-gray-700 border-gray-200 hover:bg-[#68F6C8]/10 hover:text-[#004851] ml-2"
                    onClick={() => setShowMoreFilters(v => !v)}
                    type="button"
                  >
                    More Filters
                  </button>
                  {showMoreFilters && (
                    <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[180px] max-h-60 overflow-y-auto">
                      {moreChallenges.map(challenge => (
                        <button
                          key={challenge}
                          className={
                            'block w-full text-left px-3 py-1 rounded text-xs font-semibold border-b border-gray-100 last:border-b-0 ' +
                            (selectedChallenges.includes(challenge)
                              ? 'bg-[#68F6C8] text-[#004851]'
                              : 'bg-white text-gray-700 hover:bg-[#68F6C8]/10 hover:text-[#004851]')
                          }
                          onClick={() => setSelectedChallenges(selectedChallenges.includes(challenge)
                            ? selectedChallenges.filter(c => c !== challenge)
                            : [...selectedChallenges, challenge])}
                          type="button"
                        >
                          {challenge.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Divider */}
            <div className="w-full h-[1.5px] bg-gray-100 my-6 rounded"></div>
            
            {/* Filter by Category */}
            <div className="mb-2 flex items-center gap-2 mt-2">
              <span className="font-semibold text-[#004851] text-base">Filter by Category</span>
              <button
                aria-label="What is a category filter?"
                className="text-[#68F6C8] hover:text-[#004851] focus:outline-none"
                onMouseEnter={() => setShowCategoryInfo(true)}
                onMouseLeave={() => setShowCategoryInfo(false)}
                onFocus={() => setShowCategoryInfo(true)}
                onBlur={() => setShowCategoryInfo(false)}
                tabIndex={0}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#68F6C8" strokeWidth="2" fill="white" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" stroke="#68F6C8" />
                </svg>
              </button>
              {showCategoryInfo && (
                <span className="ml-2 bg-white border border-gray-200 rounded px-3 py-2 text-xs text-gray-700 shadow-lg absolute z-30">
                  Browse tools by type or function (e.g. "Content Creation").
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 items-center mb-8">
              {mainCategories.map(cat => (
                <button
                  key={cat}
                  className={
                    'px-6 py-2 rounded-full font-semibold text-base transition-all duration-150 ' +
                    (selectedCategory === cat
                      ? 'bg-[#004851] text-white shadow-lg border-2 border-[#68F6C8] scale-105'
                      : 'bg-gray-100 text-[#004851] border border-gray-200 hover:bg-[#68F6C8]/10 hover:text-[#004851]')
                  }
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Search bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#68F6C8] focus:outline-none text-base"
              />
            </div>
            
            {/* Tool Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-16 text-lg">
                  No tools found for your selection.
                </div>
              ) : (
                filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))
              )}
            </div>
          </div>
        );
      
      case 'templates':
        return (
          <div>
            <h2 className="text-3xl font-bold text-[#004851] mb-8">AI Templates</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-[#68F6C8] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-bold text-[#004851] mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Our AI templates section is currently under development.<br/>
                Check back soon for more resources.
              </p>
              <button className="bg-[#004851] hover:bg-[#004851]/90 text-white px-6 py-3 rounded-lg transition-all font-medium shadow-sm hover:shadow-md">
                Explore Other Resources
              </button>
            </div>
          </div>
        );
      case 'courses':
        return (
          <div>
            <h2 className="text-3xl font-bold text-[#004851] mb-4">AI Mini Courses</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Hands-on learning modules to help you master AI marketing skills. Each course includes video lessons, reading materials, quizzes, and practical exercises.
            </p>
            
            <div className="bg-gradient-to-br from-[#004851] to-[#003842] rounded-2xl shadow-2xl overflow-hidden mb-12">
              <div className="p-8 text-white relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#68F6C8]/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#01CEFE]/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 rounded-xl bg-[#68F6C8] flex items-center justify-center text-[#004851] shadow-lg">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Course Collection</h3>
                        <p className="text-[#68F6C8]">Expert-led AI marketing courses</p>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-6 max-w-xl">
                      Our mini-courses help you master AI marketing tools and techniques with practical, hands-on guidance. Start with the AI Content Creation course to learn the fundamentals.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                      {['Marketing', 'AI Tools', 'Productivity', 'Content', 'Beginner-Friendly'].map((tag, i) => (
                        <span key={i} className="text-xs py-1 px-3 bg-white/10 text-white/90 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-2">Course Features</h4>
                    <ul className="space-y-3">
                      {[
                        'Self-paced video lessons',
                        'Practical exercises',
                        'Knowledge check quizzes',
                        'Completion certificates',
                        'Resource downloads'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/80">
                          <svg className="w-5 h-5 text-[#68F6C8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {courseModules.map(course => (
                <Link 
                  href={`/learning-hub/course/${course.id}`}
                  key={course.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-4 bg-gradient-to-r from-[#68F6C8] to-[#01CEFE]"></div>
                  
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3 items-start">
                        <div className={`p-2 rounded-lg ${
                          course.tier === 'Dabbler' ? 'bg-green-50' : 
                          course.tier === 'Enabler' ? 'bg-blue-50' : 
                          'bg-purple-50'
                        }`}>
                          {course.icon}
                        </div>
                        <h3 className="text-xl font-bold text-[#004851] group-hover:text-[#68F6C8] transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.tier === 'Dabbler' ? 'bg-green-100 text-green-800' : 
                        course.tier === 'Enabler' ? 'bg-blue-100 text-blue-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {course.tier === 'Dabbler' ? (
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Dabbler
                          </div>
                        ) : course.tier === 'Enabler' ? (
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Enabler
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Leader
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm flex-1">{course.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.lessons.reduce((total, lesson) => total + parseInt(lesson.duration.split(' ')[0]), 0)} min
                        </span>
                        <span>{course.lessons.length} lessons</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#68F6C8] rounded-full transition-all duration-500"
                            style={{ width: `${(course.lessons.filter(lesson => lesson.completed).length / course.lessons.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 text-xs text-gray-500 font-medium">
                          {Math.round((course.lessons.filter(lesson => lesson.completed).length / course.lessons.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {course.lessons.slice(0, 3).map((lesson, i) => (
                        <div 
                          key={i}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white ${
                            lesson.type === 'video' ? 'bg-blue-100 text-blue-700' :
                            lesson.type === 'reading' ? 'bg-green-100 text-green-700' :
                            lesson.type === 'exercise' ? 'bg-amber-100 text-amber-700' :
                            'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {lesson.type.charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {course.lessons.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white">
                          +{course.lessons.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-[#004851] group-hover:text-[#68F6C8] transition-colors font-medium text-sm">
                      Start Course
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-md">
              <h3 className="text-xl font-bold text-[#004851] mb-2">More Courses Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                We're working on additional courses covering AI-powered marketing automation, audience analytics, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button className="bg-[#004851] hover:bg-[#004851]/90 text-white px-6 py-3 rounded-lg transition-all font-medium shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Subscribe for Updates
                </button>
                
                <span className="text-gray-500">or</span>
                
                <Link 
                  href="/learning-hub/recommended-tools" 
                  className="text-[#004851] hover:text-[#68F6C8] font-medium flex items-center gap-1 transition-colors"
                >
                  Explore AI Tools
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      
      default:
        return renderSectionContent('checklists');
    }
  };
  
  return (
    <div className="flex min-h-screen bg-[#F8FBFC]">
      {/* Enhanced Sidebar */}
      <div 
        id="learning-hub-sidebar"
        className="w-[300px] bg-gradient-to-b from-[#004851] to-[#003842] shadow-xl flex flex-col transform-gpu transition-all duration-500"
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="px-8 pt-10 pb-8 bg-gradient-to-r from-[#004851]/80 to-transparent">
          <div className="flex items-start">
            <div className="mr-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#68F6C8] flex items-center justify-center text-[#004851] font-bold text-2xl shadow-lg relative z-10">
                SG
              </div>
              <div className="w-12 h-12 rounded-full bg-[#68F6C8]/20 absolute -top-1 -left-1 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#68F6C8] tracking-tight leading-tight">AI Learning</h1>
              <h2 className="text-3xl font-extrabold text-white tracking-tighter leading-tight">HUB</h2>
              <div className="mt-1 text-[#68F6C8]/60 font-light text-sm">Marketing Resources</div>
            </div>
          </div>
        </div>
        
        {/* User tier badge - enhanced */}
        <div className="mx-6 mt-4 mb-8 bg-[#68F6C8]/10 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute w-40 h-40 bg-[#68F6C8]/10 rounded-full -top-20 -right-20"></div>
          <div className="flex items-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#68F6C8] to-[#01CEFE] flex items-center justify-center text-[#004851] font-bold text-xl shadow-lg mr-3 border-2 border-white/20">
              E
            </div>
            <div>
              <div className="text-[#68F6C8] text-sm font-medium">Your AI Tier</div>
              <div className="text-white font-bold flex items-center">
                Enabler
                <span className="ml-2 text-xs py-1 px-2 bg-[#68F6C8]/20 rounded-full text-[#68F6C8]">
                  Level 2
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-[#68F6C8] to-[#01CEFE] rounded-full"></div>
          </div>
          <div className="mt-1 flex justify-between text-xs">
            <span className="text-white/60">Progress</span>
            <span className="text-[#68F6C8]">65%</span>
          </div>
        </div>
        
        {/* Navigation - enhanced */}
        <div className="px-4 flex flex-col gap-2 flex-1 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-gradient-to-r from-[#68F6C8] to-[#68F6C8]/70 text-[#004851]' 
                  : 'hover:bg-white/10 text-white hover:text-[#68F6C8]'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activeSection === section.id 
                  ? 'bg-[#004851] text-[#68F6C8]'
                  : 'bg-white/10 text-white group-hover:bg-[#68F6C8]/10 group-hover:text-[#68F6C8]'
              } transition-all duration-300`}>
                {section.icon}
              </div>
              <div className="flex flex-col">
                <span className={`text-base font-medium ${
                  activeSection === section.id ? 'text-[#004851] font-bold' : ''  
                }`}>
                  {section.title}
                </span>
                <span className={`text-xs ${
                  activeSection === section.id ? 'text-[#004851]/70' : 'text-white/60'
                }`}>
                  {section.description}
                </span>
              </div>
              {activeSection === section.id && (
                <div className="ml-auto w-1.5 h-8 bg-[#004851] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* Footer - enhanced */}
        <div className="mt-auto px-6 pt-6 pb-8 border-t border-white/10">
          <Link 
            href="/scorecard/results" 
            className="group flex items-center gap-3 text-white hover:text-[#68F6C8] transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#68F6C8]/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span>Back to Scorecard</span>
          </Link>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-white/40 text-xs">© Social Garden 2025</span>
            <div className="flex items-center gap-2">
              <a href="#" className="w-6 h-6 flex items-center justify-center rounded bg-white/10 hover:bg-[#68F6C8]/20 text-white hover:text-[#68F6C8] transition-all">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
              <a href="#" className="w-6 h-6 flex items-center justify-center rounded bg-white/10 hover:bg-[#68F6C8]/20 text-white hover:text-[#68F6C8] transition-all">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.56c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124-4.09-.205-7.719-2.166-10.148-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.23-.616v.062c0 2.386 1.697 4.374 3.95 4.827-.413.112-.849.172-1.298.172-.318 0-.626-.031-.927-.088.627 1.956 2.444 3.377 4.6 3.417-1.68 1.317-3.797 2.102-6.102 2.102-.396 0-.787-.023-1.175-.069 2.179 1.397 4.768 2.213 7.548 2.213 9.057 0 14.015-7.506 14.015-14.015 0-.213-.005-.425-.014-.636.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div id="learning-hub-content" className="flex-grow p-10 max-w-6xl">
        {renderSectionContent()}
      </div>
    </div>
  );
} 