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
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon className="text-xl" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{label}</div>
            <div className="text-xs font-medium text-gray-500">{detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
