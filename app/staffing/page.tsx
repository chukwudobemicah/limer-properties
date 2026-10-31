"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { SanityCompanyInfo } from "@/types/sanity";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import { ArrowRightIcon, WhatsAppIcon } from "@/component/Icons";
import { Field, SelectInput } from "@/component/PropertyManagementServices";
import { Reveal, Stagger, StaggerItem } from "@/component/Motion";
import { getWhatsAppUrl } from "@/lib/contact";
import { formatNaira, parsePrice } from "@/lib/property";
import {
  APPLY_STEPS,
  HIRE_STEPS,
  HOME_SERVICES,
  ROLE_TO_WORKER_TYPE,
  STAFF_ROLES,
  WORKER_TYPES,
  getRequiredDocuments,
} from "@/constants/staffing";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16";

const openWhatsApp = (message: string, companyInfo: SanityCompanyInfo | null) =>
  window.open(getWhatsAppUrl(message, companyInfo), "_blank", "noopener,noreferrer");

const formatDate = (value: string) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString("en-NG", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

/** Tidies "150k" into "₦150,000" when the field loses focus. */
const tidySalary = (value: string) => {
  const parsed = parsePrice(value);
  return parsed ? formatNaira(parsed) : value;
};

export default function StaffingPage() {
  const { companyInfo } = useSanityCompanyInfo();
  const [hireType, setHireType] = useState(WORKER_TYPES[0]);
  const hireRef = useRef<HTMLElement>(null);

  const requestRole = (roleKey: string) => {
    setHireType(ROLE_TO_WORKER_TYPE[roleKey] ?? WORKER_TYPES[0]);
    hireRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero: two paths */}
      <section className={`${CONTAINER} flex flex-col gap-12 pt-20 pb-20 xl:pt-[104px] xl:pb-24`}>
        <Reveal className="flex flex-col gap-7">
          <span className="label-mono text-cobalt">Staffing &amp; home services</span>
          <h1 className="max-w-[1100px] text-[clamp(2.5rem,7.5vw,5.75rem)] leading-none font-extrabold tracking-[-0.04em] text-balance text-ink">
            Trusted hands for your home and office.
          </h1>
          <p className="max-w-[640px] text-[17px] leading-[28px] text-graphite md:text-[19px] md:leading-[30px]">
            We place screened housemaids, nannies, cooks, drivers, security and office staff — and
            we help good workers find good employers.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 border-t-[1.5px] border-ink md:grid-cols-2" stagger={0.1}>
          <StaggerItem>
            <PathLink
              href="#hire"
              label="For employers"
              title="I need a worker"
              body="Tell us who you need and we'll send you screened candidates with guarantors."
            />
          </StaggerItem>
          <StaggerItem>
            <PathLink
              href="#jobs"
              label="For job seekers"
              title="I'm looking for work"
              body="Apply for placement as a driver, housemaid, cook, nanny, security guard and more."
              className="md:border-l md:pl-10"
            />
          </StaggerItem>
        </Stagger>
      </section>

      {/* 01 Staff we place */}
      <section className="border-t border-rule">
        <div className={`${CONTAINER} flex flex-col gap-12 pt-[72px] pb-24 xl:pb-[120px]`}>
          <Reveal>
            <SectionHeading number="01" label="Staff we place" title="Who do you need?" />
          </Reveal>
          <Stagger className="grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {STAFF_ROLES.map((role, index) => (
              <StaggerItem
                key={role.key}
                className={`flex flex-col gap-3 border-b border-rule py-8 sm:pr-8 ${
                  index % 3 !== 0 ? "lg:border-l lg:pl-8" : ""
                } ${index % 2 === 1 ? "sm:max-lg:border-l sm:max-lg:pl-8" : ""}`}
              >
                <span className="font-mono text-[12px] tracking-[0.12em] text-graphite">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[24px] leading-[30px] font-extrabold tracking-[-0.02em] text-ink">
                  {role.title}
                </h3>
                <p className="text-[16px] leading-6 text-graphite">{role.body}</p>
                <button
                  type="button"
                  onClick={() => requestRole(role.key)}
                  className="mt-2 flex w-fit items-center gap-2 border-b-[1.5px] border-ink pb-1 text-[15px] font-semibold text-ink transition-colors hover:border-cobalt hover:text-cobalt"
                >
                  {role.cta}
                  <ArrowRightIcon size={14} />
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 02 Home & facility services */}
      <section className="bg-mist">
        <div className={`${CONTAINER} flex flex-col gap-12 py-24 lg:flex-row lg:gap-16 xl:py-[120px]`}>
          <Reveal className="flex flex-col gap-6 lg:w-[420px] lg:shrink-0">
            <SectionHeading number="02" label="Home & facility services" title="Jobs done properly." />
            <p className="text-[17px] leading-[28px] text-graphite">
              One-off or regular: cleaning, repairs and upkeep for homes, offices and estates. Tap a
              service to get a quote on WhatsApp.
            </p>
            <Link
              href="/#property-management"
              className="mt-2 flex flex-col gap-1 border-l-[3px] border-cobalt pl-5 text-[15px] leading-[22px] text-graphite"
            >
              Own a property you want rented out?
              <span className="flex items-center gap-2 font-semibold text-cobalt">
                Letting, rent collection &amp; estate management
                <ArrowRightIcon size={14} />
              </span>
            </Link>
          </Reveal>
          <Stagger as="ul" className="grid flex-1 grid-cols-1 border-t-[1.5px] border-ink sm:grid-cols-2 sm:gap-x-10" stagger={0.05}>
            {HOME_SERVICES.map((service) => (
              <StaggerItem as="li" key={service} className="border-b border-rule">
                <a
                  href={getWhatsAppUrl(
                    `Hello Limer! I'd like a quote for ${service.toLowerCase()}.\n\nLocation: \nWhat needs doing: `,
                    companyInfo,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 text-[19px] font-bold tracking-[-0.01em] text-ink"
                >
                  {service}
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-normal tracking-[0.12em] text-graphite uppercase transition-colors group-hover:text-wa">
                    <WhatsAppIcon size={14} />
                    Quote
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 03 Hire staff */}
      <section id="hire" ref={hireRef} className="scroll-mt-24">
        <div className={`${CONTAINER} flex flex-col gap-14 py-24 lg:flex-row lg:items-start lg:gap-20 xl:py-32`}>
          <Reveal className="flex flex-col gap-8 lg:w-[440px] lg:shrink-0">
            <SectionHeading number="03" label="For employers" title="Request a worker." />
            <p className="text-[17px] leading-[28px] text-graphite">
              Fill this in and send it to us on WhatsApp. We&apos;ll document your request and come
              back with suitable candidates.
            </p>
            <Steps steps={HIRE_STEPS} />
          </Reveal>
          <Reveal delay={0.12} className="flex flex-1">
            <HireForm companyInfo={companyInfo} workerType={hireType} onWorkerTypeChange={setHireType} />
          </Reveal>
        </div>
      </section>

      {/* 04 Apply for a job */}
      <section id="jobs" className="scroll-mt-24 bg-cobalt text-white">
        <div className={`${CONTAINER} flex flex-col gap-14 py-24 lg:flex-row lg:items-start lg:gap-20 xl:py-32`}>
          <Reveal className="flex flex-col gap-8 lg:w-[440px] lg:shrink-0">
            <SectionHeading number="04" label="For job seekers" title="Looking for work?" dark />
            <p className="text-[17px] leading-[28px] text-white/85">
              We place drivers, housemaids, nannies, cooks, security guards, cleaners and office
              staff with employers we know. Send your details and documents on WhatsApp to apply.
            </p>
            <Steps steps={APPLY_STEPS} dark />
          </Reveal>
          <Reveal delay={0.12} className="flex flex-1">
            <ApplyForm companyInfo={companyInfo} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function PathLink({
  href,
  label,
  title,
  body,
  className = "",
}: {
  href: string;
  label: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group flex h-full flex-col gap-3 border-b border-rule py-8 transition-colors md:border-b-0 md:py-10 ${className}`}
    >
      <span className="label-mono text-cobalt">{label}</span>
      <span className="flex items-center justify-between gap-6">
        <span className="text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink transition-colors group-hover:text-cobalt">
          {title}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center border-[1.5px] border-ink text-ink transition-colors group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white">
          <ArrowRightIcon size={18} className="rotate-90" />
        </span>
      </span>
      <span className="max-w-[480px] text-[16px] leading-6 text-graphite">{body}</span>
    </a>
  );
}

function SectionHeading({
  number,
  label,
  title,
  dark = false,
}: {
  number: string;
  label: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className={`font-mono text-[12px] tracking-[0.12em] uppercase ${dark ? "text-white" : "text-cobalt"}`}>
        {number} · {label}
      </span>
      <h2
        className={`text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function Steps({ steps, dark = false }: { steps: { title: string; body: string }[]; dark?: boolean }) {
  return (
    <ol className={`flex flex-col border-t ${dark ? "border-white/35" : "border-rule"}`}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`flex gap-5 border-b py-5 ${dark ? "border-white/35" : "border-rule"}`}
        >
          <span className={`font-mono text-[13px] tracking-[0.08em] ${dark ? "text-white/75" : "text-cobalt"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex flex-col gap-1">
            <span className={`text-[17px] font-bold ${dark ? "text-white" : "text-ink"}`}>{step.title}</span>
            <span className={`text-[15px] leading-[22px] ${dark ? "text-white/85" : "text-graphite"}`}>
              {step.body}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

const EMPTY_HIRE = {
  name: "",
  phone: "",
  address: "",
  count: "1",
  salary: "",
  location: "",
  accommodation: "Yes",
  start: "",
  requirements: "",
};

function HireForm({
  companyInfo,
  workerType,
  onWorkerTypeChange,
}: {
  companyInfo: SanityCompanyInfo | null;
  workerType: string;
  onWorkerTypeChange: (value: string) => void;
}) {
  const [form, setForm] = useState(EMPTY_HIRE);
  const update =
    (field: keyof typeof EMPTY_HIRE) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = [
      "Hello Limer! I'd like to hire staff.",
      "",
      `Employer's full name: ${form.name}`,
      `Contact phone number: ${form.phone}`,
      `Residential or work address: ${form.address}`,
      `Type of worker needed: ${workerType}`,
      `Number of workers required: ${form.count || "1"}`,
      `Monthly salary offered: ${form.salary || "To discuss"}`,
      `Working location: ${form.location || form.address}`,
      `Accommodation available: ${form.accommodation}`,
      `Resumption date: ${formatDate(form.start) || "Flexible"}`,
      `Working conditions and other requirements: ${form.requirements || "None"}`,
    ].join("\n");
    openWhatsApp(message, companyInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7 border-[1.5px] border-ink p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <h3 className="text-[28px] leading-8 font-extrabold tracking-[-0.02em] text-ink">Hire staff</h3>
        <p className="text-[15px] leading-[22px] text-graphite">All fields go straight into a WhatsApp message.</p>
      </div>
      <div className="flex flex-col gap-6">
        <Row>
          <Field label="Your full name" htmlFor="hire-name">
            <input id="hire-name" required value={form.name} onChange={update("name")} placeholder="Chioma Eze" className="field-input" autoComplete="name" />
          </Field>
          <Field label="Phone number" htmlFor="hire-phone">
            <input id="hire-phone" required type="tel" value={form.phone} onChange={update("phone")} placeholder="+234 …" className="field-input" autoComplete="tel" />
          </Field>
        </Row>
        <Field label="Residential or work address" htmlFor="hire-address">
          <input id="hire-address" required value={form.address} onChange={update("address")} placeholder="Street, estate, area" className="field-input" autoComplete="street-address" />
        </Field>
        <Row>
          <Field label="Type of worker" htmlFor="hire-type">
            <SelectInput id="hire-type" value={workerType} onChange={(event) => onWorkerTypeChange(event.target.value)} options={WORKER_TYPES} />
          </Field>
          <Field label="How many" htmlFor="hire-count">
            <input id="hire-count" type="number" min={1} max={50} inputMode="numeric" value={form.count} onChange={update("count")} className="field-input" />
          </Field>
        </Row>
        <Row>
          <Field label="Monthly salary offered" htmlFor="hire-salary">
            <input
              id="hire-salary"
              value={form.salary}
              onChange={update("salary")}
              onBlur={() => setForm((previous) => ({ ...previous, salary: tidySalary(previous.salary) }))}
              placeholder="e.g. ₦80,000"
              inputMode="numeric"
              className="field-input"
            />
          </Field>
          <Field label="Working location" htmlFor="hire-location">
            <input id="hire-location" value={form.location} onChange={update("location")} placeholder="e.g. Lekki, Lagos" className="field-input" />
          </Field>
        </Row>
        <Row>
          <Field label="Accommodation available" htmlFor="hire-accommodation">
            <SelectInput id="hire-accommodation" value={form.accommodation} onChange={update("accommodation")} options={["Yes", "No"]} />
          </Field>
          <Field label="Resumption date" htmlFor="hire-start">
            <input id="hire-start" type="date" value={form.start} onChange={update("start")} className="field-input" />
          </Field>
        </Row>
        <Field label="Working conditions & other requirements" htmlFor="hire-requirements">
          <textarea
            id="hire-requirements"
            value={form.requirements}
            onChange={update("requirements")}
            placeholder="Working hours, days off, age range, language, experience…"
            className="field-input h-24 resize-none leading-6"
          />
        </Field>
        <button
          type="submit"
          className="flex items-center justify-center gap-2.5 bg-wa p-[18px] text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon size={18} color="#FFFFFF" />
          Send request on WhatsApp
        </button>
      </div>
    </form>
  );
}

const EMPTY_APPLY = {
  name: "",
  phone: "",
  address: "",
  job: "Driver",
  salary: "",
  location: "",
  accommodation: "No",
  start: "",
};

function ApplyForm({ companyInfo }: { companyInfo: SanityCompanyInfo | null }) {
  const [form, setForm] = useState(EMPTY_APPLY);
  const update =
    (field: keyof typeof EMPTY_APPLY) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const documents = getRequiredDocuments(form.job);
  const named = documents.map((document) =>
    document === "CV" ? document : document.charAt(0).toLowerCase() + document.slice(1),
  );
  const documentList = `${named.slice(0, -1).join(", ")} and ${named.at(-1)}`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = [
      "Hello Limer! I'd like to apply for a job.",
      "",
      `Full name: ${form.name}`,
      `Phone number: ${form.phone}`,
      `Residential address: ${form.address}`,
      `Job applying for: ${form.job}`,
      `Expected monthly salary: ${form.salary || "Open to discuss"}`,
      `Preferred working location: ${form.location || "Anywhere"}`,
      `Need accommodation (live-in): ${form.accommodation}`,
      `Available from: ${formatDate(form.start) || "Immediately"}`,
      "",
      `I'm attaching my ${documentList} in this chat.`,
    ].join("\n");
    openWhatsApp(message, companyInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7 bg-white p-6 text-ink sm:p-10">
      <div className="flex flex-col gap-2">
        <h3 className="text-[28px] leading-8 font-extrabold tracking-[-0.02em] text-ink">Apply for a job</h3>
        <p className="text-[15px] leading-[22px] text-graphite">Your details go into a WhatsApp message to us.</p>
      </div>
      <div className="flex flex-col gap-6">
        <Row>
          <Field label="Full name" htmlFor="apply-name">
            <input id="apply-name" required value={form.name} onChange={update("name")} placeholder="Emeka Obi" className="field-input" autoComplete="name" />
          </Field>
          <Field label="Phone number" htmlFor="apply-phone">
            <input id="apply-phone" required type="tel" value={form.phone} onChange={update("phone")} placeholder="+234 …" className="field-input" autoComplete="tel" />
          </Field>
        </Row>
        <Field label="Residential address" htmlFor="apply-address">
          <input id="apply-address" required value={form.address} onChange={update("address")} placeholder="Street, area, state" className="field-input" autoComplete="street-address" />
        </Field>
        <Row>
          <Field label="Job applying for" htmlFor="apply-job">
            <SelectInput id="apply-job" value={form.job} onChange={update("job")} options={WORKER_TYPES} />
          </Field>
          <Field label="Expected monthly salary" htmlFor="apply-salary">
            <input
              id="apply-salary"
              value={form.salary}
              onChange={update("salary")}
              onBlur={() => setForm((previous) => ({ ...previous, salary: tidySalary(previous.salary) }))}
              placeholder="e.g. ₦70,000"
              inputMode="numeric"
              className="field-input"
            />
          </Field>
        </Row>
        <Row>
          <Field label="Preferred working location" htmlFor="apply-location">
            <input id="apply-location" value={form.location} onChange={update("location")} placeholder="e.g. Ikeja, Lagos" className="field-input" />
          </Field>
          <Field label="Need accommodation?" htmlFor="apply-accommodation">
            <SelectInput id="apply-accommodation" value={form.accommodation} onChange={update("accommodation")} options={["No", "Yes"]} />
          </Field>
        </Row>
        <Field label="Available from" htmlFor="apply-start">
          <input id="apply-start" type="date" value={form.start} onChange={update("start")} className="field-input" />
        </Field>

        {/* Documents for the chosen job */}
        <div className="flex flex-col gap-3 bg-mist p-5">
          <span className="field-label">Documents to attach in WhatsApp</span>
          <ul className="flex flex-wrap gap-2">
            {documents.map((document) => (
              <li key={document} className="flex items-center gap-2 border border-ink bg-white px-3 py-2 text-[14px] font-semibold text-ink">
                <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden="true" />
                {document}
              </li>
            ))}
          </ul>
          <span className="text-[14px] leading-5 text-graphite">
            When the chat opens, add these as attachments before you press send.
          </span>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2.5 bg-wa p-[18px] text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon size={18} color="#FFFFFF" />
          Apply on WhatsApp
        </button>
      </div>
    </form>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">{children}</div>;
}
