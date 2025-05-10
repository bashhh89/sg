import { NextResponse, NextRequest } from 'next/server';

// Define QAPair interface for type safety
interface QAPair {
  question: string;
  answer: string;
}

// Define assessment phases and maximum questions
const ASSESSMENT_PHASES = ['Strategy & Goals', 'Data Readiness', 'Technology & Tools', 'Team Skills & Process', 'Governance & Measurement'];
const MAX_QUESTIONS = 20; // Set back to 20 questions

// Pollinations API base URL
const POLLINATIONS_API_URL = "https://text.pollinations.ai/openai";

// Add a helper for fetch with retry
async function fetchWithRetry(url: string, options: RequestInit, retries = 3, delayMs = 2000) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      lastError = new Error(`Pollinations API responded with status ${res.status}: ${await res.text()}`);
    } catch (e) {
      lastError = e;
    }
    if (i < retries - 1) await new Promise(res => setTimeout(res, delayMs));
  }
  throw lastError || new Error('fetch failed');
}

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const requestBody = await request.json();
    const { action, currentPhaseName, history = [], industry = "General" } = requestBody;

    // Log incoming request data
    console.log('>>> BACKEND: API Route Received:', { 
      industry, 
      historyLength: history.length, 
      currentPhaseName, 
      action 
    });
    
    // Check if this is a report generation request
    if (action === 'generateReport') {
      return handleReportGeneration(history as QAPair[], industry);
    } else {
      // For phased Q&A logic
      if (!currentPhaseName && history.length === 0) {
        // For the initial call with no phase specified, default to first phase
        const firstPhase = ASSESSMENT_PHASES[0];
        return handleAssessmentRequest(firstPhase, [], industry);
      }
      
      return handleAssessmentRequest(currentPhaseName, history as QAPair[], industry);
    }
  } catch (error) {
    console.error('Error in scorecard-ai API route:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function handleReportGeneration(history: QAPair[], industry: string) {
  try {
    // Create the system prompt for report generation
    const systemPrompt = `You are an AI Efficiency Analyst generating a comprehensive and highly detailed scorecard report in Markdown for marketing managers. Your analysis must be THOROUGH, PROFESSIONAL, and provide SUBSTANTIAL, ACTIONABLE INSIGHTS in every section. Avoid brevity and generic statements—be expansive, insightful, and provide concrete, industry-specific detail throughout. Use the user's answers and industry context to tailor every part of the report. 

Analyze the conversation history and industry provided. Determine an overall tier (Dabbler, Enabler, Leader) based on the assessment results.

Output ONLY the Markdown report adhering STRICTLY to the following structure:

## Overall Tier: [Tier Name]

## Key Findings

**Strengths:**
- List at least 3-5 key strengths, each with a 1-2 sentence elaboration. Use specific examples and details from the user's answers. Focus on tangible capabilities or practices that position them well for AI adoption, and explain why each is valuable in the context of the ${industry} industry.

**Weaknesses:**
- List at least 3-5 key weaknesses or improvement areas, each with a brief explanation of its potential impact on AI efficiency or marketing/sales efforts. Be constructive but honest, and connect weaknesses to the ${industry} context where possible.

## Strategic Action Plan

Provide a detailed, step-by-step action plan tailored to the user's tier and identified weaknesses. For this section:
  - Give at least 3-5 primary actionable recommendations, each targeting a specific improvement area.
  - For each recommendation, generate 2-4 specific, concrete sub-steps or examples of how the user could implement it.
  - MANDATE the integration of industry-specific use cases and advice for the ${industry} sector.
  - Ensure these actions are practical, detailed, and directly address the user's context.

## Getting Started & Resources

### Sample AI Goal-Setting Meeting Agenda
1. Generate a 3-4 point sample agenda specifically for the ${industry} sector, focusing on relevant AI adoption priorities.
2. Include specific discussion topics and measurable outcomes/next steps.

### Example Prompts for ${industry} Marketing Managers
- Create 2-3 actual example prompts that a marketing manager in ${industry} could immediately use.
- Format as "PROMPT: [actual prompt text]" and "USE CASE: [brief explanation]".

### Basic AI Data Audit Process Outline
1. Outline 3-4 key steps for conducting a basic AI data audit specifically relevant to ${industry} organizations.

## Illustrative Benchmarks

For the ${industry} industry:

### Leader Tier Organizations
- Provide 2-3 distinct, detailed examples of how "Leader" tier organizations typically leverage AI.

### Enabler Tier Organizations
- Provide 2-3 distinct, detailed examples for "Enabler" tier organizations.

## Your Personalized AI Learning Path

Based on your scorecard results, select 2-3 of the most relevant resources and provide a HIGHLY PERSONALIZED explanation for each.`;

    console.log('>>> BACKEND: Preparing report generation request');
    console.log('History length:', history.length);

    // Call Pollinations AI API for report generation
    const requestBody = {
      model: "openai-large",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Analyze the following assessment history for the ${industry} industry and generate the comprehensive Markdown report as instructed: ${JSON.stringify(history)}`
        }
      ],
      temperature: 0.7,
    };

    const response = await fetchWithRetry(POLLINATIONS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Pollinations API responded with status ${response.status}: ${errorBody}`);
    }

    const completion = await response.json();
    const reportMarkdown = completion.choices[0].message.content;
    console.log('>>> BACKEND: FULL GENERATED MARKDOWN REPORT:\n', reportMarkdown);

    return NextResponse.json({
      reportMarkdown,
      status: 'resultsGenerated'
    }, { status: 200 });
  } catch (error) {
    console.error('Error in report generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate report', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function handleAssessmentRequest(currentPhaseName: string, history: QAPair[], industry: string) {
  try {
    // Check if we've reached MAX_QUESTIONS
    if (history.length >= MAX_QUESTIONS) {
      return NextResponse.json({
        questionText: null,
        answerType: null,
        options: null,
        phase_status: 'complete',
        overall_status: 'completed',
        currentPhaseName
      });
    }

    // If phase is complete, move to next phase
    const currentPhaseIndex = ASSESSMENT_PHASES.indexOf(currentPhaseName);
    if (currentPhaseIndex < ASSESSMENT_PHASES.length - 1) {
      const nextPhase = ASSESSMENT_PHASES[currentPhaseIndex + 1];
      return await handleAssessmentRequest(nextPhase, history, industry);
    }

    // Create the system prompt
    const systemPrompt = `Generate a new question for phase "${currentPhaseName}" in the ${industry} industry.
DO NOT repeat any previous questions. Each question must be unique.
Return JSON: {
  "questionText": string,
  "answerType": "text" | "radio" | "checkbox" | "scale",
  "options": string[] | null,
  "phase_status": "asking" | "complete",
  "overall_status": "asking" | "completed",
  "reasoning_text": string
}`;

    // Call API and get response
    const requestBody = {
      model: "openai-large",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Based on history: ${JSON.stringify(history)}, generate next question.` }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    };

    const response = await fetchWithRetry(POLLINATIONS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const completion = await response.json();
    const parsedResponse = JSON.parse(completion.choices[0].message.content);

    // Check for repeated questions
    if (history.some(qa => qa.question === parsedResponse.questionText)) {
      // Move to next phase if question repeats
      if (currentPhaseIndex < ASSESSMENT_PHASES.length - 1) {
        const nextPhase = ASSESSMENT_PHASES[currentPhaseIndex + 1];
        return await handleAssessmentRequest(nextPhase, history, industry);
      }
    }

    return NextResponse.json({
      ...parsedResponse,
      currentPhaseName
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate question' },
      { status: 500 }
    );
  }
} 