"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Three irregular branches frame the page; the middle stays open for reading.
const leaves = [
  [544, 90, -58, 1.05], [540, 137, 51, .95],
  [508, 183, -64, 1.15], [505, 234, 48, 1.1],
  [464, 283, -61, 1.2], [459, 332, 50, .9],
  [406, 385, -65, 1.1], [402, 436, 47, 1.2],
  [348, 490, -59, 1.05], [338, 542, 44, 1],
  [289, 597, -63, .95], [282, 647, 39, .85],
  [619, 293, 53, 1.1], [582, 361, -38, .9],
  [556, 410, 64, 1.15], [515, 472, -32, 1],
  [490, 524, 62, .95], [451, 581, -30, .85],
  [419, 184, -53, .9], [375, 205, 34, 1],
  [326, 213, -56, .9], [284, 239, 32, .8],
  [237, 245, -51, .85], [192, 268, 35, .75],
] as const;

function CanopyArtwork({ className }: { className: string }) {
  const renderLeaves = (start: number, end: number) => leaves.slice(start, end).map(([x, y, angle, scale], index) => (
    <g key={start + index} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <g className="courtyard-leaf-flutter" style={{
        "--leaf-duration": `${4.2 + (start + index) % 4 * .7}s`,
        "--leaf-delay": `${-(start + index) * .67}s`,
      } as CSSProperties}>
        <path d="M0 0C-29-12-37-52-10-92C15-65 27-25 0 0Z" />
      </g>
    </g>
  ));

  return (
    <svg className={className} viewBox="0 0 640 800" fill="currentColor" focusable="false">
      <g className="courtyard-bough courtyard-bough-main">
        <path className="courtyard-branch" d="M636-54C527 68 572 206 468 310S343 496 246 716" />
        {renderLeaves(0, 12)}
        <g className="courtyard-bough courtyard-bough-twig">
          <path className="courtyard-branch" d="M524 150C414 222 319 195 160 284" />
          {renderLeaves(18, 24)}
        </g>
      </g>
      <g className="courtyard-bough courtyard-bough-side">
        <path className="courtyard-branch" d="M640 236C583 339 566 439 414 638" />
        {renderLeaves(12, 18)}
      </g>
    </svg>
  );
}

function Canopy({ className }: { className: string }) {
  return (
    <div className={`courtyard-canopy ${className}`}>
      <CanopyArtwork className="courtyard-leaf-shadow" />
      <CanopyArtwork className="courtyard-leaves" />
    </div>
  );
}

function Cloud({ className }: { className: string }) {
  return (
    <div className={`courtyard-cloud ${className}`}>
      <svg viewBox="0 0 800 230" focusable="false">
        <path className="courtyard-cloud-body" d="M39 169C20 147 39 121 80 122C77 86 123 69 162 89C177 40 239 25 281 64C308 2 400 3 432 66C474 37 537 60 542 106C578 77 637 95 644 129C689 110 731 132 732 155C786 159 794 190 739 197C594 216 464 196 339 205S109 218 48 195C19 187 16 176 39 169Z" />
        <path className="courtyard-cloud-underbelly" d="M76 177C162 188 195 157 286 172S411 195 502 177S643 162 729 182C627 209 481 194 339 205S139 213 76 192Z" />
      </svg>
    </div>
  );
}

