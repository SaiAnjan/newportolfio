"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useState } from "react";
import styles from "./wavepro-report-loader.module.css";

type DotSpec = {
  x: number;
  y: number;
  fill: string;
  opacity?: number;
};

type PixelFill =
  | "#0C7952"
  | "#2BBD71"
  | "#40C185"
  | "#79CB2C"
  | "#C8E902"
  | "#D9FC8C";

type PixelSpec = {
  x: number;
  y: number;
  fill: PixelFill;
};

const PIXEL_SECTION_TOP_Y = 354;
const PAGE_TRANSFORM_X = 233;
const PAGE_SCALE_Y = 221 / 317.98;
const PAGE_TRANSFORM_Y = 133 - 27 * PAGE_SCALE_Y;
const PAGE_X = 36 + PAGE_TRANSFORM_X;
const PAGE_Y = 27 * PAGE_SCALE_Y + PAGE_TRANSFORM_Y;
const PAGE_WIDTH = 259;
const PAGE_REVEAL_HEIGHT = PIXEL_SECTION_TOP_Y - PAGE_Y + 0.5;

const BACKGROUND_DOTS: DotSpec[] = [
  { x: 60, y: 136, fill: "#F8F8F8", opacity: 0.5 },
  { x: 60, y: 241, fill: "#F8F8F8", opacity: 0.5 },
  { x: 60, y: 381, fill: "#D9D9D9" },
  { x: 102, y: 136, fill: "#D9D9D9" },
  { x: 102, y: 171, fill: "#D9D9D9" },
  { x: 102, y: 241, fill: "#D9D9D9" },
  { x: 102, y: 381, fill: "#969696" },
  { x: 102, y: 416, fill: "#969696" },
  { x: 102, y: 486, fill: "#969696" },
  { x: 144, y: 136, fill: "#000000", opacity: 0.7 },
  { x: 144, y: 171, fill: "#D9D9D9" },
  { x: 144, y: 241, fill: "#D9D9D9" },
  { x: 144, y: 276, fill: "#D9D9D9" },
  { x: 144, y: 311, fill: "#D9D9D9" },
  { x: 144, y: 346, fill: "#F8F8F8", opacity: 0.5 },
  { x: 144, y: 381, fill: "#F8F8F8", opacity: 0.5 },
  { x: 144, y: 416, fill: "#F8F8F8", opacity: 0.5 },
  { x: 144, y: 451, fill: "#F8F8F8", opacity: 0.5 },
  { x: 186, y: 66, fill: "#D9D9D9" },
  { x: 186, y: 101, fill: "#D9D9D9" },
  { x: 186, y: 136, fill: "#D9D9D9" },
  { x: 186, y: 171, fill: "#F8F8F8", opacity: 0.5 },
  { x: 186, y: 241, fill: "#D9D9D9" },
  { x: 186, y: 311, fill: "#D9D9D9" },
  { x: 228, y: 66, fill: "#D9D9D9" },
  { x: 228, y: 101, fill: "#F8F8F8", opacity: 0.5 },
  { x: 228, y: 136, fill: "#F8F8F8", opacity: 0.5 },
  { x: 228, y: 171, fill: "#D9D9D9" },
  { x: 228, y: 241, fill: "#F8F8F8", opacity: 0.5 },
  { x: 228, y: 311, fill: "#D9D9D9" },
  { x: 270, y: 66, fill: "#D9D9D9" },
  { x: 270, y: 101, fill: "#969696" },
  { x: 270, y: 136, fill: "#D9D9D9" },
  { x: 270, y: 171, fill: "#D9D9D9" },
  { x: 270, y: 206, fill: "#D9D9D9" },
  { x: 270, y: 241, fill: "#D9D9D9" },
  { x: 270, y: 311, fill: "#F8F8F8", opacity: 0.5 },
  { x: 270, y: 346, fill: "#D9D9D9" },
  { x: 312, y: 136, fill: "#000000", opacity: 0.7 },
  { x: 312, y: 171, fill: "#D9D9D9" },
  { x: 312, y: 206, fill: "#D9D9D9" },
  { x: 312, y: 241, fill: "#D9D9D9" },
  { x: 312, y: 276, fill: "#D9D9D9" },
  { x: 312, y: 311, fill: "#000000", opacity: 0.7 },
  { x: 312, y: 346, fill: "#D9D9D9" },
  { x: 354, y: 66, fill: "#D9D9D9" },
  { x: 354, y: 101, fill: "#D9D9D9" },
  { x: 354, y: 136, fill: "#D9D9D9" },
  { x: 354, y: 241, fill: "#D9D9D9" },
  { x: 354, y: 311, fill: "#D9D9D9" },
  { x: 354, y: 346, fill: "#D9D9D9" },
  { x: 396, y: 136, fill: "#D9D9D9" },
  { x: 396, y: 241, fill: "#D9D9D9" },
  { x: 396, y: 276, fill: "#D9D9D9" },
  { x: 396, y: 311, fill: "#D9D9D9" },
  { x: 396, y: 346, fill: "#D9D9D9" },
  { x: 396, y: 381, fill: "#D9D9D9" },
  { x: 396, y: 416, fill: "#D9D9D9" },
  { x: 396, y: 486, fill: "#D9D9D9" },
  { x: 438, y: 66, fill: "#D9D9D9" },
  { x: 438, y: 101, fill: "#969696" },
  { x: 438, y: 136, fill: "#969696" },
  { x: 438, y: 241, fill: "#000000", opacity: 0.7 },
  { x: 438, y: 276, fill: "#969696" },
  { x: 438, y: 311, fill: "#D9D9D9" },
  { x: 480, y: 66, fill: "#F8F8F8", opacity: 0.5 },
  { x: 480, y: 101, fill: "#D9D9D9" },
  { x: 480, y: 136, fill: "#D9D9D9" },
  { x: 480, y: 241, fill: "#D9D9D9" },
  { x: 480, y: 276, fill: "#969696" },
  { x: 480, y: 311, fill: "#F8F8F8", opacity: 0.5 },
  { x: 480, y: 346, fill: "#D9D9D9" },
  { x: 480, y: 381, fill: "#F8F8F8", opacity: 0.5 },
  { x: 480, y: 416, fill: "#000000", opacity: 0.7 },
  { x: 480, y: 451, fill: "#D9D9D9" },
  { x: 522, y: 101, fill: "#D9D9D9" },
  { x: 522, y: 241, fill: "#000000", opacity: 0.7 },
  { x: 522, y: 276, fill: "#D9D9D9" },
  { x: 522, y: 451, fill: "#D9D9D9" },
  { x: 522, y: 486, fill: "#D9D9D9" },
  { x: 564, y: 136, fill: "#D9D9D9" },
  { x: 564, y: 241, fill: "#000000", opacity: 0.7 },
  { x: 564, y: 276, fill: "#969696" },
  { x: 564, y: 451, fill: "#D9D9D9" },
  { x: 606, y: 101, fill: "#D9D9D9" },
  { x: 606, y: 136, fill: "#D9D9D9" },
  { x: 606, y: 241, fill: "#F8F8F8", opacity: 0.5 },
  { x: 606, y: 276, fill: "#D9D9D9" },
  { x: 648, y: 66, fill: "#D9D9D9" },
  { x: 648, y: 101, fill: "#F8F8F8", opacity: 0.5 },
  { x: 648, y: 136, fill: "#D9D9D9" },
  { x: 648, y: 241, fill: "#D9D9D9" },
  { x: 648, y: 276, fill: "#D9D9D9" },
  { x: 648, y: 486, fill: "#D9D9D9" },
];

