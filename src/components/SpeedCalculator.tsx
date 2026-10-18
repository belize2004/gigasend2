import React, { useState } from "react";

export default function SpeedCalculator() {
  const [fileSizeGB, setFileSizeGB] = useState<number>(10);
  const [bandwidthMbps, setBandwidthMbps] = useState<number>(500);

  // Calculations
  // 1 GB = 1024 MB = 8192 Megabits
  const totalMegabits = fileSizeGB * 8192;
  const theoreticalSec = totalMegabits / bandwidthMbps;

  // Gigasend parallel upload to nearest regional server
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
    { label: "2 GB", val: 2 },
    { label: "10 GB", val: 10 },
    { label: "50 GB", val: 50 },
    { label: "250 GB", val: 250 },
    { label: "1 TB", val: 1000 },
  ];

  const speedPresets = [
    { label: "50 Mbps", val: 50 },
    { label: "100 Mbps", val: 100 },
    { label: "500 Mbps", val: 500 },
    { label: "1 Gbps", val: 1000 },
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
          Transfer Time Estimator
        </span>
        <h2 className="mt-3 text-2xl font-black text-white font-display tracking-tight sm:text-3xl">
          Estimate Your Upload & Transfer Time
        </h2>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Select your file size and internet speed to see how quickly your files will arrive.
        </p>
      </div>

      <div className="mt-8 space-y-8 relative z-10">
        {/* File Size Control */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="file-size-slider" className="text-base font-bold text-white font-display">
              1. File Size:{" "}
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
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition tap-tactile ${
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
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition tap-tactile ${
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

        {/* Simplified Hero Results Comparison */}
        <div className="rounded-2xl border border-gold-500/30 bg-ocean-950/70 p-6 shadow-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Hero Metric: Gigasend Transfer Time */}
            <div className="rounded-2xl border border-gold-500/40 bg-ocean-900/95 p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 label-caps">Gigasend Transfer Time</span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30 font-mono">
                    {percentFaster}% Faster
                  </span>
                </div>
                <div className="mt-3 text-3xl font-black text-gold-400 font-mono sm:text-4xl">
                  {formatDuration(gigasendSec)}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-300">
                Parallel multi-stream upload to the nearest regional server
              </p>
            </div>

            {/* Secondary Comparison: Standard Cloud Upload */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 label-caps">Standard Cloud Upload</span>
                <div className="mt-3 text-2xl font-bold text-slate-300 font-mono sm:text-3xl">
                  {formatDuration(legacySec)}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Single-stream upload to a distant data center
              </p>
            </div>
          </div>

          {/* Time Saved Highlight */}
          {timeSavedSec > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-slate-300">
              Saves approximately <strong className="text-gold-400 font-mono">{formatDuration(timeSavedSec)}</strong> compared to a standard single-stream cloud upload.
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 text-center">
          <a
            href="/transfer"
            className="btn-gold inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-sm font-bold shadow-xl shadow-gold-500/20 transition sm:w-auto tap-tactile"
          >
            Transfer {fileSizeGB >= 1000 ? `${(fileSizeGB / 1000).toFixed(1)} TB` : `${fileSizeGB} GB`} Now →
          </a>
          <p className="mt-2.5 text-xs text-slate-400 font-mono">
            10 GB free (3-day retention) • Paid plans & credit packs up to 5 TB
          </p>
        </div>
      </div>
    </div>
  );
}

