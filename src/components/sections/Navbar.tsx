"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Magnetic from "../ui/Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const mobileNavLinks = [
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
    { name: "Start Project", href: "#contact" },
  ];

  // Header slide-down variant for page load sequence
  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
    }
  };

  // Mobile overlay variants — slide down + fade
  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : "-8%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.01 }
        : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : "-8%",
      transition: shouldReduceMotion
        ? { duration: 0.01 }
        : { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Staggered link reveal inside the overlay
  const linkContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
    exit: {},
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.01 }
        : { type: "spring", stiffness: 100, damping: 14 },
    },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -10, transition: { duration: 0.15 } },
  };

  return (
    <>
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-500 rounded-full border border-neutral-900/[0.06] dark:border-neutral-50/[0.06] backdrop-blur-xl ${
          scrolled 
            ? "py-3 px-6 bg-neutral-50/70 dark:bg-[#09090b]/75 shadow-lg shadow-black/5" 
            : "py-4 px-8 bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="group flex items-center gap-2 font-display text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-1"
            aria-label="Bali Kumar Wad - Home"
          >
            <span>Bali Kumar Wad</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-500 group-hover:scale-150 group-hover:bg-violet-600 dark:group-hover:bg-violet-400" />
          </a>

          {/* Desktop menu links with layout-linked sliding highlight */}
          <nav 
            className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 relative"
            aria-label="Main Navigation"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="relative py-2 px-3 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded"
                onMouseEnter={() => setHoveredLink(link.name)}
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredLink === link.name && !shouldReduceMotion && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-indigo-600 dark:bg-indigo-400"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action controls (CTA & Theme Toggle & Mobile Hamburger) */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA — hidden on mobile */}
            <Magnetic range={60} strength={0.35}>
              <a
                href="#contact"
                className="hidden md:flex group relative overflow-hidden items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-widest rounded-full border border-neutral-900/10 dark:border-neutral-50/10 text-neutral-900 dark:text-neutral-50 hover:text-white dark:hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 transition-all duration-300"
                aria-label="Start a project with Bali"
              >
                <span className="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Start Project</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-500 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900" />
                </span>
              </a>
            </Magnetic>

            {/* Theme Toggle Button with Hydration Mismatch Safety */}
            <Magnetic range={40} strength={0.3}>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full border border-neutral-900/10 dark:border-neutral-50/10 hover:border-indigo-600/40 dark:hover:border-indigo-400/40 bg-neutral-900/[0.02] dark:bg-neutral-50/[0.02] text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 transition-all duration-300 cursor-pointer"
                aria-label={mounted ? (resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme") : "Loading theme option"}
                aria-live="polite"
              >
                {mounted ? (
                  resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />
                ) : (
                  <div className="w-[15px] h-[15px] rounded-full border border-neutral-900/20 dark:border-neutral-50/20 opacity-50 animate-pulse" />
                )}
              </button>
            </Magnetic>

            {/* Mobile Hamburger Button — visible below md */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-full border border-neutral-900/10 dark:border-neutral-50/10 hover:border-indigo-600/40 dark:hover:border-indigo-400/40 bg-neutral-900/[0.02] dark:bg-neutral-50/[0.02] text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 transition-all duration-300 cursor-pointer relative z-[60]"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay — Fullscreen slide-down sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-neutral-50/95 dark:bg-[#09090b]/95 backdrop-blur-2xl"
          >
            <nav
              className="flex-grow flex flex-col items-center justify-center gap-2"
              aria-label="Mobile Navigation"
            >
              <motion.ul
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center gap-2"
              >
                {mobileNavLinks.map((link) => (
                  <motion.li key={link.name} variants={linkItemVariants}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-4 text-2xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded-lg"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Mobile overlay footer accent */}
            <div className="pb-12 flex justify-center">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">
                Bali Kumar Wad
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
