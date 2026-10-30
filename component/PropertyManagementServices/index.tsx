"use client";

import React, { useState } from "react";
import { SanityCompanyInfo } from "@/types/sanity";
import { ChevronDownIcon, WhatsAppIcon } from "@/component/Icons";
import { Reveal, Stagger, StaggerItem } from "@/component/Motion";
import { getWhatsAppUrl } from "@/lib/contact";

const SERVICES = [
  {
    title: "Tenant screening",
    body: "Background checks and verification for every applicant.",
  },
  {
    title: "Rent collection",
    body: "On-time collection with transparent monthly reporting.",
  },
  { title: "Maintenance", body: "Regular inspections and fast, vetted repairs." },
  { title: "24/7 support", body: "Round-the-clock help for you and your tenants." },
];

const PROPERTY_TYPES = ["Duplex", "Bungalow", "Flat / apartment", "Terrace", "Land", "Estate", "Commercial"];
const STATES = ["Lagos", "Ogun", "Abuja (FCT)", "Oyo", "Rivers", "Other"];

interface PropertyManagementServicesProps {
  companyInfo: SanityCompanyInfo | null;
}

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  propertyType: "Duplex",
  state: "Lagos",
  address: "",
};

export default function PropertyManagementServices({
  companyInfo,
}: PropertyManagementServicesProps) {
  const [form, setForm] = useState(EMPTY_FORM);

  const update = (field: keyof typeof EMPTY_FORM) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((previous) => ({ ...previous, [field]: event.target.value }));

  // Opens WhatsApp with the landlord's details already written out.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = [
      "Hello Limer! I'd like you to manage my property.",
      "",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Property type: ${form.propertyType}`,
      `State: ${form.state}`,
      `Address: ${form.address}`,
      "",
      "Please call me back to discuss.",
    ].join("\n");
    window.open(getWhatsAppUrl(message, companyInfo), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="property-management" className="scroll-mt-24 bg-cobalt text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-5 py-24 md:px-10 lg:flex-row lg:items-end lg:gap-24 xl:px-16 xl:py-[120px]">
        <Reveal className="flex flex-1 flex-col gap-7">
          <span className="label-mono text-white">For landlords</span>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] leading-[1.03] font-extrabold tracking-[-0.035em] text-white">
            You own it.
            <br />
            We run it.
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-white/85 md:text-[19px] md:leading-[30px]">
            Hand us the keys and we&apos;ll find the tenants, collect the rent and keep the
            building in shape — with a clear report every month.
          </p>

          <Stagger as="ul" className="flex w-full max-w-[560px] flex-col border-t border-white/35 pt-1">
            {SERVICES.map((service) => (
              <StaggerItem
                as="li"
                key={service.title}
                className="flex flex-col gap-1 border-b border-white/35 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="text-[19px] font-bold text-white sm:w-[200px] sm:shrink-0">
                  {service.title}
                </span>
                <span className="text-[16px] leading-6 text-white/85">{service.body}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal delay={0.15} className="w-full lg:w-[520px] lg:shrink-0">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-7 bg-white p-6 text-ink sm:p-10"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-[28px] leading-8 font-extrabold tracking-[-0.02em] text-ink">
              Let&apos;s manage your property
            </h3>
            <p className="text-[16px] leading-6 text-graphite">
              Fill in the details and send them to us on WhatsApp — we&apos;ll call you back within one working day.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-4">
              <Field label="Full name" htmlFor="mgmt-name">
                <input
                  id="mgmt-name"
                  required
                  value={form.fullName}
                  onChange={update("fullName")}
                  placeholder="Adaeze Okafor"
                  className="field-input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone" htmlFor="mgmt-phone">
                <input
                  id="mgmt-phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+234 …"
                  className="field-input"
                  autoComplete="tel"
                />
              </Field>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-4">
              <Field label="Property type" htmlFor="mgmt-type">
                <SelectInput id="mgmt-type" value={form.propertyType} onChange={update("propertyType")} options={PROPERTY_TYPES} />
              </Field>
              <Field label="State" htmlFor="mgmt-state">
                <SelectInput id="mgmt-state" value={form.state} onChange={update("state")} options={STATES} />
              </Field>
            </div>
            <Field label="Property address" htmlFor="mgmt-address">
              <input
                id="mgmt-address"
                required
                value={form.address}
                onChange={update("address")}
                placeholder="Street, estate, area"
                className="field-input"
                autoComplete="street-address"
              />
            </Field>
            <button
              type="submit"
              className="flex items-center justify-center gap-2.5 bg-wa p-[18px] text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon size={18} color="#FFFFFF" />
              Send on WhatsApp
            </button>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export function SelectInput({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={onChange} className="field-input pr-6">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        size={14}
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-ink"
      />
    </div>
  );
}
