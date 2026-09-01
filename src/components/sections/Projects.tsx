"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Magnetic from "../ui/Magnetic";
import DhakaPattern from "../ui/DhakaPattern";

const MotionLink = motion(Link);

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
    link: "/work/nagarik-awaz",
    previewType: "analytics",
  },
  {
    id: "02",
    title: "Mero-Bus",
    outcome: "A crowdsourced transit tracker for private buses in Kathmandu. Concept and implementation strategy developed and executed during a 48-hour hackathon.",
    tags: ["React", "Python", "System Design"],
    role: "Lead Systems Engineer",
    link: "/work/mero-bus",
    previewType: "typography",
  },
  {
    id: "03",
    title: "PixelDev Nepal",
    outcome: "An AI-augmented web and brand studio aimed at elevating local SMEs with high-performance, minimalist digital experiences.",
    tags: ["Next.js", "AI Agents", "UI/UX"],
    role: "Founder & Technical Lead",
    link: "/work/pixeldev-nepal",
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
            <Link
              href={project.link}
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
              aria-label={`View details for ${project.title}`}
            >
              {project.title}
            </Link>
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
            <Link
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
            </Link>
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
        <MotionLink
          href={project.link}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={shouldReduceMotion || !isHoverable ? {} : {
            y: yVisual,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.015, boxShadow: "0 0 30px rgba(99, 102, 241, 0.12)", borderColor: "rgba(99, 102, 241, 0.25)" }}
          whileFocus={shouldReduceMotion ? {} : { scale: 1.015, boxShadow: "0 0 30px rgba(99, 102, 241, 0.12)", borderColor: "rgba(99, 102, 241, 0.25)" }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-full h-full rounded-2xl border border-neutral-900/10 dark:border-white/[0.05] bg-neutral-900/[0.01] dark:bg-neutral-950 overflow-hidden relative group/mockup cursor-pointer shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:focus-visible:ring-indigo-400 transition-colors duration-500 block"
          aria-label={`Interactive case study preview for ${project.title}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/40 dark:from-[#09090b]/40 to-transparent z-10 opacity-40 group-hover/mockup:opacity-10 transition-all duration-500" />
          
          {/* Inner Mockup Container (translateZ for layered 3D depth) */}
          <div 
            style={shouldReduceMotion || !isHoverable ? {} : { transform: "translateZ(30px)" }}
            className="w-full h-full p-4 md:p-6 flex items-center justify-center relative overflow-hidden transition-transform duration-500"
          >
            {project.previewType === "analytics" && (
              <div className="w-full h-full rounded-xl border border-indigo-500/10 bg-neutral-950 overflow-hidden shadow-inner flex flex-col relative">
                {/* Glow Aura */}
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-[50px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-violet-500/5 blur-[50px] pointer-events-none" />

                {/* Window Bar */}
                <div className="h-9 border-b border-white/[0.05] px-4 flex items-center gap-1.5 shrink-0 bg-neutral-900/40 backdrop-blur-sm z-20">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  <div className="text-[9px] font-mono text-neutral-400 ml-4 flex items-center gap-1.5">
                    <span className="opacity-40">GET</span>
                    <span className="text-emerald-400 font-semibold">/api/v1/reports</span>
                  </div>
                  <div className="text-[8px] font-mono text-neutral-500 ml-auto">nagarik_awaz_node</div>
                </div>

                {/* Workspace */}
                <div className="flex-grow p-4 grid grid-cols-12 gap-3 relative z-10 grid-bg">
                  {/* Left Column labels: 4 cols */}
                  <div className="col-span-12 sm:col-span-4 flex flex-col gap-3">
                    {/* Civic Reports label */}
                    <div className="rounded-lg border border-indigo-500/10 bg-neutral-900/40 backdrop-blur-md p-3 flex flex-col justify-between h-[80px] relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <span className="text-[7.5px] font-mono text-neutral-400 tracking-wider uppercase">Civic Reports</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-[10px] font-mono text-neutral-300 tracking-wider">Issue Tracking</span>
                      </div>
                    </div>

                    {/* Ward Sync label */}
                    <div className="rounded-lg border border-white/[0.05] bg-neutral-900/40 backdrop-blur-md p-3 flex flex-col justify-between h-[90px] relative overflow-hidden">
                      <span className="text-[7.5px] font-mono text-neutral-400 tracking-wider uppercase">Ward Sync</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-mono text-neutral-300 tracking-wider">Direct to Ward Office</span>
                        <svg viewBox="0 0 36 36" className="w-10 h-10 stroke-[3]">
                          <path className="stroke-white/[0.04] fill-none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="stroke-indigo-400 fill-none" strokeDasharray="70, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Main graph panel: 8 cols */}
                  <div className="col-span-12 sm:col-span-8 rounded-lg border border-indigo-500/10 bg-neutral-900/20 backdrop-blur-md p-3 flex flex-col justify-between h-[183px] relative overflow-hidden">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-[7.5px] font-mono text-neutral-400 tracking-wider uppercase">Ingested Reports Stream</span>
                        <div className="text-[9px] font-mono text-indigo-400">Kathmandu Metropolitan</div>
                      </div>
                      <span className="text-[8px] font-mono text-neutral-500">updated 2s ago</span>
                    </div>

                    {/* Glowing Neon Chart Path */}
                    <div className="h-28 w-full overflow-hidden mt-3 relative">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      <svg viewBox="0 0 200 60" className="w-full h-full stroke-[1.5] fill-none overflow-visible">
                        <path d="M0,45 C20,40 40,25 60,35 C80,45 100,10 120,20 C140,30 160,5 180,15 L200,8" className="stroke-indigo-500/35 stroke-[3.5] blur-[2px]" />
                        <path d="M0,45 C20,40 40,25 60,35 C80,45 100,10 120,20 C140,30 160,5 180,15 L200,8" className="stroke-indigo-400" />
                        <path d="M0,35 C30,30 50,50 80,40 C110,30 130,55 160,30 L200,25" className="stroke-violet-400/60 stroke-[1.25]" />
                        <circle cx="180" cy="15" r="2.5" className="fill-indigo-400 animate-pulse" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[7px] font-mono text-neutral-500 pt-2 border-t border-white/[0.04]">
                      <span>09:00 AM</span>
                      <span>12:00 PM</span>
                      <span>03:00 PM</span>
                      <span>06:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.previewType === "typography" && (
              <div className="w-full h-full rounded-xl border border-violet-500/10 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col relative grid-bg">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-transparent z-0 pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[8px] font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span>GPS_ACTIVE_POLLING_NODE_KTM</span>
                </div>
                
                <div className="flex-grow flex items-center justify-center p-6 relative z-10">
                  {/* Blueprint lines */}
                  <div className="absolute inset-8 border border-white/[0.02] flex items-center justify-center pointer-events-none">
                    <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.02]" />
                  </div>

                  {/* Mass Background Letter */}
                  <span className="text-[14rem] font-display font-extrabold text-white/[0.015] select-none absolute leading-none">
                    M
                  </span>

                  {/* Kinetic overlapping typography */}
                  <div className="text-center relative z-10 space-y-3">
                    <div className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-widest leading-none">
                      MERO BUS
                    </div>
                    <div className="text-[8px] font-mono text-violet-400 tracking-[0.4em] uppercase">
                      [ KTM TRANSIT LOG &bull; LIVE INDEX ]
                    </div>
                    <div className="text-neutral-400 text-[10px] max-w-[220px] mx-auto leading-relaxed pt-2">
                      Real-time crowdsourced bus tracker & routing matrix for public buses.
                    </div>
                  </div>
                </div>

                {/* Bottom context bar */}
                <div className="px-4 py-2 border-t border-white/[0.04] flex justify-between items-center bg-neutral-900/30 text-[8px] font-mono text-neutral-500">
                  <span>HACKATHON BUILD / 48 HOURS</span>
                  <span>KTM TRANSIT</span>
                </div>
              </div>
            )}

            {project.previewType === "studio" && (
              <div className="w-full h-full rounded-xl border border-indigo-500/10 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent z-0" />
                <div className="flex-grow p-6 flex flex-col justify-between relative z-10">
                  {/* Grid Layout Representing Editorial Studio */}
                  <div className="grid grid-cols-12 gap-4 items-center h-full">
                    {/* Left layout details */}
                    <div className="col-span-5 border-r border-white/[0.04] pr-4 h-full flex flex-col justify-between py-2">
                      <div className="space-y-1.5">
                        <div className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest text-left">PixelDev Nepal</div>
                        <div className="text-[11px] font-display font-semibold text-white leading-tight text-left">BRAND STUDIO</div>
                      </div>
                      <div className="pt-8 text-[7px] font-mono text-neutral-500 leading-relaxed uppercase tracking-wider text-left">
                        Lalitpur, NP &mdash;<br/>SME Focus / NP_NODE
                      </div>
                    </div>

                    {/* Right mock photographic frame */}
                    <div className="col-span-7 aspect-[4/3] rounded-lg border border-white/[0.06] bg-white/[0.01] p-1.5 flex items-center justify-center relative overflow-hidden group-hover/mockup:border-indigo-500/20 transition-all duration-500">
                      <div className="w-full h-full bg-gradient-to-tr from-neutral-900 to-neutral-950 flex items-center justify-center relative">
                        {/* Diagonal blueprint lines */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[85%] h-[85%] border border-white/5 flex items-center justify-center relative">
                            <div className="absolute inset-x-2 top-0 h-[1px] bg-indigo-500/10" />
                            <div className="absolute inset-x-2 bottom-0 h-[1px] bg-indigo-500/10" />
                            <span className="text-[9px] font-mono text-indigo-400/20 tracking-wider">03_AI_SYSTEMS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row context */}
                  <div className="flex justify-between items-end border-t border-white/[0.04] pt-4 mt-6">
                    <span className="text-[8px] font-mono text-neutral-500 tracking-wider">AI-AUGMENTED</span>
                    <span className="text-[8px] font-mono text-indigo-400">SME FOCUS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </MotionLink>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" className="relative py-24 md:py-36 bg-white dark:bg-[#09090b] px-6 md:px-12 overflow-hidden select-none transition-colors duration-300 border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-900/10 dark:border-white/10 pb-12 mb-16 md:mb-24 gap-6 transition-colors duration-300">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 font-semibold">
              01 / SELECTED WORK
            </span>
            <h2 className="text-fluid-h2 font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
              FEATURED CASE STUDIES
            </h2>
          </div>
          <div className="md:col-span-4 flex items-end pl-0 md:pl-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed transition-colors duration-300 font-sans">
              A small collection of digital experiences combining high-fidelity aesthetics with performant code.
            </p>
          </div>
        </div>

        {/* Projects Layout (Staggered alternating) inside grid compartments */}
        <div className="space-y-0 divide-y divide-neutral-900/10 dark:divide-white/10 border-b border-neutral-900/10 dark:border-white/10">
          {projects.map((project, index) => (
            <div key={project.id} className="py-16 md:py-24 first:pt-0 last:pb-0">
              <ProjectCard
                project={project}
                index={index}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
