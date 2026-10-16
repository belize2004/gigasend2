/**
 * GigaSend Client-Side Failure Listener
 * Captures uncaught runtime exceptions, unhandled Promise rejections,
 * and resource load errors, transmitting telemetry beacons to the server.
 */
(function () {
  if (typeof window === "undefined") return;

  var REPORT_ENDPOINT = "/api/telemetry/report-error";
  var seenErrors = new Map();
  var DEDUPE_WINDOW_MS = 60000; // 1 minute per unique error signature

  function getErrorSignature(type, message, source, lineno, colno) {
    return [type, message || "", source || "", lineno || 0, colno || 0].join("::");
  }

  function shouldIgnore(source, message) {
    if (!message && !source) return true;
    var str = (String(source) + " " + String(message)).toLowerCase();

    // Ignore browser extension scripts
    if (
      str.indexOf("chrome-extension://") !== -1 ||
      str.indexOf("moz-extension://") !== -1 ||
      str.indexOf("safari-extension://") !== -1 ||
      str.indexOf("safari-web-extension://") !== -1 ||
      str.indexOf("content-script") !== -1
    ) {
      return true;
    }

    // Ignore common benign third-party or network interruption errors
    if (
      str.indexOf("resizeobserver loop") !== -1 ||
      str.indexOf("script error.") !== -1 && !source
    ) {
      return true;
    }

    return false;
  }

  function sendReport(payload) {
    try {
      var data = JSON.stringify(payload);
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        var blob = new Blob([data], { type: "application/json" });
        if (navigator.sendBeacon(REPORT_ENDPOINT, blob)) {
          return;
        }
      }
      if (typeof fetch === "function") {
        fetch(REPORT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
          keepalive: true,
          credentials: "omit",
        }).catch(function () {});
      }
    } catch (e) {
      // Avoid recursive error handling
    }
  }

  function recordAndSend(payload) {
    var signature = getErrorSignature(
      payload.type,
      payload.message,
      payload.source,
      payload.lineno,
      payload.colno
    );

    var now = Date.now();
    var lastSeen = seenErrors.get(signature);
    if (lastSeen && now - lastSeen < DEDUPE_WINDOW_MS) {
      return; // Deduplicate
    }
    seenErrors.set(signature, now);

    // Prune stale cache entries if too large
    if (seenErrors.size > 100) {
      seenErrors.forEach(function (timestamp, key) {
        if (now - timestamp > DEDUPE_WINDOW_MS) {
          seenErrors.delete(key);
        }
      });
    }

    sendReport(payload);
  }

  // 1. Uncaught Runtime Exceptions
  window.addEventListener(
    "error",
    function (event) {
      try {
        // Target is an element (e.g. <script> or <link> failed to load)
        if (event.target && event.target !== window) {
          var target = event.target;
          var src = target.src || target.href || "";
          if (src && !shouldIgnore(src, "resource_load_failure")) {
            recordAndSend({
              type: "resource_failure",
              message: "Failed to load resource: " + (target.tagName || "element").toLowerCase(),
              source: src,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
            });
          }
          return;
        }

        var message = event.message || (event.error && event.error.message) || "Unknown error";
        var source = event.filename || "";
        var lineno = event.lineno || 0;
        var colno = event.colno || 0;
        var stack = event.error && event.error.stack ? String(event.error.stack) : "";

        if (shouldIgnore(source, message)) return;

        recordAndSend({
          type: "uncaught_exception",
          message: message,
          source: source,
          lineno: lineno,
          colno: colno,
          stack: stack,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          viewport: window.innerWidth + "x" + window.innerHeight,
          userAgent: navigator.userAgent,
        });
      } catch (err) {}
    },
    true
  );

  // 2. Unhandled Promise Rejections (e.g. failed async fetch, chunk uploads, Stripe SDK)
  window.addEventListener("unhandledrejection", function (event) {
    try {
      var reason = event.reason;
      var message = "Unhandled Promise rejection";
      var stack = "";

      if (typeof reason === "string") {
        message = reason;
      } else if (reason && typeof reason === "object") {
        message = reason.message || reason.name || JSON.stringify(reason);
        stack = reason.stack ? String(reason.stack) : "";
      }

      if (shouldIgnore("", message)) return;

      recordAndSend({
        type: "unhandled_rejection",
        message: message,
        stack: stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        viewport: window.innerWidth + "x" + window.innerHeight,
        userAgent: navigator.userAgent,
      });
    } catch (err) {}
  });

  // 3. Expose global helper for explicit error reporting
  window.reportCustomError = function (error, context) {
    try {
      var message = typeof error === "string" ? error : error.message || "Custom error";
      var stack = error && error.stack ? String(error.stack) : "";
      sendReport({
        type: "custom_error",
        message: message,
        stack: stack,
        context: context || {},
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
    } catch (e) {}
  };
})();
