"use client";
import { useAuth } from '@/context/useAuth';
import React, { useEffect, useState } from 'react';
import {
  FiMenu,
  FiX,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from 'react-icons/fi';
import { brand } from '@/lib/brand';
import { getLanguageSwitchPaths } from '@/src/data/languageSwitchPaths';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState('/');
  const { handleLogout, auth } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const { enPath, esPath, ptPath, isEs, isPt } = getLanguageSwitchPaths(pathname);

  const setLangCookie = (lang: 'en' | 'es' | 'pt') => {
    if (typeof document !== 'undefined') {
      document.cookie = `gigasend_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-ocean-950/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Apple HIG Brand Lockup */}
          <a
            href="/"
            className="flex items-center gap-3 group tap-tactile text-left"
          >
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

          {/* Desktop Navigation — 4 icon-free links */}
          <div className="hidden lg:flex items-center space-x-7">
            <a
              href="/transfer"
              className="text-sm text-slate-300 hover:text-gold-400 transition-colors duration-200 font-medium tap-tactile"
            >
              Send Files
            </a>
            <a
              href="/plans"
              className="text-sm text-slate-300 hover:text-gold-400 transition-colors duration-200 font-medium tap-tactile"
            >
              Pricing
            </a>
            <a
              href="/guides"
              className="text-sm text-slate-300 hover:text-gold-400 transition-colors duration-200 font-medium tap-tactile"
            >
              Guides
            </a>
            <a
              href="/contact"
              className="text-sm text-slate-300 hover:text-gold-400 transition-colors duration-200 font-medium tap-tactile"
            >
              Support
            </a>

            {/* Conditional navigation item for signed-in users */}
            {auth && (
              <a
                href="/dashboard"
                className="text-sm text-slate-300 hover:text-gold-400 transition-colors duration-200 font-medium tap-tactile"
              >
                Dashboard
              </a>
            )}
          </div>

          {/* Language Toggle (EN | ES | PT) + Auth Links / Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <div
              className="inline-flex min-h-[40px] items-center rounded-xl border border-white/15 bg-ocean-900/90 p-1 text-xs font-mono"
              aria-label="Language switcher"
            >
              <a
                href={`${enPath}?lang=en`}
                onClick={() => setLangCookie('en')}
                className={`inline-flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg px-2 transition-colors ${!isPt && !isEs ? 'bg-gold-500/15 font-bold text-gold-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                aria-current={!isPt && !isEs ? 'true' : undefined}
                aria-label="English"
                title="English"
              >
                EN
              </a>
              <a
                href={`${esPath}?lang=es`}
                onClick={() => setLangCookie('es')}
                className={`inline-flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg px-2 transition-colors ${isEs ? 'bg-gold-500/15 font-bold text-gold-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                aria-current={isEs ? 'true' : undefined}
                aria-label="Español"
                title="Español"
              >
                ES
              </a>
              <a
                href={`${ptPath}?lang=pt`}
                onClick={() => setLangCookie('pt')}
                className={`inline-flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg px-2 transition-colors ${isPt ? 'bg-gold-500/15 font-bold text-gold-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                aria-current={isPt ? 'true' : undefined}
                aria-label="Português"
                title="Português"
              >
                PT
              </a>
            </div>
            {auth ? (
              <button
                onClick={handleLogout}
                className="btn-outline-gold px-4 py-2 rounded-xl text-xs tap-tactile"
              >
                <FiLogOut className="mr-1.5 text-sm" aria-hidden="true" />
                Sign Out
              </button>
            ) : (
              <>
                <a
                  href="/signin"
                  className="flex items-center px-3.5 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 font-medium tap-tactile"
                >
                  <FiLogIn className="mr-1.5 text-gold-400" aria-hidden="true" />
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="btn-gold text-ocean-950 px-4 py-2 rounded-xl text-xs shadow-md shadow-gold-500/15 tap-tactile flex items-center"
                >
                  <FiUserPlus className="mr-1.5 text-sm" aria-hidden="true" />
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button + EN | ES | PT toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <div
              className="inline-flex min-h-[40px] items-center rounded-xl border border-white/15 bg-ocean-900/90 p-1 text-[11px] font-mono"
              aria-label="Language switcher"
            >
              <a
                href={`${enPath}?lang=en`}
                onClick={() => setLangCookie('en')}
                className={`inline-flex min-h-[32px] min-w-[30px] items-center justify-center rounded-lg px-1.5 ${!isPt && !isEs ? 'bg-gold-500/15 font-bold text-gold-400' : 'text-slate-300 hover:text-white'}`}
                aria-current={!isPt && !isEs ? 'true' : undefined}
                aria-label="English"
                title="English"
              >
                EN
              </a>
              <a
                href={`${esPath}?lang=es`}
                onClick={() => setLangCookie('es')}
                className={`inline-flex min-h-[32px] min-w-[30px] items-center justify-center rounded-lg px-1.5 ${isEs ? 'bg-gold-500/15 font-bold text-gold-400' : 'text-slate-300 hover:text-white'}`}
                aria-current={isEs ? 'true' : undefined}
                aria-label="Español"
                title="Español"
              >
                ES
              </a>
              <a
                href={`${ptPath}?lang=pt`}
                onClick={() => setLangCookie('pt')}
                className={`inline-flex min-h-[32px] min-w-[30px] items-center justify-center rounded-lg px-1.5 ${isPt ? 'bg-gold-500/15 font-bold text-gold-400' : 'text-slate-300 hover:text-white'}`}
                aria-current={isPt ? 'true' : undefined}
                aria-label="Português"
                title="Português"
              >
                PT
              </a>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-slate-300 hover:text-gold-400 hover:bg-white/5 border border-white/10 transition-colors duration-200 tap-tactile"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu — 4 icon-free links */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-3 pt-3 pb-5 space-y-1.5 bg-ocean-950/95 backdrop-blur-2xl border-t border-white/10">
            <a
              href="/transfer"
              className="w-full block text-slate-300 hover:text-gold-400 hover:bg-white/5 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium tap-tactile"
            >
              Send Files
            </a>
            <a
              href="/plans"
              className="w-full block text-slate-300 hover:text-gold-400 hover:bg-white/5 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium tap-tactile"
            >
              Pricing
            </a>
            <a
              href="/guides"
              className="w-full block text-slate-300 hover:text-gold-400 hover:bg-white/5 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium tap-tactile"
            >
              Guides
            </a>
            <a
              href="/contact"
              className="w-full block text-slate-300 hover:text-gold-400 hover:bg-white/5 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium tap-tactile"
            >
              Support
            </a>

            {/* Conditional mobile navigation item */}
            {auth && (
              <a
                href="/dashboard"
                className="w-full block text-slate-300 hover:text-gold-400 hover:bg-white/5 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium tap-tactile"
              >
                Dashboard
              </a>
            )}

            {/* Mobile Auth Links / Buttons */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {auth ? (
                <button
                  onClick={handleLogout}
                  className="w-full btn-outline-gold px-4 py-3 rounded-xl text-xs tap-tactile"
                >
                  <FiLogOut className="mr-2 text-sm" aria-hidden="true" />
                  Sign Out
                </button>
              ) : (
                <>
                  <a
                    href="/signin"
                    className="w-full flex items-center justify-center text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-3 rounded-xl transition-all duration-200 font-medium tap-tactile"
                  >
                    <FiLogIn className="mr-2 text-gold-400" aria-hidden="true" />
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="w-full btn-gold text-ocean-950 px-4 py-3 rounded-xl text-xs shadow-md shadow-gold-500/15 tap-tactile flex items-center justify-center"
                  >
                    <FiUserPlus className="mr-2 text-sm" aria-hidden="true" />
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
