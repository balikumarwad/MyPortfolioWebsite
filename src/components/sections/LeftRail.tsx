"use client";

import React, { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "01", name: "Intro" },
  { id: "work", label: "02", name: "Work" },
  { id: "process", label: "03", name: "Process" },
  { id: "contact", label: "04", name: "Connect" },
];

export default function LeftRail() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when the section dominates the viewport center
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    // Backstop scroll listener for the very top of the page
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-8">
      {/* Top decorative line (Living grid connector) */}
      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-indigo-600/20 dark:to-indigo-400/20" />
      
      {/* Rail Nav Items */}
      <nav className="flex flex-col gap-6" aria-label="Sidebar Progress Navigation">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="group relative flex items-center justify-center w-8 h-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded-full"
              aria-label={`Scroll to ${sec.name}`}
            >
              {/* Glowing active outer ring */}
              <span
                className={`absolute inset-0 rounded-full border transition-all duration-500 scale-75 opacity-0 ${
                  isActive
                    ? "scale-100 opacity-100 border-indigo-500 dark:border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)] bg-indigo-600/[0.03] dark:bg-indigo-400/[0.03]"
                    : "group-hover:scale-95 group-hover:opacity-40 border-neutral-900/10 dark:border-neutral-50/10"
                }`}
              />
              
              {/* Monospace Indicator number */}
              <span
                className={`text-[9px] font-mono font-bold tracking-tight transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 scale-110"
                    : "text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-300"
                }`}
              >
                {sec.label}
              </span>

              {/* Sidebar popup tooltip */}
              <span className="absolute left-12 px-2 py-1 rounded bg-neutral-900 dark:bg-neutral-800 text-[8px] font-mono text-neutral-50 dark:text-neutral-200 opacity-0 pointer-events-none translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-lg uppercase tracking-widest border border-neutral-800 dark:border-neutral-700">
                {sec.name}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Bottom decorative line (Living grid connector) */}
      <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-indigo-600/20 dark:to-indigo-400/20" />
    </div>
  );
}
