import { useMemo } from "react";

export function useRouter() {
  return useMemo(
    () => ({
      push: (href: string) => {
        window.location.href = href;
      },
      replace: (href: string) => {
        window.location.replace(href);
      },
      back: () => {
        window.history.back();
      },
    }),
    [],
  );
}

export function usePathname() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  if (typeof window === "undefined") return {} as T;

  const pathname = window.location.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const params: Record<string, string> = {};

  if (segments[0] === "checkout" && segments[1]) {
    params.plan = decodeURIComponent(segments[1]);
  }

  if (segments[0] === "blogs" && segments[1]) {
    params.slug = decodeURIComponent(segments[1]);
  }

  return params as T;
}
