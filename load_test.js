/**
 * ============================================================================
 * KisanTrace 3D - Security Audit & Concurrency Load Stress Test Suite
 * Validates Security Controls, Rate Limiting, TTL Caching, and Query Resilience
 * ============================================================================
 */

const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const parsedUrl = new URL(BASE_URL);
const TARGET_HOST = parsedUrl.hostname;
const TARGET_PORT = parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80);

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: TARGET_HOST,
      port: TARGET_PORT,
      ...options
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch(e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          json
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout (10s)'));
    });

    if (body) {
      const payload = typeof body === 'object' ? JSON.stringify(body) : String(body);
      req.setHeader('Content-Type', 'application/json');
      req.setHeader('Content-Length', Buffer.byteLength(payload));
      req.write(payload);
    }
    req.end();
  });
}

async function runTestSuite() {
  console.log(`================================================================`);
  console.log(`🛡️  STARTING KISANTRACE SECURITY AUDIT & CONCURRENCY LOAD TEST`);
  console.log(`🎯 Target: ${BASE_URL}`);
  console.log(`⏱️  Timestamp: ${new Date().toISOString()}`);
  console.log(`================================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, detail = '') {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} ${detail ? '-> ' + detail : ''}`);
      failed++;
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 1: Vulnerability Probing (File Sandboxing & Traversal Prevention)
  // --------------------------------------------------------------------------
  console.log(`▶ 1. SENSITIVE FILE EXPOSURE & PATH TRAVERSAL TESTS`);
  
  const sensitiveFiles = [
    '/.env',
    '/server.js',
    '/turso_db.js',
    '/package.json',
    '/kisan_trace.db',
    '/schema.sql'
  ];

  for (const file of sensitiveFiles) {
    try {
      const res = await request({ path: file, method: 'GET' });
      assert(
        res.statusCode === 403 || res.statusCode === 404,
        `Blocked access to sensitive file: ${file}`,
        `Got HTTP ${res.statusCode}`
      );
    } catch (e) {
      assert(false, `Probing ${file}`, e.message);
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 2: Admin Authentication Guard
  // --------------------------------------------------------------------------
  console.log(`\n▶ 2. UNPROTECTED ADMIN ENDPOINT TESTS`);

  try {
    const unauthSeed = await request({ path: '/api/seed', method: 'POST' }, {});
    assert(
      unauthSeed.statusCode === 401,
      `POST /api/seed rejected without Admin Key`,
      `Got HTTP ${unauthSeed.statusCode}`
    );

    const unauthConnect = await request({ path: '/api/turso/connect', method: 'POST' }, { url: 'libsql://fake.turso.io' });
    assert(
      unauthConnect.statusCode === 401,
      `POST /api/turso/connect rejected without Admin Key`,
      `Got HTTP ${unauthConnect.statusCode}`
    );
  } catch (e) {
    assert(false, `Admin Auth Guard test`, e.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 3: Input Bounds & Malformed Payload Hardening
  // --------------------------------------------------------------------------
  console.log(`\n▶ 3. INPUT BOUNDS VALIDATION & PAYLOAD LIMITS`);

  try {
    // 3a. Out-of-bounds temperature
    const badTemp = await request({ path: '/api/telemetry', method: 'POST' }, {
      batch_id: 'batch-test',
      temperature: 500, // Exceeds 100°C limit
      humidity: 50
    });
    assert(badTemp.statusCode === 400, `Rejected extreme temperature (>100°C)`, `Got HTTP ${badTemp.statusCode}`);

    // 3b. Non-numeric humidity
    const badHum = await request({ path: '/api/telemetry', method: 'POST' }, {
      batch_id: 'batch-test',
      temperature: 25,
      humidity: 'one-hundred-percent'
    });
    assert(badHum.statusCode === 400, `Rejected non-numeric humidity`, `Got HTTP ${badHum.statusCode}`);

    // 3c. Payload limit (>15KB)
    const giantPayload = { data: 'X'.repeat(20000) };
    const overflowRes = await request({ path: '/api/telemetry', method: 'POST' }, giantPayload);
    assert(
      overflowRes.statusCode === 413 || overflowRes.statusCode === 400,
      `Rejected oversized request body (>15KB)`,
      `Got HTTP ${overflowRes.statusCode}`
    );
  } catch (e) {
    assert(false, `Input bounds test`, e.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 4: High Concurrency / Brute Force Load Flood (120+ Queries)
  // --------------------------------------------------------------------------
  console.log(`\n▶ 4. HIGH CONCURRENCY FLOOD & IN-MEMORY CACHE PERFORMANCE`);

  const CONCURRENT_STATUS_REQUESTS = 100;
  console.log(`  🚀 Blasting ${CONCURRENT_STATUS_REQUESTS} parallel queries to /api/status...`);
  const t0 = Date.now();

  const statusPromises = [];
  for (let i = 0; i < CONCURRENT_STATUS_REQUESTS; i++) {
    statusPromises.push(request({ path: '/api/status', method: 'GET' }));
  }

  const statusResults = await Promise.all(statusPromises);
  const elapsedMs = Date.now() - t0;
  const avgLatency = (elapsedMs / CONCURRENT_STATUS_REQUESTS).toFixed(2);
  const okCount = statusResults.filter(r => r.statusCode === 200).length;

  console.log(`  📊 Dispatched ${CONCURRENT_STATUS_REQUESTS} requests in ${elapsedMs}ms (Avg: ${avgLatency}ms/req)`);
  console.log(`  📊 Successful 200 OK responses: ${okCount}/${CONCURRENT_STATUS_REQUESTS}`);

  assert(
    okCount >= 95,
    `Cache absorbs query storm (${okCount}/${CONCURRENT_STATUS_REQUESTS} served cleanly)`,
    `Expected >=95, got ${okCount}`
  );
  assert(
    elapsedMs < 3000,
    `Latency is sub-second under high concurrency (<3s total for 100 requests)`,
    `Took ${elapsedMs}ms`
  );

  // --------------------------------------------------------------------------
  // SECTION 5: Rate Limiting Enforcement Under Flood
  // --------------------------------------------------------------------------
  console.log(`\n▶ 5. BRUTE FORCE INGESTION FLOOD & RATE LIMITING TEST`);

  const TELEMETRY_FLOOD = 75;
  console.log(`  🚀 Blasting ${TELEMETRY_FLOOD} rapid requests to POST /api/telemetry (Limit: 60/min)...`);

  const telemetryPromises = [];
  for (let i = 0; i < TELEMETRY_FLOOD; i++) {
    telemetryPromises.push(
      request(
        { path: '/api/telemetry', method: 'POST' },
        { batch_id: 'batch-iffco-2026-x992', temperature: 28.5, humidity: 55.0 }
      )
    );
  }

  const telemetryResults = await Promise.all(telemetryPromises);
  const rateLimitedCount = telemetryResults.filter(r => r.statusCode === 429).length;
  const acceptedCount = telemetryResults.filter(r => r.statusCode === 200).length;

  console.log(`  📊 Ingestion flood results: ${acceptedCount} accepted, ${rateLimitedCount} throttled (HTTP 429)`);

  assert(
    rateLimitedCount > 0,
    `Rate limiter successfully throttled excess flood traffic (HTTP 429 triggered)`,
    `Rate-limited count: ${rateLimitedCount}`
  );

  const sample429 = telemetryResults.find(r => r.statusCode === 429);
  if (sample429) {
    const retryAfter = sample429.headers['retry-after'];
    assert(
      retryAfter !== undefined,
      `HTTP 429 response includes 'Retry-After' header (${retryAfter}s)`
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 6: Post-Flood Server Health Check
  // --------------------------------------------------------------------------
  console.log(`\n▶ 6. POST-STRESS SERVER STABILITY CHECK`);
  try {
    const postStatus = await request({ path: '/api/status', method: 'GET' });
    assert(
      postStatus.statusCode === 200 || postStatus.statusCode === 429,
      `Server is alive and operational post-stress`,
      `Status: ${postStatus.statusCode}`
    );
  } catch (e) {
    assert(false, `Post-stress health check`, e.message);
  }

  console.log(`\n================================================================`);
  console.log(`🏁 LOAD TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`================================================================`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal load test runner error:', err);
  process.exit(1);
});