const DITHER_PIXELS: PixelSpec[] = [
  { x: 274, y: 354, fill: "#0C7952" },
  { x: 283, y: 354, fill: "#0C7952" },
  { x: 292, y: 354, fill: "#0C7952" },
  { x: 301, y: 354, fill: "#0C7952" },
  { x: 310, y: 354, fill: "#0C7952" },
  { x: 319, y: 354, fill: "#0C7952" },
  { x: 328, y: 354, fill: "#0C7952" },
  { x: 337, y: 354, fill: "#0C7952" },
  { x: 346, y: 354, fill: "#0C7952" },
  { x: 355, y: 354, fill: "#0C7952" },
  { x: 364, y: 354, fill: "#0C7952" },
  { x: 373, y: 354, fill: "#0C7952" },
  { x: 382, y: 354, fill: "#0C7952" },
  { x: 391, y: 354, fill: "#0C7952" },
  { x: 400, y: 354, fill: "#0C7952" },
  { x: 409, y: 354, fill: "#0C7952" },
  { x: 418, y: 354, fill: "#0C7952" },
  { x: 427, y: 354, fill: "#0C7952" },
  { x: 436, y: 354, fill: "#0C7952" },
  { x: 445, y: 354, fill: "#0C7952" },
  { x: 454, y: 354, fill: "#0C7952" },
  { x: 463, y: 354, fill: "#0C7952" },
  { x: 472, y: 354, fill: "#0C7952" },
  { x: 481, y: 354, fill: "#0C7952" },
  { x: 490, y: 354, fill: "#0C7952" },
  { x: 499, y: 354, fill: "#0C7952" },
  { x: 508, y: 354, fill: "#0C7952" },
  { x: 517, y: 354, fill: "#0C7952" },
  { x: 283, y: 363, fill: "#2BBD71" },
  { x: 292, y: 363, fill: "#2BBD71" },
  { x: 310, y: 363, fill: "#2BBD71" },
  { x: 319, y: 363, fill: "#2BBD71" },
  { x: 328, y: 363, fill: "#2BBD71" },
  { x: 355, y: 363, fill: "#2BBD71" },
  { x: 382, y: 363, fill: "#2BBD71" },
  { x: 391, y: 363, fill: "#2BBD71" },
  { x: 400, y: 363, fill: "#2BBD71" },
  { x: 409, y: 363, fill: "#2BBD71" },
  { x: 418, y: 363, fill: "#2BBD71" },
  { x: 436, y: 363, fill: "#2BBD71" },
  { x: 454, y: 363, fill: "#2BBD71" },
  { x: 472, y: 363, fill: "#2BBD71" },
  { x: 481, y: 363, fill: "#2BBD71" },
  { x: 499, y: 363, fill: "#2BBD71" },
  { x: 508, y: 363, fill: "#2BBD71" },
  { x: 283, y: 372, fill: "#40C185" },
  { x: 292, y: 372, fill: "#40C185" },
  { x: 328, y: 372, fill: "#40C185" },
  { x: 337, y: 372, fill: "#40C185" },
  { x: 355, y: 372, fill: "#40C185" },
  { x: 364, y: 372, fill: "#40C185" },
  { x: 391, y: 372, fill: "#40C185" },
  { x: 409, y: 372, fill: "#40C185" },
  { x: 427, y: 372, fill: "#40C185" },
  { x: 436, y: 372, fill: "#40C185" },
  { x: 463, y: 372, fill: "#40C185" },
  { x: 472, y: 372, fill: "#40C185" },
  { x: 490, y: 372, fill: "#40C185" },
  { x: 499, y: 372, fill: "#40C185" },
  { x: 517, y: 372, fill: "#40C185" },
  { x: 274, y: 381, fill: "#79CB2C" },
  { x: 283, y: 381, fill: "#79CB2C" },
  { x: 310, y: 381, fill: "#79CB2C" },
  { x: 328, y: 381, fill: "#79CB2C" },
  { x: 364, y: 381, fill: "#79CB2C" },
  { x: 373, y: 381, fill: "#79CB2C" },
  { x: 400, y: 381, fill: "#79CB2C" },
  { x: 418, y: 381, fill: "#79CB2C" },
  { x: 427, y: 381, fill: "#79CB2C" },
  { x: 472, y: 381, fill: "#79CB2C" },
  { x: 517, y: 381, fill: "#79CB2C" },
  { x: 283, y: 390, fill: "#C8E902" },
  { x: 292, y: 390, fill: "#C8E902" },
  { x: 310, y: 390, fill: "#C8E902" },
  { x: 337, y: 390, fill: "#C8E902" },
  { x: 346, y: 390, fill: "#C8E902" },
  { x: 355, y: 390, fill: "#C8E902" },
  { x: 364, y: 390, fill: "#C8E902" },
  { x: 382, y: 390, fill: "#C8E902" },
  { x: 427, y: 390, fill: "#C8E902" },
  { x: 436, y: 390, fill: "#C8E902" },
  { x: 463, y: 390, fill: "#C8E902" },
  { x: 490, y: 390, fill: "#C8E902" },
  { x: 274, y: 399, fill: "#D9FC8C" },
  { x: 292, y: 399, fill: "#D9FC8C" },
  { x: 319, y: 399, fill: "#D9FC8C" },
  { x: 364, y: 399, fill: "#D9FC8C" },
  { x: 382, y: 399, fill: "#D9FC8C" },
  { x: 418, y: 399, fill: "#D9FC8C" },
  { x: 436, y: 399, fill: "#D9FC8C" },
  { x: 463, y: 399, fill: "#D9FC8C" },
  { x: 508, y: 399, fill: "#D9FC8C" },
];

