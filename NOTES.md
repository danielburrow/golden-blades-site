# Golden Blades Starter Guide: project notes

Hand-off notes for whoever (person or Claude) works on this site next. Read this first.

## What this is
A members-only site for the Golden Blades (members of the Holy Reman League, "our House's Kingdom").
- Live: https://goldenblades.hynafollies.com
- Repo: github.com/danielburrow/golden-blades-site (push to `main` and Cloudflare Pages deploys automatically)
- Owner: Daniel. Local folder: `C:\Users\Danie\OneDrive\Documents\golden-blades-site`
- Static site (no build step). Output dir is `public/`. Server logic is Cloudflare Pages Functions in `functions/`.

## Access control
- Public: `public/index.html`, `about/`, `join/`, `videos/`, and `denied.html`.
- Everything under `/members/*` (pages, images, downloads) is gated by `functions/members/_middleware.js`.
- Login is Discord OAuth2 (scopes `identify guilds.members.read`). The server checks that the user holds the "Blade" role in the Golden Blades Discord server. Session is an HMAC-signed cookie (`gb_session`, 3 days).
- Files: `functions/auth/login.js`, `callback.js`, `logout.js`, `functions/_lib/session.js`.
- Non-secret config is in `wrangler.toml` (Discord client ID, guild ID, role ID).
- Secrets `DISCORD_CLIENT_SECRET` and `SESSION_SECRET` live ONLY in the Cloudflare Pages dashboard. Never put them in chat or files. `.dev.vars.example` lists the names.
- Discord redirect URIs must be registered for `https://goldenblades.hynafollies.com/auth/callback` and the `*.pages.dev` callback (not deployment-hash URLs).
- Domain: GoDaddy CNAME `goldenblades` -> `golden-blades-site.pages.dev`, plus a Cloudflare Pages custom domain.
- Cloudflare Pages file limit is 25 MiB per file.

## Site map
Public (no sign-in): Home `/`, About `/about/`, Join `/join/`, Videos `/videos/` (media in `/videos/media/`). Videos are credited to Brenin Halvard, except "Armor Stands, GG26" which sits in its own Grand Gathering 2026 section at the bottom.

Members (gated), nav is dropdowns, alphabetical:
| Menu | Pages |
|---|---|
| Guides `/members/guides/` | Combat (On Hynawar, linked to Google Drive), Crafting (placeholder), Shopping (placeholder),  |
| House `/members/house/` | Hierarchy (placeholder, Golden Blades only, never mixed with HRL), Primer |
| HRL `/members/hrl/` | Constitution, Heraldry & Flags, Hierarchy (rendered from `people.js` by `hrl.js`) |
| Carta Arcanum `/members/carta-arcanum/` (formerly Lore) | Briefadel and Ownership (links to a Google Doc), Hex Ledger (own page: Hex Ledger and Holdings Ledger, both by Brenin Halvard), Land and Holdings, Palazzo Program. The hub page explains the Carta Arcanum and teases the Hex Ledger page (hex-ledger.com and holdings-ledger.com are House-sensitive tools by Brenin Halvard). Home for everything about the known world of Hynafol and the Carta game. Anything that is not Carta-related belongs under House |
| House `/members/house/` (first in nav) also holds the Primer `/members/house/primer/` | Primer = the old Starter Guide (single page, 10+ anchored sections) |
| Memes `/members/memes/` | Hub with two pages: `/flyers/` (12) and `/gifs/` (15, as mp4). Shared `memes.js` / `memes-data.js` |
| Videos | Links to the public `/videos/` |

- No files or downloads are hosted on the site: documents are linked from Google Drive (Briefadel, On Hynawar). Daniel removed Carta Arcanum Shorthand, Contract of Service, Demesne, House Guide, Manual of Arms, New Blade Quick Primer, Regimental Roles and Style Guide from the site; copies and old pages are in the gitignored `incoming-documents/_removed-from-site/`.
- Nav is built by `public/js/site.js` (public nav on public pages, members nav under `/members/`). Dropdown CSS is at the end of `style.css`.
- Old URLs (`/members/lore/*`, `/members/guides/starter-guide/`, `/members/crafting|shopping|starter-guide|videos|guild/`) are redirected via `public/_redirects`; `public/members/videos/index.html` is a meta-refresh stub because deleting files is blocked.
- Foam Pavise Shield guide was dropped by Daniel (kept only in `incoming-documents/`).
- Terminology: the Golden Blades are a **House** (formerly "Guild"). Never call the Blades a guild; "guilds" now means vocations (Thieves, Assassins, Guardians, Alchemists, etc.). Discord's own "guild" API terms in code are unrelated and stay.
- Not yet done: Discord invite link on the Join page.

