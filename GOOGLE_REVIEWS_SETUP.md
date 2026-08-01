# Google reviews configuration

The homepage review section uses Google Places API (New) Place Details from a server component. It never calls Google from the browser and never exposes the API key.

Configure these server-only deployment variables:

```text
GOOGLE_PLACES_API_KEY=<restricted server key>
GOOGLE_PLACE_ID=ChIJZxKIUlFY2YAR5wQcNzysJN8
GOOGLE_MAPS_PROFILE_URL=https://maps.app.goo.gl/NXeyA5kHGisYiTSJA
```

Requirements:

- Enable Places API (New) and billing in the owner-controlled Google Cloud project.
- Restrict the key to Places API (New). Add a server egress IP restriction when the hosting platform provides stable egress IPs.
- Never use `NEXT_PUBLIC_` for these values and never commit the live API key.
- Keep the request server-side and `cache: 'no-store'` until a policy-compliant caching design is approved.
- Verify Google Maps attribution, author/source links, and the public listing fallback after deployment.

If the key or Place ID is absent, quota is exhausted, or Google returns an error, the site displays no review quotes, rating, or count. When `GOOGLE_MAPS_PROFILE_URL` is configured, only a neutral link to the public Google Maps listing remains.
