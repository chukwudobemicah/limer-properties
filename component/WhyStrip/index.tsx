import { Stagger, StaggerItem } from "@/component/Motion";

const ITEMS = [
  {
    title: "Verified listings",
    body: "Title documents checked and every plot walked before it goes live.",
  },
  {
    title: "Expert support",
    body: "One advisor guides you from first inspection to final handover.",
  },
  {
    title: "Wide selection",
    body: "Land, homes for sale and rent, and shortlets across Nigeria.",
  },
  {
    title: "Honest pricing",
    body: "Clear prices and no surprise fees — what you see is what you pay.",
  },
];

export default function WhyStrip() {
  return (
    <section className="border-y border-rule">
      <Stagger className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-5 sm:grid-cols-2 sm:gap-x-8 md:px-10 xl:grid-cols-4 xl:gap-x-0 xl:px-16">
        {ITEMS.map((item, index) => (
          <StaggerItem
            key={item.title}
            className="flex flex-col gap-2.5 border-rule pt-9 pb-10 max-xl:border-b max-xl:last:border-b-0 sm:max-xl:[&:nth-last-child(2)]:border-b-0 xl:border-r xl:px-8 xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
          >
            <span className="font-mono text-[12px] tracking-[0.1em] text-cobalt">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[20px] font-bold tracking-[-0.01em] text-ink">{item.title}</span>
            <span className="text-[15px] leading-[23px] text-graphite">{item.body}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
