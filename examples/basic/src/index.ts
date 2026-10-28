import { Hono } from 'hono';
import { fetchRetry } from 'fetch-retry-jitter';
import { envAssert } from 'env-assert-typed';

const env = envAssert({
  PORT: { type: 'number', default: 3000 },
  API_BASE_URL: { type: 'string', required: true },
  API_TIMEOUT_MS: { type: 'number', default: 5000 },
  RETRY_ATTEMPTS: { type: 'number', default: 3 },
});

const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok' }));

app.get('/api/proxy', async (c) => {
  const targetUrl = c.req.query('url');
  if (!targetUrl) {
    return c.json({ error: 'Missing "url" query param' }, 400);
  }

  try {
    const response = await fetchRetry(targetUrl, {
      retries: 3,
      timeoutMs: 5000,
    });

    const body = await response.arrayBuffer();
    return new Response(body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'Fetch failed' }, 502);
  }
});

export default {
  port: env.PORT,
  fetch: app.fetch,
};
