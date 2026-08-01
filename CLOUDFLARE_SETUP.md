# Production environment setup

All credentials used by this application are server-only. Do not create any `NEXT_PUBLIC_*` credential variables.

## Required variables

Configure these as encrypted secrets in the production and preview environments that need the associated feature:

| Variable | Required for | Notes |
| --- | --- | --- |
| `TIRERAVEN_API_KEY` | Inventory and customer APIs | Server-only. Rotate the previously committed keys before use. |
| `RESEND_API_KEY` | Quote/contact delivery | Server-only Resend API key. |
| `RFI_EMAIL_TO` | Quote/contact delivery | Fixed Los Reyes-owned recipient address. |
| `RFI_EMAIL_FROM` | Quote/contact delivery | Verified Resend sender, for example `Los Reyes Tires <quotes@verified-domain.example>`. |

Optional variables:

| Variable | Purpose |
| --- | --- |
| `TIRERAVEN_API_BASE` | Overrides the default `https://api.tireraven.com/api/external/v1` endpoint. |
| `SITE_ORIGIN` | Adds the canonical site origin to the RFI same-origin allowlist, e.g. `https://losreyestires.com`. |

If inventory credentials are absent, the catalog returns an honest unavailable state. If any required mail variable is absent, lead forms return a temporary-unavailable error and show the shop phone fallback.

## Required post-deploy actions

1. Rotate every TireRaven key that previously appeared in this repository or its Git history. Removing a key from the current files does not invalidate it.
2. Configure the server-only variables above. Never use a `NEXT_PUBLIC_` prefix for credentials.
3. Verify the `RFI_EMAIL_FROM` domain with Resend and submit test leads from both the homepage and contact page.
4. Confirm delivery to `RFI_EMAIL_TO`, reply-to behavior, and operational monitoring for failed mail.
5. Add edge rate limiting for `/api/rfi`, `/api/customer/*`, and `/api/inventory` before public launch.
6. Add Cloudflare Turnstile to public lead forms and verify its token server-side. Turnstile is **not implemented** in the current code.
7. Decide where leads are durably persisted. The current implementation sends one email to the configured shop address; it does **not** store leads in a database or CRM.
8. Verify response security headers and form behavior on the final custom domain.

## Newsletter

Email collection is disabled. The prior Mailchimp audience could not be shown to be Los Reyes-owned. Re-enable newsletter signup only after the owner supplies and verifies the correct audience and consent flow.

## Local verification

Use environment variables without committing them:

```bash
TIRERAVEN_API_KEY=... node test-api.js
npm run lint
npx tsc --noEmit
```

Never paste secret values into documentation, source files, screenshots, or support messages.
