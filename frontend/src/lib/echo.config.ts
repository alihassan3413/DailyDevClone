import Echo from "laravel-echo";

import Pusher from "pusher-js";
import Env from "./env";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher;

//for private channels

export const privatelaraEcho = (token: string) =>
  new Echo({
    broadcaster: "reverb",
    encrypted: false,
    authEndpoint: Env.API_URL + "/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
  });

export const laraEcho = new Echo({
  broadcaster: "reverb",
  encrypted: false,
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
  wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
  wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
  forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
});
