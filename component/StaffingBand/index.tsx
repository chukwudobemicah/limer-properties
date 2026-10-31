import Link from "next/link";
import { ArrowRightIcon } from "@/component/Icons";
import { Reveal, Stagger, StaggerItem } from "@/component/Motion";

const ROLES = ["Housemaids", "Nannies", "Cooks & chefs", "Drivers", "Security", "Office staff", "Cleaners"];

/** Home-page pointer to the Staffing page: hire staff, or apply for work. */
export default function StaffingBand() {
  return (
    <section className="bg-mist">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 py-24 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20 xl:px-16 xl:py-28">
        <Reveal className="flex max-w-[620px] flex-col gap-6">
          <span className="label-mono text-cobalt">Staffing &amp; home services</span>
          <h2 className="text-[clamp(2rem,8vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-ink">
            Need reliable hands at home or work?
          </h2>
          <p className="text-[17px] leading-[28px] text-graphite md:text-[19px] md:leading-[30px]">
            We place screened domestic and office staff, and help job seekers find trusted
            employers. Cleaning, repairs and upkeep too.
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {ROLES.map((role) => (
              <li
                key={role}
                className="border border-rule bg-white px-3 py-1.5 font-mono text-[12px] tracking-[0.06em] text-graphite"
              >
                {role}
              </li>
            ))}
          </ul>
        </Reveal>

        <Stagger className="flex w-full flex-col border-t-[1.5px] border-ink lg:w-[460px] lg:shrink-0" stagger={0.1}>
          {[
            { href: "/staffing#hire", label: "For employers", title: "Hire staff" },
            { href: "/staffing#jobs", label: "For job seekers", title: "Apply for a job" },
            { href: "/staffing", label: "Everything we do", title: "See all services" },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-6 border-b border-rule py-6"
              >
                <span className="flex flex-col gap-1">
                  <span className="field-label">{item.label}</span>
                  <span className="text-[24px] leading-[30px] font-extrabold tracking-[-0.02em] text-ink transition-colors group-hover:text-cobalt">
                    {item.title}
                  </span>
                </span>
                <ArrowRightIcon size={20} className="shrink-0 text-ink transition-transform group-hover:translate-x-1 group-hover:text-cobalt" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
