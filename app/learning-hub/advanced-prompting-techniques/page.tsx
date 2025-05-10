'use client';

import React from 'react';
import CourseTemplate from '../course-template';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Introduction to Advanced Prompting',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Introduction to Advanced Prompting</h2>
        <p className="text-lg text-brand-dark-teal">
          Welcome to the Advanced Prompting Techniques course! Learn how to craft sophisticated prompts that get consistently better results from AI models.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">What You'll Learn</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Understanding prompt components and structure</span></li>
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Role-based and context-rich prompting</span></li>
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Chain-of-thought and iterative prompting</span></li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  },
  {
    id: 'lesson-2',
    title: 'Prompt Components and Structure',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Prompt Components and Structure</h2>
        <p className="text-lg text-brand-dark-teal">
          Learn how to structure your prompts for maximum clarity and effectiveness.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">Key Components</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Context Setting</strong>
                <p className="text-brand-dark-teal/80">Provide relevant background information and constraints.</p>
        </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Task Definition</strong>
                <p className="text-brand-dark-teal/80">Clearly state what you want the AI to do.</p>
        </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">3.</span>
              <div>
                <strong>Output Format</strong>
                <p className="text-brand-dark-teal/80">Specify how you want the response structured.</p>
        </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  },
  {
    id: 'lesson-3',
    title: 'Role-Based Prompting',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Role-Based Prompting</h2>
        <p className="text-lg text-brand-dark-teal">
          Learn how to use role assignments to get more specialized and contextually appropriate responses.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">Role Assignment Techniques</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Expert Roles</strong>
                <p className="text-brand-dark-teal/80">Assign specific professional roles to get domain-specific responses.</p>
        </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Multiple Perspectives</strong>
                <p className="text-brand-dark-teal/80">Use multiple roles to get diverse viewpoints on a topic.</p>
        </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  },
  {
    id: 'lesson-4',
    title: 'Chain-of-Thought Prompting',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Chain-of-Thought Prompting</h2>
        <p className="text-lg text-brand-dark-teal">
          Master the technique of breaking down complex tasks into step-by-step prompts.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">Advanced Techniques</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Task Decomposition</strong>
                <p className="text-brand-dark-teal/80">Break complex problems into smaller, manageable steps.</p>
        </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Iterative Refinement</strong>
                <p className="text-brand-dark-teal/80">Use the output of one prompt as input for the next.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  }
];

export default function AdvancedPromptingTechniques() {
  return (
    <CourseTemplate
      courseName="Advanced Prompting Techniques"
      lessons={lessons}
    />
  );
} 