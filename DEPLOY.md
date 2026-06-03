# Deploying Project Sovereign

The site is plain static HTML plus browser-side React. There is no build step.

The public entry pages are:

- `index.html`
- `editor.html`
- `deploy.html`
- `security.html`
- `resources.html`

## Static Hosting

Publish the repository root as static files behind the custom domain
`projectsovereign.eu`.

Required files and directories:

- HTML entry files listed above
- `styles.css`
- `favicon.svg`
- `assets/`
- `parts/`
- `CNAME`
- `vercel.json` if the site is imported into Vercel

## Custom Domain

`CNAME` contains `projectsovereign.eu`, which tells static hosting providers
which custom domain should point at this project.

DNS can take time to propagate. Enable HTTPS enforcement wherever the site is
hosted.

## Public Installer

The deployment kit is not publicly published yet. Public site copy should point
qualified institutions to the deployment brief or on-prem deployment discussion,
not to a public repository or one-line install command.
