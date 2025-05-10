'use client';

import React from 'react';
import CourseDetailTemplate from '../course-detail-template/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';

export default function AIProjectManagementPage() {
  const courseData = {
    courseTitle: "Intro to AI Project Management",
    courseSubtitle: "From Pilot to Small-Scale Deployment",
    courseTier: "Enabler" as const,
    courseIntroduction: (
      <div>
        <p className="mb-4">
          Successfully implementing AI projects requires a methodical approach that balances technical 
          considerations with business goals and organizational change. This course provides a practical 
          framework for planning, executing, and evaluating AI pilots and small-scale deployments.
        </p>
        <p className="mb-4">
          You'll learn effective methods for scoping AI projects, managing resources efficiently, 
          addressing common challenges, and measuring success so you can confidently lead AI initiatives 
          in your organization.
        </p>
        <p className="font-medium mt-4">
          Content for this course is coming soon!
        </p>
      </div>
    ),
    lessons: [
      {
        id: 'lesson-1',
        title: "Understanding AI Project Lifecycles",
        type: 'Reading' as const,
        duration: '20 min',
        icon: 'fas fa-book-open',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              Content coming soon for this exciting lesson on AI project management!
            </p>
            <p className="mb-6">
              This lesson will cover the unique aspects of AI project lifecycles, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>How AI projects differ from traditional software projects</li>
              <li>The iterative nature of AI development</li>
              <li>Key phases of AI project implementation</li>
              <li>Common pitfalls and how to avoid them</li>
            </ul>
          </div>
        )
      },
      {
        id: 'lesson-2',
        title: "Defining Scope & Resources",
        type: 'Exercise' as const,
        duration: '25 min',
        icon: 'fas fa-pencil-alt',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              Content coming soon for this practical lesson on scoping AI projects!
            </p>
            <p className="mb-6">
              This lesson will include interactive exercises to help you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Define clear objectives and success metrics for AI projects</li>
              <li>Identify necessary resources and expertise</li>
              <li>Create a realistic timeline for implementation</li>
              <li>Develop a budget that accounts for AI-specific considerations</li>
            </ul>
            
            <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                <FontAwesomeIcon icon={faPencilAlt} className="mr-3 text-blue-600" />
                Exercise Preview
              </h3>
              <p className="mb-4 text-blue-700">
                In this upcoming exercise, you'll work through a template to scope your own AI project initiative.
              </p>
            </div>
          </div>
        )
      }
    ]
  };

  return <CourseDetailTemplate {...courseData} />;
} 