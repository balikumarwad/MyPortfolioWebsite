"use client";

import React, { useId } from "react";

interface DhakaPatternProps {
  className?: string;
  variant?: "background" | "divider" | "panel";
  opacity?: number;
}

export default function DhakaPattern({
  className = "",
  variant = "background",
  opacity,
}: DhakaPatternProps) {
  const patternId = useId();

  if (variant === "divider") {
    // A clean horizontal divider line built from Dhaka chevrons & diamonds
    return (
      <div className={`w-full overflow-hidden flex items-center ${className}`} role="presentation">
        <svg
          width="100%"
          height="16"
          className="text-indigo-600/30 dark:text-indigo-400/20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={`dhaka-div-${patternId}`}
              width="32"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              {/* Central Diamond */}
              <path
                d="M 16 0 L 24 8 L 16 16 L 8 8 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              {/* Inner Diamond Dot */}
              <circle cx="16" cy="8" r="1.5" fill="currentColor" />
              {/* Chevrons pointing right */}
              <path
                d="M 0 8 L 8 0 M 0 8 L 8 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M 24 0 L 32 8 M 24 16 L 32 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              {/* Accent triangles */}
              <path d="M 0 0 L 4 0 L 0 4 Z" fill="currentColor" className="opacity-40" />
              <path d="M 32 0 L 28 0 L 32 4 Z" fill="currentColor" className="opacity-40" />
              <path d="M 0 16 L 4 16 L 0 12 Z" fill="currentColor" className="opacity-40" />
              <path d="M 32 16 L 28 16 L 32 12 Z" fill="currentColor" className="opacity-40" />
            </pattern>
          </defs>
          <rect width="100%" height="16" fill={`url(#dhaka-div-${patternId})`} />
        </svg>
      </div>
    );
  }

  if (variant === "panel") {
    // A solid, sharp accent panel designed to live offset behind cards or text
    return (
      <div 
        className={`absolute inset-0 border border-neutral-900/10 dark:border-neutral-50/10 bg-neutral-100/50 dark:bg-neutral-900/50 -z-10 overflow-hidden ${className}`}
        role="presentation"
      >
        <svg width="100%" height="100%" className="w-full h-full text-indigo-600/[0.04] dark:text-indigo-400/[0.03]">
          <defs>
            <pattern
              id={`dhaka-pan-${patternId}`}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* Repeating Dhaka grid weave */}
              <path
                d="M 20 0 L 40 20 L 20 40 L 0 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M 20 10 L 30 20 L 20 30 L 10 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <path
                d="M 0 20 L 10 10 L 20 20 L 30 10 L 40 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              <path
                d="M 0 20 L 10 30 L 20 20 L 30 30 L 40 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dhaka-pan-${patternId})`} />
        </svg>
      </div>
    );
  }

  // default: background watermark pattern
  const defaultOpacity = opacity ?? 0.025;
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity: defaultOpacity }}
      role="presentation"
    >
      <svg width="100%" height="100%" className="w-full h-full text-indigo-600 dark:text-indigo-400">
        <defs>
          <pattern
            id={`dhaka-bg-${patternId}`}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Elegant large geometric weave */}
            <path
              d="M 30 0 L 60 30 L 30 60 L 0 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <path
              d="M 30 12 L 48 30 L 30 48 L 12 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
            {/* Intersecting weave details */}
            <path
              d="M 0 30 L 15 15 L 30 30 L 45 15 L 60 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <path
              d="M 0 30 L 15 45 L 30 30 L 45 45 L 60 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            {/* Small diamond nodes */}
            <path d="M 0 0 L 6 0 L 0 6 Z M 60 0 L 54 0 L 60 6 Z M 0 60 L 6 60 L 0 54 Z M 60 60 L 54 60 L 60 54 Z" fill="currentColor" />
            <circle cx="30" cy="30" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dhaka-bg-${patternId})`} />
      </svg>
    </div>
  );
}
