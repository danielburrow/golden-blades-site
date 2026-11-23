// Runs for everything under /members/ (pages, images, downloads).
import { COOKIE, getCookie, verifySession } from "../_lib/session.js";

export async function onRequest({ request, env, next }) {
  const session = await verifySession(getCookie(request, COOKIE), env.SESSION_SECRET);
  if (!session) {
    const url = new URL(request.url);
    const login = new URL("/auth/login", url.origin);
    login.searchParams.set("next", url.pathname + url.search);
    return Response.redirect(login.toString(), 302);
  }
  const response = await next();
  // Keep members-only content out of shared caches and search engines.
  const out = new Response(response.body, response);
  out.headers.set("Cache-Control", "private, no-store");
  out.headers.set("X-Robots-Tag", "noindex");
  return out;
}
