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
    let vehicleOrSizeLabel = '';
    if (searchType === 'vehicle' && vehicleInfo) {
      vehicleOrSizeInfo = `${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`;
      vehicleOrSizeLabel = 'VEHICLE';
    } else if (searchType === 'size' && sizeInfo) {
      vehicleOrSizeInfo = `${sizeInfo.width}/${sizeInfo.aspect}R${sizeInfo.diameter}`;
      vehicleOrSizeLabel = 'TIRE SIZE';
    }

    // Email subject
    const subject = `Quote Request - ${name}`;

    // Email body (plain text) - Structured for AI/system processing
    const textBody = `
--- TIRE QUOTE REQUEST ---

CUSTOMER:
Name: ${name}
Phone: ${phone}
Email: ${email}

REQUEST DETAILS:
Condition: ${tireCondition.toUpperCase()}
${vehicleOrSizeLabel ? `${vehicleOrSizeLabel}: ${vehicleOrSizeInfo}` : ''}
${additionalInfo ? `\nNOTES:\n${additionalInfo}` : ''}

TIMESTAMP: ${new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      dateStyle: 'short',
      timeStyle: 'short'
    })}

SOURCE: losreyestires.com
--- END QUOTE REQUEST ---
    `.trim();

    // Email body (HTML) - Minimal and clean
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #dc2626; color: white; padding: 20px; }
    .header h1 { margin: 0; font-size: 18px; font-weight: normal; }
    .content { padding: 24px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #666; margin-bottom: 8px; }
    .info-table { width: 100%; border-collapse: collapse; }
    .info-table td { padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; }
    .info-table td:first-child { font-weight: 600; color: #666; width: 100px; }
    .info-table tr:last-child td { border-bottom: none; }
    .info-table a { color: #dc2626; text-decoration: none; }
    .notes-box { background: #fafafa; border-left: 3px solid #dc2626; padding: 12px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; }
    .cta-button { display: inline-block; background: #dc2626; color: white; padding: 10px 20px; text-decoration: none; font-size: 14px; margin: 16px 0; }
    .footer { background: #f5f5f5; padding: 16px 24px; text-align: center; font-size: 11px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quote Request</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">Customer Information</div>
        <table class="info-table">
          <tr>
            <td>Name</td>
            <td>${name}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><a href="tel:${phone.replace(/\D/g, '')}">${phone}</a></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><a href="mailto:${email}">${email}</a></td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">Request Details</div>
        <table class="info-table">
          <tr>
            <td>Condition</td>
            <td>${tireCondition.toUpperCase()}</td>
          </tr>
          ${vehicleOrSizeLabel ? `
          <tr>
            <td>${vehicleOrSizeLabel === 'VEHICLE' ? 'Vehicle' : 'Tire Size'}</td>
            <td>${vehicleOrSizeInfo}</td>
          </tr>
          ` : ''}
        </table>
        ${additionalInfo ? `
        <div style="margin-top: 12px;">
          <div class="section-title">Additional Notes</div>
          <div class="notes-box">${additionalInfo}</div>
        </div>
        ` : ''}
      </div>
      
      <div style="text-align: center; padding: 8px 0;">
        <a href="mailto:${email}" class="cta-button">Reply to Customer</a>
      </div>
    </div>
    <div class="footer">
      <div>Submitted ${new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      dateStyle: 'medium',
      timeStyle: 'short'
    })}</div>
      <div>From: losreyestires.com</div>
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

Thank you for requesting a quote from Los Reyes Tires! We've received your inquiry and one of our tire experts will review it shortly. You can expect to hear back from us within 24 hours during business hours.

Your Request Summary:
Condition: ${tireCondition.toUpperCase()}
${vehicleOrSizeLabel ? `${vehicleOrSizeLabel === 'VEHICLE' ? 'Vehicle' : 'Tire Size'}: ${vehicleOrSizeInfo}` : ''}
${additionalInfo ? `Notes: ${additionalInfo}` : ''}

Need immediate assistance? Contact us:
Phone: (619) 440-6098
WhatsApp: (619) 729-9468
Email: info@losreyestires.com
Location: 1245 N 1st St, El Cajon, CA 92021

Family Owned Since 2005
Serving San Diego with Pride

Best regards,
Los Reyes Tires Team
      `.trim();

      const customerHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #dc2626; color: white; padding: 24px; }
    .header h1 { margin: 0 0 4px 0; font-size: 20px; font-weight: normal; }
    .header p { margin: 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 24px; }
    .message { font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
    .summary-box { background: #fafafa; border-left: 3px solid #dc2626; padding: 16px; margin: 20px 0; }
    .summary-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #666; margin: 0 0 12px 0; }
    .summary-table { width: 100%; border-collapse: collapse; }
    .summary-table td { padding: 6px 0; font-size: 14px; border-bottom: 1px solid #e5e5e5; }
    .summary-table td:first-child { font-weight: 600; color: #666; width: 100px; }
    .summary-table tr:last-child td { border-bottom: none; }
    .contact-section { background: #f5f5f5; padding: 20px; margin: 20px 0; }
    .contact-title { font-size: 14px; font-weight: bold; margin: 0 0 12px 0; text-align: center; }
    .contact-table { width: 100%; border-collapse: collapse; }
    .contact-table td { padding: 6px 0; font-size: 13px; }
    .contact-table td:first-child { font-weight: 600; color: #666; width: 100px; }
    .contact-table a { color: #dc2626; text-decoration: none; }
    .cta-button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; font-size: 14px; margin: 16px 0; }
    .footer { background: #f5f5f5; padding: 20px 24px; text-align: center; font-size: 12px; color: #666; }
    .tagline { font-size: 12px; margin: 20px 0 0 0; text-align: center; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Quote Request Received</h1>
      <p>We'll get back to you within 24 hours</p>
    </div>
    <div class="content">
      <div class="message">
        Hi <strong>${name}</strong>,
      </div>
      
      <div class="message">
        Thank you for requesting a quote from Los Reyes Tires! We've received your inquiry and one of our tire experts will review it shortly.
      </div>
      
      <div class="summary-box">
        <div class="summary-title">Your Request Summary</div>
        <table class="summary-table">
          <tr>
            <td>Condition</td>
            <td>${tireCondition.toUpperCase()}</td>
          </tr>
          ${vehicleOrSizeLabel ? `
          <tr>
            <td>${vehicleOrSizeLabel === 'VEHICLE' ? 'Vehicle' : 'Tire Size'}</td>
            <td>${vehicleOrSizeInfo}</td>
          </tr>
          ` : ''}
          ${additionalInfo ? `
          <tr>
            <td style="vertical-align: top;">Notes</td>
            <td style="white-space: pre-wrap;">${additionalInfo}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div class="contact-section">
        <div class="contact-title">Need Immediate Assistance?</div>
        <table class="contact-table">
          <tr>
            <td>Phone</td>
            <td><a href="tel:6194406098">(619) 440-6098</a></td>
          </tr>
          <tr>
            <td>WhatsApp</td>
            <td><a href="https://wa.me/16197299468">(619) 729-9468</a></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><a href="mailto:info@losreyestires.com">info@losreyestires.com</a></td>
          </tr>
          <tr>
            <td>Location</td>
            <td>1245 N 1st St, El Cajon, CA 92021</td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center;">
        <a href="https://losreyestires.com" class="cta-button">Visit Our Website</a>
      </div>
      
      <div class="tagline">
        Family Owned Since 2005<br>
        Serving San Diego with Pride
      </div>
    </div>
    <div class="footer">
      <div>Los Reyes Tires</div>
      <div>1245 N 1st St, El Cajon, CA 92021</div>
      <div style="margin-top: 8px;">&copy; ${new Date().getFullYear()} Los Reyes Tires. All rights reserved.</div>
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
