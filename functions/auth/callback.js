import { COOKIE, SESSION_SECONDS, cookie, getCookie, safeNext, signSession } from "../_lib/session.js";

function redirect(to, extraCookies = []) {
  const headers = new Headers({ Location: to });
  for (const c of extraCookies) headers.append("Set-Cookie", c);
  return new Response(null, { status: 302, headers });
}

const clearTemp = [cookie("gb_state", "", 0), cookie("gb_next", "", 0)];

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (url.searchParams.get("error")) return redirect("/denied.html?reason=cancelled", clearTemp);
  if (!code || !state || state !== getCookie(request, "gb_state")) {
    return redirect("/denied.html?reason=state", clearTemp);
  }

  // 1. Exchange the code for an access token.
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${url.origin}/auth/callback`,
    }),
  });
  if (!tokenRes.ok) return redirect("/denied.html?reason=token", clearTemp);
  const { access_token } = await tokenRes.json();
  const auth = { Authorization: `Bearer ${access_token}` };

  // 2. Fetch the user's membership (and roles) in the Golden Blades server.
  const memberRes = await fetch(
    `https://discord.com/api/users/@me/guilds/${env.DISCORD_GUILD_ID}/member`,
    { headers: auth }
  );
  if (memberRes.status === 404 || memberRes.status === 403) {
    return redirect("/denied.html?reason=server", clearTemp);
  }
  if (!memberRes.ok) return redirect("/denied.html?reason=error", clearTemp);
  const member = await memberRes.json();

  // 3. Require the Blade role.
  if (!Array.isArray(member.roles) || !member.roles.includes(env.DISCORD_ROLE_ID)) {
    return redirect("/denied.html?reason=role", clearTemp);
  }

  // 4. Issue a signed session cookie.
  const name = member.nick || member.user?.global_name || member.user?.username || "Blade";
  const token = await signSession(
    { uid: member.user?.id, name, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS },
    env.SESSION_SECRET
  );

  let next = "/members/";
  try { next = safeNext(decodeURIComponent(getCookie(request, "gb_next") || "")); } catch {}
  return redirect(next, [cookie(COOKIE, token, SESSION_SECONDS), ...clearTemp]);
}
