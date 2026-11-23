import { cookie, safeNext } from "../_lib/session.js";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const next = safeNext(url.searchParams.get("next"));
  const state = crypto.randomUUID();

  const authorize = new URL("https://discord.com/api/oauth2/authorize");
  authorize.search = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    response_type: "code",
    redirect_uri: `${url.origin}/auth/callback`,
    scope: "identify guilds.members.read",
    state,
    prompt: "none",
  }).toString();

  const headers = new Headers({ Location: authorize.toString() });
  headers.append("Set-Cookie", cookie("gb_state", state, 600));
  headers.append("Set-Cookie", cookie("gb_next", encodeURIComponent(next), 600));
  return new Response(null, { status: 302, headers });
}
