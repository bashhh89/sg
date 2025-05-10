'use client';

import React from 'react';
import CourseDetailTemplate from '../course-detail-template/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faUsers,
  faBalanceScale
} from '@fortawesome/free-solid-svg-icons';

export default function AIDrivenOrganizationPage() {
  const courseData = {
    courseTitle: "Building an AI-Driven Organization",
    courseSubtitle: "Culture, Strategy & Governance",
    courseTier: "Leader" as const,
    courseIntroduction: (
      <div>
        <p className="mb-4">
          For AI to truly transform your organization, it must be woven into its cultural fabric and strategic vision. 
          This leadership-focused course goes beyond individual AI implementations to explore how to build a truly 
          AI-driven organization through cultural change, strategic planning, and effective governance frameworks.
        </p>
        <p className="mb-4">
          You'll discover how successful organizations align AI initiatives with business strategy, foster a culture 
          of AI literacy and experimentation, and establish governance structures that maximize AI benefits while 
          managing risks responsibly.
        </p>
        <p className="font-medium mt-4">
          Content for this course is coming soon!
        </p>
      </div>
    ),
    lessons: [
      {
        id: 'lesson-1',
        title: "The AI-First Culture Shift",
        type: 'Reading' as const,
        duration: '25 min',
        icon: 'fas fa-users',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              Content coming soon for this leadership lesson on building an AI-first culture!
            </p>
            <p className="mb-6">
              This lesson will explore key aspects of fostering an AI-driven organizational culture:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Elements of an AI-first mindset at all levels</li>
              <li>Addressing AI anxiety and resistance</li>
              <li>Building AI literacy across the organization</li>
              <li>Creating psychological safety for AI experimentation</li>
              <li>Case studies of successful cultural transformations</li>
            </ul>
          </div>
        )
      },
      {
        id: 'lesson-2',
        title: "Strategic AI Governance Frameworks",
        type: 'Reading' as const,
        duration: '30 min',
        icon: 'fas fa-balance-scale',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              Content coming soon for this essential lesson on AI governance!
            </p>
            <p className="mb-6">
              This leadership-focused lesson will cover:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Designing a flexible AI governance framework</li>
              <li>Balancing innovation with risk management</li>
              <li>Ethical considerations for AI deployment</li>
              <li>Compliance and regulatory considerations</li>
              <li>Creating an AI review board or committee</li>
            </ul>
          </div>
        )
      }
    ]
  };

  return <CourseDetailTemplate {...courseData} />;
} 