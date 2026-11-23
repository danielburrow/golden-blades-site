import { COOKIE, cookie } from "../_lib/session.js";

export async function onRequest() {
  return new Response(null, {
    status: 302,
    headers: { Location: "/", "Set-Cookie": cookie(COOKIE, "", 0) },
  });
}
