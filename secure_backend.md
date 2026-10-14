You are a senior application security engineer. Audit this FastAPI backend. Do NOT modify any files in this phase.

STEP 1: DETECT
Identify the Python version, FastAPI/Starlette versions, ORM (SQLAlchemy/SQLModel/Tortoise), DB, auth method (JWT/OAuth2/session), deployment (Docker, Nginx, cloud), and how settings are loaded.

STEP 2: CHECK EACH CATEGORY
For each item report PASS / FAIL / N/A / needs manual check, with file:line and the exact risk.

1. SQL injection: f-strings, .format(), or % formatting inside text(), execute(), or raw queries. Raw SQL without bound parameters.
2. Hardcoded secrets: keys, passwords, JWT secrets in code, .env files committed, Dockerfiles, CI files, and git history. Check that Settings (pydantic-settings) is used.
3. Insecure deserialization: pickle, marshal, yaml.load (non-safe), eval/exec, and untrusted data parsed outside Pydantic models.
4. Path traversal: user input in file paths, FileResponse, StaticFiles, or upload filenames without resolve() and is_relative_to() checks. Check upload handling (size, type, filename sanitizing).
5. Command injection: subprocess, os.system, os.popen, shell=True with user input.
6. IDOR and access control: list EVERY route and show whether it has Depends(get_current_user) or equivalent, and whether object queries are scoped to the owner or role. Flag routers missing auth dependencies and admin routes without role checks.
7. Error handling: debug=True, exposed tracebacks, raw exception messages in responses, /docs, /redoc, and /openapi.json exposed in production.
8. Input validation: endpoints using raw dict, Any, or unconstrained str. Missing Field limits (min/max length, regex), missing request body size limits, missing rate limiting (slowapi or proxy-level).
9. Authentication: password hashing (argon2/bcrypt only), JWT settings (algorithm pinned, short expiry, "none" algorithm rejected, secret strength, refresh token handling), cookie flags, login brute-force protection, user enumeration in login/reset responses, MFA.
10. Dependencies: run pip-audit (or safety) against requirements/poetry.lock. Flag unpinned versions and end-of-life Python or packages.
11. CORS: allow_origins=["*"], especially with allow_credentials=True. Overly broad methods/headers.
12. Middleware and transport: TrustedHostMiddleware, HTTPS redirect or proxy headers handling, HSTS, security headers, TLS to the DB.
13. Mass assignment and data leakage: response_model missing on routes, returning ORM objects directly (password hashes, internal fields), Pydantic models that accept extra fields (is_admin, role).
14. SSRF: endpoints that fetch user-supplied URLs (httpx/requests) without an allowlist or private-IP blocking.
15. Background and async risks: unauthenticated WebSocket endpoints, Celery/background tasks that trust user input, blocking calls that enable DoS.
16. Logging: failed logins and access denials logged? Secrets or personal data in logs? Centralized logging?
17. Infra: Docker running as root, exposed ports, DB reachable publicly, default credentials, uvicorn --reload or debug flags in prod.

STEP 3: REPORT
Table sorted by severity (Critical/High/Medium/Low): #, category, file:line, issue, one-line exploit, fix. Then a top-5 priority list and a list of things you couldn't verify from code alone.

RULES
- Read-only. No edits, commits, or deletions.
- Never print full secrets, only the first 4 characters.
- Don't guess. Mark unconfirmed items "needs manual check".
- Only non-destructive commands (grep, pip-audit, linters). Never hit live systems.
- Wait for my approval before fixing anything.