import * as Sentry from "@sentry/astro";

const dsn = import.meta.env.PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment: import.meta.env.PUBLIC_SENTRY_ENVIRONMENT || import.meta.env.MODE,
  release: import.meta.env.PUBLIC_SENTRY_RELEASE,
  tracesSampleRate: Number(import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.1),
  beforeSend(event) {
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    return event;
  },
});
