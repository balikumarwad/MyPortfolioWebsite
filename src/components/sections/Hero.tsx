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

  const rotateX = useTransform(springYSlow, [0, 800], [20, -20]);
  const rotateY = useTransform(springXSlow, [0, 1200], [-20, 20]);

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: shouldReduceMotion ? 1 : 0.6 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 14 }
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
      id="hero"
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

      {/* 3D-Simulated Kinetic Wireframe Torus/Sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[520px] md:h-[520px] pointer-events-none z-0 animate-float-drift">
        <motion.div 
          style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full h-full opacity-60 dark:opacity-45 animate-slow-rotate"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-600 dark:text-indigo-400 stroke-[0.75] fill-none">
            {/* Latitude Rings */}
            <ellipse cx="100" cy="100" rx="90" ry="12" />
            <ellipse cx="100" cy="100" rx="90" ry="30" />
            <ellipse cx="100" cy="100" rx="90" ry="50" />
            <ellipse cx="100" cy="100" rx="90" ry="70" />
            
            {/* Longitude Rings */}
            <ellipse cx="100" cy="100" rx="12" ry="90" />
            <ellipse cx="100" cy="100" rx="30" ry="90" />
            <ellipse cx="100" cy="100" rx="50" ry="90" />
            <ellipse cx="100" cy="100" rx="70" ry="90" />
            
            {/* Perimeter and accents */}
            <circle cx="100" cy="100" r="90" className="stroke-indigo-600/30 dark:stroke-indigo-400/25" />
            <circle cx="100" cy="100" r="60" className="stroke-violet-500/10 dark:stroke-violet-400/15 stroke-dasharray-[2_4]" />
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </div>

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
        <div className="flex flex-col space-y-12">
          {/* Subtitle / Status tag */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cascadeVariants} 
            className="flex items-center gap-3 offset-container w-fit mx-auto"
          >
            <div className="offset-shadow translate-x-1.5 translate-y-1.5 bg-indigo-600/5 dark:bg-indigo-400/5 rounded" />
            <div className="offset-element flex items-center gap-3 px-3 py-1.5 border border-neutral-900/10 dark:border-neutral-50/10 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
                Available for Freelance & Selected Contracts
              </span>
            </div>
          </motion.div>

          {/* Heading with cascading letter reveals */}
          <div className="relative w-full text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={wordContainerVariants}
              className="text-5xl sm:text-7xl lg:text-[7.5vw] leading-none tracking-tighter font-display font-extrabold text-neutral-900 dark:text-neutral-50 flex flex-wrap justify-center text-center mx-auto w-full max-w-6xl"
            >
              {words.map((word, wIndex) => (
                <React.Fragment key={wIndex}>
                  {wIndex > 0 && (
                    <span className="inline-block w-[0.3em]" aria-hidden="true">
                      {"\u00A0"}
                    </span>
                  )}
                  <span className="inline-block whitespace-nowrap">
                    {word.split("").map((letter, lIndex) => (
                      <motion.span
                        key={lIndex}
                        variants={letterVariants}
                        className="inline-block origin-bottom"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                </React.Fragment>
              ))}
            </motion.h1>
            
            {/* Subheadline & Description inside clean structural gridlines */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={cascadeVariants}
              className="mt-16 grid grid-cols-1 md:grid-cols-12 border-t border-b border-neutral-900/10 dark:border-neutral-50/10 py-8 gap-8 items-stretch w-full text-left"
            >
              <div className="md:col-span-5 md:border-r border-neutral-900/10 dark:border-neutral-50/10 pr-6 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
                  Bali Kumar Wad
                </h2>
                <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mt-1">
                  Web Developer & UI/UX Designer
                </p>
              </div>
              
              <div className="md:col-span-7 flex items-center pl-0 md:pl-4">
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl transition-colors duration-300 font-sans">
                  I am a Computer Engineering student and full-stack developer based in Nepal. I combine the raw structure of living code grids with precise, high-contrast typography to build fast, tactile digital experiences.
                </p>
              </div>
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
            <DhakaPattern variant="divider" className="my-1 opacity-50" />
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
