# TireRaven integration

The browser does not communicate with TireRaven directly and does not receive its API key.

## Request flow

1. Catalog components request same-origin `/api/inventory` data.
2. `src/app/api/inventory/route.ts` validates the allowed query parameters.
3. `src/lib/api/tireraven-server.ts` reads the server-only `TIRERAVEN_API_KEY` and calls TireRaven.
4. The server returns only customer-safe fields. Dealer cost, supplier, tenant metadata, and internal location fields are not exposed.
5. When configuration or the provider is unavailable, the catalog shows a contact/availability path rather than mock products.

Customer account calls use the allowlisted `/api/customer/[...path]` proxy. The proxy forwards only supported methods/routes, the bearer token when supplied, and the server-only TireRaven key.

## Environment

Required:

```text
TIRERAVEN_API_KEY=<rotated server-only credential>
```

Optional:

```text
TIRERAVEN_API_BASE=https://api.tireraven.com/api/external/v1
```

Do not use `NEXT_PUBLIC_TIRERAVEN_API_KEY` or expose credentials in browser code.

## Current limitations

- Inventory is fetched by client catalog components through the internal route.
- The catalog uses provider-backed pagination and URL-backed filters; broader provider search and fitment data remain future work.
- Product detail pages stay disabled until verified product-detail data is available.
- Rate limiting must be configured at the deployment edge.
