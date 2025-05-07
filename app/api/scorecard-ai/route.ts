import { NextResponse } from 'next/server';

// Define assessment phases and maximum questions
const ASSESSMENT_PHASES = ["Strategy", "Data", "Tech", "Team/Process", "Governance"];
const MAX_QUESTIONS = 20; // Approximately 4 questions per phase

export async function POST(request: Request) {
  try {
    // Parse the request body
    const requestBody = await request.json();
    const { action, currentPhaseName, history = [], industry = "General" } = requestBody;
    
    // Check if this is a report generation request
    if (action === 'generateReport') {
      return handleReportGeneration(history, industry);
    } else {
      // For phased Q&A logic (existing logic)
      if (!currentPhaseName && history.length === 0) {
        // For the initial call with no phase specified, default to first phase
        const firstPhase = ASSESSMENT_PHASES[0];
        return handleAssessmentRequest(firstPhase, [], industry);
      }
      
      return handleAssessmentRequest(currentPhaseName, history, industry);
    }
  } catch (error) {
    console.error('Error in scorecard-ai API route:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function handleReportGeneration(history: any[], industry: string) {
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
  - MANDATE the integration of industry-specific use cases and advice for the ${industry} sector. For example, "For a ${industry} organization at the '[Their Tier]' tier struggling with [specific weakness], consider implementing [specific solution tailored to industry]. Specific steps include: 1..., 2..., 3..."
  - Ensure these actions are practical, detailed, and directly address the user's context. Include timeframes where appropriate (quick wins vs. longer-term initiatives).

## Getting Started & Resources

To help you jumpstart your AI journey, generate the following directly in the report:

### Sample AI Goal-Setting Meeting Agenda
1. Generate a 3-4 point sample agenda specifically for the ${industry} sector, focusing on relevant AI adoption priorities and the user's identified weaknesses.
2. Include specific discussion topics and measurable outcomes/next steps.

### Example Prompts for ${industry} Marketing Managers
- Create 2-3 actual example prompts that a marketing manager in ${industry} could immediately use, based on their tier and needs. Format as "PROMPT: [actual prompt text]" and "USE CASE: [brief explanation]".

### Basic AI Data Audit Process Outline
1. Outline 3-4 key steps for conducting a basic AI data audit specifically relevant to ${industry} organizations, including data types/sources and recommendations for documenting/acting on findings.

## Illustrative Benchmarks

For the ${industry} industry:

### Leader Tier Organizations
- Provide 2-3 distinct, detailed examples of how "Leader" tier organizations in ${industry} typically leverage AI. Include specific use cases, technologies, and outcomes where possible.

### Enabler Tier Organizations
- Provide 2-3 distinct, detailed examples for "Enabler" tier organizations in ${industry}. Include specific use cases, technologies, and outcomes where possible.

Include varied examples across marketing, sales, and operations. Note that these are illustrative examples based on general industry knowledge.

## Your Personalized AI Learning Path

Based on your scorecard results, select 2-3 of the most relevant resources from the internal Learning Hub list provided below. For each, provide a HIGHLY PERSONALIZED explanation (1-2 sentences) under a subheading like _Why this is relevant for you:_ explaining why that specific internal Learning Hub section is recommended for them. Your explanation MUST directly reference the user's assessment answers, identified Tier, or specific weaknesses. Do not invent new resources; only select from the provided internal library. Make this section genuinely helpful and personalized.

Format the output as:

### [Resource Title]
_Why this is relevant for you:_ [Tailored explanation based on user's scorecard results that directly references their specific situation]
[Learn More: Resource Title](Resource URL)

Use the user's answers, their AI Readiness Tier, and any specific weak areas or interests identified to select and explain the resources. Be specific and provide concrete examples wherever possible. Aim for a helpful, guiding, and expert tone throughout the report. The report should empower the user with clear understanding and actionable next steps. Ensure each section provides substantial value and is not superficial. Make your assessment thorough, professional, and actionable. The report should provide genuine value and strategic direction.`;

    // Create the user message with the complete history
    const userMessage = `Analyze the following assessment history for the ${industry} industry and generate the comprehensive Markdown report as instructed: ${JSON.stringify(history)}`;

    // Call OpenAI API using the provided API key for report generation
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Use George's provided API key
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // Using GPT-4 for high-quality report generation
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API call failed with status: ${response.status}. Response: ${errorText}`);
      throw new Error(`OpenAI API call failed with status: ${response.status}`);
    }

    // Parse the response to extract the Markdown content
    const pollResponse = await response.json();
    console.log("Raw OpenAI response for report generation:", JSON.stringify(pollResponse, null, 2));
    
    const reportMarkdown = pollResponse.choices?.[0]?.message?.content;

    if (typeof reportMarkdown !== 'string') {
      console.error("Error: Expected report Markdown string from OpenAI, but got:", reportMarkdown, "Full OpenAI response:", JSON.stringify(pollResponse, null, 2));
      return NextResponse.json({ error: "Failed to extract report content from OpenAI response." }, { status: 500 });
    }
    
    console.log("Successfully extracted report Markdown from OpenAI. Report length:", reportMarkdown.length);
    
    // Return the Markdown report to the frontend
    return NextResponse.json({
      reportMarkdown: reportMarkdown,
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

async function handleAssessmentRequest(currentPhaseName: string, history: any[], industry: string) {
  try {
    // Create the system prompt based on the current context
    const systemPrompt = `You are generating questions for the Social Garden AI Efficiency Scorecard assessment. 
Current phase: ${currentPhaseName}. 
User's industry: ${industry}. 
Conversation history: ${JSON.stringify(history)}. 

Your task is to ask the next relevant question for the current phase ("${currentPhaseName}"). 
Make sure your questions are targeted to assess the organization's AI readiness and efficiency in this specific phase.

**IMPORTANT: Critically analyze the provided \`history\` of the user's answers. Use this context to significantly tailor the \`questionText\` to the user's specific situation and previous responses, whenever appropriate for the current assessment phase (${currentPhaseName}). Avoid generic questions or asking things clearly answered or made redundant by the history.**

For questions, consider the following guidelines:
- Strategy phase: Questions about AI strategy, alignment with business goals, executive support
- Data phase: Questions about data quality, accessibility, governance
- Tech phase: Questions about AI infrastructure, tools, platforms
- Team/Process phase: Questions about AI skills, team structure, development processes
- Governance phase: Questions about AI ethics, risk management, compliance

Assessment rules:
- Aim for approximately ${Math.ceil(MAX_QUESTIONS / ASSESSMENT_PHASES.length)} questions per phase
- If this phase has sufficient questions (${Math.ceil(MAX_QUESTIONS / ASSESSMENT_PHASES.length)} or more), set phase_status to 'completed'
- If this is the last phase (${ASSESSMENT_PHASES[ASSESSMENT_PHASES.length - 1]}) and it's completed, set overall_status to 'assessment-completed'
- If total questions across all phases would exceed ${MAX_QUESTIONS}, set overall_status to 'assessment-completed'
- Otherwise, keep statuses as 'in-progress'

Choose an appropriate answerType for each question:
- "text" for open-ended questions requiring paragraph responses
- "single-choice" for questions with mutually exclusive options
- "multiple-choice" for questions allowing multiple selections
- "scale" for rating questions (1-5 or 1-10)

For the \`reasoning_text\` field, provide the internal reasoning steps (1-2 concise sentences) that led to selecting this question. Phrase this as your own thought process (e.g., 'The user's previous input about X suggests low maturity in Y, therefore probing Z is necessary next.'). Do *not* address the user directly (avoid 'you', 'your'). Ensure this reasoning is clear and avoids garbled or nonsensical text, paying special attention to clarity on the very first turn.

Return your response ONLY as a valid JSON object with this exact structure:
{
  "questionText": "Your question here",
  "answerType": "text|single-choice|multiple-choice|scale",
  "options": ["Option 1", "Option 2", ...],  // Include only for choice-based questions
  "phase_status": "in-progress|completed",
  "overall_status": "assessment-in-progress|assessment-completed",
  "reasoning_text": "Internal reasoning steps that led to selecting this question"
}`;

    // Create the user message
    const userMessage = `Current phase is ${currentPhaseName}. User's industry is ${industry}. Here is the history of my previous answers: ${JSON.stringify(history)}. Please provide the next question or conclude the phase/assessment.`;

    // Call Pollinations.AI's OpenAI-compatible endpoint
    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai-large",
        response_format: { type: "json_object" },
        // seed removed to allow for more dynamic responses
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pollinations.AI API call failed with status: ${response.status}. Response: ${errorText}`);
      throw new Error(`Pollinations.AI API call failed with status: ${response.status}`);
    }

    // Parse the JSON response
    const pollResponse = await response.json();
    console.log("Raw Pollinations.AI response:", JSON.stringify(pollResponse, null, 2));
    
    // Extract and process the AI's structured data
    let aiStructuredData;
    const aiResponseMessage = pollResponse.choices?.[0]?.message;

    if (!aiResponseMessage || !aiResponseMessage.content) {
      console.error("Error: AI response is missing 'choices[0].message.content'. Full Pollinations response:", JSON.stringify(pollResponse, null, 2));
      return NextResponse.json({ error: "Invalid response structure from AI service." }, { status: 500 });
    }

    const rawContent = aiResponseMessage.content;
    console.log("Raw content from AI:", typeof rawContent, rawContent);

    if (typeof rawContent === 'string') {
      // Log the original content for debugging
      console.log("Raw content string from AI:", rawContent);
      
      // Find the last closing brace to handle potential trailing text
      const lastBraceIndex = rawContent.lastIndexOf('}');
      
      if (lastBraceIndex !== -1) {
        // Extract the substring from the beginning up to and including the last closing brace
        const jsonString = rawContent.substring(0, lastBraceIndex + 1);
        console.log("Extracted potential JSON string:", jsonString);
        
        try {
          aiStructuredData = JSON.parse(jsonString); // Parse the extracted string instead of full rawContent
          console.log("Successfully parsed extracted JSON string:", aiStructuredData);
        } catch (parseError) {
          console.error("Error: Failed to parse extracted JSON string. String was:", jsonString, "Error:", parseError);
          return NextResponse.json({ error: "Malformed extracted JSON content from AI service.", details: jsonString }, { status: 500 });
        }
      } else { // No closing brace found
        console.error("Error: No closing brace found in AI content string. Content was:", rawContent);
        return NextResponse.json({ error: "Invalid content format from AI service (missing closing brace).", details: rawContent }, { status: 500 });
      }
    } else if (typeof rawContent === 'object' && rawContent !== null) {
      aiStructuredData = rawContent; // It was already an object
      console.log("AI content was already an object:", aiStructuredData);
    } else {
      console.error("Error: AI response content is not a string or object. Content:", rawContent);
      return NextResponse.json({ error: "Unexpected AI content type." }, { status: 500 });
    }

    // Ensure aiStructuredData has the expected fields
    if (!aiStructuredData.questionText || !aiStructuredData.answerType) {
      console.error("Error: Parsed AI data is missing essential fields. Data:", aiStructuredData);
      return NextResponse.json({ error: "AI data missing essential fields.", details: aiStructuredData }, { status: 500 });
    }
    
    // Determine if we need to transition to the next phase
    let nextPhaseName = null;
    if (aiStructuredData.phase_status === 'completed' && aiStructuredData.overall_status === 'assessment-in-progress') {
      const currentPhaseIndex = ASSESSMENT_PHASES.indexOf(currentPhaseName);
      
      // If not the last phase, move to next phase
      if (currentPhaseIndex < ASSESSMENT_PHASES.length - 1) {
        nextPhaseName = ASSESSMENT_PHASES[currentPhaseIndex + 1];
      } else {
        // Override if we've reached the end of all phases
        aiStructuredData.overall_status = 'assessment-completed';
      }
    }
    
    // Safety check to ensure we don't exceed MAX_QUESTIONS
    if (history.length >= MAX_QUESTIONS - 1) {
      aiStructuredData.overall_status = 'assessment-completed';
    }
    
    // Return the complete response to the frontend
    const finalResponse = {
      questionText: aiStructuredData.questionText,
      answerType: aiStructuredData.answerType,
      options: aiStructuredData.options,
      phase_status: aiStructuredData.phase_status,
      overall_status: aiStructuredData.overall_status,
      reasoningText: aiStructuredData.reasoning_text,
      currentPhaseName,
      nextPhaseName
    };
    
    console.log("Final response to frontend:", finalResponse);
    
    return NextResponse.json(finalResponse, { status: 200 });
  } catch (error) {
    console.error('Error in assessment logic:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment request', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 