// Website requests into the shop's RavnPro front desk inbox (server to server).
// Set RAVNPRO_INTAKE_URL (https://v2.ravnpro.com/api/intake/web/<shop id>) and
// the secret RAVNPRO_INTAKE_KEY. Without them nothing is sent; the email to the
// shop goes out either way, so a RavnPro hiccup never loses a lead.

export type RavnProRequest = {
  kind: 'web_quote' | 'web_contact';
  name?: string;
  phone?: string;
  email?: string;
  summary: string;
  details?: Record<string, string | number>;
};

export async function sendToRavnPro(request: RavnProRequest): Promise<boolean> {
  const url = process.env.RAVNPRO_INTAKE_URL;
  const key = process.env.RAVNPRO_INTAKE_KEY;
  if (!url || !key) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request, ref: crypto.randomUUID() }),
      signal: controller.signal,
    });
    if (!res.ok) console.error(`RavnPro intake failed with status ${res.status}`);
    return res.ok;
  } catch (error) {
    console.error('RavnPro intake failed', error);
    return false;
  } finally {
    clearTimeout(timer);
  }
}
