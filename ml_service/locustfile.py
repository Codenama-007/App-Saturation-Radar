"""
Load test for the App Saturation Radar ML service (POST /radar).

Run (web UI):
    locust -f locustfile.py --host http://localhost:8000
    then open http://localhost:8089

Run (headless, 10 users, spawn 1/sec, 5 minutes):
    locust -f locustfile.py --host http://localhost:8000 \
        --headless -u 10 -r 1 -t 5m --csv results

Modes (env var MODE):
    fresh   - every request is a new, diverse idea (full LLM pipeline, ~5 LLM calls)
    cached  - every request repeats one idea (cache hit, no LLM calls)
    mixed   - 80% fresh / 20% cached  (default, closest to real traffic)

Other env vars:
    ENDPOINT=/radar            (or /demo_analyze, same payload now)
    IDEA_FIELD=query           (JSON key the endpoint expects)
    CHECK_SCORING=1            (fail responses with empty "scoring"; cache hits
                                also fail until the cache stores scoring)
    TIMEOUT=180                (seconds; the pipeline makes several LLM calls)

WARNING: "fresh" mode sends real requests to the Gemini API and the search
tool. It uses quota and may cost money. Start with 1-3 users.
"""

import os

from locust import HttpUser, between, task

ENDPOINT = os.getenv("ENDPOINT", "/health")
TIMEOUT = float(os.getenv("TIMEOUT", "30"))


class HealthUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def poke(self):
        with self.client.get(
            ENDPOINT,
            name="GET /health",
            timeout=TIMEOUT,
            catch_response=True,
        ) as resp:

            if resp.status_code == 200:
                try:
                    body = resp.json()
                except ValueError:
                    resp.failure("200 but body is not JSON")
                    return

                if body.get("status") != "ok":
                    resp.failure("Health check returned non-ok status")
                else:
                    resp.success()

            elif resp.status_code >= 500:
                resp.failure(f"Server error: HTTP {resp.status_code}")

            else:
                resp.failure(f"Unexpected HTTP {resp.status_code}")