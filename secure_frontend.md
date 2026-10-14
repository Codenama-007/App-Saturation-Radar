You are a senior web security engineer. Secure this Next.js app. Work in two phases.

PHASE 1: AUDIT (no changes)
Detect the Next.js version, router (App Router or Pages), auth library (NextAuth/Auth.js, custom, etc.), hosting (Vercel, Docker, self-hosted), and how the app talks to the backend. Report each issue with file:line and severity. Wait for my approval before Phase 2.

PHASE 2: IMPLEMENT

1. XSS: Find every dangerouslySetInnerHTML, innerHTML, and unsanitized markdown or HTML rendering. Replace with safe rendering or wrap with DOMPurify (isomorphic-dompurify for SSR). Check that user-controlled URLs in href/src can't be javascript: links.
2. Access control: Don't rely on middleware.ts alone for auth. Verify every Server Component, Route Handler (app/api/**), and Server Action checks the session and permissions itself, ideally through one central data-access layer. Treat Server Actions as public POST endpoints and validate their input with Zod. Confirm Next.js is on a patched version (older versions had a middleware auth bypass).
3. Third-party scripts and supply chain: List all next/script and external scripts. Remove unused ones, load third parties with a strict CSP, and enable SRI where supported. Run npm audit, pin versions, and commit the lockfile.
4. Sensitive data exposure: Find secrets in NEXT_PUBLIC_* variables (those ship to the browser). Move them to server-only env vars. Add the "server-only" package to modules that use secrets. Check that Server Components don't pass sensitive fields as props to Client Components (consider React taint APIs). Set productionBrowserSourceMaps to false. Remove console.log of sensitive data.
5. Storage: Remove tokens and sensitive data from localStorage/sessionStorage. Use cookies set with httpOnly, secure, sameSite, and set via cookies() in a Route Handler or Server Action. Validate anything read back from storage.
6. Clickjacking: CSP frame-ancestors 'none' (or an explicit allowlist) plus X-Frame-Options: DENY.
7. CSRF: Keep Server Action Origin checks on and set experimental.serverActions.allowedOrigins only if needed. For custom Route Handlers that change state, check the Origin header and use SameSite cookies. No state changes in GET handlers.
8. Cross-origin: Restrict CORS in Route Handlers to an explicit allowlist. Validate event.origin and message shape on every postMessage listener, and give postMessage an exact target origin. Configure images.remotePatterns narrowly, and check for open redirects in any redirect() or router.push() that uses user-supplied URLs.
9. Security headers and CSP: Add headers in next.config.js headers() or middleware.ts. Use a nonce-based CSP (generated per request in middleware, no 'unsafe-inline' for scripts), starting with Content-Security-Policy-Report-Only and then enforcing. Also add X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy, and set poweredByHeader: false.
10. HTTPS: HSTS (max-age=63072000; includeSubDomains; preload), redirect HTTP to HTTPS, no mixed content, no http:// API URLs in env or code.
11. Backend calls: All requests to my FastAPI backend should go over HTTPS, use credentials: 'include' only where needed, and never expose backend admin or internal URLs to the client.

RULES
- Match my existing structure and style. Add as few libraries as possible.
- Put all security headers and CSP in one central place.
- Don't break functionality. Run lint, type check, tests, and the build after changes.
- Comment each change with the attack it prevents.
- Don't commit. Show a diff summary first.

DELIVERABLES
- Code changes
- SECURITY.md with what was done, what needs manual action (rotate leaked keys, hosting config), and a code review checklist
- Test plan: curl -I commands to verify headers, sample XSS payloads, and how to test auth bypass on routes and Server Actions