const PIXEL_GLOW_SEQUENCE: Record<PixelFill, readonly [string, string, string, string]> =
  {
    "#0C7952": ["#0C7952", "#18B27E", "#2BBD71", "#0C7952"],
    "#2BBD71": ["#2BBD71", "#40C185", "#79CB2C", "#2BBD71"],
    "#40C185": ["#40C185", "#79CB2C", "#C8E902", "#40C185"],
    "#79CB2C": ["#79CB2C", "#C8E902", "#D9FC8C", "#79CB2C"],
    "#C8E902": ["#C8E902", "#D9FC8C", "#F0FFB1", "#C8E902"],
    "#D9FC8C": ["#D9FC8C", "#F0FFB1", "#E4FF90", "#D9FC8C"],
  };

export function WaveproReportLoader() {
  const reducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [glowActive, setGlowActive] = useState(Boolean(reducedMotion));
  const baseId = useId().replace(/:/g, "");

  const maskId = `${baseId}-mask`;
  const paperGradientId = `${baseId}-paper`;
  const glowGradientId = `${baseId}-glow`;
  const railGradientId = `${baseId}-rail`;
  const pageShadowId = `${baseId}-page-shadow`;
  const bloomFilterId = `${baseId}-bloom`;
  const lineBloomId = `${baseId}-line-bloom`;

  const runSequence = useCallback(async () => {
    if (reducedMotion) {
      controls.set({ y: PAGE_Y, height: PAGE_REVEAL_HEIGHT });
      setGlowActive(true);
      return;
    }

    setGlowActive(false);
    controls.set({ y: PAGE_Y, height: 0 });
    await controls.start({
      y: PAGE_Y,
      height: PAGE_REVEAL_HEIGHT,
      transition: {
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
      },
    });
    setGlowActive(true);
  }, [controls, reducedMotion]);

  useEffect(() => {
    void runSequence();
  }, [runSequence]);

  return (
    <div
      className={styles.wrapper}
      onPointerEnter={() => {
        void runSequence();
      }}
    >
      <svg
        viewBox="0 0 753 561"
        className={styles.svg}
        role="img"
        aria-label="Wavepro report generation animation"
      >
        <defs>
          <linearGradient
            id={paperGradientId}
            x1="165.5"
            y1="27"
            x2="165.5"
            y2="344.98"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#F4F8F7" />
          </linearGradient>
          <linearGradient
            id={glowGradientId}
            x1="399.5"
            y1="451"
            x2="399.5"
            y2="352"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C3E89F" stopOpacity="0" />
            <stop offset="1" stopColor="#28B783" />
          </linearGradient>
          <linearGradient
            id={railGradientId}
            x1="398"
            y1="346.5"
            x2="398"
            y2="365.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18B27E" />
            <stop offset="1" stopColor="#0A4C36" />
          </linearGradient>
          <filter
            id={pageShadowId}
            x="0"
            y="0"
            width="331"
            height="389.98"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="8"
              operator="dilate"
              in="SourceAlpha"
              result="spread"
            />
            <feOffset dy="9" />
            <feGaussianBlur stdDeviation="14" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
            />
            <feBlend in2="BackgroundImageFix" result="shadow1" />
            <feOffset dy="6" />
            <feGaussianBlur stdDeviation="8" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
            />
            <feBlend in="shadow1" result="shadow2" />
            <feBlend in="SourceGraphic" in2="shadow2" result="shape" />
          </filter>
          <filter
            id={bloomFilterId}
            x="232"
            y="300"
            width="337"
            height="173"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
          </filter>
          <filter
            id={lineBloomId}
            x="250"
            y="333"
            width="296"
            height="35"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>
          <mask id={maskId}>
            <rect x="0" y="0" width="753" height="561" fill="black" />
            <motion.rect
              x={PAGE_X}
              y={PAGE_Y}
              width={PAGE_WIDTH}
              fill="white"
              initial={false}
              animate={controls}
            />
          </mask>
        </defs>

        {BACKGROUND_DOTS.map((dot, index) => (
          <rect
            key={`${dot.x}-${dot.y}`}
            className={styles.bgDot}
            x={dot.x}
            y={dot.y}
            width="9"
            height="9"
            fill={dot.fill}
            fillOpacity={dot.opacity}
            style={
              {
                animationDelay: `${(index * 0.12) % 1.8}s`,
                animationDuration: `${2.2 + (index % 6) * 0.4}s`,
              } as CSSProperties
            }
          />
        ))}

        <motion.rect
          x="273"
          y="352"
          width="253"
          height="99"
          fill={`url(#${glowGradientId})`}
          filter={`url(#${bloomFilterId})`}
          initial={false}
          animate={
            glowActive && !reducedMotion
              ? { opacity: [0.35, 0.75, 0.46, 0.68] }
              : { opacity: 0.25 }
          }
          transition={
            glowActive && !reducedMotion
              ? {
                  duration: 2.1,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
              : { duration: 0.2 }
          }
        />

        <g mask={`url(#${maskId})`}>
          <g
            transform={`translate(${PAGE_TRANSFORM_X} ${PAGE_TRANSFORM_Y}) scale(1 ${PAGE_SCALE_Y})`}
          >
            <g filter={`url(#${pageShadowId})`}>
              <rect
                x="36"
                y="27"
                width="259"
                height="317.98"
                rx="33.3366"
                fill={`url(#${paperGradientId})`}
              />
              <rect
                x="37.2822"
                y="28.2822"
                width="256.436"
                height="315.416"
                rx="32.0545"
                stroke="#F0F0F0"
                strokeWidth="2.56436"
              />
            </g>
            <rect x="65" y="84" width="79" height="18" rx="4" fill="#5F6664" />
            <rect x="65" y="129" width="200" height="10" rx="4" fill="#C4C9C8" />
            <rect x="65" y="167" width="95" height="10" rx="4" fill="#C4C9C8" />
            <rect x="171" y="167" width="95" height="10" rx="4" fill="#C4C9C8" />
            <rect x="65" y="205" width="62" height="10" rx="4" fill="#C4C9C8" />
            <rect x="138" y="205" width="26" height="10" rx="4" fill="#5F6664" />
            <rect x="175" y="205" width="90" height="10" rx="4" fill="#C4C9C8" />
            <rect x="65" y="243" width="44" height="10" rx="4" fill="#5F6664" />
            <rect x="120" y="243" width="147" height="10" rx="4" fill="#C4C9C8" />
            <rect x="65" y="281" width="146" height="10" rx="4" fill="#C4C9C8" />
            <rect x="218" y="281" width="48" height="10" rx="4" fill="#C4C9C8" />
          </g>
        </g>

        <motion.line
          x1="265.5"
          y1="350.5"
          x2="530.5"
          y2="350.5"
          stroke={`url(#${railGradientId})`}
          strokeWidth="7"
          strokeLinecap="round"
          filter={`url(#${lineBloomId})`}
          initial={false}
          animate={
            glowActive && !reducedMotion
              ? { opacity: [0.86, 1, 0.86] }
              : { opacity: 0.92 }
          }
          transition={
            glowActive && !reducedMotion
              ? {
                  duration: 1.6,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
              : { duration: 0.2 }
          }
        />

        {DITHER_PIXELS.map((pixel, index) => {
          const seed =
            ((pixel.x * 0.031 + pixel.y * 0.017 + index * 0.073) % 1 + 1) % 1;
          const duration = 1.25 + seed * 0.95;
          const delay = 0.15 + seed * 0.9;
          const fillSequence = [...PIXEL_GLOW_SEQUENCE[pixel.fill]];

          return (
            <motion.rect
              key={`${pixel.x}-${pixel.y}`}
              className={styles.ditherPixel}
              x={pixel.x}
              y={pixel.y}
              width="9"
              height="9"
              initial={false}
              animate={
                glowActive && !reducedMotion
                  ? {
                      fill: fillSequence,
                      opacity: [0.8, 1, 0.88, 0.96],
                    }
                  : {
                      fill: pixel.fill,
                      opacity: 1,
                    }
              }
              transition={
                glowActive && !reducedMotion
                  ? {
                      duration,
                      delay,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      times: [0, 0.33, 0.68, 1],
                    }
                  : { duration: 0.2 }
              }
            />
          );
        })}
      </svg>
    </div>
  );
}
