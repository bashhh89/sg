"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { title: 'Checklists', href: '/learning-hub' },
  { title: 'Prompt Library', href: '#' },
  { title: 'Templates', href: '#' },
  { title: 'Recommended Tools', href: '/learning-hub/recommended-tools' },
  { title: 'Mini Courses', href: '#' },
];

const navIcons: Record<string, React.ReactNode> = {
  'Checklists': <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  'Prompt Library': <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M8 12h8m-8-4h8" /></svg>,
  'Templates': <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M3 7h18" /></svg>,
  'Recommended Tools': <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 21l3-1.5L15 21l-.75-4M4 4l16 16" /></svg>,
  'Mini Courses': <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12V4" /></svg>,
};

const socialLinks = [
  { href: 'https://www.linkedin.com/company/social-garden/', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg> },
  { href: 'https://twitter.com/socialgardenau', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124-4.09-.205-7.719-2.166-10.148-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.23-.616v.062c0 2.386 1.697 4.374 3.95 4.827-.413.112-.849.172-1.298.172-.318 0-.626-.031-.927-.088.627 1.956 2.444 3.377 4.6 3.417-1.68 1.317-3.797 2.102-6.102 2.102-.396 0-.787-.023-1.175-.069 2.179 1.397 4.768 2.213 7.548 2.213 9.057 0 14.015-7.506 14.015-14.015 0-.213-.005-.425-.014-.636.962-.695 1.797-1.562 2.457-2.549z" /></svg> },
];

export default function SidebarNav({ user, activeSection, onSectionChange }: { user: { name: string; avatar: string; tier: string }, activeSection: string, onSectionChange: (section: string) => void }) {
  return (
    <>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{background: 'radial-gradient(circle at 30% 20%, #68F6C8 0%, transparent 60%)'}} />
      {/* Top: User greeting and progress */}
      <div className="z-10 relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#68F6C8] flex items-center justify-center text-[#004851] font-extrabold text-2xl shadow-lg border-4 border-white">
            {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name[0]}
          </div>
          <div>
            <div className="text-white text-lg font-bold leading-tight">Welcome, {user.name}!</div>
            <div className="text-[#68F6C8] text-xs font-semibold">AI Tier: {user.tier}</div>
          </div>
        </div>
        {/* Progress bar placeholder (can be replaced with real progress) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[#68F6C8] font-semibold">Learning Progress</span>
            <span className="text-xs text-white font-semibold">--%</span>
          </div>
          <div className="w-full h-2 bg-[#68F6C8]/20 rounded-full">
            <div className="h-full bg-[#68F6C8] rounded-full transition-all duration-500" style={{width: `0%`}} />
          </div>
        </div>
        {/* Tip of the Day */}
        <div className="bg-[#68F6C8]/10 border border-[#68F6C8]/30 rounded-xl p-4 mb-8 flex items-center gap-3 shadow-sm">
          <div>
            <svg className="w-6 h-6 text-[#68F6C8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </div>
          <div className="text-[#68F6C8] text-sm font-semibold">Tip of the Day</div>
        </div>
        <div className="text-white text-sm leading-relaxed mb-8 italic flex items-center gap-2">
          <svg className="w-4 h-4 text-[#68F6C8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
          {'Start small: Pick one process to automate with AI this week.'}
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.title}
              type="button"
              onClick={() => onSectionChange(link.title)}
              className={
                'flex items-center rounded-lg px-5 py-4 font-semibold text-lg transition-all duration-150 text-left w-full ' +
                (activeSection === link.title
                  ? 'bg-[#68F6C8] text-[#004851] font-bold border-l-4 border-[#68F6C8] shadow-md'
                  : 'text-white bg-transparent hover:bg-[#68F6C8]/20 hover:text-[#68F6C8]') +
                ' focus:outline-none focus:ring-2 focus:ring-[#68F6C8]'
              }
              tabIndex={0}
            >
              {navIcons[link.title]}
              {link.title}
            </button>
          ))}
        </nav>
      </div>
      {/* Footer: logo, socials, support */}
      <div className="z-10 relative mt-10 pt-8 border-t border-white/20 flex flex-col items-center gap-3">
        {/* Placeholder for Social Garden logo */}
        <div className="mb-1">
          <div className="w-12 h-12 rounded-full bg-[#68F6C8] flex items-center justify-center shadow-md">
            <span className="text-[#004851] font-extrabold text-2xl">SG</span>
          </div>
        </div>
        <div className="flex gap-3 mb-1">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#68F6C8] hover:text-white transition-colors">{s.icon}</a>
          ))}
        </div>
        <a
          href="https://www.socialgarden.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#68F6C8] text-xs font-semibold hover:underline mb-1"
        >
          © {new Date().getFullYear()} Social Garden
        </a>
        <a href="mailto:support@socialgarden.com.au" className="text-white text-xs hover:underline">Need help? Contact support</a>
      </div>
    </>
  );
} 