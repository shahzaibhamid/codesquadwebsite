// Run against a production-mode local server: node scripts/check-public-performance.mjs
// This exercises cached page requests; it does not model database writes or real browsers.
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';

const base = process.argv[2] || 'http://localhost:3100';
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(base).hostname), 'Use a loopback server for this load check');
const routes = ['/', '/blog', '/case-studies'];
const total = 1000;
const concurrency = 100;

for (const path of routes) {
  const deadline = Date.now() + 30000;
  while (true) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    await response.arrayBuffer();
    if (response.headers.get('x-nextjs-cache') === 'HIT') break;
    assert.ok(Date.now() < deadline, `${path} did not warm its route cache`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

const durations = [];
let next = 0;
const start = performance.now();
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (next < total) {
    const index = next++;
    const started = performance.now();
    const response = await fetch(new URL(routes[index % routes.length], base));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-nextjs-cache'), 'HIT');
    await response.arrayBuffer();
    durations.push(performance.now() - started);
  }
}));
durations.sort((a, b) => a - b);
const elapsed = performance.now() - start;
console.log(JSON.stringify({
  requests: total, concurrency, cacheHits: durations.length,
  elapsedMs: Math.round(elapsed), requestsPerSecond: Math.round(total / elapsed * 1000),
  medianMs: Math.round(durations[Math.floor(total * 0.5)]),
  p95Ms: Math.round(durations[Math.floor(total * 0.95)]),
}, null, 2));

const privateResponse = await fetch(new URL('/dashboard/login', base));
assert.equal(privateResponse.status, 200);
assert.match(privateResponse.headers.get('cache-control') || '', /no-store/);
assert.notEqual(privateResponse.headers.get('x-nextjs-cache'), 'HIT');
await privateResponse.arrayBuffer();
const protectedResponse = await fetch(new URL('/dashboard', base), { redirect: 'manual' });
assert.equal(protectedResponse.status, 307);
assert.match(protectedResponse.headers.get('location') || '', /\/dashboard\/login/);
console.log('Dashboard remains private and authentication is enforced.');
