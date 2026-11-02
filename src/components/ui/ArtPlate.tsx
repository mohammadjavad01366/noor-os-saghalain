import { useId } from "react";
import type { ArtVariant, Visual } from "@/content/types";
import { asset } from "@/lib/asset";

const palettes: Record<ArtVariant, { top: string; bottom: string; line: string; accent: string }> = {
  arch: { top: "#075159", bottom: "#04292e", line: "#c59a5a", accent: "#e2c79b" },
  rosette: { top: "#102a3a", bottom: "#04292e", line: "#c59a5a", accent: "#e2c79b" },
  lattice: { top: "#0a4a52", bottom: "#04292e", line: "#c59a5a", accent: "#087e83" },
  mihrab: { top: "#12303c", bottom: "#063c43", line: "#d3a86a", accent: "#e2c79b" },
  medallion: { top: "#f3ebdd", bottom: "#e6d8bf", line: "#a84f32", accent: "#c59a5a" },
  light: { top: "#087e83", bottom: "#052f34", line: "#e2c79b", accent: "#f3ebdd" },
};

function starPoints(cx: number, cy: number, radius: number, points: number, inner: number) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i += 1) {
    const r = i % 2 === 0 ? radius : radius * inner;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    coords.push(`${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`);
  }
  return coords.join(" ");
}

function Rosette({ x, y, r, points, inner, width }: { x: number; y: number; r: number; points: number; inner: number; width: number }) {
  return (
    <g fill="none">
      <polygon points={starPoints(x, y, r, points, inner)} strokeWidth={width} />
      <polygon points={starPoints(x, y, r * 0.62, points, inner)} strokeWidth={width} opacity={0.7} />
      <circle cx={x} cy={y} r={r * 0.32} strokeWidth={width} />
      {Array.from({ length: points }, (_, index) => {
        const angle = (Math.PI * 2 * index) / points;
        return (
          <line
            key={index}
            strokeWidth={width * 0.8}
            opacity={0.55}
            x1={x + Math.cos(angle) * r * 0.34}
            x2={x + Math.cos(angle) * r * 0.96}
            y1={y + Math.sin(angle) * r * 0.34}
            y2={y + Math.sin(angle) * r * 0.96}
          />
        );
      })}
    </g>
  );
}

