import React from 'react';

/**
 * BusinessBackgroundDecor:
 * Minimalist, elegant orbital & geometric vector graphics on pure white background,
 * styled with ultra-subtle, low-opacity strokes and gentle luminous ambient glows.
 *
 * Designed to provide a polished, high-end tech aesthetic that sits quietly behind
 * all typography, cards, and interactive elements.
 */
export const BusinessBackgroundDecor: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Fine Architectural Grid Matrix (Ultra-subtle, clean, modern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* 2. Soft Ambient Radial Light Meshes (Whisper-quiet luminous tint) */}
      <div className="absolute -top-24 right-0 w-[650px] sm:w-[850px] h-[500px] bg-gradient-to-b from-blue-400/[0.035] via-sky-300/[0.02] to-transparent blur-[140px] rounded-full" />
      <div className="absolute top-[30%] -left-32 w-[600px] sm:w-[750px] h-[550px] bg-gradient-to-tr from-cyan-400/[0.025] via-blue-300/[0.015] to-transparent blur-[150px] rounded-full" />
      <div className="absolute top-[62%] -right-24 w-[650px] sm:w-[800px] h-[550px] bg-gradient-to-bl from-blue-400/[0.025] via-indigo-300/[0.015] to-transparent blur-[150px] rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[700px] h-[450px] bg-gradient-to-t from-emerald-400/[0.02] via-sky-300/[0.01] to-transparent blur-[150px] rounded-full" />

      {/* =========================================================================
          GRAPHIC 1: Hero & Upper Section (Top-Right)
          Concentric dashed & solid orbital rings with sweeping bezier trajectory
      ========================================================================== */}
      <svg
        className="absolute -top-6 -right-16 sm:right-0 md:right-6 lg:right-12 w-[380px] sm:w-[480px] lg:w-[560px] h-[360px] sm:h-[440px] pointer-events-none select-none opacity-50 sm:opacity-60"
        viewBox="0 0 540 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Outer Concentric Dashed Ring */}
        <circle cx="340" cy="200" r="170" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.3" />

        {/* Middle Solid Fine Ring */}
        <circle cx="340" cy="200" r="115" stroke="#60a5fa" strokeWidth="1" opacity="0.25" />

        {/* Inner Concentric Dashed Ring */}
        <circle cx="340" cy="200" r="70" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.3" />

        {/* Innermost Core Ring */}
        <circle cx="340" cy="200" r="30" stroke="#3b82f6" strokeWidth="0.6" opacity="0.2" />

        {/* Horizontal Guide Axis Line (Dashed) */}
        <line x1="40" y1="200" x2="520" y2="200" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.22" />

        {/* Diagonal 45° Guide Axis (Dashed) */}
        <line x1="200" y1="340" x2="480" y2="60" stroke="#dbeafe" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.18" />

        {/* Primary Sweeping Orbital Curve */}
        <path
          d="M 20 310 C 160 290, 260 220, 360 170 C 440 130, 490 95, 530 65"
          stroke="url(#orbGrad1)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Secondary Harmonic Wave Arc */}
        <path
          d="M 100 350 C 210 300, 310 230, 440 150 C 490 120, 520 90, 540 75"
          stroke="#93c5fd"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.25"
        />

        {/* Intersection Micro-Nodes */}
        <circle cx="340" cy="85" r="2.5" fill="#3b82f6" opacity="0.35" />
        <circle cx="340" cy="315" r="2.5" fill="#3b82f6" opacity="0.35" />
        <circle cx="455" cy="200" r="3" fill="#2563eb" opacity="0.4" />
        <circle cx="360" cy="170" r="3.5" fill="#06b6d4" opacity="0.45" />
      </svg>

      {/* =========================================================================
          GRAPHIC 2: Solutions & Growth Pillars (~30% scroll, Mid-Left)
          Mirrored celestial/orbital concentric rings with ascending wave
      ========================================================================== */}
      <svg
        className="absolute top-[28%] -left-16 sm:-left-6 md:left-2 lg:left-8 w-[360px] sm:w-[460px] lg:w-[520px] h-[340px] sm:h-[420px] pointer-events-none select-none opacity-50 sm:opacity-60"
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer Concentric Dashed Ring */}
        <circle cx="170" cy="200" r="160" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.28" />

        {/* Middle Solid Fine Ring */}
        <circle cx="170" cy="200" r="110" stroke="#60a5fa" strokeWidth="1" opacity="0.22" />

        {/* Inner Concentric Dashed Ring */}
        <circle cx="170" cy="200" r="65" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.28" />

        {/* Horizontal Guide Axis Line (Dashed) */}
        <line x1="10" y1="200" x2="460" y2="200" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.2" />

        {/* Diagonal Guide Axis (Dashed) */}
        <line x1="50" y1="80" x2="290" y2="320" stroke="#dbeafe" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.18" />

        {/* Sweeping Trajectory Curve Flowing Outward */}
        <path
          d="M 10 90 C 80 120, 140 180, 220 220 C 310 265, 410 280, 490 285"
          stroke="url(#orbGrad2)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Secondary Harmonic Wave */}
        <path
          d="M 40 50 C 120 90, 190 160, 290 220 C 370 260, 440 275, 500 280"
          stroke="#93c5fd"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.22"
        />

        {/* Intersection Micro-Nodes */}
        <circle cx="170" cy="90" r="2.5" fill="#06b6d4" opacity="0.35" />
        <circle cx="280" cy="200" r="3" fill="#3b82f6" opacity="0.4" />
        <circle cx="220" cy="220" r="3" fill="#2563eb" opacity="0.4" />
      </svg>

      {/* =========================================================================
          GRAPHIC 3: Process & Case Studies (~60% scroll, Mid-Right)
          Concentric orbital rings matching user's reference image
      ========================================================================== */}
      <svg
        className="absolute top-[58%] -right-16 sm:-right-8 md:right-2 lg:right-10 w-[380px] sm:w-[480px] lg:w-[540px] h-[360px] sm:h-[420px] pointer-events-none select-none opacity-50 sm:opacity-60"
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer Concentric Dashed Ring */}
        <circle cx="320" cy="190" r="165" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.3" />

        {/* Middle Solid Fine Ring */}
        <circle cx="320" cy="190" r="115" stroke="#60a5fa" strokeWidth="1" opacity="0.25" />

        {/* Inner Concentric Dashed Ring */}
        <circle cx="320" cy="190" r="68" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.3" />

        {/* Horizontal Guide Axis Line (Dashed) */}
        <line x1="30" y1="190" x2="490" y2="190" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.22" />

        {/* Sweeping Orbital Curve */}
        <path
          d="M 20 280 C 140 260, 240 210, 340 160 C 410 125, 460 95, 505 70"
          stroke="url(#orbGrad3)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Secondary Harmonic Wave */}
        <path
          d="M 80 320 C 190 280, 280 220, 390 150 C 445 115, 480 90, 515 75"
          stroke="#93c5fd"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.24"
        />

        {/* Intersection Micro-Nodes */}
        <circle cx="320" cy="75" r="2.5" fill="#10b981" opacity="0.35" />
        <circle cx="435" cy="190" r="3" fill="#3b82f6" opacity="0.4" />
        <circle cx="340" cy="160" r="3.5" fill="#2563eb" opacity="0.4" />
      </svg>

      {/* =========================================================================
          GRAPHIC 4: Lower Section & Testimonials / FAQ (~82% scroll, Lower-Left)
          Harmonic concentric curves & technical radar axes
      ========================================================================== */}
      <svg
        className="absolute top-[82%] -left-14 sm:-left-4 md:left-4 lg:left-10 w-[350px] sm:w-[440px] lg:w-[500px] h-[340px] sm:h-[400px] pointer-events-none select-none opacity-50 sm:opacity-60"
        viewBox="0 0 480 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Concentric Dashed Ring */}
        <circle cx="180" cy="190" r="150" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5 7" opacity="0.25" />

        {/* Middle Solid Fine Ring */}
        <circle cx="180" cy="190" r="100" stroke="#60a5fa" strokeWidth="1" opacity="0.2" />

        {/* Inner Concentric Dashed Ring */}
        <circle cx="180" cy="190" r="58" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.25" />

        {/* Horizontal Guide Axis Line (Dashed) */}
        <line x1="20" y1="190" x2="440" y2="190" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.18" />

        {/* Sweeping Trajectory Curve */}
        <path
          d="M 20 100 C 90 130, 160 180, 240 215 C 320 250, 400 270, 460 275"
          stroke="#60a5fa"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.32"
        />

        {/* Intersection Micro-Nodes */}
        <circle cx="280" cy="190" r="2.5" fill="#3b82f6" opacity="0.35" />
        <circle cx="240" cy="215" r="3" fill="#2563eb" opacity="0.4" />
      </svg>

      {/* =========================================================================
          PRECISION COORDINATE ACCENTS (Subtle Crosshairs '+')
      ========================================================================== */}
      <div className="absolute top-20 left-8 text-blue-400/20 text-lg font-mono select-none hidden sm:block">
        +
      </div>
      <div className="absolute top-48 right-16 text-blue-500/20 text-lg font-mono select-none hidden sm:block">
        +
      </div>
      <div className="absolute top-[26%] right-[12%] text-sky-400/20 text-base font-mono select-none">
        +
      </div>
      <div className="absolute top-[42%] left-[8%] text-blue-500/18 text-base font-mono select-none">
        +
      </div>
      <div className="absolute top-[60%] right-[10%] text-cyan-500/20 text-base font-mono select-none">
        +
      </div>
      <div className="absolute top-[75%] left-[10%] text-blue-500/18 text-base font-mono select-none">
        +
      </div>
      <div className="absolute top-[90%] right-[14%] text-slate-400/18 text-base font-mono select-none">
        +
      </div>
    </div>
  );
};