function TerracePlanting({ className }: { className: string }) {
  const blades = [
    [130, "M130 178C124 136 111 94 77 70C103 100 115 142 121 178Z"],
    [126, "M126 178C130 126 118 76 109 42C126 76 139 136 134 178Z"],
    [134, "M134 178C139 125 154 88 176 61C158 103 150 139 143 178Z"],
    [139, "M139 178C157 146 185 125 216 117C180 138 164 156 151 178Z"],
    [121, "M121 178C105 147 78 128 45 121C77 136 96 156 109 178Z"],
    [143, "M143 178C160 141 171 103 166 80C177 104 172 148 155 178Z"],
    [115, "M115 178C109 155 96 141 82 137C96 151 99 166 103 178Z"],
  ] as const;
  const flowers = [
    { x: 92, y: 82, root: 130, stem: "M130 178Q123 117 92 82", leaf: "M116 130Q94 111 94 124Q103 133 116 130Z" },
    { x: 182, y: 96, root: 136, stem: "M136 178Q151 124 182 96", leaf: "M149 137Q169 120 174 129Q166 140 149 137Z" },
    { x: 133, y: 68, root: 127, stem: "M127 178Q139 112 133 68" },
  ];

  return (
    <svg className={`courtyard-terrace-planting ${className}`} viewBox="0 0 260 180" focusable="false">
      <g className="courtyard-terrace-sprig">
        <g fill="currentColor">
          {blades.map(([root, d], index) => (
            <path key={root} className="courtyard-grass-blade" d={d} style={{
              transformOrigin: `${root}px 178px`,
              animationDuration: `${4.6 + index % 3 * .8}s`,
              animationDelay: `${-index * .8}s`,
            }} />
          ))}
        </g>
        {flowers.map(({ x, y, root, stem, leaf }, index) => (
          <g key={x} className="courtyard-flower-sway" style={{
            transformOrigin: `${root}px 178px`,
            animationDuration: `${6 + index * 1.3}s`,
            animationDelay: `${-index * 1.7}s`,
          }}>
            <g className="courtyard-flower-stems">
              <path d={stem} />
              {leaf && <path d={leaf} />}
            </g>
            <g className="courtyard-wildflower" transform={`translate(${x} ${y})`}>
              <circle cy="-4" r="3" /><circle cx="4" cy="-1" r="3" />
              <circle cx="2.5" cy="3.5" r="3" /><circle cx="-2.5" cy="3.5" r="3" />
              <circle cx="-4" cy="-1" r="3" /><circle className="courtyard-flower-center" r="2" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

function GardenTerrace() {
  return (
    <div className="courtyard-terrace">
      <div className="courtyard-terrace-warmth" />
      <TerracePlanting className="courtyard-terrace-planting-left" />
      <TerracePlanting className="courtyard-terrace-planting-right" />
      <svg className="courtyard-terrace-stone" viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="courtyard-limestone" x2="0" y2="1">
            <stop stopColor="#d9cfb9" stopOpacity=".55" />
            <stop offset="1" stopColor="#c9bea6" stopOpacity=".65" />
          </linearGradient>
        </defs>
        <path fill="url(#courtyard-limestone)" d="M0 46C350 32 820 79 1440 46V120H0Z" />
        <path className="courtyard-stone-cap" d="M0 39C350 25 820 72 1440 39V46C820 79 350 32 0 46Z" />
        <path className="courtyard-stone-joints" d="M188 42L185 120M485 48L488 120M823 57L820 120M1154 54L1158 120" />
        <path className="courtyard-stone-grain" d="M58 74h31M272 96h19M393 72h36M578 101h25M713 86h17M938 104h34M1088 80h23M1281 93h38M1372 68h18" />
      </svg>
    </div>
  );
}

export default function LightBackground() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setPaused(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <div className="courtyard-scene fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true" data-paused={paused || undefined}>
      <div className="courtyard-sky" />
      <div className="courtyard-sunlight" />
      <div className="courtyard-clouds">
        <Cloud className="courtyard-cloud-near" />
        <Cloud className="courtyard-cloud-far" />
        <Cloud className="courtyard-cloud-wisp" />
      </div>
      <div className="courtyard-sunbeams" />
      <div className="courtyard-cloud-shadow" />
      <div className="courtyard-dappled-light" />
      <GardenTerrace />
      <Canopy className="courtyard-canopy-upper" />
      <Canopy className="courtyard-canopy-lower" />
    </div>
  );
}
