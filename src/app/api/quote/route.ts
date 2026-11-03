import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Quote card "No WhatsApp?" requests. Delivered by email through Resend with the same
// settings as /api/rfi (RESEND_API_KEY, RFI_EMAIL_TO, RFI_EMAIL_FROM).
// Responds with { delivered: [...] }, which is what the quote card checks for.

const MAX_BODY_BYTES = 8 * 1024;
const MODES = new Set(['tires', 'wheels', 'package']);
const CONDITIONS = new Set(['used', 'new', 'either']);

const esc = (v: string) =>
  v.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c] || c);

function str(v: unknown, max: number): string {
  if (typeof v !== 'string') return '';
  const s = v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  return s.slice(0, max);
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return request.headers.get('sec-fetch-site') !== 'cross-site';
  const allowed = new Set([request.nextUrl.origin]);
  try { if (process.env.SITE_ORIGIN) allowed.add(new URL(process.env.SITE_ORIGIN).origin); } catch { /* ignore */ }
  try { return allowed.has(new URL(origin).origin); } catch { return false; }
}

const fail = (error: string, status: number) =>
  NextResponse.json({ error, delivered: [] }, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return fail('Cross-origin submissions are not allowed', 403);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return fail('Request body is too large', 413);

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail('Request body must be JSON', 400);
  }

  const phone = str(body.phone, 40);
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return fail('Phone number is invalid', 400);

  const mode = MODES.has(str(body.mode, 10)) ? str(body.mode, 10) : 'tires';
  const condition = CONDITIONS.has(str(body.condition, 10)) ? str(body.condition, 10) : '';
  const qty = [1, 2, 4].includes(Number(body.qty)) ? String(body.qty) : '';
  const lines: [string, string][] = [
    ['Request', mode === 'package' ? 'Wheel + tire combo' : mode === 'wheels' ? 'Wheels' : 'Tires'],
    ['Phone', phone],
    ['Name', str(body.name, 80)],
    ['Tire size', str(body.size, 24)],
    ['Wheel size', str(body.wheelSize, 6) ? `${str(body.wheelSize, 6)}"` : ''],
    ['Style', str(body.style, 80)],
    ['Quantity', qty],
    ['Type', condition],
    ['Vehicle', str(body.vehicle, 120)],
    ['Language', str(body.lang, 4) === 'es' ? 'Spanish' : 'English'],
    ['Page', str(body.source, 120)],
  ];
  const filled = lines.filter(([, v]) => v);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Quote route unavailable: RESEND_API_KEY is required');
    return fail('Lead delivery is temporarily unavailable', 503);
  }

  const subjectBits = [str(body.size, 24), str(body.vehicle, 60)].filter(Boolean).join(' · ');
  const text = ['LOS REYES TIRES — WEBSITE QUOTE (NO WHATSAPP)', '', ...filled.map(([k, v]) => `${k}: ${v}`), '', 'Call or text the customer back with a price.'].join('\n');
  const html = `<!doctype html><html><body style="margin:0;background:#faf6f0;color:#211e1a;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:24px auto;background:#fff;border:1px solid #e7d6bd;">
<div style="background:#d11f27;color:#fff;padding:18px 22px;"><strong>New quote request</strong> — call or text back</div>
<div style="padding:22px;line-height:1.6;">${filled.map(([k, v]) => `<p style="margin:0 0 6px"><strong>${esc(k)}:</strong> ${k === 'Phone' ? `<a href="tel:${digits}">${esc(v)}</a>` : esc(v)}</p>`).join('')}</div>
</div></body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RFI_EMAIL_FROM || 'Los Reyes Tires <no-reply@losreyestires.com>',
      to: process.env.RFI_EMAIL_TO || 'sales@losreyestires.com',
      subject: `Quote Request${subjectBits ? ` — ${subjectBits}` : ''}`,
      text,
      html,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error(`Quote email failed${res ? ` with status ${res.status}` : ''}`);
    return fail('Lead delivery is temporarily unavailable', 502);
  }
  return NextResponse.json({ delivered: ['email'] }, { headers: { 'Cache-Control': 'no-store' } });
}
