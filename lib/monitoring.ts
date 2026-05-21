import * as Sentry from "@sentry/astro";

type MonitoringContext = Record<string, unknown>;
type MonitoringTags = Record<string, string | number | boolean | null | undefined>;

type CaptureOptions = {
  user?: {
    id?: string | null;
    email?: string | null;
  };
  tags?: MonitoringTags;
  context?: MonitoringContext;
};

export function setMonitoringUser(user?: { id?: string | null; email?: string | null }) {
  if (!user?.id && !user?.email) {
    Sentry.setUser(null);
    return;
  }

  Sentry.setUser({
    id: user.id ?? undefined,
    email: user.email ?? undefined,
  });
}

export function addMonitoringBreadcrumb(
  message: string,
  data?: MonitoringContext,
  category = "gigasend",
) {
  Sentry.addBreadcrumb({
    category,
    message,
    level: "info",
    data,
  });
}

export function captureMonitoringException(error: unknown, options: CaptureOptions = {}) {
  Sentry.withScope((scope) => {
    if (options.user?.id || options.user?.email) {
      scope.setUser({
        id: options.user.id ?? undefined,
        email: options.user.email ?? undefined,
      });
    }

    Object.entries(options.tags ?? {}).forEach(([key, value]) => {
      if (value != null) scope.setTag(key, String(value));
    });

    if (options.context) {
      scope.setContext("gigasend", options.context);
    }

    Sentry.captureException(error);
  });
}
