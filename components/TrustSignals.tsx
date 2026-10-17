import React from "react";
import { FiCheckCircle, FiClock, FiShield } from "react-icons/fi";

export default function TrustSignals() {
  const badges = [
    {
      label: "256-bit TLS encryption",
      detail: "Secure uploads and downloads",
      icon: FiShield,
    },
    {
      label: "Cloudflare-backed uptime",
      detail: "Built on a global edge network",
      icon: FiCheckCircle,
    },
    {
      label: "Expiring download links",
      detail: "Control access after sending",
      icon: FiClock,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {badges.map(({ label, detail, icon: Icon }) => (
        <div
          key={label}
          className="apple-glass flex items-center gap-3 rounded-2xl border border-white/10 bg-ocean-900/80 px-4 py-3 text-left shadow-lg"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30">
            <Icon className="text-xl" />
          </div>
          <div>
            <div className="text-sm font-bold text-white font-display">{label}</div>
            <div className="text-xs font-medium text-slate-300">{detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
