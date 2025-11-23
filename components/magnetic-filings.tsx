"use client";

import { useRef, useEffect, useState } from "react";

interface MagneticFilingsProps {
  className?: string;
}

export function MagneticFilings({ className = "" }: MagneticFilingsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 400 });
  const [mousePos, setMousePos] = useState({ x: 500, y: 200 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
          setMousePos({ x: rect.width / 2, y: rect.height / 2 });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;
        setMousePos({ x: relativeX, y: relativeY });
      }
    };

    updateDimensions();
    
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      containerRef.current.addEventListener("mousemove", handleMouseMove);
      containerRef.current.addEventListener("mouseenter", () => setIsHovered(true));
      containerRef.current.addEventListener("mouseleave", () => {
        setIsHovered(false);
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setMousePos({ x: rect.width / 2, y: rect.height / 2 });
        }
      });
    }

    window.addEventListener('resize', updateDimensions);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener("mouseenter", () => setIsHovered(true));
        containerRef.current.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, []);

  const gridSize = 40;
  const dashLength = 12;
  const dashWidth = 2.5;
  
  const rows = Math.ceil(dimensions.height / gridSize) + 2;
  const cols = Math.ceil(dimensions.width / gridSize) + 2;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        background: 'white',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      {/* Background Image Layer - Bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/bg_gradient.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      
      {/* Lines Animation Layer - Middle */}
      <svg 
        className="w-full h-full pointer-events-none" 
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 1,
          zIndex: 1,
        }}
      >
        {Array.from({ length: rows }).map((_, row) => {
          return Array.from({ length: cols }).map((_, col) => {
            const dashX = col * gridSize + gridSize / 2;
            const dashY = row * gridSize + gridSize / 2;
            
            // Only render lines within viewBox bounds
            if (dashX >= 0 && dashX <= dimensions.width && dashY >= 0 && dashY <= dimensions.height) {
              // Default: horizontal lines (neutral state)
              const baseAngle = 0;
              
              // Calculate vector from dash to cursor
              const dxMouse = mousePos.x - dashX;
              const dyMouse = mousePos.y - dashY;
              const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
              
              // Angle pointing directly towards cursor
              const magneticAngle = distance > 0 ? Math.atan2(dyMouse, dxMouse) : baseAngle;
              
              // Influence based on distance - closer dashes are more affected
              const maxDistance = 250;
              const minDistance = 30;
              let influence = 0;
              if (isHovered && distance > 0) {
                if (distance < minDistance) {
                  influence = 1;
                } else if (distance < maxDistance) {
                  influence = 1 - ((distance - minDistance) / (maxDistance - minDistance));
                }
              }
              
              // Blend between horizontal (default) and magnetic (towards cursor)
              const angle = baseAngle + (magneticAngle - baseAngle) * influence;
              
              const x1 = dashX - Math.cos(angle) * dashLength / 2;
              const y1 = dashY - Math.sin(angle) * dashLength / 2;
              const x2 = dashX + Math.cos(angle) * dashLength / 2;
              const y2 = dashY + Math.sin(angle) * dashLength / 2;

              return (
                <line
                  key={`${row}-${col}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth={dashWidth}
                  strokeLinecap="round"
                  style={{ 
                    transition: 'all 0.15s ease-out',
                  }}
                />
              );
            }
            return null;
          });
        })}
      </svg>
    </div>
  );
}
