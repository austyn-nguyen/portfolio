"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Fixed positions keep the sky irregular and stable across renders.
const stars = [
  [3, 12, 1, .35], [8, 33, 1.5, .3], [12, 7, 1, .4], [17, 23, 1, .3],
  [21, 48, 1, .23], [26, 14, 1.5, .46], [31, 37, 1, .27], [35, 5, 1, .35],
  [39, 26, 1.5, .36], [44, 53, 1, .2], [48, 11, 1, .4], [53, 34, 1, .3],
  [57, 19, 1.5, .46], [61, 43, 1, .24], [66, 7, 1, .34], [71, 29, 1, .4],
  [76, 16, 1.5, .42], [81, 39, 1, .28], [86, 5, 1, .36], [91, 24, 1.5, .43],
  [96, 46, 1, .25], [6, 61, 1, .21], [15, 72, 1, .2], [24, 59, 1.5, .27],
  [33, 81, 1, .18], [42, 68, 1, .22], [51, 76, 1, .18], [63, 63, 1, .22],
  [74, 73, 1, .2], [84, 58, 1.5, .29], [94, 69, 1, .22], [98, 14, 1, .35],
] as const;

const greenAurora = [
  "M-100 105C160 255 290 20 540 120S1030 340 1540 95V335C1100 510 880 270 570 330S120 405-100 335Z",
  "M-100 165C160 50 290 260 540 175S1030 70 1540 160V395C1100 280 880 475 570 345S120 230-100 395Z",
] as const;
const violetAurora = [
  "M-100 230C190 35 360 310 690 180S1170 40 1540 185V400C1220 280 1050 410 720 340S240 350-100 455Z",
  "M-100 175C190 310 360 80 690 230S1170 250 1540 115V340C1220 470 1050 285 720 400S240 210-100 395Z",
] as const;

// An imagined distant skyline, kept low and quiet behind the page.
const buildings = [
  { x: 0, y: 126, width: 82 }, { x: 103, y: 101, width: 67 },
  { x: 194, y: 135, width: 102 }, { x: 327, y: 82, width: 70 },
  { x: 422, y: 117, width: 105 }, { x: 557, y: 96, width: 76 },
  { x: 663, y: 131, width: 108 }, { x: 795, y: 108, width: 83 },
  { x: 907, y: 70, width: 64 }, { x: 1000, y: 122, width: 115 },
  { x: 1140, y: 94, width: 82 }, { x: 1250, y: 130, width: 75 },
  { x: 1352, y: 111, width: 88 },
] as const;

export default function SpaceBackground() {
  const sky = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [animateAurora, setAnimateAurora] = useState(false);

  useEffect(() => {
    const updateEnabled = () => {
      setEnabled(document.documentElement.classList.contains("dark"));
    };

    updateEnabled();
    const updateVisibility = () => setPaused(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setAnimateAurora(!motion.matches);
    updateMotion();
    motion.addEventListener("change", updateMotion);

    const observer = new MutationObserver(updateEnabled);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      motion.removeEventListener("change", updateMotion);
    };
  }, []);

  // Freeze the current wave when night fades out, preserving its shape for return.
  useEffect(() => {
    sky.current?.querySelectorAll<SVGSVGElement>(".night-aurora").forEach((aurora) => {
      if (enabled && !paused && animateAurora) aurora.unpauseAnimations();
      else aurora.pauseAnimations();
    });
  }, [enabled, paused, animateAurora]);

  return (
    <div ref={sky} className="night-sky fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true" data-paused={paused || !enabled || undefined}>
      <div className="night-haze" />
      <div className="night-stars">
        {stars.map(([x, y, size, opacity], index) => (
          <span key={index} className="night-star" style={{
            left: `${x}%`, top: `${y}%`, width: size, height: size,
            "--star-opacity": opacity,
            "--twinkle-duration": `${8 + index % 5 * 2}s`,
            "--twinkle-delay": `${-index * 2.7}s`,
          } as CSSProperties} />
        ))}
      </div>
      <svg className="night-aurora night-aurora-emerald" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="night-aurora-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#69cfa5" stopOpacity="0" />
            <stop offset=".3" stopColor="#5dbbba" stopOpacity=".05" />
            <stop offset=".56" stopColor="#79dbac" stopOpacity=".55" />
            <stop offset=".74" stopColor="#53bca6" stopOpacity=".12" />
            <stop offset="1" stopColor="#53bca6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#night-aurora-green)" d={greenAurora[0]}>
          {animateAurora && <animate attributeName="d" dur="12s" repeatCount="indefinite" values={`${greenAurora[0]};${greenAurora[1]};${greenAurora[0]}`} keyTimes="0;0.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" />}
        </path>
      </svg>
      <svg className="night-aurora night-aurora-violet" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="night-aurora-purple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b7db9" stopOpacity="0" />
            <stop offset=".36" stopColor="#9a8bc4" stopOpacity=".08" />
            <stop offset=".6" stopColor="#8e8fce" stopOpacity=".4" />
            <stop offset=".8" stopColor="#65b5bb" stopOpacity=".08" />
            <stop offset="1" stopColor="#65b5bb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#night-aurora-purple)" d={violetAurora[0]}>
          {animateAurora && <animate attributeName="d" dur="17s" repeatCount="indefinite" values={`${violetAurora[0]};${violetAurora[1]};${violetAurora[0]}`} keyTimes="0;0.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" />}
        </path>
      </svg>
      <div className="night-meteor" />
      <div className="night-meteor night-meteor-secondary" />
      <div className="night-city-glow" />
      <svg className="night-city" viewBox="0 0 1440 190" preserveAspectRatio="xMidYMax slice" focusable="false">
        <path className="night-city-far" d="M0 148H46V113H94V136H151V92H198V150H244V121H282V105H323V146H385V118H455V142H501V77H544V140H599V114H645V151H704V96H748V134H817V84H852V146H891V113H960V144H1028V91H1083V133H1159V111H1203V146H1281V84H1319V134H1388V109H1440V190H0Z" />
        <g className="night-city-near">
          {buildings.map(({ x, y, width }, index) => {
            const columns = Math.floor((width - 24) / 12) + 1;
            const rows = Math.floor((190 - y - 18) / 16) + 1;
            return (
            <g key={x}>
              <rect x={x} y={y} width={width} height={190 - y} />
              {index % 3 === 0 && <path d={`M${x + width / 2} ${y}v-12`} className="night-city-antenna" />}
              {Array.from({ length: columns * rows }, (_, room) => {
                // Stable, independent schedules avoid synchronized buildings and
                // hydration changes. Some rooms stay dark or lit all evening.
                const seed = index * 37 + room * 17;
                const occupancy = seed % 11;
                const changing = occupancy >= 6;
                const duration = 30 + seed % 59;
                return <rect key={room}
                  className={`night-window${occupancy >= 4 ? " night-window-lit" : ""}${changing ? " night-window-changing" : ""}`}
                  x={x + 14 + room % columns * 12}
                  y={y + 13 + Math.floor(room / columns) * 16}
                  width={3} height={5}
                  style={{
                    "--room-light": .35 + seed % 5 * .07,
                    "--room-color": ["#deb074", "#e6cca0", "#c99964", "#dfd6b8"][seed % 4],
                    "--room-duration": `${duration}s`,
                    "--room-delay": `${-(seed * 7.3 % duration)}s`,
                    "--room-animation": ["night-room-evening", "night-room-return", "night-room-late"][seed % 3],
                  } as CSSProperties}
                />;
              })}
            </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
