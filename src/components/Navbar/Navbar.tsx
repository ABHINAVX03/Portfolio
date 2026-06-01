"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const shouldUseDark = storedTheme ? storedTheme === "dark" : true;
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <nav role="navigation"
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          isScrolled
            ? "border-black/10 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/15 dark:bg-[#05070f]/70"
            : "border-black/5 bg-white/35 backdrop-blur-lg dark:border-white/10 dark:bg-[#05070f]/45"
        }`}
        aria-label="Main navigation"
      >
        <Link
          href="#home"
          className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c470]"
          aria-label="Go to home section"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-black/15 bg-black/5 text-sm font-bold text-slate-800 dark:border-white/20 dark:bg-white/5 dark:text-white">
            AG
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Abhinav Gupta</p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/70">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c470] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c470]" />
              </span>
              Available for opportunities
            </div>
          </div>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-700 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8EF7] dark:text-white/80 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-slate-800 transition hover:bg-black/10 hover:text-[#22c470] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-[#22c470] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c470]"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <a
            href="/resume/Resume.pdf"
            download
            className="hidden rounded-xl bg-[#22c470] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#32d983] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c470] md:inline-block"
            aria-label="Download resume"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-slate-800 md:hidden dark:border-white/15 dark:bg-white/5 dark:text-white" aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-black/10 bg-white/95 p-4 backdrop-blur-xl dark:border-white/15 dark:bg-[#05070f]/95 md:hidden"
          >
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-100 hover:text-slate-950 dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="/resume/Resume.pdf"
              download
              className="mt-3 block rounded-lg bg-[#22c470] px-4 py-2 text-center text-sm font-semibold text-black hover:bg-[#32d983]"
              aria-label="Download resume from mobile menu"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
