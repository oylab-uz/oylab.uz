/*
  One repeat of the abr band, 24 by 96: twelve warp threads, a large tied
  motif in the lead dye and a small one in the second. The ragged ends are the
  point; in ikat the thread is dyed before it is woven, so no two line up.
*/
const WARP = "M1 0V96M3 0V96M5 0V96M7 0V96M9 0V96M11 0V96M13 0V96M15 0V96M17 0V96M19 0V96M21 0V96M23 0V96";
const LEAD =
  "M1 27.13V42.6M3 22.78V48.28M5 19.7V51.75M7 14.65V54.8M9 14.97V57.3M11 12.89V58.85M13 10.73V56.01M15 10.7V53.03M17 11.46V50.83M19 15.86V48.3M21 20.26V45.22M23 25.58V41.33";
const LEAD_FEATHER =
  "M1 27.13V27.2M1 42.42V42.6M3 22.78V23.43M3 47.74V48.28M5 19.7V21.8M5 51.52V51.75M7 14.65V17.17M7 54.61V54.8M9 14.97V15.62M9 57V57.3M11 12.89V13.01M11 56.79V58.85M13 10.73V11.21M13 54.99V56.01M15 10.7V11.79M15 50.99V53.03M17 11.46V13.39M17 49.49V50.83M19 15.86V16.48M19 47.57V48.3M21 20.26V20.75M21 42.99V45.22M23 25.58V26.17M23 40.87V41.33";
const SECOND = "M5 75.73V81.41M7 73.03V83.35M9 69.5V84.31M11 67.87V85.18M13 70.82V89.5M15 71.21V85.4M17 74.26V82.97M19 76.66V80.24";
const SECOND_FEATHER =
  "M5 75.73V76.22M5 79.34V81.41M7 73.03V74.87M7 81.74V83.35M9 69.5V70.6M9 83.57V84.31M11 67.87V69.36M11 82.51V85.18M13 70.82V72.27M13 86.64V89.5M15 71.21V72.43M15 83.28V85.4M17 74.26V75.72M17 82.05V82.97M19 76.66V76.98M19 79.78V80.24";

/**
 * Shared SVG definitions for the ornament layer, rendered once per document:
 * the abr band every seam reuses, and the iwan arch as a clip path in
 * bounding-box units so it fits any element it is applied to.
 */
export function OrnamentDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <symbol id="abr-band" viewBox="0 0 24 96">
          <path className="abr-warp" d={WARP} />
          <g className="abr-dye abr-lead">
            <path d={LEAD} />
            <path className="abr-feather" d={LEAD_FEATHER} />
          </g>
          <g className="abr-dye abr-second">
            <path d={SECOND} />
            <path className="abr-feather" d={SECOND_FEATHER} />
          </g>
        </symbol>
        <clipPath id="iwan" clipPathUnits="objectBoundingBox">
          <path d="M 0 1 L 0 0.42 A 0.92 0.92 0 0 1 0.5 0.02 A 0.92 0.92 0 0 1 1 0.42 L 1 1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
