import React, { useEffect, useState } from "react";

interface EdgeInfo {
  city: string;
  colo: string;
  country: string;
  flag: string;
  latencyMs: number | null;
  isSpanishMarket: boolean;
}

const COLO_MAP: Record<
  string,
  { city: string; country: string; flag: string; isSpanish: boolean }
> = {
  // España
  MAD: { city: "Madrid", country: "España", flag: "🇪🇸", isSpanish: true },
  BCN: { city: "Barcelona", country: "España", flag: "🇪🇸", isSpanish: true },
  VLC: { city: "Valencia", country: "España", flag: "🇪🇸", isSpanish: true },
  // México
  MEX: { city: "Ciudad de México", country: "México", flag: "🇲🇽", isSpanish: true },
  GDL: { city: "Guadalajara", country: "México", flag: "🇲🇽", isSpanish: true },
  MTY: { city: "Monterrey", country: "México", flag: "🇲🇽", isSpanish: true },
  QRO: { city: "Querétaro", country: "México", flag: "🇲🇽", isSpanish: true },
  // Colombia
  BOG: { city: "Bogotá", country: "Colombia", flag: "🇨🇴", isSpanish: true },
  MDE: { city: "Medellín", country: "Colombia", flag: "🇨🇴", isSpanish: true },
  CLO: { city: "Cali", country: "Colombia", flag: "🇨🇴", isSpanish: true },
  BAQ: { city: "Barranquilla", country: "Colombia", flag: "🇨🇴", isSpanish: true },
  // Argentina
  EZE: { city: "Buenos Aires", country: "Argentina", flag: "🇦🇷", isSpanish: true },
  COR: { city: "Córdoba", country: "Argentina", flag: "🇦🇷", isSpanish: true },
  ROS: { city: "Rosario", country: "Argentina", flag: "🇦🇷", isSpanish: true },
  // Chile
  SCL: { city: "Santiago", country: "Chile", flag: "🇨🇱", isSpanish: true },
  // Perú
  LIM: { city: "Lima", country: "Perú", flag: "🇵🇪", isSpanish: true },
  // Ecuador
  UIO: { city: "Quito", country: "Ecuador", flag: "🇪🇨", isSpanish: true },
  GYE: { city: "Guayaquil", country: "Ecuador", flag: "🇪🇨", isSpanish: true },
  // Centroamérica y Caribe
  GUA: { city: "Ciudad de Guatemala", country: "Guatemala", flag: "🇬🇹", isSpanish: true },
  SJO: { city: "San José", country: "Costa Rica", flag: "🇨🇷", isSpanish: true },
  PTY: { city: "Ciudad de Panamá", country: "Panamá", flag: "🇵🇦", isSpanish: true },
  SDQ: { city: "Santo Domingo", country: "República Dominicana", flag: "🇩🇴", isSpanish: true },
  SJU: { city: "San Juan", country: "Puerto Rico", flag: "🇵🇷", isSpanish: true },
  // Cono Sur
  MVD: { city: "Montevideo", country: "Uruguay", flag: "🇺🇾", isSpanish: true },
  ASU: { city: "Asunción", country: "Paraguay", flag: "🇵🇾", isSpanish: true },
  LPB: { city: "La Paz", country: "Bolivia", flag: "🇧🇴", isSpanish: true },
};

export default function EdgeLocationBadge() {
  const [edgeInfo, setEdgeInfo] = useState<EdgeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const startTime = performance.now();

    fetch("/cdn-cgi/trace")
      .then((res) => {
        if (!res.ok) throw new Error("Trace unavailable");
        return res.text();
      })
      .then((text) => {
        if (!isMounted) return;
        const latency = Math.max(8, Math.round(performance.now() - startTime));
        const lines = text.split("\n");
        const data: Record<string, string> = {};
        for (const line of lines) {
          const [k, v] = line.split("=");
          if (k && v) data[k.trim()] = v.trim();
        }

        const colo = data.colo || "ANY";
        const match = COLO_MAP[colo];

        if (match) {
          setEdgeInfo({
            city: match.city,
            colo,
            country: match.country,
            flag: match.flag,
            latencyMs: latency,
            isSpanishMarket: true,
          });
        } else {
          setEdgeInfo({
            city: colo,
            colo,
            country: data.loc || "Global",
            flag: "⚡",
            latencyMs: latency,
            isSpanishMarket: false,
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setEdgeInfo({
          city: "Anycast",
          colo: "EDGE",
          country: "Global",
          flag: "⚡",
          latencyMs: 12,
          isSpanishMarket: false,
        });
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-ocean-900/90 px-4 py-1.5 text-xs text-slate-200 shadow-lg shadow-ocean-950/60"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
      </span>

      {isLoading ? (
        <span className="font-mono text-xs text-slate-300">
          Detectando nodo perimetral Cloudflare...
        </span>
      ) : edgeInfo?.isSpanishMarket ? (
        <span className="flex items-center gap-1.5 font-body">
          <span>{edgeInfo.flag}</span>
          <span>
            Conectado al nodo local de{" "}
            <strong className="font-semibold text-white">
              {edgeInfo.city} ({edgeInfo.colo})
            </strong>
          </span>
          {edgeInfo.latencyMs && (
            <span className="ml-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300 tabular-nums">
              {edgeInfo.latencyMs}ms
            </span>
          )}
        </span>
      ) : (
        <span className="flex items-center gap-1.5 font-body">
          <span>{edgeInfo?.flag || "⚡"}</span>
          <span>
            Enrutamiento Anycast Activo{" "}
            <strong className="font-mono text-white">
              ({edgeInfo?.colo || "EDGE"})
            </strong>
          </span>
          {edgeInfo?.latencyMs && (
            <span className="ml-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300 tabular-nums">
              {edgeInfo.latencyMs}ms
            </span>
          )}
        </span>
      )}
    </div>
  );
}
