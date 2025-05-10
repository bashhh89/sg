import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      leadName, 
      leadCompany, 
      leadEmail, 
      leadPhone, 
      aiTier, 
      type, 
      reportMarkdown, 
      questionAnswerHistory 
    } = body;

    const recipientEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'contactus@socialgardenhq.com';
    
    // Handle both pre-assessment lead capture and post-assessment lead completion
    if (type === 'leadCapture' || type === 'leadCompleted') {
      // Validate required fields
      if (!leadName || !leadCompany || !leadEmail) {
        return NextResponse.json(
          { message: 'Missing required fields. Name, company, and email are required.' },
          { status: 400 }
        );
      }

      // Determine email subject based on lead type
      const emailSubject = type === 'leadCapture' 
        ? `New AI Scorecard Assessment Started by ${leadName} from ${leadCompany}`
        : `AI Scorecard Assessment Completed by ${leadName} from ${leadCompany}`;

      // Build email content
      let emailHtml = `
        <h1>${emailSubject}</h1>
        <p><strong>Name:</strong> ${leadName}</p>
        <p><strong>Company:</strong> ${leadCompany}</p>
        <p><strong>Email:</strong> ${leadEmail}</p>
        <p><strong>Phone:</strong> ${leadPhone || 'Not provided'}</p>
      `;

      // Add assessment results if completed
      if (type === 'leadCompleted' && aiTier) {
        emailHtml += `
          <p><strong>AI Maturity Tier:</strong> ${aiTier}</p>
          <hr />
          <h2>Assessment Results</h2>
          <p>See the attached report and question history for full details.</p>
        `;
      }

      const data = await resend.emails.send({
        from: 'AI Scorecard <noreply@socialgarden.io>',
        to: [recipientEmail],
        subject: emailSubject,
        html: emailHtml,
      });

      return NextResponse.json({ message: 'Lead notification sent successfully' });
    }

    return NextResponse.json(
      { message: 'Invalid notification type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error sending lead notification:', error);
    return NextResponse.json(
      { message: 'Error sending lead notification' },
      { status: 500 }
    );
  }
} 