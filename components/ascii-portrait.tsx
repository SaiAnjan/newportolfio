"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "./ascii-portrait.module.css";

const ASCII_RAMP = " .,:;i1tfLCG08@";
const PORTRAIT_SOURCE = "/images/sai-anjan-portrait.jpg";

type Point = {
  x: number;
  y: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function AsciiPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleContext) return;

    const image = new Image();
    let animationFrame = 0;
    let pointer: Point | null = null;
    let imageReady = false;

    const render = () => {
      animationFrame = 0;
      if (!imageReady) return;

      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = Math.round(bounds.width * pixelRatio);
      const canvasHeight = Math.round(bounds.height * pixelRatio);

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);

      const cellWidth = 4.4;
      const cellHeight = 6;
      const columns = Math.max(1, Math.floor(bounds.width / cellWidth));
      const rows = Math.max(1, Math.floor(bounds.height / cellHeight));
      sampleCanvas.width = columns;
      sampleCanvas.height = rows;

      const targetAspect = bounds.width / bounds.height;
      const cropWidth = image.naturalWidth * 0.62;
      const cropHeight = cropWidth / targetAspect;
      const focusX = image.naturalWidth * 0.43;
      const focusY = image.naturalHeight * 0.49;
      const sourceX = clamp(focusX - cropWidth / 2, 0, image.naturalWidth - cropWidth);
      const sourceY = clamp(focusY - cropHeight / 2, 0, image.naturalHeight - cropHeight);

      sampleContext.clearRect(0, 0, columns, rows);
      sampleContext.drawImage(
        image,
        sourceX,
        sourceY,
        cropWidth,
        cropHeight,
        0,
        0,
        columns,
        rows,
      );

      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "245, 245, 242" : "24, 24, 22";
      const fontSize = 5.8;

      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `500 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const pixelIndex = (row * columns + column) * 4;
          const red = pixels[pixelIndex];
          const green = pixels[pixelIndex + 1];
          const blue = pixels[pixelIndex + 2];
          const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
          const darkness = clamp((1 - luminance - 0.16) / 0.7, 0, 1);
          const x = (column + 0.5) * (bounds.width / columns);
          const y = (row + 0.5) * (bounds.height / rows);

          let influence = 0;
          if (pointer) {
            const distance = Math.hypot(x - pointer.x, y - pointer.y);
            influence = Math.max(0, 1 - distance / Math.min(bounds.width, bounds.height) / 0.48);
          }

          if (darkness < 0.08 && influence < 0.12) continue;

          const rampIndex = clamp(
            Math.round(darkness * (ASCII_RAMP.length - 1) + influence * 1.25),
            0,
            ASCII_RAMP.length - 1,
          );
          const character = ASCII_RAMP[rampIndex];
          if (character === " ") continue;

          const alpha = clamp(0.2 + darkness * 0.72 + influence * 0.16, 0, 0.96);
          let offsetX = 0;
          let offsetY = 0;

          if (pointer && influence > 0 && !prefersReducedMotion) {
            const distance = Math.max(1, Math.hypot(x - pointer.x, y - pointer.y));
            const displacement = influence * 0.75;
            offsetX = ((x - pointer.x) / distance) * displacement;
            offsetY = ((y - pointer.y) / distance) * displacement;
          }

          context.fillStyle = `rgba(${color}, ${alpha})`;
          context.fillText(character, x + offsetX, y + offsetY);
        }
      }
    };

    const scheduleRender = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      scheduleRender();
    };

    const handlePointerLeave = () => {
      pointer = null;
      scheduleRender();
    };

    image.onload = () => {
      imageReady = true;
      scheduleRender();
    };
    image.src = PORTRAIT_SOURCE;

    const resizeObserver = new ResizeObserver(scheduleRender);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(scheduleRender);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      image.onload = null;
    };
  }, [prefersReducedMotion]);

  return (
    <div className={styles.portrait}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        role="img"
        aria-label="ASCII portrait of Sai Anjan"
      />
    </div>
  );
}
