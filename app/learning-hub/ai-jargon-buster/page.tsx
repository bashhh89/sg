'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CourseNavSidebar from '@/components/learning-hub/CourseNavSidebar';

const lessons = [
  {
    id: 'lesson-1',
    title: 'The Big Picture - AI, ML, and More',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">The Big Picture - AI, ML, and More</h2>
        <p className="text-gray-600 mb-6">(Approx. 10 minutes)</p>

        {/* Key Concept */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Let's start with the most common umbrella terms</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Artificial Intelligence (AI)</h4>
              <p className="text-gray-700 leading-relaxed">
                This is the broad concept of making computers perform tasks that typically require human intelligence. Think problem-solving, learning, decision-making, understanding language. It's the big umbrella!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Machine Learning (ML)</h4>
              <p className="text-gray-700 leading-relaxed">
                This is a subset of AI. Instead of being explicitly programmed for every single step, ML systems learn from data. They look for patterns in large amounts of information to make predictions or decisions without being told exactly how.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Algorithm</h4>
              <p className="text-gray-700 leading-relaxed">
                This is just a set of rules or instructions that a computer follows to perform a task or solve a problem. Both traditional programs and ML systems use algorithms, but ML algorithms are designed to learn and adapt based on data.
              </p>
            </div>
          </div>
        </div>

        {/* Simple Analogy */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Simple Analogy</h3>
          <p className="text-gray-700 leading-relaxed">
            You don't tell ML exactly how to recognize a cat picture; you show it thousands of cat pictures, and it learns the patterns that define "cat."
          </p>
        </div>

        {/* Key Takeaway */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-amber-700">Key Takeaway</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            AI is the goal (smart computers), ML is a major way to achieve it (learning from data), and algorithms are the instructions computers follow.
          </p>
        </div>

        {/* SocialGarden Insight */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">SocialGarden Insight</h3>
          <p className="text-gray-700 leading-relaxed">
            Understanding the difference between general AI and specific ML helps you evaluate AI tools. Is it just following rules (simpler AI), or is it actually learning and adapting from data (ML-powered)? This often relates to its ability to personalize or improve over time.
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-2',
    title: 'Understanding Language - NLP & Generative AI',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Understanding Language - NLP & Generative AI</h2>
        <p className="text-gray-600 mb-6">(Approx. 15 minutes)</p>

        {/* Introduction */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">These terms are everywhere, especially with tools like ChatGPT</h3>
        </div>

        {/* Terms and Examples */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Terms</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-emerald-700">Natural Language Processing (NLP)</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                This is a branch of AI focused on enabling computers to understand, interpret, and generate human language (like English). It's how AI can "read" your prompt, understand your question, or analyze the sentiment of text.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700">Examples:</h5>
                <p className="text-gray-600 text-sm">
                  Translation tools, spam email filters, chatbots understanding your requests.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700">Generative AI</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                This is a type of AI (often using NLP and other techniques) that can create new content that resembles the data it was trained on. This content can be text, images, music, or even code.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700">Examples:</h5>
                <p className="text-gray-600 text-sm">
                  ChatGPT generating text, Midjourney creating images from descriptions, AI tools writing code snippets.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700">Large Language Model (LLM)</h4>
              <p className="text-gray-700 leading-relaxed mb-2">
                This is the specific type of AI model behind tools like ChatGPT. LLMs are trained on absolutely massive amounts of text data, allowing them to understand and generate human-like language for a wide range of tasks (answering questions, writing, summarizing, translating, etc.).
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700">How they relate:</h5>
                <p className="text-gray-600 text-sm">
                  LLMs are a key technology enabling advanced NLP and powerful Generative AI for text.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Point */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-amber-700">Key Point</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Generative AI is generating based on patterns, not truly "creating" with human-like understanding or originality (though it can seem very convincing!).
          </p>
        </div>

        {/* Connecting the Dots */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">Connecting the Dots</h3>
          <p className="text-gray-700 leading-relaxed">
            When you write a prompt for ChatGPT (using natural language), NLP helps the LLM understand it, and then the Generative AI capabilities of the LLM create the text response you receive.
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-3',
    title: 'Prompts & Parameters - Talking to AI',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Prompts & Parameters - Talking to AI</h2>
        <p className="text-gray-600 mb-6">(Approx. 10 minutes)</p>

        {/* Introduction */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">You've encountered these in our other courses!</h3>
        </div>

        {/* Terms and Definitions */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Terms</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-emerald-700">Prompt</h4>
              <p className="text-gray-700 leading-relaxed">
                As you know, this is the instruction, question, or input you give to an AI model (especially Generative AI like ChatGPT) to get it to perform a task. The quality of the prompt heavily influences the quality of the output.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700">Prompt Engineering</h4>
              <p className="text-gray-700 leading-relaxed">
                This is the skill (and art!) of crafting effective prompts to get the desired response from an AI. It involves understanding how to provide clear instructions, context, examples, and constraints. (Our "Prompt Engineering Fundamentals" course dives deep here!)
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700">Parameters / Settings (Sometimes visible in tools)</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                These are controls that can sometimes be adjusted to influence how the AI generates its response. Common examples (you don't need to master these now, just know they exist):
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500">•</span>
                  <span>
                    <strong>Temperature:</strong> Controls randomness. Lower temperature = more focused, predictable output. Higher temperature = more creative, potentially random output.
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-500">•</span>
                  <span>
                    <strong>Max Tokens/Length:</strong> Limits the length of the AI's response.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why these matter */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-amber-700">Why these matter for Dabblers</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-amber-500">✓</span>
              <span>Understanding what a "prompt" is, is fundamental.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-amber-500">✓</span>
              <span>Knowing "prompt engineering" exists encourages you to think about how you ask the AI for things.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-amber-500">✓</span>
              <span>Awareness of "parameters" helps understand why AI output might vary sometimes.</span>
            </li>
          </ul>
        </div>

        {/* Pro Tip */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">SocialGarden Pro Tip</h3>
          <p className="text-gray-700 leading-relaxed">
            Focus on mastering the core elements of a good prompt (Task, Context, Persona, Format, Tone) before worrying too much about advanced parameters. Clear instructions are usually more impactful than tweaking technical settings at the Dabbler stage. Our Prompt Library provides great examples of effective prompts.
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-4',
    title: 'Congratulations! You\'ve Busted the Jargon!',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Congratulations! You've Busted the Jargon!</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            You've now decoded some of the most common AI terms you'll encounter. While the technology behind them is complex, understanding the basic concepts empowers you to better grasp what AI tools can do and how to interact with them more effectively.
          </p>

          <div className="bg-white p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Key Takeaways from This Course</h3>
            <ul className="space-y-3">
              {[
                "AI is the broad field; ML is about learning from data.",
                "NLP helps AI understand and use human language.",
                "Generative AI (often powered by LLMs) creates new content.",
                "A Prompt is your instruction to the AI."
              ].map((takeaway, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">✓</span>
                  <span className="text-gray-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: 'next-1',
                  title: "Notice the Terms",
                  desc: "Pay attention when you see these terms used in articles or tool descriptions – they should make more sense now!"
                },
                {
                  id: 'next-2',
                  title: "Practice Prompting",
                  desc: "Apply your understanding by trying prompts in tools like ChatGPT (refer to the \"My First AI Tool\" course)."
                },
                {
                  id: 'next-3',
                  title: "Focus on Application",
                  desc: "Don't get bogged down in technical details. Think about how these capabilities can help your business."
                }
              ].map((next) => (
                <div key={next.id} className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-700 mb-2">{next.title}</h4>
                  <p className="text-gray-600 text-sm">{next.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg font-medium text-emerald-700 mt-8 text-center">
            You're building a solid foundation for your AI journey!
          </p>
        </div>
      </div>
    ),
    completed: false,
  }
];

export default function AIJargonBuster() {
  const [currentLesson, setCurrentLesson] = useState('lesson-1');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleNext = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson);
    if (currentIndex < lessons.length - 1) {
      setCompletedLessons([...completedLessons, currentLesson]);
      setCurrentLesson(lessons[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1].id);
    }
  };

  const handleLessonSelect = (lessonId: string | number) => {
    setCurrentLesson(lessonId.toString());
  };

  const currentLessonData = lessons.find(l => l.id === currentLesson);

  // Mock user data for CourseNavSidebar
  const mockUser = { name: 'Alex', avatar: '', tier: 'Dabbler' };
  const courseName = "AI Jargon Buster";


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 pt-8 flex flex-row">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${((lessons.findIndex(l => l.id === currentLesson) + 1) / lessons.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Course Navigation Sidebar */}
      <div className="w-64 bg-[#004851] text-white p-6 flex flex-col">
         <CourseNavSidebar
           user={mockUser}
           courseName={courseName}
           lessons={lessons.map(l => ({
             ...l,
             completed: completedLessons.includes(l.id),
           }))}
           currentLesson={currentLesson}
           onLessonSelect={handleLessonSelect}
         />
      </div>


      <div className="flex-1 max-w-4xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {currentLessonData?.content}

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentLesson === lessons[0].id}
                className={`px-6 py-3 rounded-lg transition-all ${
                  currentLesson === lessons[0].id
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg'
                }`}
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentLesson === lessons[lessons.length - 1].id}
                className={`px-6 py-3 rounded-lg transition-all ${
                  currentLesson === lessons[lessons.length - 1].id
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg'
                }`}
              >
                Next →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 