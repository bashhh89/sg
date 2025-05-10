'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LearningHubLayout from '../LearningHubLayout';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Welcome & Introduction',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Welcome & Introduction</h2>

        {/* Key Concept */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Key Concept</h3>
          <p className="text-gray-700 leading-relaxed">
            The first step in your AI journey is identifying tasks that eat up valuable time and resources.
            These are often hiding in plain sight in your daily operations.
          </p>
        </div>

        {/* Common Examples */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-lg">📝</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Data Entry</h4>
                <p className="text-gray-600 text-sm">Manual form filling, data copying between systems</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-lg">📧</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Email Processing</h4>
                <p className="text-gray-600 text-sm">Sorting, categorizing, and responding to routine emails</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-lg">📊</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Report Generation</h4>
                <p className="text-gray-600 text-sm">Creating recurring reports from data sources</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-lg">🔍</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Document Review</h4>
                <p className="text-gray-600 text-sm">Scanning documents for specific information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Exercise */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">Quick Exercise</h3>
          <p className="text-gray-700 mb-4">Take 5 minutes to list your daily tasks that:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span>Are performed at least weekly</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span>Follow a consistent pattern</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span>Take more than 30 minutes each time</span>
            </li>
          </ul>
          <div className="bg-white p-4 rounded-lg border border-emerald-100">
            <textarea
              className="w-full h-24 p-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              placeholder="Type your tasks here..."
            />
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-amber-700">Pro Tip</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Don't just think about individual tasks - look for patterns across your organization.
            Often, similar repetitive tasks occur in different departments, multiplying the potential impact of AI automation.
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-2',
    title: 'The "Repetitive Task" Radar',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">The "Repetitive Task" Radar</h2>
          <p className="text-gray-600 mb-6">(Approx. 15 minutes)</p>

          <div className="bg-emerald-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">What Makes a Task Repetitive?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Clear Problem, Simple Solution",
                  desc: "The task is well-defined, and the way AI can help is straightforward."
                },
                {
                  title: "Accessible Tools",
                  desc: "Often, these tasks can be tackled with free or low-cost, user-friendly AI tools."
                },
                {
                  title: "Minimal Technical Skills",
                  desc: "You don't need to be a coder to get started."
                },
                {
                  title: "High Learning Value",
                  desc: "Even a small project can teach you a lot about how AI works."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-700">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Benefits of Starting Small:</h3>
            <ul className="space-y-4">
              {[
                {
                  title: "Builds Confidence",
                  desc: "Success with a small project makes you more comfortable tackling bigger AI challenges later."
                },
                {
                  title: "Demonstrates Value",
                  desc: "It's easier to show colleagues (or yourself!) the benefits of AI with a tangible result."
                },
                {
                  title: "Low Risk, High Reward",
                  desc: "You learn a lot without a huge investment of time or money."
                }
              ].map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-700">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Need a Hand Spotting Your Low-Hanging Fruit?</h3>
            <p className="text-gray-700 mb-4">
              Sometimes, an outside perspective can help uncover those perfect first AI wins you might be overlooking.
              SocialGarden offers quick AI Opportunity Spotter sessions designed to help businesses like yours identify
              2-3 high-impact, easy-to-implement AI applications.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md">
              Learn More & Book a Spotter Session
            </button>
          </div>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-3',
    title: 'Finding Low-Hanging Fruit',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Finding the "Low-Hanging Fruit" - Quick AI Wins</h2>
          <p className="text-gray-600 mb-6">(Approx. 15 minutes)</p>

          <div className="bg-emerald-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">What Makes an AI Project "Low-Hanging Fruit"?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Clear Problem, Simple Solution",
                  desc: "The task is well-defined, and the way AI can help is straightforward."
                },
                {
                  title: "Accessible Tools",
                  desc: "Often, these tasks can be tackled with free or low-cost, user-friendly AI tools."
                },
                {
                  title: "Minimal Technical Skills",
                  desc: "You don't need to be a coder to get started."
                },
                {
                  title: "High Learning Value",
                  desc: "Even a small project can teach you a lot about how AI works."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-700">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Benefits of Starting Small:</h3>
            <ul className="space-y-4">
              {[
                {
                  title: "Builds Confidence",
                  desc: "Success with a small project makes you more comfortable tackling bigger AI challenges later."
                },
                {
                  title: "Demonstrates Value",
                  desc: "It's easier to show colleagues (or yourself!) the benefits of AI with a tangible result."
                },
                {
                  title: "Low Risk, High Reward",
                  desc: "You learn a lot without a huge investment of time or money."
                }
              ].map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-700">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Need a Hand Spotting Your Low-Hanging Fruit?</h3>
            <p className="text-gray-700 mb-4">
              Sometimes, an outside perspective can help uncover those perfect first AI wins you might be overlooking.
              SocialGarden offers quick AI Opportunity Spotter sessions designed to help businesses like yours identify
              2-3 high-impact, easy-to-implement AI applications.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md">
              Learn More & Book a Spotter Session
            </button>
          </div>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-4',
    title: 'AI in Action: Simple Use Cases',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">AI in Action: Simple Use Cases for Dabblers</h2>
          <p className="text-gray-600 mb-6">(Approx. 20 minutes)</p>

          <div className="space-y-8">
            {[
              {
                title: "Marketing & Content",
                icon: "📣",
                tasks: [
                  {
                    task: "Coming up with ideas for social media posts",
                    prompts: [
                      "Generate 5 engaging questions I can ask my [target audience] on LinkedIn about [topic]",
                      "Give me 3 ideas for a short Facebook post announcing [new feature]"
                    ]
                  },
                  {
                    task: "Drafting initial headline variations",
                    prompts: ["Write 5 catchy headline options for an article about [topic]"]
                  }
                ]
              },
              {
                title: "Customer Service",
                icon: "💬",
                tasks: [
                  {
                    task: "Drafting answers to FAQs",
                    prompts: ["Draft a polite and helpful answer to: '[FAQ question]'"]
                  },
                  {
                    task: "Summarizing customer emails",
                    prompts: ["Summarize this customer email in one sentence: '[email text]'"]
                  }
                ]
              },
              {
                title: "Administration & Productivity",
                icon: "📊",
                tasks: [
                  {
                    task: "Creating meeting agendas",
                    prompts: ["Create a 1-hour team meeting agenda for [topic]"]
                  },
                  {
                    task: "Proofreading emails",
                    prompts: ["Use AI writing tools for grammar and typo checks"]
                  }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-800">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="bg-white p-4 rounded-lg">
                      <h4 className="font-medium text-emerald-700 mb-2">{task.task}</h4>
                      <div className="space-y-2">
                        {task.prompts.map((prompt, promptIndex) => (
                          <div key={promptIndex} className="bg-gray-50 p-3 rounded text-gray-600 text-sm font-mono">
                            {prompt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-6 rounded-xl mt-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-lg">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-700">Real-World Example</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              A small e-commerce store, just starting their AI journey, used a simple AI tool to generate
              diverse product descriptions for their new collection. This saved their tiny team hours of
              writing time and helped them list products faster. SocialGarden helped them identify this
              as a quick win during an initial chat!
            </p>
          </div>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-5',
    title: 'AI Opportunity Framework',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Your AI Opportunity Brainstorm - A Simple Framework</h2>
          <p className="text-gray-600 mb-6">(Approx. 25 minutes, including worksheet time)</p>

          <div className="bg-emerald-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">The "AI Quick Win" Brainstorm Framework</h3>
            <p className="text-gray-700 mb-6">For any task you're considering, ask these questions:</p>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  question: "Is it Repetitive?",
                  desc: "Do I do this often, in a similar way each time?",
                  scale: "1 (Rarely) to 5 (Very Often)"
                },
                {
                  question: "Is it Rule-Based?",
                  desc: "Can I write down clear steps for how it's done?",
                  scale: "1 (Very Intuitive/Creative) to 5 (Clear Steps)"
                },
                {
                  question: "Is it Time-Consuming?",
                  desc: "Does it take up a lot of time for the benefit it brings?",
                  scale: "1 (Quick & Easy) to 5 (Takes Ages!)"
                },
                {
                  question: "Is the Risk Low if AI Assists?",
                  desc: "If AI makes a small mistake, is it easy to catch and fix with minimal impact?",
                  scale: "1 (High Risk) to 5 (Very Low Risk)"
                },
                {
                  question: "Could AI Realistically Help?",
                  desc: "Based on what you've learned, does it feel like something current AI tools could tackle?",
                  scale: "1 (Probably Not) to 5 (Definitely Could Help!)"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-emerald-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                      {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-700">{item.question}</h4>
                    <p className="text-gray-600 ml-11 mb-2">{item.desc}</p>
                    <div className="ml-11 bg-gray-50 px-3 py-1 rounded text-sm text-gray-500 inline-block">
                      Scale: {item.scale}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Try It Now!</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                Pick 2-3 tasks you identified earlier and evaluate them using this framework.
                Tasks that score higher (especially on Repetitive, Rule-Based, and Low Risk)
                are excellent candidates for your first AI experiments!
              </p>
              <div className="bg-white p-4 rounded-lg border border-emerald-100">
                <textarea
                  className="w-full h-32 p-3 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="Enter your tasks and scores here..."
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Download Your Free AI Opportunity Brainstormer!</h3>
            <p className="text-gray-700 mb-4">
              To make this even easier, SocialGarden has created a handy, printable "AI Quick Win Worksheet"
              based on this framework. It's a great way to organize your thoughts and pinpoint those perfect starting points.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md">
              Download the AI Quick Win Worksheet (PDF)
            </button>
          </div>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-6',
    title: 'Picking Your First Project',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Picking Your First AI Project - Small Steps to Big Impact</h2>
          <p className="text-gray-600 mb-6">(Approx. 15 minutes)</p>

          <div className="bg-emerald-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Criteria for Your First AI Project</h3>
            <div className="space-y-4">
              {[
                {
                  id: 'task-1',
                  title: "Choose ONE Task",
                  desc: "Don't try to boil the ocean. Pick just one from your brainstormed list."
                },
                {
                  id: 'task-2',
                  title: "High 'Dabbler Score'",
                  desc: "Select a task that scored well on the 'AI Quick Win' framework (repetitive, rule-based, low risk)."
                },
                {
                  id: 'task-3',
                  title: "Personal Interest/Pain Point",
                  desc: "You'll be more motivated if it's a task you genuinely find tedious or where you see clear personal benefit."
                },
                {
                  id: 'task-4',
                  title: "Accessible Tool",
                  desc: "Is there a free or easy-to-try AI tool that seems like a good fit for this task?"
                },
                {
                  id: 'task-5',
                  title: "Focus on Assisting, Not Replacing",
                  desc: "Aim for AI to help you do the task faster or better, not for AI to take it over completely on day one."
                }
              ].map((item) => (
                <div key={item.id} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-emerald-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-700">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Define a Tiny, Achievable Goal</h3>
            <p className="text-gray-700 mb-4">Once you've picked a task, set a very small goal for your first experiment.</p>
            <div className="bg-white p-4 rounded-lg border border-emerald-100">
              <h4 className="font-medium text-emerald-700 mb-3">Examples:</h4>
              <ul className="space-y-2">
                {[
                  "Use an AI tool to generate 3 social media post ideas for next week.",
                  "Draft one FAQ answer using AI and then edit it.",
                  "Summarize one internal email using an AI tool."
                ].map((example, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-emerald-500">•</span>
                    <span className="text-gray-600">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Ready to Turn Your First AI Idea into Action?</h3>
            <p className="text-gray-700 mb-4">
              Choosing and implementing that first AI project can feel like a big step, even when it's small.
              If you'd like expert guidance to ensure your first AI win is a success and sets you on the right path,
              SocialGarden's AI Kickstart Package is designed specifically for businesses ready to make their initial
              foray into AI.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md">
              Learn More About AI Kickstart Package
            </button>
          </div>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-7',
    title: 'Conclusion & Next Steps',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Congratulations! You've Got a Plan!</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            You've now learned how to spot AI opportunities, identify low-hanging fruit, and select a
            manageable first AI project. This is a fantastic foundation for your AI journey.
          </p>

          <div className="bg-white p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              {[
                "AI loves repetitive, rule-based tasks",
                "Start with small, low-risk projects for quick wins and valuable learning",
                "Many simple AI tools can assist with everyday marketing, customer service, and admin tasks",
                "A simple framework can help you brainstorm AI opportunities specific to your business",
                "The goal of your first AI project is to experiment and learn!"
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
                  title: "Take Action",
                  desc: "Don't just learn – do! Try out that first small AI project you identified."
                },
                {
                  id: 'next-2',
                  title: "Explore More",
                  desc: "Check out our AI Prompt Engineering Fundamentals course to learn how to talk to AI more effectively."
                },
                {
                  id: 'next-3',
                  title: "Visit the Learning Hub",
                  desc: "Discover more templates, checklists, and tools to support your AI journey."
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
            Remember, every AI expert started as a Dabbler. Keep exploring, keep learning, and enjoy the process!
          </p>
        </div>
      </div>
    ),
    completed: false,
  }
];

export default function FirstAIWins() {
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
  const courseName = "First AI Wins";


  return (
    <LearningHubLayout activeSection="Mini Courses" onSectionChange={() => {}}>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${((lessons.findIndex(l => l.id === currentLesson) + 1) / lessons.length) * 100}%` }}
          transition={{ duration: 0.5 }}
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
    </LearningHubLayout>
  );
}
