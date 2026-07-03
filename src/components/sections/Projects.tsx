"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import DhakaPattern from "../ui/DhakaPattern";

interface Project {
  id: string;
  title: string;
  outcome: string;
  tags: string[];
  role: string;
  link: string;
  previewType: "analytics" | "typography" | "studio";
}

const projects: Project[] = [
  {
    id: "01",
    title: "Nagarik Awaz",
    outcome: "A civic engagement platform allowing citizens to report local issues directly to ward offices. Features a secure, citizen-centric user login flow optimized for public accessibility.",
    tags: ["Next.js", "FastAPI", "Tailwind CSS"],
    role: "Full-stack Developer & UX Architect",
    link: "#",
    previewType: "analytics",
  },
  {
    id: "02",
    title: "Mero-Bus",
    outcome: "A crowdsourced transit tracker for private buses in Kathmandu. Concept and implementation strategy developed and executed during a 48-hour hackathon.",
    tags: ["React", "Python", "System Design"],
    role: "Lead Systems Engineer",
    link: "#",
    previewType: "typography",
  },
  {
    id: "03",
    title: "PixelDev Nepal",
    outcome: "An AI-augmented web and brand studio aimed at elevating local SMEs with high-performance, minimalist digital experiences.",
    tags: ["Next.js", "AI Agents", "UI/UX"],
    role: "Founder & Technical Lead",
    link: "#",
    previewType: "studio",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  shouldReduceMotion: boolean;
}

function ProjectCard({ project, index, shouldReduceMotion }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHoverable, setIsHoverable] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Individual scroll progress for parallax offsets
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Visual panel parallax offset
  const yVisual = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // 3D Tilt calculation based on cursor coordinate values
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !isHoverable) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const maxRotation = 5; // Capped to 5 degrees for professional editorial feel
    const rX = -(y / (box.height / 2)) * maxRotation;
    const rY = (x / (box.width / 2)) * maxRotation;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 60, damping: 14 }}
      className={`flex flex-col gap-8 md:gap-16 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center`}
    >
      {/* 1. Project Information */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-6">
        {/* Number & Role */}
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{project.id}</span>
          <span>&mdash;</span>
          <span>{project.role}</span>
        </div>

        {/* Title & Outcome */}
        <div className="space-y-3">
          <h3 className="text-fluid-h3 font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
            <a 
              href={project.link}
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
              aria-label={`View details for ${project.title}`}
            >
              {project.title}
            </a>
          </h3>
          <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-100 font-light leading-relaxed transition-colors duration-300">
            {project.outcome}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-mono tracking-wider text-neutral-600 dark:text-neutral-300 rounded-full border border-neutral-900/[0.08] dark:border-neutral-50/[0.08] bg-neutral-900/[0.01] dark:bg-neutral-50/[0.01] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link CTA with sweep animation */}
        <div className="pt-4">
          <Magnetic range={40} strength={0.3}>
            <a
              href={project.link}
              className="group relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-widest rounded-full border border-neutral-900/10 dark:border-neutral-50/10 text-neutral-900 dark:text-neutral-50 hover:text-white dark:hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-300"
              aria-label={`Case study details for ${project.title}`}
            >
              <span className="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2">
                <span>View Project Details</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-500 dark:text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900"
                />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* 2. Custom Rendered Visual Mockup (Keyboard focusable, theme-responsive card, 3D tilt & parallax) */}
      <div 
        style={{ perspective: "1000px" }}
        className="w-full lg:w-7/12 aspect-[4/3] relative flex items-center justify-center offset-container group/card"
      >
        {/* Offset Dhaka Pattern Panel Backing */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl -z-10 overflow-hidden border border-neutral-900/10 dark:border-neutral-50/10 transition-transform duration-500 ease-out group-hover/card:translate-x-5 group-hover/card:translate-y-5">
          <DhakaPattern variant="panel" className="w-full h-full rounded-2xl" />
        </div>
        <motion.a 
          href={project.link}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={shouldReduceMotion || !isHoverable ? {} : {
            y: yVisual,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02, boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)", borderColor: "rgba(99, 102, 241, 0.3)" }}
          whileFocus={shouldReduceMotion ? {} : { scale: 1.02, boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)", borderColor: "rgba(99, 102, 241, 0.3)" }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-full h-full rounded-2xl border border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-900/[0.01] dark:bg-neutral-50/[0.01] backdrop-blur-sm overflow-hidden relative group cursor-pointer shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-colors duration-500 block"
          aria-label={`Interactive case study preview for ${project.title}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/60 dark:from-[#09090b]/60 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-all duration-500" />
          
          {/* Inner Mockup Container (translateZ for layered 3D depth) */}
          <div 
            style={shouldReduceMotion || !isHoverable ? {} : { transform: "translateZ(30px)" }}
            className="w-full h-full p-4 md:p-8 flex items-center justify-center relative overflow-hidden transition-transform duration-500"
          >
            {project.previewType === "analytics" && (
              <div className="w-full h-full rounded-lg border border-white/[0.04] bg-neutral-950 overflow-hidden shadow-inner flex flex-col relative">
                {/* Window Bar */}
                <div className="h-8 border-b border-white/[0.04] px-4 flex items-center gap-1.5 shrink-0 bg-white/[0.01]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="text-[9px] font-mono text-muted-text ml-auto">nagarik_awaz_report.ts</div>
                </div>
                {/* Workspace */}
                <div className="flex-grow p-4 grid grid-cols-3 gap-3 relative grid-bg">
                  {/* Glow Blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
                  {/* Card A */}
                  <div className="col-span-2 rounded-md border border-white/[0.04] bg-white/[0.02] p-3 flex flex-col justify-between h-[120px] z-10">
                    <span className="text-[8px] font-mono text-muted-text uppercase tracking-widest">Active Civic Reports</span>
                    <span className="text-xl font-display font-semibold text-white tracking-tight">1,248 filed</span>
                    <div className="h-10 w-full overflow-hidden mt-2 relative">
                      <svg viewBox="0 0 100 20" className="w-full h-full stroke-indigo-400 stroke-[1.5] fill-none">
                        <path d="M0,15 Q15,5 30,12 T60,2 T80,14 T100,6" />
                        <path d="M0,15 Q15,5 30,12 T60,2 T80,14 T100,6 L100,20 L0,20 Z" className="fill-indigo-500/5 stroke-none" />
                      </svg>
                    </div>
                  </div>
                  {/* Card B */}
                  <div className="col-span-1 rounded-md border border-white/[0.04] bg-white/[0.02] p-3 flex flex-col justify-between h-[120px] z-10">
                    <span className="text-[8px] font-mono text-muted-text uppercase tracking-widest">Resolution Rate</span>
                    <div className="flex items-center justify-center flex-grow py-1">
                      <svg viewBox="0 0 36 36" className="w-12 h-12 stroke-[2.5]">
                        <path className="stroke-white/[0.05] fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-violet-500 fill-none" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-mono text-white text-center">88% RESOLVED</span>
                  </div>
                  {/* Card C */}
                  <div className="col-span-3 rounded-md border border-white/[0.04] bg-white/[0.02] p-3 flex items-center justify-between z-10">
                    <div className="flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      <span className="text-[8px] font-mono text-muted-text uppercase">Ward Office Synced</span>
                    </div>
                    <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest">Real-time reports</span>
                  </div>
                </div>
              </div>
            )}

            {project.previewType === "typography" && (
              <div className="w-full h-full rounded-lg border border-white/[0.04] bg-neutral-950 overflow-hidden shadow-inner flex flex-col relative grid-bg">
                <div className="absolute inset-0 bg-radial from-violet-500/10 to-transparent blur-2xl pointer-events-none" />
                <div className="flex-grow flex items-center justify-center p-6 relative">
                  {/* Graphic elements */}
                  <div className="absolute inset-x-8 top-8 bottom-8 border border-white/[0.03] flex items-center justify-center">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.03]" />
                  </div>

                  {/* Massive Letter */}
                  <span className="text-[12rem] md:text-[15rem] font-display font-extrabold text-white/[0.02] select-none absolute">
                    M
                  </span>

                  {/* Kinetic overlapping typography lines */}
                  <div className="text-center relative z-10 space-y-2">
                    <div className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest leading-none">
                      MERO BUS
                    </div>
                    <div className="text-[9px] font-mono text-violet-400 tracking-[0.3em] uppercase">
                      [ KTM TRANSIT LOG &bull; GPS LIVE ]
                    </div>
                    <div className="text-white/40 text-[10px] max-w-[200px] mx-auto leading-relaxed pt-2">
                      Transit matrix tracker & routes visualization dashboard.
                    </div>
                  </div>

                  {/* monospaced diagnostics */}
                  <div className="absolute bottom-4 left-4 text-[7px] font-mono text-white/30 space-y-0.5">
                    <div>PING: 12ms / API_SYNC: 99.8%</div>
                    <div>CROWDSOURCED_PINGS: 42k/hr</div>
                  </div>
                </div>
              </div>
            )}

            {project.previewType === "studio" && (
              <div className="w-full h-full rounded-lg border border-white/[0.04] bg-neutral-950 overflow-hidden shadow-inner flex flex-col relative">
                <div className="flex-grow p-6 flex flex-col justify-between relative">
                  {/* Accent Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
                  
                  {/* Grid Layout Representing Editorial Studio */}
                  <div className="grid grid-cols-5 gap-4 items-start">
                    {/* Left layout details */}
                    <div className="col-span-2 border-r border-white/[0.05] pr-4 h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[8px] font-mono text-white/40 uppercase">PixelDev Nepal</div>
                        <div className="text-[11px] font-display font-medium text-white">SME PLATFORM</div>
                      </div>
                      <div className="pt-8 text-[7px] font-mono text-muted-text leading-normal">
                        Lalitpur, NP &mdash;<br/>Established 2026
                      </div>
                    </div>

                    {/* Right mock photographic frame */}
                    <div className="col-span-3 aspect-[4/3] rounded border border-white/[0.06] bg-white/[0.01] p-1.5 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                      <div className="w-full h-full bg-gradient-to-tr from-neutral-900 to-neutral-800 flex items-center justify-center relative">
                        {/* Asymmetric composition lines */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[85%] h-[85%] border border-white/5 flex items-center justify-center">
                            <span className="text-[10px] font-mono text-white/10">03_AI_SYSTEMS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row status */}
                  <div className="flex justify-between items-end border-t border-white/[0.04] pt-4 mt-6">
                    <span className="text-[8px] font-mono text-muted-text">STUDIO DEPLOYMENTS</span>
                    <span className="text-[8px] font-mono text-white/70">ACTIVE BRANDS: 12</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" className="relative py-24 md:py-36 bg-neutral-50 dark:bg-[#09090b] px-6 md:px-12 overflow-hidden select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900/[0.06] dark:border-neutral-50/[0.06] pb-12 mb-16 md:mb-24 gap-6 transition-colors duration-300">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
              01 / SELECTED WORK
            </span>
            <h2 className="text-fluid-h2 font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
              FEATURED CASE STUDIES
            </h2>
          </div>
          <p className="max-w-xs text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed transition-colors duration-300">
            A small collection of digital experiences combining high-fidelity aesthetics with performant code.
          </p>
        </div>

        {/* Projects Layout (Staggered alternating) */}
        <div className="space-y-24 md:space-y-36">
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              {index > 0 && (
                <DhakaPattern variant="divider" className="py-6 opacity-40 dark:opacity-30" />
              )}
              <ProjectCard
                project={project}
                index={index}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
