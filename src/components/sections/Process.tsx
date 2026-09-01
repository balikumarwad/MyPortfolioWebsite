"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import DhakaPattern from "../ui/DhakaPattern";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bridge: string;
  deliverables: string[];
}

const steps: Step[] = [
  {
    number: "01",
    title: "DISCOVER & ART DIRECTION",
    subtitle: "Aligning branding, structural grid constraints, and visual tone.",
    description: "Before drawing a single layout, I map out typography scales, content hierarchies, and load performance budgets. We align on visual moodboards, typographic layouts, and competitive strategies.",
    bridge: "Design constraints are immediately translated into CSS variables, aligning the codebase's variables with design specifications from day one.",
    deliverables: ["Visual Art Direction", "Typography Pairings", "Performance Budgets"],
  },
  {
    number: "02",
    title: "EDITORIAL DESIGN & MOTION",
    subtitle: "High-fidelity grid mockups with integrated animation prototypes.",
    description: "Structuring layouts with confident negative space and strong typography. I define micro-interactions, custom cursor triggers, and scroll-linked spatial movements, preparing them for programmatic code execution.",
    bridge: "Framer Motion coordinates, easing variables, and timing profiles are structured alongside UI layouts to eliminate design-to-development translation loss.",
    deliverables: ["Figma Design Assets", "Interactive Prototypes", "Interaction Specs"],
  },
  {
    number: "03",
    title: "RIGOROUS ENGINEERING",
    subtitle: "Clean, type-safe Next.js component development.",
    description: "Building layouts using semantic HTML, Tailwind CSS, and strict TypeScript. I write clean, atomic React components, structure performant layouts, and program complex animations with Framer Motion.",
    bridge: "All component layouts and interface properties are strictly typed, turning visual design constraints into compile-time validations.",
    deliverables: ["Next.js App Router Structure", "Strict TypeScript UI Kit", "Performant Animation Code"],
  },
  {
    number: "04",
    title: "PERFORMANCE AUDIT & LAUNCH",
    subtitle: "Maximizing SEO ranking, accessibility standards, and load speed.",
    description: "Auditing production bundles to ensure perfect scores. I verify responsiveness, configure structured metadata, optimize static pages, and deploy to ultra-fast global networks.",
    bridge: "Automated auditing environments check core web vitals and semantic correctness before final deployment.",
    deliverables: ["Optimized Build Bundle", "Structured Schema Metadata", "Edge Deployment Setup"],
  },
];

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Track scroll progress across the methodology steps container
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  
  // Smooth spring for drawing line
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="process" className="relative py-24 md:py-36 bg-white dark:bg-[#09090b] border-t border-neutral-200 dark:border-white/10 px-6 md:px-12 overflow-hidden select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
              02 / METHODOLOGY
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight transition-colors duration-300">
              HOW DESIGN FUSES WITH CODE.
            </h2>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-sm transition-colors duration-300 font-sans">
              I operate as both designer and engineer, bridging the gap between artistic expression and technical performance. Each phase ensures visual intent translates directly to production code.
            </p>

            <div className="hidden lg:block pt-8 text-[10px] font-mono text-neutral-500/40 dark:text-neutral-500/30">
              [ HOVER OR TAB TO EXPAND THE PIPELINE ]
            </div>
          </div>

          {/* Right Column: Expanding Steps with Scroll Drawing Progress Line */}
          <div ref={sectionRef} className="lg:col-span-7 relative pl-6 sm:pl-8">
            {/* Background static line */}
            <div className="absolute left-[20px] top-6 bottom-6 w-[1px] bg-neutral-900/10 dark:bg-white/10 z-0 transition-colors duration-300" />
            
            {/* Scroll-drawing progress indicator line - Glowing electric gradient */}
            <motion.div
              style={shouldReduceMotion ? { scaleY: 1 } : { scaleY }}
              className="absolute left-[19px] top-6 bottom-6 w-[3px] bg-gradient-to-b from-indigo-500 via-indigo-400 to-violet-500 origin-top z-10 transition-colors duration-300 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />

            <div className="divide-y divide-neutral-900/[0.06] dark:divide-neutral-50/[0.06] border-t border-b border-neutral-900/[0.06] dark:border-neutral-50/[0.06] transition-colors duration-300">
              {steps.map((step, index) => {
                const isExpanded = hoveredIndex === index;

                return (
                  <div
                    key={step.number}
                    className="py-8 md:py-10 transition-all duration-300 relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 rounded-lg px-2"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`step-content-${step.number}`}
                  >
                    {/* Step Title Header */}
                    <div className="flex items-start justify-between gap-6 relative z-10">
                      <div className="flex gap-6 md:gap-10 items-start">
                        {/* Number with backdrop mask for progress line check */}
                        <span className="text-xs md:text-sm font-mono text-indigo-600 dark:text-indigo-400 font-semibold pt-1 px-1.5 bg-white dark:bg-[#09090b] z-20 relative transition-colors duration-300">
                          {step.number}
                        </span>
                        
                        <div className="space-y-2">
                          <h3 className="text-lg md:text-xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light transition-colors duration-300">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Interactive indicator plus sign */}
                      <div className="relative w-4 h-4 mt-2 hidden sm:block">
                        <span className="absolute inset-y-0 left-1.5 w-0.5 bg-neutral-950/40 dark:bg-neutral-50/40 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-all duration-300 group-hover:rotate-90" />
                        <span className={`absolute inset-x-0 top-1.5 h-0.5 bg-neutral-950/40 dark:bg-neutral-50/40 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-all duration-300 ${isExpanded ? "rotate-90 scale-0" : ""}`} />
                      </div>
                    </div>

                    {/* Expandable Section */}
                    <motion.div
                      id={`step-content-${step.number}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={
                        isExpanded
                          ? { height: "auto", opacity: 1, marginTop: 24 }
                          : { height: 0, opacity: 0, marginTop: 0 }
                      }
                      transition={shouldReduceMotion ? { duration: 0.05 } : { duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-900/[0.04] dark:border-neutral-50/[0.04] text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors duration-300">
                        
                        {/* Left: Detail Description */}
                        <div className="space-y-4">
                          <p>{step.description}</p>
                          <div className="flex flex-col gap-1.5 pt-2">
                            <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500">Deliverables</span>
                            <div className="flex flex-wrap gap-1.5">
                              {step.deliverables.map((item) => (
                                <span key={item} className="px-2 py-0.5 rounded border border-neutral-900/[0.06] dark:border-neutral-50/[0.06] bg-neutral-900/[0.01] dark:bg-neutral-50/[0.01] text-[8px] font-mono">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Design & Dev Bridge */}
                        <div className="offset-container group/step w-full">
                          <div className="offset-shadow translate-x-1.5 translate-y-1.5 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-lg group-hover/step:translate-x-3 group-hover/step:translate-y-3 transition-all duration-300" />
                          <div className="offset-element p-4 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-indigo-500/10 dark:border-indigo-400/10 flex flex-col justify-between transition-all duration-500 h-full group-hover/step:-translate-x-0.5 group-hover/step:-translate-y-0.5 group-hover/step:border-indigo-400/30 group-hover/step:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                            <div className="space-y-2">
                              <div className="text-[9px] font-mono tracking-widest uppercase text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
                                <span>DESIGN-CODE BRIDGE</span>
                              </div>
                              <p className="text-[11px] text-neutral-600 dark:text-neutral-300 font-light leading-relaxed transition-colors duration-300">
                                {step.bridge}
                              </p>
                            </div>
                            <span className="text-[8px] font-mono text-neutral-500 self-end mt-4 transition-colors duration-300">
                              [ SYNCED PIPELINE ]
                            </span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
