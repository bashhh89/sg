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
    const systemPrompt = `You are an AI Efficiency Analyst generating a scorecard report in Markdown. 
Analyze the conversation history and industry provided. 
Determine an overall tier (Dabbler, Enabler, Leader) based on the assessment results.

Output ONLY the Markdown report adhering STRICTLY to the following structure:

## Overall Tier: [Tier Name]

## Key Findings

**Strengths:**
- Bullet points of key strengths identified from the assessment
- Focus on positive aspects of their AI readiness

**Weaknesses:**
- Bullet points of key weaknesses or improvement areas
- Be constructive but honest about gaps

## Strategic Action Plan

1. Actionable advice specifically tailored to address their weaknesses
2. Specific steps they can take to improve their AI efficiency
3. Industry-specific recommendations where possible for the ${industry} sector

## Getting Started & Resources

Review the following resources to help you get started:
- [Resource Placeholder 1](#)
- [Resource Placeholder 2](#)
- [Resource Placeholder 3](#)

## Illustrative Benchmarks

* Example: Companies in the ${industry} sector at the 'Leader' tier typically leverage AI for...
* Example: Organizations at the 'Enabler' tier in your industry generally have...

## Your Personalized AI Learning Path

Based on your scorecard results, here are some recommended resources to help you advance your AI skills:

For this section, select 2-4 of the most relevant resources from the following library (each resource has a title, url, level, topics, and optionally industry):

- { title: "Intro to AI for Marketing Content", url: "https://example.com/ai-content-intro", level: "beginner", topics: ["content creation"] }
- { title: "Advanced AI Lead Scoring Techniques", url: "https://example.com/ai-lead-scoring-advanced", level: "intermediate", topics: ["lead scoring", "sales"] }
- { title: "AI in Real Estate: Getting Started", url: "https://example.com/ai-real-estate-basics", level: "beginner", topics: ["real estate"], industry: "Real Estate" }
- { title: "AI Data Audit Checklist", url: "https://example.com/ai-data-audit", level: "beginner", topics: ["data audit", "data quality"] }
- { title: "Building an AI-Ready Team", url: "https://example.com/ai-team-building", level: "intermediate", topics: ["team", "skills"] }

For each selected resource, include:
### [Resource Title]
_Why this is relevant for you:_ [A brief explanation tailored to the user's scorecard results, e.g., 'You indicated an interest in improving content generation with AI.']
[Learn More: Resource Title](Resource URL)

Use the user's answers, their AI Readiness Tier, and any specific weak areas or interests identified to select and explain the resources. Do not invent new resources; only select from the provided library. Make this section genuinely helpful and personalized.

Make your assessment thorough, professional, and actionable. The report should provide genuine value and strategic direction.`;

    // Create the user message with the complete history
    const userMessage = `Analyze the following assessment history for the ${industry} industry and generate the comprehensive Markdown report as instructed: ${JSON.stringify(history)}`;

    // Call Pollinations.AI's OpenAI-compatible endpoint for report generation
    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai-large",
        // No response_format parameter for Markdown output
        seed: 123, // For consistency
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

    // Parse the response to extract the Markdown content
    const pollResponse = await response.json();
    console.log("Raw Pollinations.AI response for report generation:", JSON.stringify(pollResponse, null, 2));
    
    const reportMarkdown = pollResponse.choices?.[0]?.message?.content;

    if (typeof reportMarkdown !== 'string') {
      console.error("Error: Expected report Markdown string from AI, but got:", reportMarkdown, "Full Pollinations response:", JSON.stringify(pollResponse, null, 2));
      return NextResponse.json({ error: "Failed to extract report content from AI response." }, { status: 500 });
    }
    
    console.log("Successfully extracted report Markdown from AI. Report length:", reportMarkdown.length);
    
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