## HRL hierarchy data
- Edit `public/members/hrl/people.js` (`window.HRL`): `kaiser`, `archduke`, `electors`, `barons`, `lords`, `citizens`, plus `flag`, `sigil`, `mascirino`.
- Card states: `struck`, `vacant`, `crown`, `blank`.
- Images in `public/members/hrl/img/`: portraits are `<id>.jpg`, crests/shields/emblems are `<id>.png`. A missing image falls back to a silhouette.
- Current facts: Kaiser seat is vacant as of the year 810 AC. Mage King was removed. Ibb Fletcher is an Elector (former Kaiserine). Petrichor is an Elector (High Priest of Invictus, Holy Elector). Soluna Tivali is a Baroness ("Aufbringenleutnant of the Golden Blades").

## Open items
- Linebreakers shield (Petrichor's crest): needs `img/97d64cc35045c221fc0dcdf77d2dc2b9.png`.
- Second Ulric picture for Ulric von Kriegholm: save as `img/40d614ab6c0f96b8894541149cb79073.jpg` and restore his `photo` in `people.js`. `former_kaiser_ulric.png` (in the gitignored `incoming-portraits/`) is reserved for a future "Former Kaiser Ulric" card.
- No portraits yet: Soluna Tivali, Konrad, Tess von Forst, Asriel Inkburn, Saucisse. Unresolved file: `1792291905068_image.png`.
- Content wanted for Crafting Guide, Shopping, Starter Guide. Daniel will send more details on the HRL group of pages.
- "IMG 7553" flyer needs a real title. Heraldry variant labels (Full shield / Embellishment only / Field only / Line art / Flag) are guesses.
- Not yet built: quizzes and forms. Pages have not been checked visually in a browser.
- Confirm Ibb Fletcher's rank/title wording.

## Conventions and preferences
- Alphabetize lists by default (nav, galleries, groupings) unless there is a deliberate order.
- `incoming-portraits/` is a gitignored drop folder for images Daniel sends.
- `incoming-documents/` is a gitignored drop folder for raw Golden Blades documents. Only curated copies go in `public/members/documents/` (clean file names, linked from the Primer). Never publish pay slips, survey results, or meeting minutes.
- GIFs are converted to mp4 (ffmpeg, even dimensions via `scale=trunc(iw/2)*2:trunc(ih/2)*2`) with a jpg poster.

## Working with git from Claude's device shell
- Deleting is blocked in the connected folder, so each `git commit` leaves `.lock` files. After every commit, rename them: `for f in $(find .git -name '*.lock'); do mv "$f" ".git/stale-$(date +%s%N)-$(basename $f)"; done`. Ignore "unable to unlink" warnings.
- The shell has no git identity. Reuse the last commit's: `git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit ...`
- Daniel pushes from GitHub Desktop ("Push origin"); the shell does not push.

## Starter Guide draft: items to confirm
- Join flow is from Dec 2024 drafts (contractor, then enlistment contract, then Court of Pikes); confirm it is still current.
- Operating fee figures are from the Feb 2026 announcement.
- Kit section is light: no required kit list exists in the chat. Awards are still being formalized.
- Company leaders are intentionally not named (they change). Add if wanted.
- Regola: chat has the six-rule version, Ulric's guide v3 has seven (adds Fedelta). Confirm which is current.
- Oberst: the style guide names Anton von Forst, the post-GG 2026 roles document lists a different House Leader. The page names no one.
- Songbook (house songs) is in incoming-documents/, not published. Pike class quiz has answers marked; not published.

## Person pages and the Golden Blades hierarchy
- Every non-vacant card in the HRL hierarchy links to `/members/person/?id=<slug>&from=hrl|house`. The slug is the name lowercased with accents dropped and dashes between words (`Horst von Tanzbären` -> `horst-von-tanzbaren`).
- The page is one template: `public/members/person/index.html` + `person.js`. It shows the person's card, "Who they are" and "Exploits", and buttons back to both hierarchies (the one they came from is highlighted).
- Write profiles in `public/members/person/bios.js` (`about` text and an `exploits` list per slug). Empty entries show "Their story is still being written."
- The Golden Blades hierarchy (`/members/house/hierarchy/`) has Oberst Horst von Tanzbären at the top and a "Seat History" card for Anton von Forst (held the seat until 810 AC, then became High Arch Chancellor of the HRL). The rest of the chain of command still needs to be added.
- `hrl.js` exposes `window.HRL_UI` (card, tier, slug, everyone) so other pages can reuse the cards.

## Later additions (Nov 2026)
- Hero banners (`css/hero.css`, images in `/members/hero/`) on Members home, House, HRL hub, GB hierarchy and Heraldry.
- Maceball page `/members/house/maceball/` (Phighting Phoenixes, roster from the May 2026 sign-up in Discord).
- Person pages: if `bios.js` has no `about`, `person.js` builds a one-line fallback from the card's rank. Title-based `about` text lives in `bios.js`; add exploits there.
- Primer "Joining Up" has the Court of Pikes photo (`members/house/primer/court-of-pikes.jpg`).
