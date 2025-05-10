'use client';

import React from 'react';
import CourseDetailTemplate from '../course-detail-template/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeadphonesAlt, 
  faBook, 
  faPencilAlt,
  faQuestionCircle,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

export default function AIContentStrategyPage() {
  const courseData = {
    courseTitle: "AI-Assisted Content Strategy",
    courseSubtitle: "Planning & Personalization at Scale",
    courseTier: "Enabler" as const,
    courseIntroduction: (
      <div>
        <p className="mb-4">
          You're already using AI for content ideation and perhaps even drafting. Now, let's elevate your game. 
          As an AI Enabler, you can leverage AI not just for individual content pieces, but to inform and power 
          your entire content <em>strategy</em>, enabling deeper personalization and more efficient planning.
        </p>
        <p className="mb-4">
          This course dives into using AI for content performance analysis, identifying content gaps and 
          opportunities, generating topic clusters, planning a data-driven content calendar, and personalizing 
          content for different audience segments at scale.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-3">By the end of this course, you will be able to:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Understand how AI can analyze content performance and audience engagement.</li>
          <li>Use AI tools to identify content gaps and new topic opportunities.</li>
          <li>Leverage AI for creating effective topic clusters and pillar content strategies.</li>
          <li>Apply AI techniques for personalizing content to different audience segments.</li>
          <li>Integrate AI into your content planning and calendar management.</li>
        </ul>
        <p className="mt-4 font-medium">Let's build a smarter, AI-supercharged content strategy!</p>
      </div>
    ),
    lessons: [
      {
        id: 'lesson-1',
        title: "AI for Content Audit & Performance Analysis",
        type: 'AudioSummary' as const,
        duration: '20 min',
        icon: 'fas fa-headphones-alt',
        audioSummaryText: "Welcome to the first lesson in our AI-Assisted Content Strategy course. Today, we're diving into how artificial intelligence can transform the way you audit and analyze your content performance.\n\nBefore creating new content, it's critical to understand what's already working in your content library—and what isn't. Traditional content audits can be tedious and time-consuming, often taking weeks to complete manually. This is where AI steps in to revolutionize the process.\n\nAI-powered tools can quickly scan your entire content library and provide actionable insights in several key areas. First, they can identify your top and low-performing content based on metrics like traffic, engagement, conversion rates, and time on page. This allows you to double down on what works and improve or retire what doesn't.\n\nSecond, AI excels at content categorization and tagging. It can automatically organize large volumes of existing content by topic, theme, or keyword, creating a comprehensive map of your content ecosystem. This makes it easier to identify content gaps, redundancies, and opportunities for repurposing.\n\nThird, AI can perform sophisticated SEO analysis across your entire content library. Beyond basic keyword density checks, modern AI tools can evaluate content relevance, search intent alignment, and even predict potential ranking improvements with specific optimizations.\n\nFourth, sentiment analysis capabilities allow AI to analyze comments, social media mentions, and other feedback to understand how your audience feels about your content. This emotional intelligence provides another dimension of insight beyond pure performance metrics.\n\nFor content enablers like you, there are several accessible tools to get started. While Google Analytics itself isn't strictly an AI tool, combining it with AI thinking helps you interpret patterns more effectively. Many SEO platforms now incorporate AI features specifically designed for content analysis. And specialized content audit AI tools are emerging that focus exclusively on content performance intelligence.\n\nThe ultimate goal is to use these AI-assisted insights to understand not just what content resonates with your audience, but why. Look beyond surface metrics to identify common themes, formats, or tones in your top-performing pieces. This deeper understanding will fuel your content strategy and ensure future content creation is built on data-driven insights rather than guesswork.\n\nRemember that AI tools are most effective when guided by your strategic thinking and industry knowledge. The combination of AI analytics and human creativity is what will truly elevate your content strategy.\n\nIn our next lesson, we'll explore how AI can help you build effective topic clusters and develop pillar content strategies that establish your authority in your niche. But first, consider running an AI-assisted audit on a section of your existing content to identify patterns and opportunities you might have missed.",
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-4">
              Before you create <em>new</em> content, do you know what's already working (or not working) with your existing assets? 
              AI can help you audit your content and analyze its performance.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">How AI Can Assist in a Content Audit:</h3>
            <ul className="space-y-2 my-4">
              {[
                "Identifying Top/Low Performing Content",
                "Content Categorization & Tagging",
                "SEO Analysis (Basic)",
                "Sentiment Analysis on Comments/Feedback"
              ].map((item, index) => (
                <li key={index} className="flex items-center text-emerald-700">
                  <span className="bg-brand-mint-green text-brand-dark-teal rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 shadow-sm">
                    <FontAwesomeIcon icon={faLightbulb} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Tools & Approaches for Enablers:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Google Analytics (with careful interpretation)</li>
              <li>SEO Tools with AI Features</li>
              <li>Specialized Content Audit AI Tools</li>
            </ul>

            <p className="mb-4"><strong>The Goal:</strong> Use AI-assisted insights to understand what content resonates...</p>

            <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
              <h4 className="font-bold flex items-center text-amber-900">
                <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
                SocialGarden Pro Tip!
              </h4>
              <p>Don't just look at <em>what</em> content performs well, but try to understand <em>why</em>.</p>
            </div>
          </div>
        )
      },
      {
        id: 'lesson-2',
        title: "AI-Powered Topic Clustering & Pillar Content Strategy",
        type: 'Reading' as const,
        duration: '20 min',
        icon: 'fas fa-book-open',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              Stop thinking about individual keywords and start thinking about topic authority. 
              AI is brilliant at helping you build a "topic cluster" model...
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">What is a Topic Cluster Strategy?</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Pillar Page</li>
              <li>Cluster Content (Sub-Topics)</li>
              <li>Internal Linking</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">How AI Helps Create Topic Clusters:</h3>
            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li><strong>Identifying Core Topics</strong> - AI can analyze your audience's interests and industry trends to identify strong pillar content topics.</li>
              <li><strong>Generating Sub-Topic Ideas</strong> - AI excels at expanding a core topic into relevant subtopics.</li>
              <li><strong>Keyword Research for Clusters</strong> - AI tools can identify semantic relationships between keywords.</li>
              <li><strong>Outlining Pillar & Cluster Content</strong> - AI can help structure comprehensive content outlines.</li>
            </ol>

            <div className="my-6 p-5 bg-gray-800 text-gray-100 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold uppercase tracking-wider">Prompt Example: Topic Cluster Generation</span>
                <button className="text-xs bg-brand-mint-green text-brand-dark-teal px-3 py-1.5 rounded-md hover:bg-opacity-80 font-medium flex items-center">
                  <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                  Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm bg-gray-700 p-3 rounded-md">
                <code>
                  "I'm creating a pillar page about 'AI for Email Marketing'. Generate 10 specific sub-topic ideas that would make good cluster content pieces, each with a brief description of what that piece would cover."
                </code>
              </pre>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Benefits for Enablers:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Improved SEO</li>
              <li>Better UX</li>
              <li>Efficient Planning</li>
            </ul>

            <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
              <h4 className="font-bold flex items-center text-amber-900">
                <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
                Building Your Authority with SocialGarden
              </h4>
              <p>
                A well-structured topic cluster strategy can establish your brand as an authority in your niche. 
                Contact SocialGarden for Content Strategy & SEO Services to elevate your content authority.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'lesson-3',
        title: "AI for Content Gap Analysis & Competitor Insights",
        type: 'Reading' as const,
        duration: '15 min',
        icon: 'fas fa-book-open',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              What content are your competitors ranking for that you're not? AI can help uncover these gaps.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Using AI for Content Gap Analysis:</h3>
            <ul className="space-y-4 my-6">
              <li>
                <strong>Competitor Analysis</strong>
                <div className="my-4 p-5 bg-gray-800 text-gray-100 rounded-xl shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold uppercase tracking-wider">Prompt for Thought</span>
                    <button className="text-xs bg-brand-mint-green text-brand-dark-teal px-3 py-1.5 rounded-md hover:bg-opacity-80 font-medium flex items-center">
                      <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-700 p-3 rounded-md">
                    <code>
                      "Analyze the top 3 ranking articles for the keyword '[your target keyword]'. Identify common themes, content structure, word count, and what might be missing that I could cover in my own content."
                    </code>
                  </pre>
                </div>
              </li>
              <li><strong>"People Also Ask" (PAA) & Related Searches</strong> - AI can analyze these sections to identify additional content opportunities.</li>
              <li><strong>Analyzing Your Own Site Search</strong> - AI can spot patterns in what visitors are looking for on your site but not finding.</li>
            </ul>

            <p className="mb-4"><strong>The Goal:</strong> Find the sweet spot where your audience's interest, your expertise, and a lack of existing high-quality content intersect.</p>

            <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
              <h4 className="font-bold flex items-center text-amber-900">
                <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
                SocialGarden Pro Tip!
              </h4>
              <p>Don't just copy competitors. Use AI insights to find a <em>unique angle</em>.</p>
            </div>
          </div>
        )
      },
      {
        id: 'lesson-4',
        title: "AI-Driven Content Personalization at Scale",
        type: 'Exercise' as const,
        duration: '20 min',
        icon: 'fas fa-pencil-alt',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              Generic content gets ignored. Enablers know that personalization is key... AI can help you tailor content...
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">What is AI Content Personalization?</h3>
            <p className="mb-6">
              Using AI to dynamically adjust or recommend content based on user data, preferences, behavior patterns, 
              or segmentation to increase relevance and engagement.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Ways AI Can Help Personalize:</h3>
            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>
                <strong>Segment-Specific Content Variations</strong>
                <div className="my-4 p-5 bg-gray-800 text-gray-100 rounded-xl shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold uppercase tracking-wider">Prompt Example</span>
                    <button className="text-xs bg-brand-mint-green text-brand-dark-teal px-3 py-1.5 rounded-md hover:bg-opacity-80 font-medium flex items-center">
                      <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-700 p-3 rounded-md">
                    <code>
                      "Take this core marketing message: '[Your core message]'. Rewrite it for three different audience segments: 1) C-level executives concerned with ROI, 2) Technical managers focused on implementation, 3) End users looking for ease of use."
                    </code>
                  </pre>
                </div>
              </li>
              <li><strong>Dynamic Content Recommendations</strong> - AI can suggest relevant content based on user behavior.</li>
              <li><strong>Personalized Email Content</strong> - AI can help craft emails tailored to recipient segments.</li>
              <li><strong>Chatbot Personalization</strong> - AI can customize interaction paths based on user context.</li>
            </ol>

            <h3 className="text-xl font-semibold mt-8 mb-4">Starting Points for Enablers:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Define clear audience segments</li>
              <li>Manually adapt AI drafts for each segment</li>
              <li>Explore your MarTech stack's personalization capabilities</li>
            </ul>

            <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                <FontAwesomeIcon icon={faPencilAlt} className="mr-3 text-blue-600" />
                Exercise: Personalization Practice
              </h3>
              <p className="mb-4 text-blue-700">
                Take a piece of content you've created recently and adapt it for two different audience segments using AI assistance.
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-inner border border-blue-100">
                <label htmlFor="exercise-notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Notes and Ideas:
                </label>
                <textarea
                  id="exercise-notes"
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-mint-green focus:border-brand-mint-green"
                  placeholder="Describe your content piece and how you would adapt it for different segments..."
                />
              </div>
            </div>

            <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
              <h4 className="font-bold flex items-center text-amber-900">
                <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
                Unlocking True Personalization Power
              </h4>
              <p>
                For enterprise-level personalization that scales, discuss AI Personalization Solutions with SocialGarden.
                Our team can help implement advanced content personalization strategies.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'lesson-5',
        title: "Integrating AI into Your Content Calendar & Planning",
        type: 'Reading' as const,
        duration: '15 min',
        icon: 'fas fa-book-open',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <p className="mb-6">
              An AI-assisted content strategy needs an organized plan...
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">AI for Content Planning & Calendar Management:</h3>
            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li>
                <strong>Populating the Calendar with Ideas</strong>
                <p className="text-sm text-gray-600 mt-1">
                  AI can generate content ideas based on trends, gaps, and your existing content strategy.
                </p>
              </li>
              <li>
                <strong>Drafting Content Briefs with AI</strong>
                <div className="my-4 p-5 bg-gray-800 text-gray-100 rounded-xl shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold uppercase tracking-wider">Prompt Example</span>
                    <button className="text-xs bg-brand-mint-green text-brand-dark-teal px-3 py-1.5 rounded-md hover:bg-opacity-80 font-medium flex items-center">
                      <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-700 p-3 rounded-md">
                    <code>
                      "Create a content brief for a blog post titled '[Your Title]'. Include target audience, key points to cover, suggested structure, target keyword, SEO considerations, and any specific CTAs to include."
                    </code>
                  </pre>
                </div>
              </li>
              <li>
                <strong>Suggesting Content Formats</strong>
                <div className="my-4 p-5 bg-gray-800 text-gray-100 rounded-xl shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold uppercase tracking-wider">Prompt Example</span>
                    <button className="text-xs bg-brand-mint-green text-brand-dark-teal px-3 py-1.5 rounded-md hover:bg-opacity-80 font-medium flex items-center">
                      <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-700 p-3 rounded-md">
                    <code>
                      "I have a blog post about '[topic]'. Suggest 3 alternative content formats to repurpose this content, with specific ideas for each format."
                    </code>
                  </pre>
                </div>
              </li>
              <li>
                <strong>Optimizing Publishing Schedules (Advanced)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  AI can analyze engagement patterns to suggest optimal publishing times.
                </p>
              </li>
            </ol>

            <h3 className="text-xl font-semibold mt-8 mb-4">Tools for Enablers:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Existing Calendar/PM Tool</li>
              <li>Spreadsheets</li>
              <li>Specialized Content Calendar Tools</li>
            </ul>

            <p className="mb-4">
              The goal is to use AI to make your content planning more strategic...
            </p>

            <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
              <h4 className="font-bold flex items-center text-amber-900">
                <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
                SocialGarden Pro Tip!
              </h4>
              <p>Regularly review your AI-assisted content calendar... Your strategic oversight is still key.</p>
            </div>
          </div>
        )
      },
      {
        id: 'lesson-6',
        title: "Course Completion & Next Steps",
        type: 'Completion' as const,
        duration: '5 min',
        icon: 'fas fa-flag-checkered',
        completed: false,
        content: ({ lessonData }) => (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Congratulations! Your Content Strategy is Now AI-Supercharged!</h2>
            <p className="mb-6">
              You've learned how to strategically apply AI across the content lifecycle...
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Key Takeaways from This Course:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>AI can transform how you audit and analyze content performance</li>
              <li>Topic clusters built with AI help establish content authority</li>
              <li>Content gap analysis with AI reveals untapped opportunities</li>
              <li>AI enables true content personalization at scale</li>
              <li>AI-powered content calendars enhance strategic planning</li>
            </ul>

            <div className="my-12 p-8 bg-gradient-to-r from-brand-mint-green/20 to-brand-dark-teal/20 rounded-2xl border border-brand-mint-green/30 text-center">
              <div className="mb-4 inline-block">
                <div>
                  <span className="text-5xl">🎉</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark-teal mb-3">Congratulations on completing the course!</h3>
              <p className="text-gray-600">You're now equipped with the skills to leverage AI strategically across your content operations!</p>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">What's Next?</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Audit Your Current Content</li>
              <li>Plan a Topic Cluster</li>
              <li>Experiment with Personalization</li>
              <li>Formalize AI Projects (link to "Intro to AI Project Management" course)</li>
            </ul>

            <p className="mt-6 font-medium">
              By strategically infusing AI into your content strategy, you're well on your way to becoming a content powerhouse!
            </p>
          </div>
        )
      },
    ]
  };

  return <CourseDetailTemplate {...courseData} />;
} 