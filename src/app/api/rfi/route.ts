import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const {
      name,
      phone,
      email,
      tireCondition,
      searchType,
      vehicleInfo,
      sizeInfo,
      additionalInfo,
      timestamp,
    } = data;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build email content
    let vehicleOrSizeInfo = '';
    if (searchType === 'vehicle' && vehicleInfo) {
      vehicleOrSizeInfo = `Vehicle: ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`;
    } else if (searchType === 'size' && sizeInfo) {
      vehicleOrSizeInfo = `Tire Size: ${sizeInfo.width}/${sizeInfo.aspect}R${sizeInfo.diameter}`;
    }

    // Email subject
    const subject = `New Tire Quote Request - ${name}`;

    // Email body (plain text)
    const textBody = `
New Tire Quote Request

Customer Information:
--------------------
Name: ${name}
Phone: ${phone}
Email: ${email}

Tire Request:
-------------
Condition: ${tireCondition.toUpperCase()}
${vehicleOrSizeInfo}

${additionalInfo ? `Additional Information:\n${additionalInfo}\n` : ''}
Submitted: ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}

---
This request was submitted from losreyestires.com
    `.trim();

    // Email body (HTML)
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 25px; }
    .section h2 { color: #dc2626; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #dc2626; padding-bottom: 5px; }
    .info-row { margin: 8px 0; }
    .label { font-weight: bold; color: #6b7280; }
    .value { color: #111827; }
    .highlight { background: white; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚗 New Tire Quote Request</h1>
    </div>
    <div class="content">
      <div class="section">
        <h2>Customer Information</h2>
        <div class="info-row"><span class="label">Name:</span> <span class="value">${name}</span></div>
        <div class="info-row"><span class="label">Phone:</span> <span class="value">${phone}</span></div>
        <div class="info-row"><span class="label">Email:</span> <span class="value"><a href="mailto:${email}">${email}</a></span></div>
      </div>
      
      <div class="section">
        <h2>Tire Request</h2>
        <div class="highlight">
          <div class="info-row"><span class="label">Condition:</span> <span class="value">${tireCondition.toUpperCase()}</span></div>
          <div class="info-row"><span class="label">${searchType === 'vehicle' ? 'Vehicle' : 'Size'}:</span> <span class="value">${vehicleOrSizeInfo.split(': ')[1]}</span></div>
        </div>
        ${additionalInfo ? `
        <div class="info-row">
          <span class="label">Additional Information:</span>
          <div style="background: white; padding: 10px; margin-top: 5px; border-radius: 4px; white-space: pre-wrap;">${additionalInfo}</div>
        </div>
        ` : ''}
      </div>
      
      <div class="footer">
        <p>Submitted: ${new Date(timestamp).toLocaleString('en-US', { 
          timeZone: 'America/Los_Angeles',
          dateStyle: 'full',
          timeStyle: 'short'
        })}</p>
        <p>From: <strong>losreyestires.com</strong></p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Los Reyes Tires <quotes@losreyestires.com>',
          to: process.env.RFI_EMAIL_TO || 'info@losreyestires.com',
          reply_to: email,
          subject: subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend API error:', error);
        throw new Error('Failed to send email');
      }

      const result = await resendResponse.json();
      console.log('Email sent successfully:', result);
    } else {
      // Log to console if no email service configured
      console.log('RFI Submission (no email service configured):', {
        name,
        phone,
        email,
        tireCondition,
        vehicleOrSizeInfo,
        additionalInfo,
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('RFI submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
