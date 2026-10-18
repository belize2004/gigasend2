import React from "react";
import { FiCheckCircle, FiClock, FiShield } from "react-icons/fi";

export default function TrustSignals() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-slate-300">
      <span className="inline-flex items-center gap-1.5">
        <FiShield className="text-gold-400 shrink-0" aria-hidden="true" />
        Encrypted in transit &amp; at rest
      </span>
      <span className="text-slate-500" aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1.5">
        <FiClock className="text-gold-400 shrink-0" aria-hidden="true" />
        Expiring share links
      </span>
      <span className="text-slate-500" aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1.5">
        <FiCheckCircle className="text-gold-400 shrink-0" aria-hidden="true" />
        No recipient sign-in required
      </span>
    </div>
  );
}
