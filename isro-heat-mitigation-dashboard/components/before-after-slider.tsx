'use client';

import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Original',
  afterLabel = 'Heat Mapped',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-card border border-border">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-video cursor-col-resize select-none"
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-orange-400 flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">Heat Intensity</div>
            <div className="flex gap-4 justify-center">
              <div className="text-xs text-white/80">
                <div className="w-4 h-4 bg-red-600 rounded mb-1"></div>
                High
              </div>
              <div className="text-xs text-white/80">
                <div className="w-4 h-4 bg-yellow-400 rounded mb-1"></div>
                Medium
              </div>
              <div className="text-xs text-white/80">
                <div className="w-4 h-4 bg-green-500 rounded mb-1"></div>
                Low
              </div>
            </div>
          </div>
        </div>

        {/* Before Image (Foreground) */}
        <div
          className="absolute inset-0 overflow-hidden flex items-center justify-center bg-gradient-to-b from-blue-400 to-green-600"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="text-center text-white">
            <div className="text-2xl font-bold mb-2">Original Satellite</div>
            <p className="text-sm">Google Earth / Bhuvan Image</p>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-white to-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-500">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-gray-400"></div>
                <div className="w-0.5 h-4 bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}
