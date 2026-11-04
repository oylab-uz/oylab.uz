import { marqueeTerms } from "@/lib/content";

function Band({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ? true : undefined}
      className="flex shrink-0 items-center font-serif text-2xl tracking-tight text-ink/80 md:text-3xl"
    >
      {marqueeTerms.map((term, index) => (
        <li key={`${term}-${index}`} className="flex items-center">
          <span className="whitespace-nowrap">{term}</span>
          <span
            aria-hidden
            className="mx-7 inline-block size-1.5 rounded-full bg-line-strong"
          />
        </li>
      ))}
    </ul>
  );
}

/** A slow trilingual band. CSS keyframes only; pauses on hover, stops under reduced motion. */
export function Marquee() {
  return (
    <section className="marquee overflow-hidden border-b border-line py-5">
      <div className="marquee-track flex w-max">
        <Band />
        <Band hidden />
      </div>
    </section>
  );
}
