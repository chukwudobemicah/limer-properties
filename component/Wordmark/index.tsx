import Image from "next/image";
import Link from "next/link";

/** Company logo (vector redraw of the original, /public/images/limer-logo.svg). */
export default function Wordmark({ variant = "color" }: { variant?: "color" | "white" }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="Limer Estate & Facility Management — home">
      <Image
        src={variant === "white" ? "/images/limer-logo-white.svg" : "/images/limer-logo.svg"}
        alt="Limer Estate & Facility Management Ltd — RC 1814812"
        width={600}
        height={139}
        priority
        unoptimized
        className="h-11 w-auto sm:h-[52px] xl:h-[60px]"
      />
    </Link>
  );
}
