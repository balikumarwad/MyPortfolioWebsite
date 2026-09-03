"use client";

import React from "react";
import Magnetic from "../ui/Magnetic";
import DhakaPattern from "../ui/DhakaPattern";
import { Github, Linkedin, FileText, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative py-24 md:py-32 bg-white dark:bg-[#09090b] border-t border-neutral-200 dark:border-white/10 px-6 md:px-12 overflow-hidden select-none transition-colors duration-300">
      {/* Background Dhaka pattern watermark */}
      <DhakaPattern variant="background" opacity={0.06} className="opacity-[0.06] dark:opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Grid Layout Compartments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Large Call To Action & Email */}
          <div className="lg:col-span-8 space-y-8 lg:border-r border-neutral-900/10 dark:border-white/10 lg:pr-12">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
                03 / CONNECT
              </span>
              <h2 className="text-fluid-h2 font-display font-extrabold tracking-tighter text-neutral-900 dark:text-neutral-50 leading-none transition-colors duration-300">
                LET'S SHAPE THE<br />
                NEXT DIGITAL FRONTIER.
              </h2>
            </div>
            
            <div className="pt-6">
              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mb-3">[ Direct Channel ]</p>
              <Magnetic range={80} strength={0.25}>
                {/* TODO: verify hello@balikumarwad.dev is configured before launch */}
                <a
                  href="mailto:hello@balikumarwad.dev"
                  className="group relative inline-block text-fluid-h3 md:text-fluid-h2 font-display font-bold text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 rounded px-1 transition-colors duration-300"
                  aria-label="Send email to Bali Kumar Wad at hello@balikumarwad.dev"
                >
                  <span>hello@balikumarwad.dev</span>
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-600 dark:bg-indigo-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              </Magnetic>
            </div>
          </div>
          
          {/* Right: Social Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold block">
              Follow Coordinates
            </span>
            
            <nav className="flex flex-col gap-4 items-start" aria-label="Social Media Navigation">
              <Magnetic range={40} strength={0.35}>
                <a
                  href="https://github.com/balikumarwad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-3 py-1.5 border border-neutral-900/10 dark:border-white/[0.05] bg-neutral-900/[0.01] dark:bg-white/[0.01] transition-all duration-300"
                  aria-label="Bali Kumar Wad GitHub profile"
                >
                  <Github size={12} />
                  <span>GitHub</span>
                </a>
              </Magnetic>
              
              <Magnetic range={40} strength={0.35}>
                <a
                  href="https://linkedin.com/in/bali-kumar-wad-102382317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-3 py-1.5 border border-neutral-900/10 dark:border-white/[0.05] bg-neutral-900/[0.01] dark:bg-white/[0.01] transition-all duration-300"
                  aria-label="Bali Kumar Wad LinkedIn profile"
                >
                  <Linkedin size={12} />
                  <span>LinkedIn</span>
                </a>
              </Magnetic>

              <Magnetic range={40} strength={0.35}>
                <a
                  href="https://read.cv/balikumarwad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-3 py-1.5 border border-neutral-900/10 dark:border-white/[0.05] bg-neutral-900/[0.01] dark:bg-white/[0.01] transition-all duration-300"
                  aria-label="Bali Kumar Wad Read.cv profile"
                >
                  <FileText size={12} />
                  <span>Read.cv</span>
                </a>
              </Magnetic>

              <Magnetic range={40} strength={0.35}>
                {/* TODO_TWITTER_URL: replace href with real profile URL before launch */}
                <a
                  href="https://twitter.com/TODO_TWITTER_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-3 py-1.5 border border-neutral-900/10 dark:border-white/[0.05] bg-neutral-900/[0.01] dark:bg-white/[0.01] transition-all duration-300"
                  aria-label="Bali Kumar Wad Twitter profile (link pending)"
                >
                  <Twitter size={12} />
                  <span>Twitter</span>
                </a>
              </Magnetic>
            </nav>
          </div>
        </div>

        {/* Dhaka Pattern Divider */}
        <DhakaPattern variant="divider" className="opacity-40 dark:opacity-30 mt-20 mb-6" />

        {/* Footer Sub-row: Copyright & Coordinates */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 gap-6 transition-colors duration-300">
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Bali Kumar Wad &bull;
          </div>
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 opacity-40 uppercase tracking-widest sm:text-right">
            All rights reserved &bull; 27.6714&deg; N, 85.3250&deg; E
          </div>
        </div>

      </div>
    </footer>
  );
}
