import React from "react";
import { FiCheckCircle, FiClock, FiShield } from "react-icons/fi";

export default function TrustSignals() {
  const badges = [
    {
      label: "End-to-End Protection",
      detail: "Encrypted in transit and at rest",
      icon: FiShield,
    },
    {
      label: "Global Edge Network",
      detail: "Fast downloads from 335+ cities",
      icon: FiCheckCircle,
    },
    {
      label: "Expiring Download Links",
      detail: "Set custom access windows",
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
