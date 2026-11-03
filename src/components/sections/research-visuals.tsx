"use client";

import { motion, useReducedMotion } from "motion/react";
import { memo, useEffect, useState } from "react";
import type { ResearchAreaId } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* 01  Token stream: a sentence typed out in three scripts, in a loop. */
/* ------------------------------------------------------------------ */

const SAMPLES = [
  "Oy tungi osmonning yagona hamrohi.",
  "Луна — единственный спутник ночного неба.",
  "The moon is the night sky's only companion.",
];

const TokenStream = memo(function TokenStream() {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ sample: 0, length: 0 });

  useEffect(() => {
    if (reduce) return;
    let sample = 0;
    let length = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const text = SAMPLES[sample];
      if (length < text.length) {
        length += 1;
        setState({ sample, length });
        timer = setTimeout(tick, 34 + Math.random() * 46);
      } else {
        timer = setTimeout(() => {
          sample = (sample + 1) % SAMPLES.length;
          length = 0;
          setState({ sample, length });
          tick();
        }, 2200);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduce]);

  // Under reduced motion the full first sentence is shown, no typing.
  const text = reduce
    ? SAMPLES[0]
    : SAMPLES[state.sample].slice(0, state.length);
  const tokens = text.trim().length ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="flex h-full flex-col justify-between">
      <p className="min-h-[3.2em] font-serif text-2xl leading-snug text-ink md:text-3xl">
        <span>{text}</span>
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-ink motion-safe:animate-breathe"
        />
      </p>
      <p className="eyebrow tabular">
        tokens {String(tokens).padStart(2, "0")} · {["uz", "ru", "en"][state.sample]}
      </p>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* 02  Surrogate curve: a learned path draws itself over ground truth. */
/* ------------------------------------------------------------------ */

function wave(amplitude: number, decay: number, frequency: number, offset: number) {
  const points: string[] = [];
  for (let x = 0; x <= 400; x += 8) {
    const y = 80 - amplitude * Math.exp(-x / decay) * Math.sin(x / frequency + offset);
    points.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

const TRUTH_PATH = wave(52, 240, 26, 0);
const LEARNED_PATH = wave(50, 250, 26.6, 0.08);

const SurrogateCurve = memo(function SurrogateCurve() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden>
      <line x1="0" y1="80" x2="400" y2="80" stroke="var(--color-line)" strokeWidth="1" />
      <path
        d={TRUTH_PATH}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      {reduce ? (
        <path d={LEARNED_PATH} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
      ) : (
        <motion.path
          d={LEARNED_PATH}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{
            duration: 7,
            times: [0, 0.72, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
        />
      )}
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/* 03  Lattice: a block of compute breathing out of phase.             */
/* ------------------------------------------------------------------ */

const LATTICE_COLUMNS = 12;
const LATTICE_ROWS = 4;

const LatticePulse = memo(function LatticePulse() {
  const cells = Array.from({ length: LATTICE_COLUMNS * LATTICE_ROWS }, (_, i) => i);
  return (
    <div
      aria-hidden
      className="grid h-full content-center gap-1.5"
      style={{ gridTemplateColumns: `repeat(${LATTICE_COLUMNS}, minmax(0, 1fr))` }}
    >
      {cells.map((index) => {
        const column = index % LATTICE_COLUMNS;
        const row = Math.floor(index / LATTICE_COLUMNS);
        return (
          <span
            key={index}
            className="aspect-square rounded-[2px] bg-ink motion-safe:animate-breathe"
            style={{ animationDelay: `${(column + row) * 110}ms` }}
          />
        );
      })}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* 04  Field graph: signals travelling between sensors and farms.      */
/* ------------------------------------------------------------------ */

const NODES = [
  [40, 110],
  [120, 40],
  [200, 125],
  [280, 45],
  [360, 110],
  [210, 30],
] as const;

const EDGES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 5.5],
  [1, 2, 6.5],
  [2, 3, 5],
  [3, 4, 7],
  [1, 5, 8],
  [5, 3, 6],
  [0, 2, 9],
];

const FieldGraph = memo(function FieldGraph() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden>
      {EDGES.map(([a, b, duration], index) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <g key={index}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--color-line-strong)"
              strokeWidth="1"
            />
            <circle r="2.5" fill="var(--color-ink)" className="motion-reduce:hidden">
              <animateMotion
                dur={`${duration}s`}
                repeatCount="indefinite"
                path={`M ${x1} ${y1} L ${x2} ${y2}`}
                begin={`${index * 0.7}s`}
              />
            </circle>
          </g>
        );
      })}
      {NODES.map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="9" fill="var(--color-bg)" stroke="var(--color-line-strong)" />
          <circle cx={x} cy={y} r="3" fill="var(--color-ink)" />
        </g>
      ))}
    </svg>
  );
});

export function ResearchVisual({ id }: { id: ResearchAreaId }) {
  switch (id) {
    case "models":
      return <TokenStream />;
    case "science":
      return <SurrogateCurve />;
    case "systems":
      return <LatticePulse />;
    case "applied":
      return <FieldGraph />;
  }
}
