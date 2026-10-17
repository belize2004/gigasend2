"use client";
import React from "react";
import { brand } from "@/lib/brand";
import { FiShield, FiZap, FiGlobe, FiArrowUpRight } from "react-icons/fi";

const coreLinks = [
  { href: "/", label: "Home" },
  { href: "/transfer", label: "Start File Transfer" },
  { href: "/plans", label: "Plans & PAYG Pricing" },
  { href: "/compare", label: "Provider Comparison" },
  { href: "/directory", label: "46-Workflow Directory" },
  { href: "/guides", label: "Engineering Guides" },
  { href: "/tools/transfer-speed-calculator", label: "Transfer Speed Calculator" },
  { href: "/blogs", label: "Engineering Blog" },
  { href: "/contact", label: "Contact Support" },
  { href: "/signin", label: "Sign In" },
  { href: "/signup", label: "Create Free Account" },
];

const quotaBypassLinks = [
  { href: "/wetransfer-alternative", label: "WeTransfer Alternative" },
  { href: "/wetransfer-2gb-limit-bypass", label: "WeTransfer 2GB Limit Bypass" },
  { href: "/dropbox-transfer-alternative", label: "Dropbox Transfer Alternative" },
  { href: "/dropbox-file-size-limit-bypass", label: "Dropbox File Size Limit Bypass" },
  { href: "/google-drive-download-quota-exceeded-fix", label: "Google Drive Quota Exceeded Fix" },
  { href: "/email-attachment-too-large-alternative", label: "Email Attachment Too Large Fix" },
  { href: "/send-large-files-free", label: "Send Large Files Free" },
  { href: "/free-large-file-transfer", label: "Free Large File Transfer" },
];

const proWorkflowLinks = [
  { href: "/send-large-video-files", label: "Send Large Video Files" },
  { href: "/transfer-davinci-resolve-project", label: "Transfer DaVinci Resolve Project" },
  { href: "/transfer-premiere-pro-project", label: "Transfer Premiere Pro Project" },
  { href: "/share-final-cut-pro-fcpbundle", label: "Share Final Cut Pro .fcpbundle" },
  { href: "/send-braw-video-files", label: "Send Blackmagic BRAW Footage" },
  { href: "/transfer-r3d-raw-footage", label: "Transfer RED R3D RAW Footage" },
  { href: "/deliver-arri-raw-footage", label: "Deliver ARRI RAW Footage" },
  { href: "/send-revit-rvt-bim-models", label: "Send Revit .RVT & BIM Models" },
  { href: "/how-to-transfer-unreal-engine-project", label: "Transfer Unreal Engine 5 Project" },
];

const payloadAndGuidesLinks = [
  { href: "/send-5gb-file-free", label: "Send 5GB File Free" },
  { href: "/send-10gb-file-free", label: "Send 10GB File Free" },
  { href: "/send-25gb-file", label: "Send 25GB File Online" },
  { href: "/send-50gb-file", label: "Send 50GB File Online" },
  { href: "/send-100gb-file", label: "Send 100GB File Online" },
  { href: "/send-500gb-file", label: "Send 500GB File Online" },
  { href: "/send-1tb-file", label: "Send 1TB File Online" },
  { href: "/send-2tb-file", label: "Send 2TB File Online" },
  { href: "/guides/why-large-file-transfers-are-slow", label: "Guide: Why File Transfers Are Slow" },
  { href: "/guides/large-file-transfer-cost-calculator", label: "Guide: Cloud Egress Cost Breakdown" },
  { href: "/guides/transfer-large-files-without-failed-uploads", label: "Guide: Prevent Failed Uploads" },
  { href: "/guides/file-transfer-vs-cloud-storage-vs-media-review", label: "Guide: Transfer vs Storage vs Review" },
  { href: "/guides/send-large-files-without-filling-computer", label: "Guide: Zero Local Disk Sync" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 border-t border-white/10 text-slate-300 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Brand & Architecture Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <a href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gold-500 to-amber-300 flex items-center justify-center text-ocean-950 font-black font-display text-base shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
                G
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-gold-400 transition-colors">
                {brand.productName}
              </span>
            </a>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {brand.description} Deliver 5GB to 2TB+ media packages, camera RAW, and CAD/BIM archives with 8x parallel multipart streaming and zero cloud egress markups.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <FiShield className="text-sm" /> TLS 1.3 &amp; AES-256-GCM
              </span>
              <span className="inline-flex items-center gap-1.5 text-gold-400 font-medium">
                <FiZap className="text-sm" /> 8x Parallel Multipart Ingest
              </span>
              <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                <FiGlobe className="text-sm" /> 335+ Anycast Edge PoPs
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-wrap lg:justify-end gap-3">
            <a
              href="/directory"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ocean-900/90 border border-white/10 hover:border-gold-500/40 text-xs font-semibold text-white hover:text-gold-400 transition-all"
            >
              Browse All 46 Transfer Workflows <FiArrowUpRight />
            </a>
            <a
              href="/tools/transfer-speed-calculator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ocean-900/90 border border-white/10 hover:border-gold-500/40 text-xs font-semibold text-white hover:text-gold-400 transition-all"
            >
              Transfer Speed &amp; Egress Calculator <FiArrowUpRight />
            </a>
            <a
              href="/guides"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ocean-900/90 border border-white/10 hover:border-gold-500/40 text-xs font-semibold text-white hover:text-gold-400 transition-all"
            >
              Engineering Guides <FiArrowUpRight />
            </a>
          </div>
        </div>

        {/* 4-Column SEO Hub-and-Spoke Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-white/10">
          {/* Column 1: Brand & Core Platform */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Brand &amp; Core Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              {coreLinks.map((item) => (
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

          {/* Column 2: Quota Bypass & Alternatives */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Quota Bypass &amp; Alternatives
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quotaBypassLinks.map((item) => (
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

          {/* Column 3: Pro Media & CAD Workflows */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Pro Media &amp; CAD Workflows
            </h3>
            <ul className="space-y-2.5 text-sm">
              {proWorkflowLinks.map((item) => (
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

          {/* Column 4: Payload Sizes & Engineering Guides */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-display mb-4">
              Payload Sizes &amp; Engineering Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              {payloadAndGuidesLinks.map((item) => (
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

        {/* Bottom Legal & Contact Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {year} {brand.productName}. {brand.footerText}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="/directory" className="hover:text-gold-400 transition-colors">
              All 46 Workflows
            </a>
            <a href="/guides" className="hover:text-gold-400 transition-colors">
              Architecture Guides
            </a>
            <a href="/compare" className="hover:text-gold-400 transition-colors">
              Compare Providers
            </a>
            <a href="/plans" className="hover:text-gold-400 transition-colors">
              Pricing
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
