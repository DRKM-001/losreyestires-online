# API boundaries

- `tireraven.ts` contains browser-safe inventory types, mapping, and same-origin inventory calls.
- `tireraven-server.ts` is server-only and is the only inventory module allowed to read `TIRERAVEN_API_KEY`.
- `auth.ts` calls the same-origin `/api/customer` allowlist proxy; it does not read or send an API key from the browser.

Required deployment configuration is documented in `CLOUDFLARE_SETUP.md`.

Never add API keys, customer tokens, provider responses containing dealer cost, or real customer data to this repository.
