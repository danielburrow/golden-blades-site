# Golden Blades Starter Guide

Static site on Cloudflare Pages. Public pages live in `public/`. Anything in
`public/members/` (pages and images) requires signing in with Discord and
holding the Blade role. Login logic is in `functions/`.

## Adding content
- Public page: add `public/yourpage.html`.
- Members-only page or image: put it under `public/members/`.
- Images: `public/images/` (public) or `public/members/images/` (members only).

## One-time setup

### Discord (developer portal, your application)
Add these Redirects under OAuth2:
- `https://goldenblades.hynafollies.com/auth/callback`
- `https://<your-project>.pages.dev/auth/callback` (for testing)

### Cloudflare Pages
1. Workers & Pages -> Create -> Pages -> Connect to Git -> pick this repo.
2. Framework preset: None. Build command: leave empty. Output directory: `public`.
3. Settings -> Variables and secrets, add as **secrets**:
   - `DISCORD_CLIENT_SECRET` (from the Discord portal)
   - `SESSION_SECRET` (any long random string, 32+ characters)
   The Client ID, Server ID and Role ID are already in `wrangler.toml`.
4. Custom domains -> add `goldenblades.hynafollies.com`, then add the CNAME
   record Cloudflare shows you in GoDaddy DNS.

## Notes
- Sessions last 3 days; role changes in Discord take effect at the next sign-in.
- Never commit the Client Secret or `.dev.vars`.
