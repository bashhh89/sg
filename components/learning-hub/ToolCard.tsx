import React from 'react';

interface Tool {
  id: string;
  toolName: string;
  websiteLink: string;
  briefDescription: string;
  bestForTiers: string[];
  primaryCategories: string[];
  solvesChallenges: string[];
  ahmadGeminiProTip: string;
  uiCategory: string;
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 min-h-[260px]">
      <div className="flex items-center gap-2 mb-1">
        <a
          href={tool.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-extrabold text-[#004851] hover:text-[#68F6C8] transition-colors underline"
        >
          {tool.toolName}
        </a>
      </div>
      <div className="text-gray-700 text-base mb-2">{tool.briefDescription}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="bg-[#68F6C8]/20 text-[#004851] text-xs font-semibold px-3 py-1 rounded-full">
          {tool.uiCategory}
        </span>
        {tool.bestForTiers.map((tier) => (
          <span key={tier} className="bg-[#004851]/10 text-[#004851] text-xs font-semibold px-3 py-1 rounded-full">
            {tier}
          </span>
        ))}
      </div>
      <div className="bg-[#68F6C8]/10 border-l-4 border-[#68F6C8] p-3 rounded-lg flex items-start gap-2 mt-auto">
        <svg className="w-5 h-5 text-[#68F6C8] mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
        <span className="text-sm text-[#004851] font-medium">{tool.ahmadGeminiProTip}</span>
      </div>
    </div>
  );
} 