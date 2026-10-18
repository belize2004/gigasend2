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
  var CHUNK_RELOAD_WINDOW_MS = 60000; // 1 minute guard for stale-chunk auto-reload
  var isUnloading = false;
  var lastNavigationIntentAt = 0;
  var hasReloadedInMemory = false;

  window.addEventListener("beforeunload", function () {
    isUnloading = true;
  });
  window.addEventListener("pagehide", function () {
    isUnloading = true;
  });

  // Track link clicks and form submissions in capture phase so in-flight module imports
  // aborted by user navigation (before beforeunload fires) are recognized as benign.
  if (typeof document !== "undefined") {
    document.addEventListener(
      "click",
      function (e) {
        try {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          var el = e.target && e.target.closest ? e.target.closest("a[href]") : null;
          if (!el) return;
          var href = el.getAttribute("href") || "";
          var target = el.getAttribute("target") || "";
          if (!href || href.charAt(0) === "#" || target === "_blank" || el.hasAttribute("download")) return;
          lastNavigationIntentAt = Date.now();
        } catch (err) {}
      },
      true
    );
    document.addEventListener(
      "submit",
      function () {
        lastNavigationIntentAt = Date.now();
      },
      true
    );
  }

  function isNavigatingOrOffline() {
    if (isUnloading) return true;
    if (lastNavigationIntentAt && Date.now() - lastNavigationIntentAt < 5000) return true;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
    return false;
  }

  /**
   * Hoist inline Emotion SSR <style data-emotion> tags out of <astro-island> into <head>
   * prior to React 19 hydration so SSR and client DOM trees match identically (prevents React #418).
   */
  function hoistEmotionStyles() {
    try {
      if (typeof document === "undefined" || !document.head) return;
      var styles = document.querySelectorAll("astro-island style[data-emotion]");
      for (var i = 0; i < styles.length; i++) {
        document.head.appendChild(styles[i]);
      }
    } catch (e) {}
  }

  if (typeof document !== "undefined") {
    hoistEmotionStyles();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", hoistEmotionStyles, { once: true });
      if (typeof MutationObserver !== "undefined" && document.documentElement) {
        var observer = new MutationObserver(function () {
          hoistEmotionStyles();
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
        document.addEventListener(
          "DOMContentLoaded",
          function () {
            observer.disconnect();
            hoistEmotionStyles();
          },
          { once: true }
        );
      }
    }
  }

  var BOT_UA_REGEX =
    /headlesschrome|phantomjs|puppeteer|playwright|googlebot|bingbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|perplexitybot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|applebot|yandexbot|baiduspider|duckduckbot|ia_archiver|prerender|screaming frog|dataforseo|uptimerobot|pingdom|statuscake/i;

  function isBotUserAgent() {
    try {
      var ua = (navigator && navigator.userAgent) || "";
      return BOT_UA_REGEX.test(ua);
    } catch (e) {
      return false;
    }
  }

  function isDynamicImportError(message) {
    var msg = String(message || "").toLowerCase();
    return (
      msg.indexOf("failed to fetch dynamically imported module") !== -1 ||
      msg.indexOf("error loading dynamically imported module") !== -1 ||
      msg.indexOf("importing a module script failed") !== -1 ||
      msg.indexOf("chunkloaderror") !== -1
    );
  }

  /**
   * Returns true if the dynamic import error should be suppressed
   * (either due to page unload/navigation/hidden tab or because we triggered a one-time recovery reload).
   */
  function handleDynamicImportRecovery(message) {
    if (!isDynamicImportError(message)) return false;

    // Aborted module fetches while navigating away, offline, or in backgrounded/closing tabs are benign
    if (isNavigatingOrOffline() || (typeof document !== "undefined" && document.visibilityState === "hidden")) {
      return true;
    }

    try {
      var reloadKey = "gigasend_chunk_reload:" + window.location.pathname;
      var lastReload = Number(sessionStorage.getItem(reloadKey) || "0");
      var now = Date.now();
      if (!lastReload || now - lastReload > CHUNK_RELOAD_WINDOW_MS) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
        return true;
      }
    } catch (e) {
      // sessionStorage unavailable (e.g., strict privacy mode) — suppress first occurrence
      if (!hasReloadedInMemory) {
        hasReloadedInMemory = true;
        return true;
      }
    }

    return false;
  }

  function isFirstPartyResource(src) {
    if (!src) return false;
    try {
      var resolved = new URL(src, window.location.origin);
      if (resolved.origin !== window.location.origin) {
        return false; // Ignore cross-origin / extension / third-party injected scripts
      }
      if (resolved.pathname.indexOf("/cdn-cgi/") === 0) {
        return false; // Ignore Cloudflare edge challenge / insights scripts blocked by adblockers
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function getErrorSignature(type, message, source, lineno, colno) {
    return [type, message || "", source || "", lineno || 0, colno || 0].join("::");
  }

  function shouldIgnore(source, message) {
    if (!message && !source) return true;
    if (isNavigatingOrOffline() || isBotUserAgent()) return true;
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return true;

    var str = (String(source) + " " + String(message)).toLowerCase();

    // Ignore browser extension scripts and non-app schemes
    if (
      str.indexOf("chrome-extension://") !== -1 ||
      str.indexOf("moz-extension://") !== -1 ||
      str.indexOf("safari-extension://") !== -1 ||
      str.indexOf("safari-web-extension://") !== -1 ||
      str.indexOf("content-script") !== -1 ||
      str.indexOf("cloudflareinsights.com") !== -1 ||
      str.indexOf("/cdn-cgi/") !== -1
    ) {
      return true;
    }

    // If React hydration #418/#422/#423/#425 occurs, hoist any remaining Emotion styles and ignore
    // since React 19 automatically recovers on the client (commonly triggered by Translate/Grammarly/DarkReader DOM injections).
    if (
      str.indexOf("minified react error #418") !== -1 ||
      str.indexOf("minified react error #422") !== -1 ||
      str.indexOf("minified react error #423") !== -1 ||
      str.indexOf("minified react error #425") !== -1
    ) {
      hoistEmotionStyles();
      return true;
    }

    // Ignore common benign third-party or network interruption errors
    if (
      str.indexOf("resizeobserver loop") !== -1 ||
      (str.indexOf("script error.") !== -1 && !source)
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

  // 1. Uncaught Runtime Exceptions & First-Party Resource Load Failures
  window.addEventListener(
    "error",
    function (event) {
      try {
        // Target is an element (e.g. <script> or <link> failed to load)
        if (event.target && event.target !== window) {
          var target = event.target;
          var src = target.src || target.href || "";
          if (!src || !isFirstPartyResource(src) || shouldIgnore(src, "resource_load_failure")) {
            return;
          }
          if (src.indexOf("/_astro/") !== -1 && handleDynamicImportRecovery("importing a module script failed: " + src)) {
            return;
          }
          var tagName = (target.tagName || "element").toLowerCase();
          recordAndSend({
            type: "resource_failure",
            message: "Failed to load resource: " + tagName + " (" + src + ")",
            source: src,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            viewport: window.innerWidth + "x" + window.innerHeight,
            userAgent: navigator.userAgent,
          });
          return;
        }

        var message = event.message || (event.error && event.error.message) || "Unknown error";
        var source = event.filename || "";
        var lineno = event.lineno || 0;
        var colno = event.colno || 0;
        var stack = event.error && event.error.stack ? String(event.error.stack) : "";

        if (shouldIgnore(source, message)) return;
        if (handleDynamicImportRecovery(message)) return;

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
      if (handleDynamicImportRecovery(message)) return;

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
      if (shouldIgnore("", message)) return;
      var stack = error && error.stack ? String(error.stack) : "";
      recordAndSend({
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

