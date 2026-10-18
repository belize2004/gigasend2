"use client"
import ContactForm from '@/components/ContactUs';
import FileList from '@/components/File/FileList';
import { FileUploader } from '@/components/Upload/FileUploader';
import TrustSignals from '@/components/TrustSignals';
import { useFileContext } from '@/context/FileContext';
import { useAuth } from '@/context/useAuth';
import Link from '@/components/compat/Link';
import { useRouter } from '@/components/compat/navigation';
import React, { Suspense, lazy, useState } from 'react';
import {
  FiCloud,
  FiZap,
  FiShield,
  FiUsers,
  FiUpload,
  FiGlobe,
  FiCheck,
  FiArrowRight,
  FiStar,
  // FiTrendingUp,
  FiLock,
  FiClock
} from 'react-icons/fi';
import { brand } from '@/lib/brand';

const TransferPage = lazy(() => import('@/src/components/TransferPage'));

const Homepage = () => {
  const { files } = useFileContext();
  const { auth, loading } = useAuth();
  const router = useRouter();
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [uploadPromptError, setUploadPromptError] = useState("");
  const transferHref = auth ? "/transfer" : "/signup?next=/transfer";

  const handleUploadClick = () => {
    if (!loading && !auth) {
      router.push("/signup?next=/transfer");
      return;
    }

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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-800/80 border border-gold-500/30 text-gold-400 label-caps shadow-lg shadow-ocean-950/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                Zero Bandwidth Fees • 335+ Global Edge Locations
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                Send Massive Files.{" "}
                <span className="text-gold-400">Pay Zero Bandwidth Fees.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-body max-w-2xl">
                Deliver multi-gigabyte and terabyte projects at full speed across 335+ global edge locations—with secure links, real-time tracking, and no cloud egress fees.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href={transferHref}
                  className="w-full sm:w-auto btn-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-gold-500/20 tap-tactile flex items-center justify-center"
                >
                  <FiUpload className="mr-2 text-base" aria-hidden="true" />
                  {auth ? "Send Files" : "Create Free Account"}
                </Link>
                <Link
                  href="/plans"
                  className="w-full sm:w-auto btn-outline-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tap-tactile flex items-center justify-center"
                >
                  View Plans &amp; Pricing
                  <FiArrowRight className="ml-2 text-base" aria-hidden="true" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="apple-subtle-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-gold-400 font-display">5 TB</div>
                  <div className="text-xs text-slate-300 mt-1">Max Transfer Size</div>
                </div>
                <div className="apple-subtle-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-white font-display">256-Bit</div>
                  <div className="text-xs text-slate-300 mt-1">TLS 1.3 &amp; AES-256 Encryption</div>
                </div>
                <div className="apple-subtle-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400 font-display">99.9%</div>
                  <div className="text-xs text-slate-300 mt-1">Global Edge Uptime</div>
                </div>
              </div>
              <div className="pt-2">
                <TrustSignals />
              </div>
            </div>

            {/* Right Content - Interactive Uploader Stage */}
            <div className="relative">
              <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-8 transition-all duration-300">
                <div className="text-center mb-6">
                  <div
                    aria-hidden="true"
                    className="w-16 h-16 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mx-auto mb-4 text-gold-400 shadow-lg shadow-gold-500/10"
                  >
                    <FiCloud className="text-3xl" />
                  </div>
                  <span className="label-caps text-gold-400 text-[11px] block mb-1">
                    Fast, Secure Transfer
                  </span>
                  <h2 className="text-xl font-bold text-white font-display tracking-tight">Send Files or Folders</h2>
                  {!auth && (
                    <p className="mt-2 text-xs font-medium text-gold-400/90">
                      Start free with 10 GB upon creating your account.
                    </p>
                  )}
                </div>

                <FileUploader />
                <div className="mt-5">
                  <FileList />
                </div>

                {uploadPromptError && files.length === 0 && (
                  <p role="alert" className="mt-4 text-center text-xs font-medium text-rose-300">
                    {uploadPromptError}
                  </p>
                )}

                <button
                  onClick={handleUploadClick}
                  className="w-full mt-6 btn-gold py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-gold-500/20 tap-tactile transition-all duration-200"
                >
                  {auth ? "Continue to Transfer" : "Create Account to Send"}
                </button>
              </div>

              {/* Floating elements */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 bg-emerald-500 text-ocean-950 p-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 border border-emerald-300/40"
              >
                <FiShield className="text-lg" />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 bg-gold-500 text-ocean-950 p-3.5 rounded-2xl shadow-xl shadow-gold-500/20 border border-gold-300/40"
              >
                <FiZap className="text-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetrical Edge Infrastructure Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ocean-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Heroic Stat Lockups */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl apple-glass bg-ocean-900/70 border border-white/10 hover:border-gold-500/40 transition-all space-y-2 shadow-xl">
                <p className="text-5xl sm:text-6xl font-extrabold text-gold-400 font-display tracking-tight">335+</p>
                <p className="label-caps text-white text-xs">Global Edge Cities</p>
                <p className="text-xs text-slate-300 pt-1 font-body leading-relaxed">
                  Direct peering at global Internet Exchange Points (IXPs) for unthrottled line-rate downloads.
                </p>
              </div>

              <div className="p-8 rounded-3xl apple-glass bg-ocean-900/70 border border-white/10 hover:border-gold-500/40 transition-all space-y-2 shadow-xl">
                <p className="text-5xl sm:text-6xl font-extrabold text-emerald-400 font-display tracking-tight">&lt; 50 ms</p>
                <p className="label-caps text-white text-xs">Latency to 95% of Global Population</p>
                <p className="text-xs text-slate-300 pt-1 font-body leading-relaxed">
                  Recipient downloads start instantly from the nearest regional data center without cross-continental hops.
                </p>
              </div>
            </div>

            {/* Right: Narrative Authority */}
            <div className="lg:col-span-7 space-y-6">
              <span className="label-caps text-gold-400 text-xs">The Edge Advantage</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                Full-Speed Global Delivery. Without Cloud Bandwidth Fees.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
                Traditional cloud transfer services route files through centralized buckets and pass steep bandwidth markups onto your invoice. {brand.productName} streams data across a global zero-egress edge network—delivering full-speed downloads from 335+ cities while keeping pricing transparent and predictable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl apple-subtle-glass bg-ocean-900/60 border border-white/10 space-y-1.5">
                  <p className="font-bold text-white font-display text-sm flex items-center gap-2">
                    <FiShield className="text-gold-400" aria-hidden="true" /> Enterprise Edge Infrastructure
                  </p>
                  <p className="text-xs text-slate-300 font-body leading-relaxed">
                    TLS 1.3 in transit and AES-256 at rest built on a SOC 2 Type II certified global edge and storage network.
                  </p>
                </div>
                <div className="p-5 rounded-2xl apple-subtle-glass bg-ocean-900/60 border border-white/10 space-y-1.5">
                  <p className="font-bold text-white font-display text-sm flex items-center gap-2">
                    <FiZap className="text-gold-400" aria-hidden="true" /> Reliable Pause &amp; Resume
                  </p>
                  <p className="text-xs text-slate-300 font-body leading-relaxed">
                    Automatically retries interrupted chunks and lets you pause or resume transfers in Safari, Chrome, and Edge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-ocean-900/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="label-caps text-gold-400 text-xs">High-Payload Production Workflows</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Why Choose {brand.productName}?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-body">
              Built for speed, security, and simplicity. Experience fast, reliable large file delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="group apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gold-500/15 border border-gold-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiZap className="text-gold-400 text-2xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-gold-400 transition">Lightning Fast</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">Upload speeds up to 10x faster than traditional services with our parallel multipart edge pipeline.</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Multi-threaded 8x stream uploads</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> 335+ global edge locations</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Resume interrupted transfers</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-emerald-500/15 border border-emerald-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiShield className="text-emerald-400 text-2xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-gold-400 transition">Enterprise-Grade Security</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">Your files are protected with enterprise encryption in transit and at rest with signed download tokens.</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center"><FiCheck className="text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" /> TLS 1.3 &amp; AES-256 encryption</li>
                <li className="flex items-center"><FiCheck className="text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" /> Isolated encrypted object storage</li>
                <li className="flex items-center"><FiCheck className="text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" /> Automatic expiration controls</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gold-500/15 border border-gold-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiUsers className="text-gold-400 text-2xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-gold-400 transition">Team Collaboration</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">Advanced sharing controls and real-time delivery notifications for creative teams and studios.</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> No account required for recipients</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Instant email &amp; link delivery</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Real-time download tracking</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="group apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-sky-500/15 border border-sky-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiGlobe className="text-sky-400 text-2xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-gold-400 transition">Global Edge Access</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">Deliver camera RAW, ProRes masters, and project archives anywhere in the world at full speed.</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> 335+ global edge locations</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Bit-exact uncompressed files</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Mobile &amp; desktop browser ready</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="group apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gold-500/15 border border-gold-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiClock className="text-gold-400 text-2xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-gold-400 transition">Smart Retention</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">Set custom expiration windows, manage active transfers, and keep prepaid credits valid for 12 months.</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Configurable link expiry</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Automatic storage cleanup</li>
                <li className="flex items-center"><FiCheck className="text-gold-400 mr-2.5 shrink-0" aria-hidden="true" /> Multi-file streaming ZIP</li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="group apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-emerald-500/15 border border-emerald-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiLock className="text-emerald-400 text-2xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-gold-400 transition">Advanced Privacy</h3>
              <p className="text-slate-300 text-sm mb-5 leading-relaxed">Complete control over your data with strict privacy standards, passcode protection, and audit trails.</p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-center"><FiCheck className="text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" /> GDPR &amp; SOC 2 compliant edge</li>
                <li className="flex items-center"><FiCheck className="text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" /> Signed non-guessable URLs</li>
                <li className="flex items-center"><FiCheck className="text-emerald-400 mr-2.5 shrink-0" aria-hidden="true" /> Zero ad-tracking or resale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-ocean-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="label-caps text-gold-400 text-xs">Verified Production Teams</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Loved by Teams Worldwide
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 font-body">
              See what studios, editors, and engineering teams say about {brand.productName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Testimonial 1 */}
            <div className="apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4" role="img" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-gold-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-slate-200 mb-6 italic font-body leading-relaxed">
                &quot;{brand.productName} makes large client file delivery feel simple, polished, and secure—without paying bloated cloud egress fees.&quot;
              </p>
              <div className="flex items-center">
                <div aria-hidden="true" className="w-12 h-12 bg-gold-500 text-ocean-950 rounded-full flex items-center justify-center font-extrabold font-display mr-4">
                  MV
                </div>
                <div>
                  <div className="font-bold text-white font-display">Marcus Vance</div>
                  <div className="text-xs text-gold-400">Head of Post-Production, Northlight Studios</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4" role="img" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-gold-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-slate-200 mb-6 italic font-body leading-relaxed">
                &quot;The edge speeds are incredible. We deliver 4K ProRes masters across continents in minutes instead of hours.&quot;
              </p>
              <div className="flex items-center">
                <div aria-hidden="true" className="w-12 h-12 bg-emerald-500 text-ocean-950 rounded-full flex items-center justify-center font-extrabold font-display mr-4">
                  ER
                </div>
                <div>
                  <div className="font-bold text-white font-display">Elena Rostova</div>
                  <div className="text-xs text-gold-400">Senior Colorist, Frame &amp; Signal</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="apple-glass bg-ocean-900/60 border border-white/10 hover:border-gold-500/40 p-8 rounded-3xl shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4" role="img" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-gold-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-slate-200 mb-6 italic font-body leading-relaxed">
                &quot;Finally, a file sharing service that just works. No complicated setup for clients—just drag, drop, and send a direct link.&quot;
              </p>
              <div className="flex items-center">
                <div aria-hidden="true" className="w-12 h-12 bg-ocean-700 text-gold-400 border border-gold-500/40 rounded-full flex items-center justify-center font-extrabold font-display mr-4">
                  AL
                </div>
                <div>
                  <div className="font-bold text-white font-display">Alex Lee</div>
                  <div className="text-xs text-gold-400">DIT &amp; Post-Production Lead, Apex Cinema</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Payload Production Workflows & Engineering Hub Section */}
      <section className="py-24 bg-ocean-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="label-caps text-gold-400 text-xs">Zero-Egress Architecture &amp; Directory</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              High-Payload Production Workflows &amp; Engineering Hub
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed">
              Explore our specialized large file transfer workflows, quota-bypass guides, and technical deep dives built for global edge delivery across 335+ cities.
            </p>
          </div>

          {/* Core Hubs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <a
              href="/directory"
              className="group apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400">All Workflows</span>
                <h3 className="text-lg font-bold text-white font-display mt-1 group-hover:text-gold-400 transition-colors">
                  Transfer Directory
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Browse specialized NLE, camera RAW, CAD/BIM, and quota-bypass hubs.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-gold-400">
                Open Directory <FiArrowRight className="ml-1.5" aria-hidden="true" />
              </span>
            </a>

            <a
              href="/guides"
              className="group apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Deep Dives</span>
                <h3 className="text-lg font-bold text-white font-display mt-1 group-hover:text-gold-400 transition-colors">
                  Engineering Guides
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  TCP throughput physics, zero-egress economics, and multipart upload reliability.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-gold-400">
                Read Guides <FiArrowRight className="ml-1.5" aria-hidden="true" />
              </span>
            </a>

            <a
              href="/compare"
              className="group apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">Benchmarks</span>
                <h3 className="text-lg font-bold text-white font-display mt-1 group-hover:text-gold-400 transition-colors">
                  Compare Providers
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Side-by-side limits and pricing vs WeTransfer, Dropbox, Google Drive &amp; Frame.io.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-gold-400">
                See Comparison <FiArrowRight className="ml-1.5" aria-hidden="true" />
              </span>
            </a>

            <a
              href="/tools/transfer-speed-calculator"
              className="group apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400">Interactive Tool</span>
                <h3 className="text-lg font-bold text-white font-display mt-1 group-hover:text-gold-400 transition-colors">
                  Speed Calculator
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Calculate upload and download times and cloud egress savings from 1 GB to 5 TB.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-gold-400">
                Launch Calculator <FiArrowRight className="ml-1.5" aria-hidden="true" />
              </span>
            </a>

            <a
              href="/plans"
              className="group apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Zero Bandwidth Fees</span>
                <h3 className="text-lg font-bold text-white font-display mt-1 group-hover:text-gold-400 transition-colors">
                  Plans &amp; Pricing
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Start free with 10 GB, or unlock 30 GB to 5 TB transfers with transparent pricing.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-gold-400">
                View Plans <FiArrowRight className="ml-1.5" aria-hidden="true" />
              </span>
            </a>
          </div>

          {/* Popular Workflows & Bypasses + Engineering Guides */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 apple-subtle-glass bg-ocean-900/60 border border-white/10 rounded-3xl p-8 space-y-5">
              <div>
                <span className="label-caps text-gold-400 text-[11px]">Popular Workflows &amp; Quota Bypasses</span>
                <h3 className="text-xl font-bold text-white font-display mt-1">
                  Direct Solutions for Large Payloads &amp; Cloud Limits
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a href="/send-large-files-free" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Send Large Files Free
                </a>
                <a href="/free-large-file-transfer" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Free Large File Transfer
                </a>
                <a href="/wetransfer-alternative" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  WeTransfer Alternative
                </a>
                <a href="/wetransfer-2gb-limit-bypass" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  WeTransfer 2 GB Limit Bypass
                </a>
                <a href="/google-drive-download-quota-exceeded-fix" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Google Drive Quota Exceeded Fix
                </a>
                <a href="/dropbox-transfer-alternative" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Dropbox Transfer Alternative
                </a>
                <a href="/send-large-video-files" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Send Large Video Files
                </a>
                <a href="/transfer-davinci-resolve-project" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Transfer DaVinci Resolve Project
                </a>
                <a href="/send-revit-rvt-bim-models" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Send Revit .RVT BIM Models
                </a>
                <a href="/send-25gb-file" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Send 25 GB File
                </a>
                <a href="/send-100gb-file" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Send 100 GB File
                </a>
                <a href="/send-1tb-file" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Send 1 TB File
                </a>
                <a href="/fastest-way-to-send-large-files" className="px-3.5 py-2 rounded-xl bg-ocean-950/80 border border-white/10 hover:border-gold-500/40 text-xs font-medium text-slate-200 hover:text-gold-400 transition-all">
                  Fastest Way to Send Large Files
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 apple-subtle-glass bg-ocean-900/60 border border-white/10 rounded-3xl p-8 space-y-4">
              <div>
                <span className="label-caps text-emerald-400 text-[11px]">Architecture &amp; Benchmarks</span>
                <h3 className="text-xl font-bold text-white font-display mt-1">
                  Featured Engineering Guides
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="/guides/why-large-file-transfers-are-slow"
                    className="flex items-center justify-between p-3 rounded-xl bg-ocean-950/70 border border-white/10 hover:border-gold-500/40 text-slate-200 hover:text-gold-400 transition-all"
                  >
                    <span>Why Large File Transfers Are Slow (TCP &amp; Peering)</span>
                    <FiArrowRight className="shrink-0 ml-2 text-gold-400" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="/guides/large-file-transfer-cost-calculator"
                    className="flex items-center justify-between p-3 rounded-xl bg-ocean-950/70 border border-white/10 hover:border-gold-500/40 text-slate-200 hover:text-gold-400 transition-all"
                  >
                    <span>Large File Transfer Cost &amp; Zero-Egress Economics</span>
                    <FiArrowRight className="shrink-0 ml-2 text-gold-400" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="/guides/transfer-large-files-without-failed-uploads"
                    className="flex items-center justify-between p-3 rounded-xl bg-ocean-950/70 border border-white/10 hover:border-gold-500/40 text-slate-200 hover:text-gold-400 transition-all"
                  >
                    <span>Transfer Large Files Without Failed Uploads</span>
                    <FiArrowRight className="shrink-0 ml-2 text-gold-400" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="/guides/file-transfer-vs-cloud-storage-vs-media-review"
                    className="flex items-center justify-between p-3 rounded-xl bg-ocean-950/70 border border-white/10 hover:border-gold-500/40 text-slate-200 hover:text-gold-400 transition-all"
                  >
                    <span>File Transfer vs Cloud Storage vs Media Review</span>
                    <FiArrowRight className="shrink-0 ml-2 text-gold-400" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="/guides/send-large-files-without-filling-computer"
                    className="flex items-center justify-between p-3 rounded-xl bg-ocean-950/70 border border-white/10 hover:border-gold-500/40 text-slate-200 hover:text-gold-400 transition-all"
                  >
                    <span>Send Large Files Without Filling Local Disk</span>
                    <FiArrowRight className="shrink-0 ml-2 text-gold-400" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-ocean-900 to-ocean-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="label-caps text-gold-400 text-xs">Zero Bandwidth Fees • Fast Browser Transfers</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Ready to Send Large Files Fast?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-body">
            Deliver multi-gigabyte photo, video, and production packages directly from your browser at full speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/transfer"
              className="btn-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-gold-500/20 tap-tactile flex items-center justify-center"
            >
              <FiUpload className="mr-2 text-base" aria-hidden="true" />
              Start Free Transfer
            </Link>
            <Link
              href="/plans"
              className="btn-outline-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tap-tactile flex items-center justify-center"
            >
              View Pricing Plans
              <FiArrowRight className="ml-2 text-base" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

