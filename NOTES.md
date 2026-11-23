# Golden Blades Starter Guide: project notes

Hand-off notes for whoever (person or Claude) works on this site next. Read this first.

## What this is
A members-only site for the Golden Blades (members of the Holy Reman League, "our House's Kingdom").
- Live: https://goldenblades.hynafollies.com
- Repo: github.com/danielburrow/golden-blades-site (push to `main` and Cloudflare Pages deploys automatically)
- Owner: Daniel. Local folder: `C:\Users\Danie\OneDrive\Documents\golden-blades-site`
- Static site (no build step). Output dir is `public/`. Server logic is Cloudflare Pages Functions in `functions/`.

## Access control
- Public: `public/index.html` (Welcome page with hero banner) and `public/denied.html`.
- Everything under `/members/*` (pages, images, downloads) is gated by `functions/members/_middleware.js`.
- Login is Discord OAuth2 (scopes `identify guilds.members.read`). The server checks that the user holds the "Blade" role in the Golden Blades Discord server. Session is an HMAC-signed cookie (`gb_session`, 3 days).
- Files: `functions/auth/login.js`, `callback.js`, `logout.js`, `functions/_lib/session.js`.
- Non-secret config is in `wrangler.toml` (Discord client ID, guild ID, role ID).
- Secrets `DISCORD_CLIENT_SECRET` and `SESSION_SECRET` live ONLY in the Cloudflare Pages dashboard. Never put them in chat or files. `.dev.vars.example` lists the names.
- Discord redirect URIs must be registered for `https://goldenblades.hynafollies.com/auth/callback` and the `*.pages.dev` callback (not deployment-hash URLs).
- Domain: GoDaddy CNAME `goldenblades` -> `golden-blades-site.pages.dev`, plus a Cloudflare Pages custom domain.
- Cloudflare Pages file limit is 25 MiB per file.

## Site map
| Section | Path | Status |
|---|---|---|
| Welcome (public) | `/` | Done, hero banner uses `public/img/hero.jpg` |
| Members home | `/members/` | 5 section cards |
| Crafting Guide | `/members/crafting/` | "Coming soon" placeholder |
| HRL (hub) | `/members/hrl/` | Cards linking to the pages below |
| HRL Constitution | `/members/hrl/constitution/` | Single image page |
| HRL Heraldry & Flags | `/members/hrl/heraldry/` | 27 images, web previews + full downloads |
| HRL Hierarchy | `/members/hrl/hierarchy/` | Rendered from `people.js` by `hrl.js` |
| Meme Repository | `/members/memes/` | Gallery: 12 flyers, 15 GIFs (as mp4). Name is temporary; Daniel wants it renamed later |
| Shopping | `/members/shopping/` | Placeholder |
| Starter Guide | `/members/starter-guide/` | First draft built from the house-general Discord export (single page, 10 anchored sections, styles under "Starter Guide" in style.css) |

Nav is injected by `public/js/site.js` (alphabetical: Crafting Guide, HRL, Meme Repository, Shopping, Starter Guide, Sign out). Theme is `public/css/style.css` (dark with gold).

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
- `incoming-documents/` is a gitignored drop folder for raw Golden Blades documents. Only curated copies go in `public/members/starter-guide/documents/` (clean file names, linked from the Starter Guide). Never publish pay slips, survey results, or meeting minutes.
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
- Songbook (guild songs) is in incoming-documents/, not published. Pike class quiz has answers marked; not published.
