import React, { useState, useMemo } from "react";
import {
  FiActivity,
  FiClock,
  FiZap,
  FiArrowRight,
  FiAlertCircle,
  FiServer,
  FiCheck,
  FiUsers,
  FiCheckCircle,
  FiTrendingDown,
  FiShield,
} from "react-icons/fi";

interface PresetOption {
  label: string;
  value: number;
}

const FILE_SIZE_PRESETS: PresetOption[] = [
  { label: "25 GB (Gratis)", value: 25 },
  { label: "100 GB (DaVinci / RAW)", value: 100 },
  { label: "250 GB (Master 4K)", value: 250 },
  { label: "500 GB (Proyecto Cine)", value: 500 },
];

const SENDER_SPEED_PRESETS: PresetOption[] = [
  { label: "50 Mbps (Wi-Fi / 4G)", value: 50 },
  { label: "100 Mbps (Starlink)", value: 100 },
  { label: "300 Mbps (Fibra)", value: 300 },
  { label: "1,000 Mbps (Gigabit)", value: 1000 },
];

function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${Math.ceil(totalSeconds)} s`;
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours} h ${minutes} min`;
  }
  return `${minutes} min ${seconds > 0 ? `${seconds} s` : ""}`;
}

export default function SavingsCalculatorEs() {
  const [activeTab, setActiveTab] = useState<"time" | "savings">("time");
  const [fileSizeGB, setFileSizeGB] = useState<number>(100);
  const [senderMbps, setSenderMbps] = useState<number>(300);
  const [recipientMbps, setRecipientMbps] = useState<number>(300);
  const [recipientsCount, setRecipientsCount] = useState<number>(1);

  const totalMegabits = fileSizeGB * 8 * 1024 * 1.08;
  const uploadSeconds = useMemo(
    () => totalMegabits / senderMbps,
    [totalMegabits, senderMbps]
  );
  const downloadSecondsPerRecipient = useMemo(
    () => totalMegabits / recipientMbps,
    [totalMegabits, recipientMbps]
  );

  const totalVolumeGB = fileSizeGB * recipientsCount;

  let gigasendRate = 0.2;
  let tierName = "Paquete Creador (100 GB)";
  let discountLabel = "Validez 12 Meses • Sin Suscripción";

  if (fileSizeGB <= 25) {
    gigasendRate = 0;
    tierName = "Plan Gratuito (Hasta 25 GB)";
    discountLabel = "$0 USD • 100% Gratis";
  } else if (totalVolumeGB >= 2000) {
    gigasendRate = 0.16;
    tierName = "Paquete Business (5 TB)";
    discountLabel = "20% de Ahorro por Volumen";
  } else if (totalVolumeGB >= 500) {
    gigasendRate = 0.18;
    tierName = "Paquete Estudio (1 TB — $180)";
    discountLabel = "10% de Ahorro por Volumen";
  }

  const gigasendCost = fileSizeGB <= 25 ? 0 : totalVolumeGB * gigasendRate;
  const masvCost = totalVolumeGB * 0.25;
  const savingsAmount = Math.max(0, masvCost - gigasendCost);
  const savingsPct =
    masvCost > 0 ? Math.round((savingsAmount / masvCost) * 100) : 0;

  let equivalentWork = `~${Math.round(fileSizeGB * 25)} Fotos RAW sin comprimir`;
  if (fileSizeGB >= 250) {
    equivalentWork = `~${(fileSizeGB / 150).toFixed(1)} Largometrajes Master 4K ProRes`;
  } else if (fileSizeGB >= 50) {
    equivalentWork = `~${Math.round(fileSizeGB / 15)} Proyectos de Video de Alto Bitrate`;
  }

  let bottleneckText = "Perfil Perimetral Equilibrado";
  let bottleneckDescription =
    "Tu velocidad de subida y la descarga del cliente están optimizadas para transmisión simétrica en los nodos Anycast de España y Latinoamérica.";
  let bottleneckSeverity: "info" | "warning" | "success" = "info";

  if (senderMbps < 100) {
    bottleneckText = "Cuello de Botella: Velocidad de Subida Local";
    bottleneckDescription =
      "Conéctate por cable Ethernet Gigabit o red de 5 GHz. El motor multiparte de Gigasend protegerá tu envío ante microcortes.";
    bottleneckSeverity = "warning";
  } else if (senderMbps >= 500) {
    bottleneckText = "Canal WAN de Ultra Velocidad Activo";
    bottleneckDescription =
      "Los fragmentos paralelos HTTP/3 saturarán tu conexión de fibra óptica directamente hacia el nodo local más cercano (MAD, MEX, BOG, EZE, SCL).";
    bottleneckSeverity = "success";
  }

  return (
    <div className="rounded-3xl apple-glass border border-white/10 p-6 sm:p-8 shadow-2xl shadow-ocean-950/90">
      {/* Header & Segmented Control Tabs (44x44pt Apple HIG compliant) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold-400">
            <FiActivity className="text-emerald-400" />
            Simulador Interactivo en Español
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Calculadora de Velocidad y Ahorro Cloud
          </h3>
        </div>

        <div
          className="inline-flex rounded-2xl bg-ocean-950/90 p-1.5 border border-white/10 self-start"
          role="tablist"
          aria-label="Modo de calculadora"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "time"}
            onClick={() => setActiveTab("time")}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 tap-tactile ${
              activeTab === "time"
                ? "bg-gold-500 text-ocean-950 shadow-md shadow-gold-500/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FiClock />
            Tiempo y Velocidad
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "savings"}
            onClick={() => setActiveTab("savings")}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 tap-tactile ${
              activeTab === "savings"
                ? "bg-gold-500 text-ocean-950 shadow-md shadow-gold-500/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FiTrendingDown />
            Costo y Ahorro
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 pt-6 items-start">
        {/* Left Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* File Size Control */}
          <div className="rounded-2xl bg-ocean-900/50 border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="es-calc-size"
                className="text-sm font-bold text-white font-display"
              >
                1. Tamaño del Paquete a Enviar
              </label>
              <span className="text-2xl font-extrabold text-gold-400 font-display tabular-nums">
                {fileSizeGB} GB
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FILE_SIZE_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setFileSizeGB(preset.value)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition-all tap-tactile ${
                    fileSizeGB === preset.value
                      ? "bg-gold-500/20 border-gold-400 text-gold-300 font-bold"
                      : "bg-ocean-950/70 border-white/10 text-slate-300 hover:border-gold-500/40 hover:text-white"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <input
                id="es-calc-size"
                type="range"
                min={5}
                max={1000}
                step={5}
                value={fileSizeGB}
                onChange={(e) => setFileSizeGB(Number(e.target.value))}
                className="w-full h-3 accent-amber-400 cursor-pointer rounded-lg bg-ocean-950"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                <span>5 GB</span>
                <span className="text-emerald-400 font-semibold">{equivalentWork}</span>
                <span>1,000 GB (1 TB)</span>
              </div>
            </div>
          </div>

          {activeTab === "time" ? (
            <div className="rounded-2xl bg-ocean-900/50 border border-white/10 p-5 space-y-5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="es-calc-speed"
                  className="text-sm font-bold text-white font-display"
                >
                  2. Tu Velocidad de Internet (Subida)
                </label>
                <span className="text-xl font-extrabold text-emerald-400 font-display tabular-nums">
                  {senderMbps} Mbps
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SENDER_SPEED_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      setSenderMbps(preset.value);
                      setRecipientMbps(preset.value);
                    }}
                    className={`min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all tap-tactile ${
                      senderMbps === preset.value
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold"
                        : "bg-ocean-950/70 border-white/10 text-slate-300 hover:border-emerald-500/40 hover:text-white"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <input
                id="es-calc-speed"
                type="range"
                min={20}
                max={2000}
                step={10}
                value={senderMbps}
                onChange={(e) => setSenderMbps(Number(e.target.value))}
                className="w-full h-3 accent-emerald-400 cursor-pointer rounded-lg bg-ocean-950"
              />

              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4">
                <label
                  htmlFor="es-calc-down"
                  className="text-xs font-medium text-slate-300"
                >
                  Velocidad de Descarga del Cliente:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="es-calc-down"
                    type="range"
                    min={50}
                    max={2000}
                    step={50}
                    value={recipientMbps}
                    onChange={(e) => setRecipientMbps(Number(e.target.value))}
                    className="w-32 sm:w-44 h-3 accent-gold-400 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-gold-400 tabular-nums min-w-[70px] text-right">
                    {recipientMbps} Mbps
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-ocean-900/50 border border-white/10 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="es-calc-recipients"
                  className="text-sm font-bold text-white font-display flex items-center gap-2"
                >
                  <FiUsers className="text-gold-400" />
                  2. Número de Destinatarios / Descargas
                </label>
                <span className="text-xl font-extrabold text-gold-400 font-display tabular-nums">
                  {recipientsCount} {recipientsCount === 1 ? "cliente" : "clientes"}
                </span>
              </div>
              <input
                id="es-calc-recipients"
                type="range"
                min={1}
                max={20}
                step={1}
                value={recipientsCount}
                onChange={(e) => setRecipientsCount(Number(e.target.value))}
                className="w-full h-3 accent-amber-400 cursor-pointer rounded-lg bg-ocean-950"
              />
              <p className="text-xs text-slate-300">
                Volumen total transferido:{" "}
                <strong className="text-white tabular-nums">{totalVolumeGB} GB</strong>{" "}
                sin cargos de salida cloud ni suscripciones mensuales.
              </p>
            </div>
          )}

          {/* Diagnostic Callout */}
          <div
            className={`rounded-2xl p-4 border flex items-start gap-3 ${
              bottleneckSeverity === "warning"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                : bottleneckSeverity === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                : "bg-ocean-900/60 border-white/10 text-slate-200"
            }`}
          >
            <FiAlertCircle className="text-lg shrink-0 mt-0.5 text-gold-400" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-white">{bottleneckText}</p>
              <p className="text-slate-300 leading-relaxed">{bottleneckDescription}</p>
            </div>
          </div>
        </div>

        {/* Right Telemetry Output */}
        <div className="lg:col-span-5 rounded-2xl bg-ocean-950/90 border border-gold-500/30 p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400">
                {tierName}
              </span>
              <h4 className="text-lg font-extrabold text-white font-display">
                {discountLabel}
              </h4>
            </div>
            <FiServer className="text-2xl text-gold-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-ocean-900/70 border border-white/10 p-3.5">
              <span className="block text-[11px] text-slate-400 font-mono uppercase">
                Tiempo de Subida
              </span>
              <span className="mt-1 block text-xl font-extrabold text-emerald-400 font-display tabular-nums">
                {formatDuration(uploadSeconds)}
              </span>
              <span className="text-[11px] text-slate-400">
                Vía Anycast Local
              </span>
            </div>

            <div className="rounded-xl bg-ocean-900/70 border border-white/10 p-3.5">
              <span className="block text-[11px] text-slate-400 font-mono uppercase">
                Descarga Cliente
              </span>
              <span className="mt-1 block text-xl font-extrabold text-white font-display tabular-nums">
                {formatDuration(downloadSecondsPerRecipient)}
              </span>
              <span className="text-[11px] text-slate-400">
                1 Clic • Sin Cuenta
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-gold-500/10 border border-gold-500/30 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Costo Estimado en Gigasend:
              </span>
              <span className="text-2xl font-extrabold text-gold-400 font-display tabular-nums">
                {fileSizeGB <= 25 ? "GRATIS ($0)" : `$${gigasendCost.toFixed(2)} USD`}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>vs. MASV ($0.25/GB) o WeTransfer Pro ($276/año):</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {fileSizeGB <= 25
                  ? "Ahorras 100%"
                  : `Ahorras $${savingsAmount.toFixed(2)} (${savingsPct}%)`}
              </span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-emerald-400 shrink-0" />
              <span>Sin registro ni contraseña obligatoria para tu cliente</span>
            </li>
            <li className="flex items-center gap-2">
              <FiShield className="text-gold-400 shrink-0" />
              <span>Verificación SHA-256 bit a bit sin compresión</span>
            </li>
            <li className="flex items-center gap-2">
              <FiZap className="text-amber-400 shrink-0" />
              <span>Reanudación automática ante cortes de red o Wi-Fi</span>
            </li>
          </ul>

          <a
            href="/transfer"
            className="btn-gold w-full min-h-[48px] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-gold-500/15 inline-flex items-center justify-center gap-2 tap-tactile"
          >
            <span>Transferir {fileSizeGB} GB Sin Compresión Ahora</span>
            <FiArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}
