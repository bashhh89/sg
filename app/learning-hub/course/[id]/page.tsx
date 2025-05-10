'use client';

import React from 'react';
import { useParams, redirect } from 'next/navigation';

export default function CoursePage() {
  const params = useParams();
  const courseId = typeof params.id === 'string' ? params.id : '';
  
  // Redirect to the appropriate course page
  React.useEffect(() => {
    if (courseId) {
      redirect(`/learning-hub/${courseId}`);
    }
  }, [courseId]);
  
  // This will only be shown briefly before the redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg">Loading course...</div>
    </div>
  );
} 