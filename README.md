# Project Sovereign

Static marketing site for Project Sovereign, a European open-source document
suite initiative.

The site is intentionally simple: plain HTML entry files, shared CSS, and
browser-side React components in `parts/`. There is no build step.

## Local Preview

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.

## Deploy

The repository publishes from the `main` branch root with GitHub Pages and the
custom domain `projectsovereign.eu`. See `DEPLOY.md` for the full setup.
