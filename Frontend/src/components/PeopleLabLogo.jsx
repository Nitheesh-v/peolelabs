import React from 'react';
import { motion } from 'framer-motion';

export default function PeopleLabLogo({ size = 'md', animated = false, darkBackground = false }) {
  // Dimensions scaling based on size prop
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    intro: 'w-28 h-28 sm:w-36 sm:h-36'
  };

  const textSizes = {
    sm: { main: 'text-lg', sub: 'text-[9px] tracking-[0.2em]' },
    md: { main: 'text-2xl', sub: 'text-[10px] tracking-[0.22em]' },
    lg: { main: 'text-3xl', sub: 'text-[11px] tracking-[0.25em]' },
    xl: { main: 'text-4xl sm:text-5xl', sub: 'text-xs tracking-[0.28em]' },
    intro: { main: 'text-3xl sm:text-5xl lg:text-6xl', sub: 'text-xs sm:text-sm tracking-[0.3em]' }
  };

  const currentIconSize = iconSizes[size] || iconSizes.md;
  const currentTextSize = textSizes[size] || textSizes.md;

  // Clean Sky Blue + Vibrant Emerald Green Palette
  const skyBlueColor = darkBackground ? '#FFFFFF' : '#0EA5E9';
  const greenColor = darkBackground ? '#6EE7B7' : '#10B981';
  const subTextColor = darkBackground ? '#E0F2FE' : '#0284C7';

  return (
    <div className="flex items-center space-x-3 select-none">
      
      {/* ISOMETRIC 3D PL EMBLEM (Exact geometry with Sky Blue + Emerald Green) */}
      <motion.div 
        whileHover={animated ? { scale: 1.08, rotateY: 15, rotateX: -10 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className={`relative shrink-0 ${currentIconSize} flex items-center justify-center filter drop-shadow-md`}
        style={{ perspective: 1000 }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300"
        >
          <defs>
            {/* Sky Blue 3D Bevel Gradient */}
            <linearGradient id="skyBlueBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Emerald Green 3D Bevel Gradient */}
            <linearGradient id="emeraldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Subtle Inner Glow Filter */}
            <filter id="plGlowSky" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0EA5E9" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* TOP / LEFT SKY BLUE "P" RIBBON (Upper 3D isometric frame) */}
          <path
            d="M 50 8
               L 85 28
               L 85 45
               L 65 33
               L 65 24
               L 50 15
               L 35 24
               L 35 62
               L 20 53
               L 20 28
               Z"
            fill="url(#skyBlueBevel)"
            filter="url(#plGlowSky)"
          />

          {/* INNER SKY BLUE P CROSSBAR */}
          <path
            d="M 35 24
               L 65 24
               L 65 42
               L 35 25
               Z"
            fill="#0284C7"
            opacity="0.9"
          />

          {/* BOTTOM / RIGHT EMERALD GREEN "L" CHECKMARK RIBBON */}
          <path
            d="M 20 58
               L 35 67
               L 35 83
               L 50 92
               L 85 71
               L 85 55
               L 50 76
               L 35 67
               Z"
            fill="url(#emeraldBevel)"
            filter="url(#plGlowSky)"
          />
        </svg>
      </motion.div>

      {/* TYPOGRAPHY: People [Sky Blue] Lab [Emerald Green] + CONSULTING INC. */}
      <div className="flex flex-col text-left">
        <div className={`font-extrabold tracking-tight font-['Inter'] flex items-center leading-none ${currentTextSize.main}`}>
          <span style={{ color: skyBlueColor }}>People</span>
          <span style={{ color: greenColor }} className="font-extrabold">Lab</span>
        </div>
        <span 
          className={`uppercase font-bold block ${currentTextSize.sub} mt-1`}
          style={{ color: subTextColor }}
        >
          CONSULTING INC.
        </span>
      </div>

    </div>
  );
}
