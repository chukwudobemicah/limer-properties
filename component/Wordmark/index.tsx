import Link from "next/link";

/** "Limer" wordmark with the plot-line mark, as drawn in Paper. */
export default function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Limer — home">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="28" height="28" stroke="#2340E0" strokeWidth="2" />
        <path d="M1 21 L12 10 L19 17 L29 7" stroke="#2340E0" strokeWidth="2" />
        <circle cx="12" cy="10" r="2.5" fill="#2340E0" />
      </svg>
      <span className="flex flex-col gap-0.5">
        <span className="text-[20px] leading-[22px] font-extrabold tracking-[-0.02em] text-ink">
          Limer
        </span>
        <span className="font-mono text-[10px] leading-3 tracking-[0.14em] uppercase text-graphite">
          Estate &amp; Facility Mgmt.
        </span>
      </span>
    </Link>
  );
}
