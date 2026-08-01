import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const MAX_BODY_BYTES = 16 * 1024;
const ALLOWED_CONDITIONS = new Set(['custom', 'new', 'used', 'wheels', 'other', 'contact request']);
const ALLOWED_SEARCH_TYPES = new Set(['custom', 'vehicle', 'size']);

interface ValidatedLead {
  name: string;
  phone: string;
  phoneDigits: string;
  email: string;
  tireCondition: string;
  searchType: string;
  vehicleOrSizeLabel: string;
  vehicleOrSizeInfo: string;
  additionalInfo: string;
}

class RequestValidationError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');

  if (!origin) {
    return fetchSite !== 'cross-site';
  }

  const allowedOrigins = new Set([request.nextUrl.origin]);
  if (process.env.SITE_ORIGIN) {
    try {
      allowedOrigins.add(new URL(process.env.SITE_ORIGIN).origin);
    } catch {
      console.error('SITE_ORIGIN is not a valid URL');
    }
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

async function readJsonBody(request: NextRequest): Promise<unknown> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    throw new RequestValidationError('Content-Type must be application/json', 415);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    throw new RequestValidationError('Request body is too large', 413);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    throw new RequestValidationError('Request body is too large', 413);
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new RequestValidationError('Request body must contain valid JSON');
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function cleanString(value: unknown, field: string, maxLength: number, multiline = false): string {
  if (typeof value !== 'string') {
    throw new RequestValidationError(`${field} must be a string`);
  }

  const normalized = value.replace(/\r\n?/g, '\n').trim();
  const invalidControlCharacters = multiline
    ? /[\u0000-\u0009\u000b-\u001f\u007f]/
    : /[\u0000-\u001f\u007f]/;

  if (!normalized || normalized.length > maxLength || invalidControlCharacters.test(normalized)) {
    throw new RequestValidationError(`${field} is invalid`);
  }

  return normalized;
}

function optionalString(value: unknown, field: string, maxLength: number, multiline = false): string {
  if (value === undefined || value === null || value === '') return '';
  return cleanString(value, field, maxLength, multiline);
}

function validateLead(value: unknown): ValidatedLead {
  const data = asRecord(value);
  if (!data) throw new RequestValidationError('Request body must be an object');

  const name = cleanString(data.name, 'Name', 100);
  if (name.length < 2) throw new RequestValidationError('Name is too short');

  const phone = cleanString(data.phone, 'Phone', 40);
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    throw new RequestValidationError('Phone number is invalid');
  }

  const email = cleanString(data.email, 'Email', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw new RequestValidationError('Email address is invalid');
  }

  const tireCondition = cleanString(data.tireCondition, 'Request type', 40).toLowerCase();
  if (!ALLOWED_CONDITIONS.has(tireCondition)) {
    throw new RequestValidationError('Request type is invalid');
  }

  const searchType = cleanString(data.searchType, 'Search type', 20).toLowerCase();
  if (!ALLOWED_SEARCH_TYPES.has(searchType)) {
    throw new RequestValidationError('Search type is invalid');
  }

  let vehicleOrSizeLabel = '';
  let vehicleOrSizeInfo = '';

  if (searchType === 'vehicle') {
    const vehicle = asRecord(data.vehicleInfo);
    if (!vehicle) throw new RequestValidationError('Vehicle information is required');
    const year = cleanString(vehicle.year, 'Vehicle year', 4);
    const make = cleanString(vehicle.make, 'Vehicle make', 60);
    const model = cleanString(vehicle.model, 'Vehicle model', 60);
    if (!/^\d{4}$/.test(year)) throw new RequestValidationError('Vehicle year is invalid');
    vehicleOrSizeLabel = 'Vehicle';
    vehicleOrSizeInfo = `${year} ${make} ${model}`;
  } else if (searchType === 'size') {
    const size = asRecord(data.sizeInfo);
    if (!size) throw new RequestValidationError('Tire size information is required');
    const width = cleanString(size.width, 'Tire width', 4);
    const aspect = cleanString(size.aspect, 'Tire aspect ratio', 3);
    const diameter = cleanString(size.diameter, 'Wheel diameter', 3);
    if (!/^\d{2,4}$/.test(width) || !/^\d{2,3}$/.test(aspect) || !/^\d{2,3}$/.test(diameter)) {
      throw new RequestValidationError('Tire size is invalid');
    }
    vehicleOrSizeLabel = 'Tire size';
    vehicleOrSizeInfo = `${width}/${aspect}R${diameter}`;
  }

  return {
    name,
    phone,
    phoneDigits,
    email,
    tireCondition,
    searchType,
    vehicleOrSizeLabel,
    vehicleOrSizeInfo,
    additionalInfo: optionalString(data.additionalInfo, 'Additional information', 2000, true),
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

function displayCondition(condition: string): string {
  return condition.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function buildEmail(lead: ValidatedLead) {
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const condition = displayCondition(lead.tireCondition);

  const text = [
    'LOS REYES TIRES — WEBSITE REQUEST',
    '',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Request type: ${condition}`,
    lead.vehicleOrSizeInfo ? `${lead.vehicleOrSizeLabel}: ${lead.vehicleOrSizeInfo}` : '',
    lead.additionalInfo ? `Notes:\n${lead.additionalInfo}` : '',
    '',
    `Submitted: ${submittedAt}`,
    'Source: losreyestires.com',
  ].filter(Boolean).join('\n');

  const html = `
<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f4f5;color:#18181b;font-family:Arial,sans-serif;">
    <div style="max-width:640px;margin:24px auto;background:#fff;border:1px solid #e4e4e7;">
      <div style="background:#dc2626;color:#fff;padding:20px 24px;"><strong>New website request</strong></div>
      <div style="padding:24px;line-height:1.6;">
        <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
        <p><strong>Phone:</strong> <a href="tel:${lead.phoneDigits}">${escapeHtml(lead.phone)}</a></p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
        <p><strong>Request type:</strong> ${escapeHtml(condition)}</p>
        ${lead.vehicleOrSizeInfo ? `<p><strong>${escapeHtml(lead.vehicleOrSizeLabel)}:</strong> ${escapeHtml(lead.vehicleOrSizeInfo)}</p>` : ''}
        ${lead.additionalInfo ? `<div style="margin-top:18px;padding:14px;background:#fafafa;border-left:3px solid #dc2626;white-space:pre-wrap;"><strong>Notes</strong><br>${escapeHtml(lead.additionalInfo)}</div>` : ''}
        <p style="margin-top:22px;color:#71717a;font-size:12px;">Submitted ${escapeHtml(submittedAt)} from losreyestires.com</p>
      </div>
    </div>
  </body>
</html>`.trim();

  return {
    subject: `${lead.tireCondition === 'contact request' ? 'Contact Request' : 'Quote Request'} — ${lead.name}`,
    text,
    html,
  };
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return jsonError('Cross-origin submissions are not allowed', 403);
  }

  try {
    const lead = validateLead(await readJsonBody(request));
    const apiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.RFI_EMAIL_TO;
    const emailFrom = process.env.RFI_EMAIL_FROM;

    if (!apiKey || !emailTo || !emailFrom) {
      console.error('RFI route unavailable: RESEND_API_KEY, RFI_EMAIL_TO, and RFI_EMAIL_FROM are required');
      return jsonError('Lead delivery is temporarily unavailable', 503);
    }

    const email = buildEmail(lead);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: emailTo,
        reply_to: lead.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    if (!response.ok) {
      console.error(`RFI email provider failed with status ${response.status}`);
      return jsonError('Lead delivery is temporarily unavailable', 502);
    }

    return NextResponse.json({ success: true, message: 'Request submitted successfully' }, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return jsonError(error.message, error.status);
    }
    console.error('Unexpected RFI submission failure', error);
    return jsonError('Failed to submit request', 500);
  }
}
