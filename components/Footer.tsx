"use client";
import React from "react";
import { brand } from "@/lib/brand";

const productLinks = [
  { href: "/transfer", label: "Send Files" },
  { href: "/plans", label: "Pricing & Plans" },
  { href: "/tools/transfer-speed-calculator", label: "Speed Calculator" },
  { href: "/directory", label: "All Workflows" },
];

const compareLinks = [
  { href: "/wetransfer-alternative", label: `${brand.productName} vs. WeTransfer` },
  { href: "/send-large-files-without-dropbox", label: `${brand.productName} vs. Dropbox` },
  { href: "/send-large-files-without-google-drive", label: `${brand.productName} vs. Google Drive` },
  { href: "/frame-io-alternative-for-file-delivery", label: `${brand.productName} vs. Frame.io` },
  { href: "/compare", label: "Full Comparison" },
];

const resourceLinks = [
  { href: "/guides", label: "Creator Guides" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Help & Support" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const languageLinks = [
  { href: "/", label: "English" },
  { href: "/es", label: "Español" },
  { href: "/pt", label: "Português (Brasil)" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 border-t border-white/10 text-slate-300 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        {/* Top Brand Lockup & Calm Tagline */}
        <div className="pb-10 border-b border-white/10 space-y-3">
          <a href="/" className="inline-flex items-center gap-3 group">
            <div
              aria-hidden="true"
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gold-500 to-amber-300 flex items-center justify-center text-ocean-950 font-black font-display text-base shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300"
            >
              G
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-gold-400 transition-colors">
              {brand.productName}
            </span>
          </a>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            Fast, private file delivery up to 5 TB. No recipient accounts required.
          </p>
        </div>

        {/* 4 Curated Columns (~16 Links Total) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-white/10">
          {/* Column 1: Product */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Product
            </h3>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-gold-400 transition-colors duration-150 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Compare */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Compare
            </h3>
            <ul className="space-y-2.5 text-sm">
              {compareLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-gold-400 transition-colors duration-150 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-gold-400 transition-colors duration-150 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Languages */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Languages
            </h3>
            <ul className="space-y-2.5 text-sm">
              {languageLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-300 hover:text-gold-400 transition-colors duration-150 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Simplified Bottom Legal & Contact Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p suppressHydrationWarning>
            &copy; {year} {brand.productName}. {brand.footerText}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="/terms" className="hover:text-gold-400 transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy
            </a>
            <a href={`mailto:${brand.contactEmail}`} className="hover:text-gold-400 transition-colors">
              {brand.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
