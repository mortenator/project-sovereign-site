# Project Sovereign

Static marketing site for Project Sovereign, a European self-hosted document
suite initiative.

The site is intentionally simple: plain HTML entry files, shared CSS, and
browser-side React components in `parts/`. There is no build step.

## Local Preview

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.

## Publish

The site is published as static files at the custom domain
`projectsovereign.eu`. See `DEPLOY.md` for the current static-hosting notes.
