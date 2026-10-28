# Hono Basic Example with Zero-Dep Utilities

Minimal Hono server demonstrating `fetch-retry-jitter` and `env-assert-typed`.

## Setup

```bash
npm install
cp .env.example .env  # Configure your env vars
npm run dev
```

## Features

- **fetch-retry-jitter** — Resilient fetch with circuit breaker, deduplication, Retry-After
- **env-assert-typed** — Typed env validation with coerce/refine/transform
- Zero dependencies, edge-ready, full TS inference

## Environment Variables

```env
PORT=3000
API_BASE_URL=https://api.example.com
API_TIMEOUT_MS=5000
RETRY_ATTEMPTS=3
```
