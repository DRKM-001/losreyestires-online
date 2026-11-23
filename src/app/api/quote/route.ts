import { NextRequest, NextResponse } from 'next/server';
import { sendToRavnPro } from '@/lib/ravnpro';

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

  // Two ways in: the WhatsApp hand-off (logged here in the background, no
  // phone yet — the conversation continues on WhatsApp) and the "No WhatsApp?"
  // form, which must carry a phone and also goes to the shop by email.
  const viaWhatsApp = body.direct !== true;
  const phone = str(body.phone, 40);
  const digits = phone.replace(/\D/g, '');
  if (!viaWhatsApp && (digits.length < 10 || digits.length > 15)) return fail('Phone number is invalid', 400);

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

  // The shop's RavnPro inbox gets the same request, alongside the email.
  const what = mode === 'package' ? 'wheel + tire combo' : mode === 'wheels' ? 'wheels' : '';
  const size = str(body.size, 24);
  const vehicle = str(body.vehicle, 120);
  const summary = [
    [qty ? `${qty} ×` : '', size || what || 'Tires', condition && condition !== 'either' ? condition : condition === 'either' ? 'new or used' : ''].filter(Boolean).join(' '),
    vehicle,
  ].filter(Boolean).join(' · ');
  const ravnpro = sendToRavnPro({
    kind: 'web_quote',
    name: str(body.name, 80),
    phone,
    summary: viaWhatsApp ? `WhatsApp · ${summary}` : summary,
    details: Object.fromEntries(
      Object.entries({
        size,
        qty: qty ? Number(qty) : '',
        condition,
        vehicle,
        mode,
        wheel_size: str(body.wheelSize, 6),
        style: str(body.style, 80),
        lang: str(body.lang, 4),
        page: str(body.source, 120),
        channel: viaWhatsApp ? 'whatsapp' : 'form',
      }).filter(([, v]) => v !== ''),
    ) as Record<string, string | number>,
  });

  if (viaWhatsApp) {
    // Logged for the front desk; the customer is already in WhatsApp.
    return (await ravnpro)
      ? NextResponse.json({ delivered: ['ravnpro'] }, { headers: { 'Cache-Control': 'no-store' } })
      : fail('Lead delivery is temporarily unavailable', 503);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Quote route: RESEND_API_KEY is missing; trying RavnPro only');
    return (await ravnpro)
      ? NextResponse.json({ delivered: ['ravnpro'] }, { headers: { 'Cache-Control': 'no-store' } })
      : fail('Lead delivery is temporarily unavailable', 503);
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

  const inRavnPro = await ravnpro;
  const emailed = !!res && res.ok;
  if (!emailed) console.error(`Quote email failed${res ? ` with status ${res.status}` : ''}`);
  const delivered = [...(emailed ? ['email'] : []), ...(inRavnPro ? ['ravnpro'] : [])];
  if (!delivered.length) return fail('Lead delivery is temporarily unavailable', 502);
  return NextResponse.json({ delivered }, { headers: { 'Cache-Control': 'no-store' } });
}
