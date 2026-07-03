"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import DhakaPattern from "../ui/DhakaPattern";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement of cursor spotlight
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 0.1 });

  const springXSlow = useSpring(mouseX, { stiffness: 25, damping: 25, mass: 0.1 });
  const springYSlow = useSpring(mouseY, { stiffness: 25, damping: 25, mass: 0.1 });

  // Transforms to set radial gradients directly (binds to theme CSS variables)
  const primaryGlow = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(550px circle at ${x}px ${y}px, var(--hero-glow-primary), transparent 80%)`
  );

  const secondaryGlow = useTransform(
    [springXSlow, springYSlow],
    ([x, y]) => `radial-gradient(850px circle at ${x}px ${y}px, var(--hero-glow-secondary), transparent 75%)`
  );

  // Scroll parallax for hero content fade, scale, and translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Staggered letters variants
  const headingText = "ENGINEERING INTENT.";
  const words = headingText.split(" ");

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
        delayChildren: shouldReduceMotion ? 0 : 0.6, // Starts after Navbar loading transition
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 }
    }
  };

  // Subtitle/paragraph cascade variants
  const cascadeVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 14, delay: 1.0 }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: "easeInOut", delay: 1.2 }
    }
  };

  // Static glowing backdrops for touch devices or reduced motion
  const staticGlowStyle = {
    background: `radial-gradient(circle at 50% 30%, var(--hero-glow-primary), transparent 70%)`
  };
  const staticGlowStyleSecondary = {
    background: `radial-gradient(circle at 50% 40%, var(--hero-glow-secondary), transparent 60%)`
  };

  const techStack = [
    "# Next.js (App Router)",
    "# TypeScript",
    "# Tailwind CSS",
    "# Framer Motion",
    "# Design Systems",
    "# SEO & Web Vitals",
    "# FastAPI",
    "# System Design"
  ];
  const doubledTechStack = [...techStack, ...techStack];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-neutral-50 dark:bg-[#09090b] grid-bg pt-32 pb-12 px-6 md:px-12 select-none transition-colors duration-300"
    >
      {/* Background Dhaka Pattern (Cultural Motif) */}
      <DhakaPattern variant="background" opacity={0.03} className="opacity-[0.03] dark:opacity-[0.018]" />

      {/* Rebellious offset boundary frames (Grid offset rule) */}
      <div className="absolute inset-x-6 md:inset-x-12 top-28 bottom-8 border border-neutral-900/[0.04] dark:border-neutral-50/[0.04] pointer-events-none z-0" />
      <div className="absolute inset-x-6 md:inset-x-12 top-28 bottom-8 border border-neutral-900/[0.08] dark:border-neutral-50/[0.08] pointer-events-none z-0 translate-x-3 translate-y-3" />

      {/* Background Slowly Drifting Glow Blobs (Continuous Motion) */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] pointer-events-none"
        animate={shouldReduceMotion ? {} : {
          x: [0, 50, -30, 20, 0],
          y: [0, 30, -50, -10, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/5 dark:bg-violet-600/5 blur-[120px] pointer-events-none"
        animate={shouldReduceMotion ? {} : {
          x: [0, -40, 20, -15, 0],
          y: [0, 50, -25, 30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Background Cursor Glow Spotlights (Mouse-linked) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={isTouch || shouldReduceMotion ? staticGlowStyle : { background: primaryGlow }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={isTouch || shouldReduceMotion ? staticGlowStyleSecondary : { background: secondaryGlow }}
      />

      {/* Main Content wrapped in scroll parallax */}
      <motion.div 
        style={shouldReduceMotion ? {} : { y: parallaxY, opacity: parallaxOpacity, scale: parallaxScale }}
        className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center relative z-10"
      >
        <div className="flex flex-col space-y-8">
          {/* Subtitle / Status tag */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cascadeVariants} 
            className="flex items-center gap-3 offset-container w-fit self-start"
          >
            <div className="offset-shadow translate-x-1.5 translate-y-1.5 bg-indigo-600/5 dark:bg-indigo-400/5 rounded" />
            <div className="offset-element flex items-center gap-3 px-3 py-1.5 border border-neutral-900/10 dark:border-neutral-50/10 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
                Available for Freelance & Selected Contracts
              </span>
            </div>
          </motion.div>

          {/* Heading with cascading letter reveals */}
          <div className="relative">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={wordContainerVariants}
              className="text-5xl sm:text-7xl lg:text-[8vw] leading-none tracking-tighter break-words whitespace-normal font-display font-extrabold text-neutral-900 dark:text-neutral-50 flex flex-wrap"
            >
              {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-6">
                  {word.split("").map((letter, lIndex) => (
                    <motion.span
                      key={lIndex}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
            
            {/* Subheadline cascading block */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={cascadeVariants}
              className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <h2 className="text-fluid-lg font-display font-medium tracking-tight text-neutral-900/90 dark:text-neutral-50/90 transition-colors duration-300">
                Bali Kumar Wad &mdash; Developer
              </h2>
              
              <p className="max-w-xl text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed md:text-right font-sans transition-colors duration-300">
                I am a Computer Engineering student and full-stack developer. I bridge the gap between rigorous technical architecture and minimalist design to build scalable applications.
              </p>
            </motion.div>
          </div>

          {/* Dhaka Pattern Divider */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 1.2, duration: 0.8 } }
            }} 
            className="w-full"
          >
            <DhakaPattern variant="divider" className="my-1" />
          </motion.div>

          {/* Infinite Marquee Tech Stack Pills (Paused on Hover) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cascadeVariants}
            className="w-full overflow-hidden relative flex py-3 select-none"
          >
            <div className="flex animate-marquee gap-10 pr-10 text-[10px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              {doubledTechStack.map((pill, index) => (
                <span key={index} className="shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-default">
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex animate-marquee gap-10 pr-10 text-[10px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400" aria-hidden="true">
              {doubledTechStack.map((pill, index) => (
                <span key={`dup-${index}`} className="shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 cursor-default">
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Footer: Location & Scroll down indicator */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-between border-t border-neutral-900/[0.04] dark:border-neutral-50/[0.04] pt-8 mt-12 transition-colors duration-300">
        <div className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
          Based in Nepal &bull; Operating globally
        </div>

        <Magnetic range={50} strength={0.35}>
          <a
            href="#work"
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-neutral-900/10 dark:border-neutral-50/10 hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-neutral-900/[0.02] dark:bg-neutral-50/[0.02] text-neutral-900 dark:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 transition-all duration-300"
            aria-label="Scroll to Featured Work"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
              transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
