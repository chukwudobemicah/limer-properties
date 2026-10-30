"use client";

import React, { useState } from "react";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/component/Icons";
import { Field, SelectInput } from "@/component/PropertyManagementServices";
import { useToast } from "@/component/Toast";
import { COMPANY_DETAILS } from "@/constants/companydetails";
import {
  getCompanyEmail,
  getPhoneDisplay,
  getTelUrl,
  getWhatsAppUrl,
  sendEmail,
} from "@/lib/contact";

const INTERESTS = [
  "Buying land",
  "Buying a home",
  "Renting a home",
  "Shortlet stay",
  "Property management",
  "Something else",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  interest: INTERESTS[0],
  message: "",
};

export default function ContactSection() {
  const { companyInfo } = useSanityCompanyInfo();
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  const companyEmail = getCompanyEmail(companyInfo);

  const update = (field: keyof typeof EMPTY_FORM) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    try {
      await sendEmail({
        to: companyEmail,
        subject: `Website enquiry — ${form.interest} — ${form.name}`,
        fromName: form.name,
        fromEmail: form.email,
        message: [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          form.phone ? `Phone: ${form.phone}` : null,
          `Interested in: ${form.interest}`,
          "",
          form.message,
        ]
          .filter((line) => line !== null)
          .join("\n"),
      });
      showToast({
        type: "success",
        title: "Email sent",
        message: "Thanks — we'll reply to your inbox shortly.",
      });
      setForm(EMPTY_FORM);
    } catch {
      showToast({
        type: "error",
        title: "Couldn't send your email",
        message: "Please try again, or message us on WhatsApp.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-24 md:px-10 lg:flex-row lg:items-start lg:gap-24 xl:px-16 xl:py-32">
        {/* Intro + channels */}
        <div className="flex flex-col gap-6 lg:w-[520px] lg:shrink-0">
          <span className="label-mono text-cobalt">Get in touch</span>
          <h2 className="text-[clamp(2rem,8vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-ink">
            Come see it for yourself.
          </h2>
          <p className="text-[17px] leading-[28px] text-graphite md:text-[19px] md:leading-[30px]">
            Book an inspection, ask about a plot, or talk through what you need. Message us on
            WhatsApp, call, or send an email.
          </p>

          <div className="flex flex-col gap-3 pt-3">
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
                  {getPhoneDisplay(companyInfo)} · tap to start a chat
                </span>
              </span>
              <ArrowRightIcon size={20} />
            </a>
            <a
              href={getTelUrl(companyInfo)}
              className="flex items-center gap-[18px] border-[1.5px] border-ink px-6 py-5 text-ink transition-colors hover:bg-mist"
            >
              <PhoneIcon size={32} />
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="text-[20px] font-bold">Call the office</span>
                <span className="font-mono text-[13px] tracking-[0.04em] text-graphite">
                  {COMPANY_DETAILS.hours.short}
                </span>
              </span>
              <ArrowRightIcon size={20} />
            </a>
            <span className="pt-2 text-[15px] leading-[22px] text-graphite">
              Office: {COMPANY_DETAILS.addressDisplay}
            </span>
          </div>
        </div>

        {/* Email form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-7 border-[1.5px] border-ink p-6 sm:p-11"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-[28px] font-extrabold tracking-[-0.02em] text-ink">
              Send us an email
            </h3>
            <span className="flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-graphite">
              <ArrowRightIcon size={11} />
              {companyEmail}
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <Field label="Your name" htmlFor="contact-name">
                <input
                  id="contact-name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Tunde Bakare"
                  className="field-input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" htmlFor="contact-email">
                <input
                  id="contact-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="field-input"
                  autoComplete="email"
                />
              </Field>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <Field label="Phone (optional)" htmlFor="contact-phone">
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+234 …"
                  className="field-input"
                  autoComplete="tel"
                />
              </Field>
              <Field label="I'm interested in" htmlFor="contact-interest">
                <SelectInput
                  id="contact-interest"
                  value={form.interest}
                  onChange={update("interest")}
                  options={INTERESTS}
                />
              </Field>
            </div>
            <Field label="Message" htmlFor="contact-message">
              <textarea
                id="contact-message"
                required
                value={form.message}
                onChange={update("message")}
                placeholder="I'd like to inspect the plot at Amity Estate this Saturday…"
                className="field-input h-28 resize-none leading-6"
              />
            </Field>
            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:gap-5">
              <button
                type="submit"
                disabled={sending}
                className="flex w-fit items-center gap-2.5 bg-ink px-7 py-[18px] text-[16px] font-semibold text-white transition-colors hover:bg-cobalt disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send email"}
                {!sending && <ArrowRightIcon size={16} />}
              </button>
              <span className="text-[14px] leading-5 text-graphite">
                We&apos;ll reply to your inbox. Prefer chat? Use WhatsApp.
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
