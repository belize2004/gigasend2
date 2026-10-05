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
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
      <div className="border-b border-slate-200 pb-6 text-center">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800">
          WAN Transfer Benchmark
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Large File Transfer Speed Calculator
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Estimate realistic upload and delivery durations based on your WAN bandwidth and file payload.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* File Size Control */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="file-size-slider" className="text-base font-bold text-slate-900">
              1. Payload Size: <span className="text-blue-600 font-extrabold">{fileSizeGB >= 1000 ? `${(fileSizeGB / 1000).toFixed(1)} TB` : `${fileSizeGB} GB`}</span>
            </label>
            <span className="text-xs text-slate-500">1 GB to 2,000 GB</span>
          </div>
          <input
            id="file-size-slider"
            type="range"
            min="1"
            max="2000"
            step="1"
            value={fileSizeGB}
            onChange={(e) => setFileSizeGB(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {sizePresets.map((preset) => (
              <button
                key={preset.val}
                type="button"
                onClick={() => setFileSizeGB(preset.val)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                  fileSizeGB === preset.val
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-blue-50"
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
            <label htmlFor="bandwidth-slider" className="text-base font-bold text-slate-900">
              2. Upload Connection Speed:{" "}
              <span className="text-blue-600 font-extrabold">
                {bandwidthMbps >= 1000 ? `${(bandwidthMbps / 1000).toFixed(1)} Gbps` : `${bandwidthMbps} Mbps`}
              </span>
            </label>
            <span className="text-xs text-slate-500">10 Mbps to 10 Gbps</span>
          </div>
          <input
            id="bandwidth-slider"
            type="range"
            min="10"
            max="10000"
            step="10"
            value={bandwidthMbps}
            onChange={(e) => setBandwidthMbps(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {speedPresets.map((preset) => (
              <button
                key={preset.val}
                type="button"
                onClick={() => setBandwidthMbps(preset.val)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                  bandwidthMbps === preset.val
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Comparison Grid */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6">
          <div className="flex flex-col justify-between gap-4 border-b border-blue-100 pb-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">Calculated Results</span>
              <h3 className="text-xl font-bold text-slate-900">Transfer Time Comparison</h3>
            </div>
            <div className="rounded-lg bg-emerald-100 px-3 py-1.5 text-center text-xs font-bold text-emerald-800 border border-emerald-200">
              {percentFaster}% Faster via Edge Multi-Part
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Gigasend Edge */}
            <div className="rounded-lg border border-blue-300 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">✓</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Gigasend Edge Multi-Part (Cloudflare Anycast)</h4>
                    <p className="text-xs text-slate-500">Direct chunking across 335+ edge PoPs with parallel TCP streams</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-blue-700 sm:text-xl">{formatDuration(gigasendSec)}</span>
                  <div className="text-xs text-slate-500">~92% line efficiency</div>
                </div>
              </div>
            </div>

            {/* Legacy Cloud (Single Region) */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">•</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Legacy Cloud Storage (AWS S3 / WeTransfer)</h4>
                    <p className="text-xs text-slate-500">High round-trip latency & TCP slow-start window throttling</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-slate-700 sm:text-lg">{formatDuration(legacySec)}</span>
                  <div className="text-xs text-slate-400">~65% efficiency</div>
                </div>
              </div>
            </div>

            {/* Theoretical Line Rate */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Theoretical Physics Maximum (100% wire speed):</span>
                <span className="font-semibold text-slate-800">{formatDuration(Math.round(theoreticalSec))}</span>
              </div>
            </div>
          </div>

          {/* Time Saved Highlight */}
          {timeSavedSec > 0 && (
            <div className="mt-4 text-center text-xs text-slate-600">
              ⚡ Uploading via Gigasend saves you roughly{" "}
              <strong className="text-slate-900">{formatDuration(timeSavedSec)}</strong> compared to single-region legacy uploads.
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 text-center">
          <a
            href="/transfer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl sm:w-auto"
          >
            Transfer {fileSizeGB >= 1000 ? `${(fileSizeGB / 1000).toFixed(1)} TB` : `${fileSizeGB} GB`} with Gigasend Now →
          </a>
          <p className="mt-2 text-xs text-slate-500">
            Free up to 10GB • No software install • In-browser parallel stream
          </p>
        </div>
      </div>
    </div>
  );
}
