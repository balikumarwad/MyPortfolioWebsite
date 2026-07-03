"use client";

import React from "react";
import Magnetic from "../ui/Magnetic";
import DhakaPattern from "../ui/DhakaPattern";
import { Github, Linkedin, FileText, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative py-24 md:py-32 bg-neutral-50 dark:bg-[#09090b] border-t border-neutral-900/[0.04] dark:border-neutral-50/[0.04] px-6 md:px-12 overflow-hidden select-none transition-colors duration-300">
      {/* Background Dhaka pattern watermark */}
      <DhakaPattern variant="background" opacity={0.02} className="opacity-[0.02] dark:opacity-[0.015]" />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between relative z-10">
        
        {/* Large Call To Action */}
        <div className="space-y-6 max-w-4xl">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
            03 / CONNECT
          </span>
          <h2 className="text-fluid-h2 font-display font-extrabold tracking-tighter text-neutral-900 dark:text-neutral-50 leading-tight transition-colors duration-300">
            LET'S SHAPE THE<br />
            NEXT DIGITAL FRONTIER.
          </h2>
          
          <div className="pt-6">
            <Magnetic range={80} strength={0.25}>
              <a
                href="mailto:hello@baliwad.dev"
                className="group relative inline-block text-fluid-h3 md:text-fluid-h2 font-display font-bold text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 rounded px-1 transition-colors duration-300"
                aria-label="Send email to Bali Kumar Wad at hello@baliwad.dev"
              >
                <span>hello@baliwad.dev</span>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-600 dark:bg-indigo-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Dhaka Pattern Divider */}
        <DhakaPattern variant="divider" className="opacity-40 dark:opacity-30 mt-20 mb-6" />

        {/* Footer Sub-row: Social links & copyright */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pt-6 gap-8 transition-colors duration-300">
          
          {/* Social Links */}
          <nav className="flex items-center gap-6" aria-label="Social Media Navigation">
            <Magnetic range={40} strength={0.35}>
              <a
                href="https://github.com/balikumarwad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-1.5 py-0.5 transition-colors duration-300"
                aria-label="Bali Kumar Wad GitHub profile"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
            </Magnetic>
            
            <Magnetic range={40} strength={0.35}>
              <a
                href="https://linkedin.com/in/bali-kumar-wad-102382317"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-1.5 py-0.5 transition-colors duration-300"
                aria-label="Bali Kumar Wad LinkedIn profile"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </Magnetic>

            <Magnetic range={40} strength={0.35}>
              <a
                href="https://read.cv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-1.5 py-0.5 transition-colors duration-300"
                aria-label="Bali Kumar Wad CV profile"
              >
                <FileText size={14} />
                <span>Read.cv</span>
              </a>
            </Magnetic>

            <Magnetic range={40} strength={0.35}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded px-1.5 py-0.5 transition-colors duration-300"
                aria-label="Bali Kumar Wad Twitter profile"
              >
                <Twitter size={14} />
                <span>Twitter</span>
              </a>
            </Magnetic>
          </nav>

          {/* Copyright details */}
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 md:text-right space-y-1 transition-colors duration-300">
            <div>&copy; {new Date().getFullYear()} Bali Kumar Wad &bull; Crafted with Next.js & Tailwind</div>
            <div className="opacity-40">All rights reserved &bull; 27.7172&deg; N, 85.3240&deg; E</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
