/**
 * Test script to verify the website failure listener endpoint
 */
const BASE_URL = process.env.BASE_URL || "https://gigasend.us";

async function run() {
  console.log(`[TEST] Testing failure telemetry endpoint on ${BASE_URL}...`);

  const mockPayload = {
    type: "test_verification_event",
    message: "Synthetic test exception generated to verify Failure Listener",
    source: `${BASE_URL}/test-listener`,
    lineno: 42,
    colno: 10,
    stack: "Error: Synthetic test exception\n    at run (test-failure-listener.mjs:42:10)",
    url: `${BASE_URL}/plans`,
    timestamp: new Date().toISOString(),
    viewport: "1920x1080",
    userAgent: "GigaSend-Failure-Listener-Validator/1.0",
  };

  try {
    const res = await fetch(`${BASE_URL}/api/telemetry/report-error`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockPayload),
    });

    const body = await res.json().catch(() => ({}));
    console.log(`[STATUS] HTTP ${res.status}`);
    console.log("[RESPONSE]", body);

    if (res.ok && body.success) {
      console.log("✅ Failure Listener endpoint is fully operational!");
    } else {
      console.warn("⚠️ Endpoint returned unexpected response.");
    }
  } catch (err) {
    console.error("❌ Network or request error:", err.message);
  }
}

run();