function PlateArt({ variant, gradientId }: { variant: ArtVariant; gradientId: string }) {
  const palette = palettes[variant];

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0.4" y1="0" y2="1">
          <stop offset="0%" stopColor={palette.top} />
          <stop offset="100%" stopColor={palette.bottom} />
        </linearGradient>
      </defs>
      <rect fill={`url(#${gradientId})`} height="560" width="420" x="0" y="0" />

      <g stroke={palette.line} strokeLinecap="round">
        {variant === "rosette" && (
          <>
            <Rosette inner={0.62} points={16} r={150} width={1.15} x={210} y={250} />
            <Rosette inner={0.55} points={8} r={228} width={0.8} x={210} y={250} />
            <g opacity={0.5}>
              <circle cx={210} cy={250} r={196} strokeWidth={0.7} />
              <circle cx={210} cy={250} r={262} strokeWidth={0.6} />
            </g>
          </>
        )}

        {variant === "arch" && (
          <>
            <g fill="none">
              {[0, 1, 2].map((index) => {
                const inset = index * 44;
                const left = 26 + inset;
                const right = 394 - inset;
                const apex = 250 - index * 18;
                return (
                  <path
                    d={`M${left} 560V${300 - index * 20}Q${(left + right) / 2} ${apex - 90} ${right} ${300 - index * 20}V560`}
                    key={index}
                    opacity={1 - index * 0.22}
                    strokeWidth={index === 0 ? 1.4 : 0.9}
                  />
                );
              })}
              <line opacity={0.55} strokeWidth={0.7} x1={0} x2={420} y1={470} y2={470} />
              <line opacity={0.4} strokeWidth={0.7} x1={0} x2={420} y1={505} y2={505} />
            </g>
            <g opacity={0.45} strokeWidth={0.6}>
              {Array.from({ length: 9 }, (_, index) => (
                <line key={index} x1={210} x2={210 + (index - 4) * 90} y1={250} y2={560} />
              ))}
            </g>
            <circle cx={210} cy={250} fill={palette.accent} opacity={0.9} r={3.4} stroke="none" />
          </>
        )}

        {variant === "lattice" && (
          <>
            <g opacity={0.85} strokeWidth={0.8}>
              {Array.from({ length: 9 }, (_, index) => (
                <line key={`a${index}`} x1={-60 + index * 70} x2={140 + index * 70} y1={0} y2={560} />
              ))}
              {Array.from({ length: 9 }, (_, index) => (
                <line key={`b${index}`} x1={140 + index * 70} x2={-60 + index * 70} y1={0} y2={560} />
              ))}
            </g>
            <g stroke={palette.accent} opacity={0.6} strokeWidth={0.7}>
              {Array.from({ length: 5 }, (_, row) =>
                Array.from({ length: 4 }, (_, col) => (
                  <circle
                    cx={40 + col * 113 + (row % 2) * 56}
                    cy={60 + row * 113}
                    key={`${row}-${col}`}
                    r={16}
                  />
                )),
              )}
            </g>
          </>
        )}

        {variant === "mihrab" && (
          <>
            <g fill="none">
              <path d="M60 560V300Q210 150 360 300V560" strokeWidth={1.4} />
              <path d="M96 560V312Q210 190 324 312V560" opacity={0.7} strokeWidth={0.9} />
              <path d="M132 560V322Q210 228 288 322V560" opacity={0.5} strokeWidth={0.8} />
            </g>
            <g stroke={palette.line} strokeWidth={0.9} fill="none">
              <line x1={210} x2={210} y1={150} y2={196} />
              <path d="M182 196h56l14 40h-84z" />
              <path d="M192 236h36v30h-36z" />
              <circle cx={210} cy={300} fill={palette.accent} opacity={0.85} r={5} stroke="none" />
            </g>
            <g opacity={0.35} strokeWidth={0.7}>
              {[-1, 1].map((dir) => (
                <g key={dir}>
                  <line x1={210 + dir * 20} x2={210 + dir * 120} y1={300} y2={210} />
                  <line x1={210 + dir * 20} x2={210 + dir * 120} y1={300} y2={390} />
                </g>
              ))}
            </g>
            <g opacity={0.5} strokeWidth={0.6}>
              {Array.from({ length: 6 }, (_, index) => (
                <path d={`M28 ${430 + index * 22}h364`} key={index} />
              ))}
            </g>
          </>
        )}

        {variant === "medallion" && (
          <>
            <Rosette inner={0.6} points={12} r={132} width={1.05} x={210} y={262} />
            <Rosette inner={0.52} points={8} r={196} width={0.7} x={210} y={262} />
            <g opacity={0.55} strokeWidth={0.6}>
              <circle cx={210} cy={262} r={244} />
              <circle cx={210} cy={262} r={172} />
              <path d="M210 12v72M210 440v72M-30 262h92M358 262h92" />
            </g>
            <g fill={palette.line} opacity={0.35} stroke="none">
              {Array.from({ length: 24 }, (_, index) => {
                const angle = (Math.PI * 2 * index) / 24;
                return (
                  <circle
                    cx={210 + Math.cos(angle) * 218}
                    cy={262 + Math.sin(angle) * 218}
                    key={index}
                    r={2.6}
                  />
                );
              })}
            </g>
          </>
        )}

        {variant === "light" && (
          <>
            <g opacity={0.7} strokeWidth={0.8}>
              {Array.from({ length: 13 }, (_, index) => (
                <line key={index} x1={210} x2={210 + (index - 6) * 110} y1={-40} y2={560} />
              ))}
            </g>
            <g fill="none" stroke={palette.accent} strokeWidth={0.9} opacity={0.75}>
              <circle cx={210} cy={140} r={44} />
              <circle cx={210} cy={140} r={68} />
              <circle cx={210} cy={140} r={94} />
            </g>
            <g stroke={palette.line} strokeWidth={0.9} fill="none" opacity={0.8}>
              <path d="M80 560V410Q210 300 340 410V560" />
              <line x1={0} x2={420} y1={470} y2={470} strokeWidth={0.6} opacity={0.6} />
            </g>
          </>
        )}
      </g>
    </>
  );
}

type ArtPlateProps = {
  visual: Visual;
  className?: string;
  alt?: string;
  photoPosition?: string;
};

/** Built-in ornamental plates (or the uploaded photograph) used wherever imagery is needed. */
export function ArtPlate({ visual, className = "", alt = "", photoPosition }: ArtPlateProps) {
  const gradientId = useId();

  if (visual === "photo") {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-teal-900 ${className}`}>
        <img
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          src={asset("/images/hero-architecture.jpg")}
          style={{ objectPosition: photoPosition ?? "center 38%" }}
        />
      </div>
    );
  }

  const palette = palettes[visual];

  return (
    <div className={`relative h-full w-full overflow-hidden bg-teal-950 ${className}`}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        viewBox="0 0 420 560"
      >
        <PlateArt gradientId={gradientId} variant={visual} />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(120% 80% at 50% 0%, ${palette.accent}1f, transparent 60%)`,
        }}
      />
    </div>
  );
}
