import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Using Resend (free tier: 3,000 emails/month, 100 emails/day)
    // Alternative: SendGrid, Mailgun, or AWS SES
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CV Requests <onboarding@resend.dev>', // Will be your verified domain
        to: ['gideonsammysen@gmail.com'],
        subject: `CV Request from ${data.fullName} - ${data.company}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #4b5563; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
                .value { margin-top: 5px; padding: 12px; background: white; border-radius: 6px; border-left: 3px solid #2563eb; }
                .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;">🎯 New CV Request</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone is interested in your profile!</p>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Full Name</div>
                    <div class="value">${data.fullName}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Company</div>
                    <div class="value">${data.company}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Job Title</div>
                    <div class="value">${data.jobTitle}</div>
                  </div>
                  
                  ${data.jobDescription ? `
                  <div class="field">
                    <div class="label">Job Description</div>
                    <div class="value">${data.jobDescription.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                  
                  ${data.additionalMessage ? `
                  <div class="field">
                    <div class="label">Additional Message</div>
                    <div class="value">${data.additionalMessage.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                  
                  <div class="footer">
                    <p>📧 Reply directly to <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a> with your CV</p>
                    <p style="font-size: 12px; margin-top: 15px;">Sent from your portfolio website • ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Email sending failed:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'CV request sent successfully' });
  } catch (error) {
    console.error('Error processing CV request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
