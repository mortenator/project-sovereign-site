# Deploying Project Sovereign

The site is plain static HTML plus browser-side React. There is no build step.

The public entry pages are:

- `index.html`
- `editor.html`
- `deploy.html`
- `security.html`
- `resources.html`

## GitHub Pages

The repository is intended to publish from the `main` branch root.

```bash
git init
git branch -M main
git add index.html editor.html deploy.html security.html resources.html styles.css parts CNAME .nojekyll README.md DEPLOY.md vercel.json install.sh
git commit -m "Initial Project Sovereign site"
gh repo create mortenator/project-sovereign-site --public --source=. --push
```

Then enable Pages for the repository:

```bash
gh api repos/mortenator/project-sovereign-site/pages \
  --method POST \
  --input - <<'JSON'
{"source":{"branch":"main","path":"/"}}
JSON
```

GitHub Pages will serve the project at:

- `https://mortenator.github.io/project-sovereign-site/`
- `https://projectsovereign.eu/` once DNS has propagated

## Custom Domain

`CNAME` contains `projectsovereign.eu`, which tells GitHub Pages which custom
domain should point at this repository.

At the domain registrar, configure the apex domain:

| Type | Host | Value |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |

Optional IPv6 records:

| Type | Host | Value |
| --- | --- | --- |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

For `www.projectsovereign.eu`, add:

| Type | Host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `mortenator.github.io` |

DNS can take up to 24 hours to propagate. After GitHub sees the records, enable
`Enforce HTTPS` in the repository's Pages settings.

## Vercel Alternative

`vercel.json` remains in the repo so the same static files can also be imported
to Vercel with clean URLs and security headers. The GitHub Pages path above is
the default setup for `projectsovereign.eu`.
