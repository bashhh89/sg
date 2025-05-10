'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeadphonesAlt, 
  faBook, 
  faVideo, 
  faPencilAlt, 
  faQuestionCircle, 
  faLightbulb, 
  faPlayCircle,
  faChevronLeft,
  faChevronRight,
  faCopy,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Lesson type interface
interface Lesson {
  id: string;
  title: string;
  type: 'AudioSummary' | 'Video' | 'Reading' | 'Exercise' | 'Quiz' | 'Intro' | 'Completion';
  duration: string;
  icon: string;
  content: (props: { lessonData?: any }) => React.ReactNode;
  audioSummaryText?: string;
  audioUrl?: string;
  videoUrl?: string;
  quizData?: any[];
  completed: boolean;
}

// Props for the course detail page
interface CourseDetailProps {
  courseTitle: string;
  courseSubtitle: string;
  courseTier: 'Dabbler' | 'Enabler' | 'Leader';
  courseIntroduction: React.ReactNode;
  lessons: Lesson[];
}

// Component for the AI Audio Snapshot Player
const AudioSnapshotPlayer: React.FC<{ audioUrl?: string; audioSummaryText?: string; inSidebar?: boolean }> = ({ 
  audioUrl, 
  audioSummaryText,
  inSidebar = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  
  // Voice options
  const voices = [
    { id: 'alloy', name: 'Alloy (Neutral)' },
    { id: 'echo', name: 'Echo (Male)' },
    { id: 'fable', name: 'Fable (Female)' },
    { id: 'onyx', name: 'Onyx (Deep Male)' },
    { id: 'nova', name: 'Nova (Female)' },
  ];
  
  // If we have audio text but no URL, we can generate one using Pollinations.AI
  const audioSource = audioUrl || (audioSummaryText 
    ? `https://text.pollinations.ai/${encodeURIComponent(audioSummaryText)}?model=openai-audio&voice=${selectedVoice}` 
    : '');

  const handlePlayClick = () => {
    if (!isPlaying) {
      setIsLoading(true);
      // Simulate loading time for audio generation
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 2000);
    } else {
      setIsPlaying(false);
    }
  };

  // Return a more compact version for sidebar
  if (inSidebar) {
    return (
      <div className="bg-gradient-to-r from-[#103138] to-[#0c2329] text-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h3 className="text-base font-semibold flex items-center mb-3">
            <FontAwesomeIcon icon={faHeadphonesAlt} className="text-[#20E28F] mr-2" />
            AI Audio Summary
          </h3>
          
          {/* Voice selector - Compact for sidebar */}
          <div className="flex items-center mb-3">
            <label className="text-xs mr-2">Voice:</label>
            <select 
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="bg-[#1c4854] text-white border border-[#20E28F]/30 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#20E28F] flex-grow"
              disabled={isPlaying || isLoading}
            >
              {voices.map(voice => (
                <option key={voice.id} value={voice.id}>{voice.name}</option>
              ))}
            </select>
          </div>
          
          {isPlaying && audioSource && (
            <div className="mb-3 bg-[#1c4854] p-2 rounded-lg">
              <audio 
                src={audioSource} 
                controls
                className="w-full"
                onEnded={() => setIsPlaying(false)}
                autoPlay
              />
            </div>
          )}
          
          <button 
            onClick={handlePlayClick}
            disabled={isLoading}
            className={`${
              isLoading 
                ? 'bg-gray-500 cursor-wait' 
                : 'bg-[#20E28F] hover:brightness-105'
            } text-[#103138] font-medium w-full px-4 py-2 rounded-lg transition-all text-sm flex items-center justify-center shadow-lg`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#103138]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={isPlaying ? faHeadphonesAlt : faPlayCircle} className="mr-2" />
                {isPlaying ? 'Now Playing' : 'Listen to Lesson Summary'}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Original larger version for main content
  return (
    <div className="my-6 bg-gradient-to-r from-[#103138] to-[#0c2329] text-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center mb-4 md:mb-0">
            <FontAwesomeIcon icon={faHeadphonesAlt} className="text-[#20E28F] mr-3" />
            AI Audio Snapshot
          </h3>
          <div className="flex items-center">
            <span className="text-sm mr-3">Voice:</span>
            <select 
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="bg-[#1c4854] text-white border border-[#20E28F]/30 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20E28F]"
              disabled={isPlaying || isLoading}
            >
              {voices.map(voice => (
                <option key={voice.id} value={voice.id}>{voice.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-[#154250] bg-opacity-50 p-4 rounded-lg mb-5">
          <p className="text-sm italic text-gray-300 leading-relaxed">
            {audioSummaryText ? audioSummaryText : "Listen to an AI-generated summary of this lesson's key points."}
          </p>
        </div>
        
        {isPlaying && audioSource && (
          <div className="mb-5 bg-[#1c4854] p-3 rounded-lg">
            <audio 
              src={audioSource} 
              controls
              className="w-full"
              onEnded={() => setIsPlaying(false)}
              autoPlay
            />
          </div>
        )}
        
        <div className="flex justify-center">
          <button 
            onClick={handlePlayClick}
            disabled={isLoading}
            className={`${
              isLoading 
                ? 'bg-gray-500 cursor-wait' 
                : 'bg-[#20E28F] hover:brightness-105'
            } text-[#103138] font-semibold px-8 py-4 rounded-lg transition-all text-lg flex items-center shadow-lg`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#103138]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Audio...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={isPlaying ? faHeadphonesAlt : faPlayCircle} className="mr-3" />
                {isPlaying ? 'Listening to Audio Snapshot' : 'Listen to Key Insights'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for styled lists with checkmarks
export const StyledCheckList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2 my-4">
    {items.map((item, index) => (
      <li key={index} className="flex items-center text-emerald-700">
        <span className="bg-brand-mint-green text-brand-dark-teal rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 shadow-sm">
          <FontAwesomeIcon icon={faLightbulb} />
        </span>
        {item}
      </li>
    ))}
  </ul>
);

// Component for Pro Tips
export const ProTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
    <h4 className="font-bold flex items-center text-[#103138]">
      <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
      {title}
    </h4>
    {children}
  </div>
);

// Component for Prompt Example Card
export const PromptExampleCard: React.FC<{ title: string; promptText: string }> = ({ 
  title, 
  promptText 
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    // Could add toast notification here
  };

  return (
    <div className="my-6 p-5 bg-gray-800 text-gray-100 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold uppercase tracking-wider">{title}</span>
        <button 
          onClick={handleCopy}
          className="text-xs bg-[#20E28F] text-[#103138] px-3 py-1.5 rounded-md hover:bg-opacity-80 font-medium flex items-center"
        >
          <FontAwesomeIcon icon={faCopy} className="mr-2" />
          Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm bg-gray-700 p-3 rounded-md">
        <code>{promptText}</code>
      </pre>
    </div>
  );
};

// Component for Exercise with Note-taking Area
export const ExerciseSection: React.FC<{ title: string; description: string; defaultText?: string }> = ({
  title,
  description,
  defaultText = ''
}) => {
  const [notes, setNotes] = useState(defaultText);
  
  return (
    <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
      <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
        <FontAwesomeIcon icon={faPencilAlt} className="mr-3 text-blue-600" />
        {title}
      </h3>
      <p className="mb-4 text-blue-700">{description}</p>
      
      <div className="bg-white p-4 rounded-lg shadow-inner border border-blue-100">
        <label htmlFor="exercise-notes" className="block text-sm font-medium text-gray-700 mb-2">
          Your Notes:
        </label>
        <textarea
          id="exercise-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#20E28F] focus:border-[#20E28F]"
          placeholder="Write your notes here..."
        />
      </div>
    </div>
  );
};

// Component for Congratulations Message
export const CongratulationsMessage: React.FC<{ message: string; subtext?: string }> = ({ 
  message,
  subtext
}) => {
  return (
    <motion.div 
      className="my-12 p-8 bg-gradient-to-r from-[#20E28F]/20 to-[#103138]/20 rounded-2xl border border-[#20E28F]/30 text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        transition: { 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }
      }}
    >
      <div className="mb-4 inline-block">
        <motion.div
          animate={{ 
            rotateZ: [0, 10, -10, 10, 0],
            transition: { 
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2.5,
              repeatDelay: 1
            }
          }}
        >
          <span className="text-5xl">🎉</span>
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold text-[#103138] mb-3">{message}</h3>
      {subtext && <p className="text-gray-600">{subtext}</p>}
    </motion.div>
  );
};

// Main Course Detail Template component
export default function CourseDetailTemplate({
  courseTitle = "Interactive AI Showcase",
  courseSubtitle = "Experience the full power of our learning elements!",
  courseTier = "Enabler",
  courseIntroduction = <p>This course demonstrates all the new interactive components in action...</p>,
  lessons = []
}: Partial<CourseDetailProps>) {
  // State for tracking current lesson and completed lessons
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Handle navigation
  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      // Mark current lesson as completed
      if (lessons[currentLessonIndex]) {
        setCompletedLessons(prev => 
          prev.includes(lessons[currentLessonIndex].id) 
            ? prev 
            : [...prev, lessons[currentLessonIndex].id]
        );
      }
      // Go to next lesson
      setCurrentLessonIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };
  
  const handleLessonSelect = (index: number) => {
    setCurrentLessonIndex(index);
  };
  
  // Current lesson data
  const currentLesson = lessons[currentLessonIndex] || null;
  
  // Calculate progress percentage
  const progressPercentage = (completedLessons.length / lessons.length) * 100;
  
  // Get lesson icon based on type
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'AudioSummary': return faHeadphonesAlt;
      case 'Video': return faVideo;
      case 'Reading': return faBook;
      case 'Exercise': return faPencilAlt;
      case 'Quiz': return faQuestionCircle;
      default: return faBook;
    }
  };
  
  // Get tier badge color
  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Dabbler': return 'bg-green-500 text-white';
      case 'Enabler': return 'bg-blue-500 text-white';
      case 'Leader': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="w-full bg-[#103138] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Social Garden logo */}
          <div className="h-8 mr-4">
            <Image
              src="/SocialGarden.svg"
              alt="Social Garden"
              width={180}
              height={22}
              priority
            />
          </div>
          <h1 className="text-xl font-bold">AI Learning Hub</h1>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Sticky Lesson Navigation Sidebar */}
        <div className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col h-screen overflow-y-auto">
          <div className="p-6">
            {/* Back Button */}
            <Link 
              href="/learning-hub" 
              className="inline-flex items-center text-sm font-medium text-[#20E28F] hover:text-[#20E28F]/80 mb-6"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Learning Hub
            </Link>
            
            {/* Course Title & Tier Badge */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#20E28F] mb-1">{courseTitle}</h1>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{courseSubtitle}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getTierBadgeColor(courseTier)}`}>
                  {courseTier}
                </span>
              </div>
            </div>
            
            {/* Course Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-600">Your Progress</span>
                <span className="text-sm font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#20E28F]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            {/* Audio Player in Sidebar (if current lesson has audio) */}
            {currentLesson && currentLesson.type === 'AudioSummary' && (
              <div className="mb-6">
                <AudioSnapshotPlayer 
                  audioUrl={currentLesson.audioUrl} 
                  audioSummaryText={currentLesson.audioSummaryText} 
                  inSidebar={true}
                />
              </div>
            )}
            
            {/* Course Lessons List */}
            <div>
              <h2 className="text-sm font-semibold text-[#103138] uppercase tracking-wide mb-4">Course Lessons</h2>
              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const isActive = index === currentLessonIndex;
                  const isCompleted = completedLessons.includes(lesson.id);
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(index)}
                      className={`w-full flex items-center text-left p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#E6FAF3] border-l-4 border-[#20E28F] pl-2'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center mr-3
                        ${isCompleted 
                          ? 'bg-brand-mint-green text-white' 
                          : isActive
                            ? 'bg-brand-mint-green/20 text-brand-dark-teal'
                            : 'bg-gray-200 text-gray-600'
                        }
                      `}>
                        {isCompleted ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <FontAwesomeIcon icon={getLessonIcon(lesson.type)} />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`block text-sm ${
                          isActive ? 'font-semibold text-brand-dark-teal' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </span>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs ${
                            isActive ? 'text-brand-dark-teal/80' : 'text-gray-500'
                          }`}>
                            {lesson.duration}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className={`text-xs ${
                            isActive ? 'text-brand-dark-teal/80' : 'text-gray-500'
                          }`}>
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Main Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto py-8 px-8">
            {/* Course Introduction (only shown for first lesson) */}
            {currentLessonIndex === 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-[#20E28F] mb-3">{courseTitle}</h1>
                <h2 className="text-xl text-gray-600 mb-4">{courseSubtitle}</h2>
                <div className="prose prose-sm">
                  {courseIntroduction}
                </div>
              </div>
            )}
            
            {/* Current Lesson Content */}
            {currentLesson && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Lesson Header */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon 
                        icon={getLessonIcon(currentLesson.type)} 
                        className="mr-2 text-brand-mint-green"
                      />
                      <span className="text-sm text-gray-500">{currentLesson.duration}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        Lesson {currentLessonIndex + 1} of {lessons.length}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                  </div>
                  
                  {/* Lesson Content */}
                  <div className="prose prose-lg max-w-none">
                    {/* Render the lesson content */}
                    {currentLesson.content({ lessonData: currentLesson })}
                  </div>
                  
                  {/* Navigation Controls */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                    <button
                      onClick={handlePrevious}
                      disabled={currentLessonIndex === 0}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-all ${
                        currentLessonIndex === 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-brand-dark-teal hover:bg-brand-mint-green/10'
                      }`}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                      Previous Lesson
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentLessonIndex === lessons.length - 1}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-all ${
                        currentLessonIndex === lessons.length - 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'bg-brand-mint-green text-brand-dark-teal hover:bg-brand-mint-green/90'
                      }`}
                    >
                      Next Lesson
                      <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example Course Data - for demonstration/test purposes
export const exampleCourseData = {
  courseTitle: "Interactive AI Showcase",
  courseSubtitle: "Experience the full power of our learning elements!",
  courseTier: "Enabler" as const,
  courseIntroduction: (
    <p>This course demonstrates all the new interactive components in action...</p>
  ),
  lessons: [
    {
      id: 'lesson-audio',
      title: "Lesson with Audio Snapshot",
      type: 'AudioSummary' as const,
      duration: '5 min Listen',
      icon: 'fas fa-headphones-alt',
      audioSummaryText: "This is a concise summary of the lesson's key points, designed to be spoken by our AI voice assistant. It reinforces learning and provides quick insights.",
      completed: false,
      content: ({ lessonData }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Listen to the Lesson Summary</h2>
          <p className="mb-4">Click the button below to hear an AI-generated audio summary...</p>
          {/* AudioSnapshotPlayer automatically uses the lesson data */}
          <p>This lesson also contains standard reading material below...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      )
    },
    {
      id: 'lesson-reading-interactive',
      title: "Reading with Interactive Elements",
      type: 'Reading' as const,
      duration: '15 min',
      icon: 'fas fa-book-open',
      completed: false,
      content: ({ lessonData }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Advanced Reading Comprehension</h2>
          <p>This lesson uses various styled elements for better understanding.</p>
          
          <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">Key Objectives (Styled List)</h3>
          <StyledCheckList items={[
            "Understand advanced topic A.",
            "Apply concept B to real-world scenarios."
          ]} />
          
          <ProTip title="Pro Tip!">
            <p>Always iterate on your AI prompts for optimal results.</p>
          </ProTip>
          
          <PromptExampleCard 
            title="Prompt Example: Summarization"
            promptText="Summarize the following text into three key bullet points, focusing on actionable insights for marketing managers: [Paste text here]"
          />
          
          <ExerciseSection
            title="Exercise: Summarization"
            description="Apply the summarization prompt to a new text"
          />
        </div>
      )
    },
    {
      id: 'lesson-quiz',
      title: "Knowledge Check Quiz",
      type: 'Quiz' as const,
      duration: '10 min',
      icon: 'fas fa-question-circle',
      completed: false,
      content: ({ lessonData }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Test Your Knowledge</h2>
          <p className="mb-6">Let's see how much you've learned about effective AI prompt writing techniques.</p>
          
          <div className="my-8 bg-purple-50 rounded-xl border border-purple-200 overflow-hidden">
            <div className="bg-purple-100 p-5 border-b border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 flex items-center">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-3 text-purple-700" />
                AI Prompting Quiz
              </h3>
              <p className="mt-2 text-purple-800">Select the best answer for each question.</p>
            </div>
            
            <div className="p-5 space-y-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-purple-100">
                <p className="font-medium text-gray-900 mb-4">1. Which of the following is a best practice for writing effective AI prompts?</p>
                
                <div className="space-y-2 mb-4">
                  <div className="p-3 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-gray-200 text-gray-700">
                        A
                      </div>
                      <span>Keep prompts as vague as possible to allow for creativity</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer transition-all border-purple-500 bg-purple-50 text-purple-900">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-purple-500 text-white">
                        B
                      </div>
                      <span>Be specific about your desired output format and content</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-gray-200 text-gray-700">
                        C
                      </div>
                      <span>Always write prompts in all caps for emphasis</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-gray-200 text-gray-700">
                        D
                      </div>
                      <span>Limit prompts to 10 words maximum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-purple-100 border-t border-purple-200 flex justify-center items-center">
              <button
                className="w-full px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'lesson-completion',
      title: "Course Completion",
      type: 'Reading' as const,
      duration: '5 min',
      icon: 'fas fa-book',
      completed: false,
      content: ({ lessonData }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Course Completion</h2>
          <p className="mb-6">You've successfully completed all the lessons in this course. Here's a quick summary of what you've learned:</p>
          
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>How to create effective AI prompts for different purposes</li>
            <li>Using Audio Snapshots to quickly absorb key information</li>
            <li>Interactive learning elements that enhance the learning experience</li>
            <li>Best practices for AI-assisted content creation</li>
          </ul>
          
          <CongratulationsMessage 
            message="Congratulations on completing the course!" 
            subtext="You're now equipped with the knowledge to leverage AI effectively in your workflow."
          />
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Next Steps</h3>
            <p className="mb-4">To continue your learning journey, consider exploring these related courses:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advanced AI Prompt Engineering</li>
              <li>AI for Content Creation</li>
              <li>Building Custom AI Workflows</li>
            </ul>
          </div>
        </div>
      )
    }
  ]
}; 