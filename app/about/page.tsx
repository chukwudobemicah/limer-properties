"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PersonIcon, WhatsAppIcon } from "@/component/Icons";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import { getPhoneDisplay, getWhatsAppUrl } from "@/lib/contact";
import { CEO, MISSION, STATS, VALUES, VISION } from "@/constants/about";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16";

export default function AboutPage() {
  const { companyInfo } = useSanityCompanyInfo();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`${CONTAINER} flex flex-col gap-8 pt-20 pb-20 xl:pt-[104px] xl:pb-24`}>
        <span className="label-mono text-cobalt">About Limer</span>
        <h1 className="text-[clamp(2.5rem,8.5vw,6rem)] leading-none font-extrabold tracking-[-0.04em] text-ink">
          More than a transaction.
          <br />A place to build on.
        </h1>
      </section>

      {/* 01 Story */}
      <section className="border-t border-rule">
        <div className={`${CONTAINER} flex flex-col gap-10 pt-[72px] pb-24 lg:flex-row lg:gap-16 xl:pb-[120px]`}>
          <SectionLabel number="01" title="Our story" />
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-[22px] leading-8 font-medium tracking-[-0.015em] text-ink md:text-[28px] md:leading-10">
              Limer Estate &amp; Facility Management was founded to make buying and owning property
              in Nigeria feel safe, simple and transparent.
            </p>
            <p className="text-[18px] leading-[30px] text-graphite">
              Finding the right property is more than a transaction. It&apos;s a place to call
              home, a plot to build your plans on, or an investment that secures your family&apos;s
              future.
            </p>
            <p className="text-[18px] leading-[30px] text-graphite">
              With deep knowledge of the Lagos and Ogun markets, we bring the same care to every
              client — from the first inspection to years of managing the property after handover.
            </p>
          </div>
        </div>
      </section>

      {/* 02 Leadership */}
      <section className={`${CONTAINER} flex flex-col gap-10 pb-24 lg:flex-row lg:items-stretch lg:gap-16 xl:pb-32`}>
        <div className="relative flex aspect-[4/5] w-full shrink-0 flex-col justify-end bg-mist p-6 lg:aspect-auto lg:h-[640px] lg:w-[520px]">
          {CEO.image ? (
            <Image
              src={CEO.image}
              alt={`${CEO.name}, ${CEO.role}`}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          ) : (
            <>
              <PersonIcon
                size={96}
                color="#C5C9D3"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]"
              />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-graphite">
                Portrait coming soon
              </span>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-7 border-t-[1.5px] border-ink pt-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-mono text-[12px] tracking-[0.12em] text-cobalt">
              02 · LEADERSHIP
            </span>
            <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-graphite">
              {CEO.role}
            </span>
          </div>
          <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.035em] text-ink">
            {CEO.name}
          </h2>
          {CEO.quote && (
            <blockquote className="border-l-[3px] border-cobalt pl-6 text-[21px] leading-8 font-medium tracking-[-0.01em] text-cobalt md:text-[26px] md:leading-[38px]">
              “{CEO.quote}”
            </blockquote>
          )}
          <div className="flex flex-col gap-4">
            {CEO.bio.map((paragraph) => (
              <p key={paragraph} className="text-[18px] leading-[30px] text-graphite">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            <a
              href={getWhatsAppUrl(
                `Hello! I'd like to arrange a conversation with ${CEO.name}.`,
                companyInfo,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-wa px-[22px] py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon size={16} color="#FFFFFF" />
              Message on WhatsApp
            </a>
            {CEO.linkedin && (
              <a
                href={CEO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-[1.5px] border-ink px-[22px] py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink">
        <div className={`${CONTAINER} grid grid-cols-2 gap-y-12 py-[88px] lg:grid-cols-4 lg:gap-y-0`}>
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col gap-3",
                index % 2 === 0 ? "pr-4" : "pl-4 lg:pl-8",
                "lg:px-8 lg:first:pl-0 lg:last:pr-0",
                index < STATS.length - 1 ? "lg:border-r lg:border-white/20" : "",
                index % 2 === 0 ? "max-lg:border-r max-lg:border-white/20" : "",
              ].join(" ")}
            >
              <span className="text-[clamp(2.75rem,8vw,5.5rem)] leading-none font-extrabold tracking-[-0.045em] text-white">
                {stat.value}
              </span>
              <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-white/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Mission + vision */}
      <section className={`${CONTAINER} flex flex-col gap-10 pt-24 lg:flex-row lg:gap-16 xl:pt-[120px]`}>
        <SectionLabel number="03" title="What drives us" />
        <div className="flex flex-1 flex-col gap-12 md:flex-row">
          {[
            { label: "Mission", body: MISSION },
            { label: "Vision", body: VISION },
          ].map((item) => (
            <div key={item.label} className="flex flex-1 flex-col gap-4 border-t-[1.5px] border-ink pt-6">
              <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-graphite">
                {item.label}
              </span>
              <p className="text-[20px] leading-[31px] text-ink">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 Values */}
      <section className={`${CONTAINER} flex flex-col gap-10 pt-24 pb-24 lg:flex-row lg:gap-16 xl:pt-[120px] xl:pb-32`}>
        <SectionLabel number="04" title="Our core values" />
        <div className="flex flex-1 flex-col border-t-[1.5px] border-ink">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-2 border-b border-rule py-7 md:flex-row md:items-baseline md:gap-8"
            >
              <span className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-ink md:w-[340px] md:shrink-0">
                {value.title}
              </span>
              <span className="text-[18px] leading-7 text-graphite">{value.body}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cobalt">
        <div className={`${CONTAINER} flex flex-col gap-12 py-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16 xl:py-28`}>
          <div className="flex flex-col gap-6">
            <span className="label-mono text-white">Ready when you are</span>
            <h2 className="max-w-[720px] text-[clamp(2.25rem,7vw,4rem)] leading-[1.03] font-extrabold tracking-[-0.035em] text-balance text-white">
              Let&apos;s find the right property for you.
            </h2>
            <p className="max-w-[560px] text-[19px] leading-[30px] text-white/85">
              Talk to our team on WhatsApp, or browse what&apos;s available right now.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 lg:w-[380px] lg:shrink-0">
            <a
              href={getWhatsAppUrl(undefined, companyInfo)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[18px] bg-wa px-6 py-5 text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon size={32} color="#FFFFFF" />
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="text-[20px] font-bold">Chat on WhatsApp</span>
                <span className="font-mono text-[13px] tracking-[0.04em] text-white/85">
                  {getPhoneDisplay(companyInfo)}
                </span>
              </span>
              <ArrowRightIcon size={20} />
            </a>
            <Link
              href="/properties"
              className="flex items-center justify-between border-[1.5px] border-white px-6 py-5 text-[20px] font-bold text-white transition-colors hover:bg-white hover:text-cobalt"
            >
              Browse properties
              <ArrowRightIcon size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex flex-col gap-3 lg:w-[400px] lg:shrink-0">
      <span className="font-mono text-[12px] tracking-[0.12em] text-cobalt">{number}</span>
      <span className="text-[24px] font-bold tracking-[-0.01em] text-ink">{title}</span>
    </div>
  );
}
