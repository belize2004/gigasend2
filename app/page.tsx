"use client"
import FileList from '@/components/File/FileList';
import { FileUploader } from '@/components/Upload/FileUploader';
import { useFileContext } from '@/context/FileContext';
import Link from '@/components/compat/Link';
import React, { Suspense, lazy, useState } from 'react';
import {
  FiZap,
  FiGlobe,
  FiArrowRight,
  FiStar,
  FiCreditCard,
} from 'react-icons/fi';
import { brand } from '@/lib/brand';

const TransferPage = lazy(() => import('@/src/components/TransferPage'));

const Homepage = () => {
  const { files } = useFileContext();
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [uploadPromptError, setUploadPromptError] = useState("");

  const handleUploadClick = () => {
    if (files.length === 0) {
      setUploadPromptError("Select a file or folder to continue.");
      return;
    }

    setUploadPromptError("");
    setShowTransferForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showTransferForm) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-ocean-950 text-slate-100 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-ocean-800 border-t-gold-500 animate-spin" />
            <p className="text-slate-300 font-medium font-body">Preparing your transfer…</p>
          </div>
        </div>
      }>
        <TransferPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 font-body">

      {/* Section 1: Hero — Immediate Action, Zero Clutter */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-950 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: 3 Calm,Focused Elements */}
            <div className="lg:col-span-6 text-left space-y-6">
              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.06]">
                Send large files.{" "}
                <span className="text-gold-400 block sm:inline">Simply.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-body max-w-xl">
                Share up to 10 GB free—or up to 5 TB—with a link anyone can download in a click. No compression. No recipient sign-in required.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
                <Link
                  href="/transfer"
                  className="w-full sm:w-auto btn-gold px-7 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/15 tap-tactile flex items-center justify-center"
                >
                  Send a File
                </Link>
                <Link
                  href="/plans"
                  className="w-full sm:w-auto btn-outline-gold px-7 py-3.5 rounded-xl text-sm font-bold tap-tactile flex items-center justify-center"
                >
                  View Plans
                </Link>
              </div>

              <p className="pt-2 text-xs sm:text-sm font-medium text-slate-400">
                10 GB free &middot; Up to 5 TB per transfer &middot; Encrypted end to end
              </p>
            </div>

            {/* Right Column: Single Clean Drop Zone */}
            <div className="lg:col-span-6">
              <div className="apple-glass bg-ocean-900/80 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
                <FileUploader />

                {files.length > 0 && (
                  <div className="mt-5">
                    <FileList />
                  </div>
                )}

                {uploadPromptError && files.length === 0 && (
                  <p role="alert" className="mt-4 text-center text-xs font-medium text-rose-300">
                    {uploadPromptError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="w-full mt-5 btn-gold py-3.5 px-4 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/15 tap-tactile transition-all duration-200"
                >
                  {files.length > 0
                    ? `Continue with ${files.length} ${files.length === 1 ? "File" : "Files"}`
                    : "Continue"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Three Simple Pillars */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ocean-950 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Built for the files email and cloud drives can&rsquo;t handle.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="apple-glass bg-ocean-900/60 border border-white/10 p-8 rounded-3xl space-y-3">
              <div className="bg-gold-500/15 border border-gold-500/30 w-12 h-12 rounded-2xl flex items-center justify-center text-gold-400">
                <FiGlobe className="text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Fast from Anywhere</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Downloads start right away from the nearest local server across 335+ cities worldwide.
              </p>
            </div>

            <div className="apple-glass bg-ocean-900/60 border border-white/10 p-8 rounded-3xl space-y-3">
              <div className="bg-emerald-500/15 border border-emerald-500/30 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400">
                <FiZap className="text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Reliable on Any Connection</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Transfers pause and resume automatically if your Wi-Fi drops—so you never start over at 90%.
              </p>
            </div>

            <div className="apple-glass bg-ocean-900/60 border border-white/10 p-8 rounded-3xl space-y-3">
              <div className="bg-sky-500/15 border border-sky-500/30 w-12 h-12 rounded-2xl flex items-center justify-center text-sky-400">
                <FiCreditCard className="text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Pay Only for What You Need</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Start with 10 GB free, or send up to 5 TB with simple credit packs and monthly plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Social Proof ("Trusted by Creative Teams") */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ocean-900/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Trusted by Creative Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="apple-glass bg-ocean-900/60 border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4" role="img" aria-label="Rated 5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-gold-400 fill-current text-sm" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-200 mb-6 font-body text-sm leading-relaxed">
                  &ldquo;{brand.productName} makes large client deliveries feel effortless, fast, and reliable.&rdquo;
                </p>
              </div>
              <div>
                <div className="font-bold text-white font-display text-sm">Marcus Vance</div>
                <div className="text-xs text-slate-400">Head of Post-Production, Northlight Studios</div>
              </div>
            </div>

            <div className="apple-glass bg-ocean-900/60 border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4" role="img" aria-label="Rated 5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-gold-400 fill-current text-sm" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-200 mb-6 font-body text-sm leading-relaxed">
                  &ldquo;We deliver 4K ProRes masters across continents in minutes instead of hours.&rdquo;
                </p>
              </div>
              <div>
                <div className="font-bold text-white font-display text-sm">Elena Rostova</div>
                <div className="text-xs text-slate-400">Senior Colorist, Frame &amp; Signal</div>
              </div>
            </div>

            <div className="apple-glass bg-ocean-900/60 border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4" role="img" aria-label="Rated 5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-gold-400 fill-current text-sm" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-200 mb-6 font-body text-sm leading-relaxed">
                  &ldquo;No complicated setup for clients—just drag, drop, and send a direct link.&rdquo;
                </p>
              </div>
              <div>
                <div className="font-bold text-white font-display text-sm">Alex Lee</div>
                <div className="text-xs text-slate-400">DIT &amp; Post-Production Lead, Apex Cinema</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Focused Closing CTA + Quiet Resource Strip */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ocean-950 to-ocean-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Ready to send?
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto font-body">
            Share multi-gigabyte video, photo, and project files directly from your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
            <Link
              href="/transfer"
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/15 tap-tactile flex items-center justify-center"
            >
              Send a File
            </Link>
            <Link
              href="/plans"
              className="btn-outline-gold px-8 py-3.5 rounded-xl text-sm font-bold tap-tactile flex items-center justify-center"
            >
              View Plans
            </Link>
          </div>

          {/* Quiet 4-Link Resource Strip */}
          <div className="pt-12 mt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-400">
            <a href="/compare" className="hover:text-gold-400 transition-colors inline-flex items-center gap-1">
              Compare Providers <FiArrowRight className="text-xs" aria-hidden="true" />
            </a>
            <a href="/tools/transfer-speed-calculator" className="hover:text-gold-400 transition-colors inline-flex items-center gap-1">
              Speed Calculator <FiArrowRight className="text-xs" aria-hidden="true" />
            </a>
            <a href="/guides" className="hover:text-gold-400 transition-colors inline-flex items-center gap-1">
              Transfer Guides <FiArrowRight className="text-xs" aria-hidden="true" />
            </a>
            <a href="/directory" className="hover:text-gold-400 transition-colors inline-flex items-center gap-1">
              All Workflows <FiArrowRight className="text-xs" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Homepage;
