import React, { useState } from "react";

export default function SpeedCalculator() {
  const [fileSizeGB, setFileSizeGB] = useState<number>(25);
  const [bandwidthMbps, setBandwidthMbps] = useState<number>(300);

  // Calculations
  // 1 GB = 1024 MB = 8192 Megabits
  const totalMegabits = fileSizeGB * 8192;
  const theoreticalSec = totalMegabits / bandwidthMbps;

  // Gigasend Multi-Part Edge: Anycast proximity, HTTP/3 QUIC, ~92% line efficiency
  const gigasendSec = Math.max(1, Math.round(theoreticalSec / 0.92));

  // Legacy Single-Region Cloud (e.g. AWS S3 single bucket / WeTransfer): ~65% efficiency due to TCP window clamping + RTT handshake latency
  const legacySec = Math.max(1, Math.round(theoreticalSec / 0.65 + (fileSizeGB > 20 ? 120 : 30)));

  // Legacy Email / Basic Web attachments fail above 25MB
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} sec`;
    }
    const mins = Math.floor(seconds / 60);
    const remainingSec = seconds % 60;
    if (mins < 60) {
      return remainingSec > 0 ? `${mins} min ${remainingSec} sec` : `${mins} min`;
    }
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours < 24) {
      return remainingMins > 0 ? `${hours} hr ${remainingMins} min` : `${hours} hr`;
    }
    const days = (seconds / 86400).toFixed(1);
    return `${days} days`;
  };

  const sizePresets = [
    { label: "5 GB", val: 5 },
    { label: "10 GB", val: 10 },
    { label: "25 GB", val: 25 },
    { label: "50 GB", val: 50 },
    { label: "100 GB", val: 100 },
    { label: "500 GB", val: 500 },
    { label: "1 TB", val: 1000 },
    { label: "2 TB", val: 2000 },
  ];

  const speedPresets = [
    { label: "50 Mbps (Cable)", val: 50 },
    { label: "100 Mbps (Broadband)", val: 100 },
    { label: "300 Mbps (Fiber)", val: 300 },
    { label: "1 Gbps (Gigabit)", val: 1000 },
    { label: "2.5 Gbps (High-Speed)", val: 2500 },
    { label: "10 Gbps (Studio)", val: 10000 },
  ];

  const timeSavedSec = Math.max(0, legacySec - gigasendSec);
  const percentFaster = Math.round(((legacySec - gigasendSec) / legacySec) * 100);

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 apple-glass bg-ocean-900/80 p-6 shadow-2xl sm:p-10 relative overflow-hidden font-body text-slate-100">
      {/* Ambient Background Glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="border-b border-white/10 pb-6 text-center relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400 label-caps">
          <span aria-hidden="true">⚡</span> INTERACTIVE ESTIMATION TOOL
        </span>
        <h1 className="mt-3 text-3xl font-black text-white font-display tracking-tight sm:text-4xl">
          File Transfer Speed & Upload Time Calculator
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Estimate realistic upload and delivery durations based on your WAN bandwidth and file payload.
        </p>
      </div>

      <div className="mt-8 space-y-8 relative z-10">
        {/* File Size Control */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="file-size-slider" className="text-base font-bold text-white font-display">
              1. Payload Size:{" "}
              <span className="text-gold-400 font-black font-mono">
                {fileSizeGB >= 1000 ? `${(fileSizeGB / 1000).toFixed(1)} TB` : `${fileSizeGB} GB`}
              </span>
            </label>
            <span className="text-xs text-slate-400 font-mono">1 GB to 2,000 GB</span>
          </div>
          <input
            id="file-size-slider"
            type="range"
            min="1"
            max="2000"
            step="1"
            value={fileSizeGB}
            onChange={(e) => setFileSizeGB(Number(e.target.value))}
            className="mt-3 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-white/[0.06] border border-white/10 accent-gold-500"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {sizePresets.map((preset) => (
              <button
                key={preset.val}
                type="button"
                onClick={() => setFileSizeGB(preset.val)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition tap-tactile ${
                  fileSizeGB === preset.val
                    ? "bg-gold-500 text-ocean-950 shadow-md shadow-gold-500/20 font-bold"
                    : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-gold-500/40 hover:text-white"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Bandwidth Control */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="bandwidth-slider" className="text-base font-bold text-white font-display">
              2. Upload Connection Speed:{" "}
              <span className="text-gold-400 font-black font-mono">
                {bandwidthMbps >= 1000 ? `${(bandwidthMbps / 1000).toFixed(1)} Gbps` : `${bandwidthMbps} Mbps`}
              </span>
            </label>
            <span className="text-xs text-slate-400 font-mono">10 Mbps to 10 Gbps</span>
          </div>
          <input
            id="bandwidth-slider"
            type="range"
            min="10"
            max="10000"
            step="10"
            value={bandwidthMbps}
            onChange={(e) => setBandwidthMbps(Number(e.target.value))}
            className="mt-3 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-white/[0.06] border border-white/10 accent-gold-500"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {speedPresets.map((preset) => (
              <button
                key={preset.val}
                type="button"
                onClick={() => setBandwidthMbps(preset.val)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition tap-tactile ${
                  bandwidthMbps === preset.val
                    ? "bg-gold-500 text-ocean-950 shadow-md shadow-gold-500/20 font-bold"
                    : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-gold-500/40 hover:text-white"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Comparison Grid */}
        <div className="rounded-2xl border border-gold-500/30 bg-ocean-950/70 p-6 shadow-xl">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 label-caps">Calculated Telemetry</span>
              <h3 className="text-xl font-bold text-white font-display">Transfer Time Comparison</h3>
            </div>
            <div className="rounded-xl bg-emerald-500/15 px-3.5 py-1.5 text-center text-xs font-bold text-emerald-400 border border-emerald-500/30 font-mono">
              {percentFaster}% Faster via Edge Multi-Part
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Gigasend Edge */}
            <div className="rounded-xl border border-gold-500/40 bg-ocean-900/90 p-4 shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-black text-ocean-950" aria-hidden="true">✓</span>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">Gigasend Edge Multi-Part (Cloudflare Anycast)</h4>
                    <p className="text-xs text-slate-300">Direct chunking across 335+ edge PoPs with parallel TCP streams</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-black text-gold-400 font-mono sm:text-2xl">{formatDuration(gigasendSec)}</span>
                  <div className="text-[11px] text-emerald-400 font-mono">~92% line efficiency</div>
                </div>
              </div>
            </div>

            {/* Legacy Cloud (Single Region) */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-slate-400" aria-hidden="true">•</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 font-display">Legacy Cloud Storage (AWS S3 / WeTransfer)</h4>
                    <p className="text-xs text-slate-400">High round-trip latency & TCP slow-start window throttling</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-slate-300 font-mono sm:text-lg">{formatDuration(legacySec)}</span>
                  <div className="text-[11px] text-slate-400 font-mono">~65% efficiency</div>
                </div>
              </div>
            </div>

            {/* Theoretical Line Rate */}
            <div className="rounded-xl border border-white/10 bg-ocean-950/80 p-3.5 text-xs text-slate-400 font-mono">
              <div className="flex items-center justify-between">
                <span>Theoretical Physics Maximum (100% wire speed):</span>
                <span className="font-bold text-gold-400">{formatDuration(Math.round(theoreticalSec))}</span>
              </div>
            </div>
          </div>

          {/* Time Saved Highlight */}
          {timeSavedSec > 0 && (
            <div className="mt-4 text-center text-xs text-slate-300">
              <span aria-hidden="true">⚡</span> Uploading via Gigasend saves you roughly{" "}
              <strong className="text-gold-400 font-mono">{formatDuration(timeSavedSec)}</strong> compared to single-region legacy uploads.
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 text-center">
          <a
            href="/transfer"
            className="btn-gold inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-sm font-bold shadow-xl shadow-gold-500/20 transition sm:w-auto tap-tactile"
          >
            Transfer {fileSizeGB >= 1000 ? `${(fileSizeGB / 1000).toFixed(1)} TB` : `${fileSizeGB} GB`} with Gigasend Now →
          </a>
          <p className="mt-2.5 text-xs text-slate-400 font-mono">
            Free up to 10 GB • No software install • In-browser parallel stream
          </p>
        </div>
      </div>
    </div>
  );
}
