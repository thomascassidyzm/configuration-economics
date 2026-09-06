# The room on a public URL

**https://room.tomcassidy.co/world-computer**

Open on any device, anywhere. No tailnet, no login, no tunnel service. The
tailnet URL — `https://watson-1.tail4968cb.ts.net:8450/world-computer` — is
unchanged and still works: this is a second front door on the same room, not a
move.

## The shape

```
room.tomcassidy.co  →  62.238.49.218 / 2a01:4f9:c015:2b8e::1   (watson-1, public NIC)
                    →  caddy :443, Let's Encrypt cert, strict read-only allowlist
                    →  127.0.0.1:4326   the ce-room-world-computer astro dev server
```

- **DNS**: `tomcassidy.co` is a Vercel-managed zone. `room` is an explicit A +
  AAAA pair (TTL 60) which overrides the zone's wildcard ALIAS to Vercel. No
  domain was bought; the brief's promotion rule — a project earns its own
  domain only when someone other than Tom needs to cite it — is untouched.
- **TLS**: Let's Encrypt via Caddy's own ACME, HTTP-01. The zone's CAA records
  already name `letsencrypt.org`, so issuance was clean; renewal is automatic.
- **Reverse proxy**: Caddy, from the Debian archive. Bound to the public
  addresses *only* — tailscaled holds :443 on the tailnet address and the two
  do not meet.

## Why an allowlist and not a proxy pass

The room is served by an **Astro dev server**, and a Vite dev server exposes
`/@fs/<any absolute path>`, which will read files off this disk. A blanket
`reverse_proxy` would have published the machine. So Caddy passes exactly five
paths, GET and HEAD only:

| path | what it is |
|---|---|
| `/world-computer` | the page |
| `/api/room.json` | the poll — read-only by construction |
| `/favicon.svg` | the icon |
| `/@vite/client` | the module the page's stylesheet imports |
| `/src/pages/world-computer.astro` | that stylesheet |

Everything else is refused before it reaches the app. `/api/guide` is **not**
on the list — it spends money on the Anthropic API, and it is the one thing on
this codebase a stranger could make expensive. `/@fs/*`, `/src/*`,
`/node_modules/*` and dotfiles are 404 locally. Other GETs (`/explore`,
`/method`, `/open` — the page's own nav) are handed to `ce.tomcassidy.co`,
where those pages actually live, rather than dead-ending a reader.

The live service was not modified and not restarted: Caddy presents
`Host: 127.0.0.1:4326` upstream, which is the address the dev server is
already listening on, so Vite's host check passes without an `ALLOWED_HOSTS`
change to another session's running unit.

## Proved from outside

Independent nodes in France, India, Russia and Turkey fetched
`https://room.tomcassidy.co/world-computer` — 200, and `/api/room.json` from
Bulgaria, Spain and Ukraine — 200, all resolving to 62.238.49.218 with a valid
chain. From Holmes over its own internet connection: page 200, poll 200, and
`POST /api/guide`, `POST /api/room.json`, `DELETE /world-computer`,
`GET /@fs/etc/passwd` all 404.

## Known limits

- The public face is backed by a **dev server running an unmerged branch**
  (`cs/810-ce-room-thinking-indicator`, the checkout at `~/wt-ce-room-service`).
  Whatever that session is running is what the world sees. If the unit stops,
  the public URL 502s. Both Caddy and the room unit are enabled and survive a
  reboot.
- Vite's HMR websocket is not allowlisted, so an open tab retries a websocket
  connection about once a second and logs a console error. It does not reload
  and nothing is broken; this vite version pings over a websocket, not a fetch,
  so a refused upgrade cannot trigger its reload path.
- If the room page's asset set changes, the allowlist may need a new line. That
  fails visibly — an unstyled page — rather than silently.
