'use client';

import React from 'react';

interface ReportSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cardOrder: string[];
  cardTitles: Record<string, string>;
  companyName?: string; // Optional company name for display
}

const ReportSidebar: React.FC<ReportSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  cardOrder, 
  cardTitles,
  companyName 
}) => {
  return (
    <div className="w-80 bg-white shadow-xl border-r border-gray-100 p-8 flex flex-col">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-[#68F6C8] tracking-tight">AI Efficiency</h1>
        <h2 className="text-3xl font-extrabold text-[#004851] tracking-tighter">SCORECARD</h2>
        <div className="mt-2 text-gray-600 font-light">Executive Dashboard</div>
      </div>
      
      <div className="flex flex-col gap-2 flex-1">
        {cardOrder.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
              activeTab === key 
                ? 'bg-gradient-to-r from-[#68F6C8] to-[#68F6C8]/70 text-[#004851]' 
                : 'hover:bg-[#68F6C8]/10 text-gray-600 hover:text-[#004851]'
            }`}
          >
            <div className={`w-2 h-12 rounded-full transition-all duration-300 ${
              activeTab === key ? 'bg-[#004851]' : 'bg-gray-300 group-hover:bg-[#68F6C8]'
            }`}></div>
            <span className="text-lg font-medium">{cardTitles[key]}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-8 border-t border-gray-200 flex justify-between items-center">
        <button className="text-gray-500 hover:text-[#004851] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
        <button className="bg-[#68F6C8] hover:bg-[#68F6C8]/90 text-[#004851] px-4 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md">
          New Assessment
        </button>
      </div>
    </div>
  );
};

export default ReportSidebar; 