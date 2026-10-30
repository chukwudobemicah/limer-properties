"use client";

import { SanityCompanyInfo } from "@/types/sanity";
import { ArrowRightIcon, WhatsAppIcon } from "@/component/Icons";
import { getCompanyEmail, getPhoneDisplay, getWhatsAppUrl } from "@/lib/contact";

const REQUEST_MESSAGE =
  "Hello Limer! I'm looking for a property. My budget is …, preferred area is …, and plot size / bedrooms …";

export default function RequestBanner({
  companyInfo,
}: {
  companyInfo: SanityCompanyInfo | null;
}) {
  const email = getCompanyEmail(companyInfo);

  return (
    <div className="flex flex-col gap-10 bg-mist p-8 sm:p-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <div className="flex flex-col gap-3.5">
        <span className="label-mono text-cobalt">Not seeing the right one?</span>
        <h2 className="max-w-[680px] text-[clamp(1.875rem,5vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
          Tell us what you&apos;re after.
          <br />
          We&apos;ll find it.
        </h2>
        <p className="max-w-[560px] text-[17px] leading-[26px] text-graphite">
          Send your budget, preferred area and plot size on WhatsApp, and we&apos;ll message you
          when a match comes in.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2.5 lg:w-[380px] lg:shrink-0">
        <a
          href={getWhatsAppUrl(REQUEST_MESSAGE, companyInfo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[18px] bg-wa px-6 py-5 text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon size={32} color="#FFFFFF" />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[20px] font-bold">Chat on WhatsApp</span>
            <span className="font-mono text-[13px] tracking-[0.04em] text-white/85">
              {getPhoneDisplay(companyInfo)}
            </span>
          </span>
          <ArrowRightIcon size={20} />
        </a>
        <a
          href={`mailto:${email}`}
          className="text-center text-[14px] text-graphite hover:text-ink"
        >
          or email {email}
        </a>
      </div>
    </div>
  );
}
