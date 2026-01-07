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

    // Send emails using Resend
    if (process.env.RESEND_API_KEY) {
      // 1. Send notification email to company
      const companyResponse = await fetch('https://api.resend.com/emails', {
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

      if (!companyResponse.ok) {
        const error = await companyResponse.text();
        console.error('Resend API error (company email):', error);
        throw new Error('Failed to send company notification');
      }

      const companyResult = await companyResponse.json();
      console.log('Company notification sent:', companyResult);

      // 2. Send confirmation email to customer
      const customerSubject = 'Quote Request Received - Los Reyes Tires';
      
      const customerTextBody = `
Hi ${name},

Thank you for your tire quote request!

We've received your inquiry and one of our tire experts will review it shortly. You can expect to hear back from us within 24 hours during business hours.

Your Request Details:
${vehicleOrSizeInfo}
Condition: ${tireCondition.toUpperCase()}
${additionalInfo ? `\nAdditional Notes: ${additionalInfo}` : ''}

Questions? Feel free to contact us:
📞 Phone: 619-440-6098
💬 WhatsApp: (619) 729-9468
📧 Email: info@losreyestires.com
📍 Location: 1245 N 1st St, El Cajon, CA 92021

Family Owned Since 2005 | Serving San Diego with Pride

Best regards,
The Los Reyes Tires Team
      `.trim();

      const customerHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #ffffff; padding: 30px 20px; }
    .highlight-box { background: #f9fafb; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .details { margin: 20px 0; }
    .detail-row { margin: 8px 0; }
    .label { font-weight: bold; color: #6b7280; }
    .contact-section { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0; }
    .contact-item { margin: 10px 0; }
    .contact-item a { color: #dc2626; text-decoration: none; }
    .footer { background: #18181b; color: #a1a1aa; text-align: center; padding: 20px; font-size: 12px; }
    .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Quote Request Received!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      
      <p>Thank you for your tire quote request! We've received your inquiry and one of our tire experts will review it shortly.</p>
      
      <p><strong>You can expect to hear back from us within 24 hours during business hours.</strong></p>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0; color: #dc2626;">Your Request Details</h3>
        <div class="detail-row"><span class="label">${searchType === 'vehicle' ? 'Vehicle:' : 'Tire Size:'}</span> ${vehicleOrSizeInfo.split(': ')[1]}</div>
        <div class="detail-row"><span class="label">Condition:</span> ${tireCondition.toUpperCase()}</div>
        ${additionalInfo ? `<div class="detail-row"><span class="label">Notes:</span> ${additionalInfo}</div>` : ''}
      </div>
      
      <div class="contact-section">
        <h3 style="margin-top: 0; color: #dc2626;">Need Immediate Assistance?</h3>
        <div class="contact-item">📞 <strong>Phone:</strong> <a href="tel:619-440-6098">619-440-6098</a></div>
        <div class="contact-item">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/16197299468">(619) 729-9468</a></div>
        <div class="contact-item">📧 <strong>Email:</strong> <a href="mailto:info@losreyestires.com">info@losreyestires.com</a></div>
        <div class="contact-item">📍 <strong>Location:</strong> 1245 N 1st St, El Cajon, CA 92021</div>
      </div>
      
      <p style="text-align: center;">
        <a href="https://losreyestires.com" class="button">Visit Our Website</a>
      </p>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
        <strong>Family Owned Since 2005</strong><br>
        Serving San Diego with Pride
      </p>
    </div>
    <div class="footer">
      <p><strong>Los Reyes Tires</strong></p>
      <p>1245 N 1st St, El Cajon, CA 92021</p>
      <p>© ${new Date().getFullYear()} Los Reyes Tires. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `.trim();

      const customerResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Los Reyes Tires <quotes@losreyestires.com>',
          to: email,
          subject: customerSubject,
          text: customerTextBody,
          html: customerHtmlBody,
        }),
      });

      if (!customerResponse.ok) {
        const error = await customerResponse.text();
        console.error('Resend API error (customer email):', error);
        // Don't throw - company email already sent successfully
        console.log('Customer confirmation failed, but company notification was sent');
      } else {
        const customerResult = await customerResponse.json();
        console.log('Customer confirmation sent:', customerResult);
      }
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
