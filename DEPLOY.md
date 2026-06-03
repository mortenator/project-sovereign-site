# Deploying Project Sovereign

The site is generated static HTML plus a Vercel serverless contact function.

## Build

```bash
npm run build
```

The generated public site lives in `dist/`.

## Vercel

Vercel is configured to:

- run `npm run build`
- serve `dist/`
- preserve clean canonical URLs
- redirect legacy `.html` paths to clean paths
- forward `/api/contact` to the serverless function

Required environment variables:

- `NATOROS_CONTACT_WEBHOOK_URL`
- `NATOROS_CONTACT_WEBHOOK_SECRET` (optional bearer token)

## Custom Domains

The canonical host is `https://www.projectsovereign.eu/`.

The apex domain `https://projectsovereign.eu/*` must point to Vercel or another
host that can issue a permanent server-side redirect to matching `www` paths.
Registrar parking or JavaScript forwarding must be removed.
