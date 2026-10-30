"use client";

import Image from "next/image";
import Link from "next/link";
import { SanityCompanyInfo, SanityProperty } from "@/types/sanity";
import { WhatsAppIcon } from "@/component/Icons";
import { useOrigin } from "@/component/ListingCard";
import { getWhatsAppUrl } from "@/lib/contact";
import {
  getAreaName,
  getImageUrl,
  getLocation,
  getPriceSuffix,
  getPropertyPath,
  getPropertyWhatsAppMessage,
  getSizeLabel,
  getTypeLabel,
  getTypeSlug,
} from "@/lib/property";
import { formatPrice } from "@/utils/functions";

interface ListingRowProps {
  property: SanityProperty;
  companyInfo: SanityCompanyInfo | null;
}

/** Wide "plot sheet" row used on the Properties page. */
export default function ListingRow({ property, companyInfo }: ListingRowProps) {
  const origin = useOrigin();
  const slug = getTypeSlug(property.propertyType);
  const image = getImageUrl(property, 900, 603);
  const href = getPropertyPath(property);
  const suffix = getPriceSuffix(slug);

  const specs: { label: string; value: string }[] = [
    { label: "Size", value: getSizeLabel(property) },
  ];
  if (property.bedrooms) specs.push({ label: "Beds", value: String(property.bedrooms) });
  if (property.bathrooms) specs.push({ label: "Baths", value: String(property.bathrooms) });
  if (property.documentTitle) specs.push({ label: "Title", value: property.documentTitle });
  specs.push({ label: "Area", value: getAreaName(property.location) });

  return (
    <article className="flex flex-col gap-6 border-b border-rule py-10 lg:flex-row lg:items-stretch lg:gap-10">
      <Link
        href={href}
        className="relative block h-[240px] w-full shrink-0 overflow-hidden bg-mist sm:h-[268px] lg:w-[400px]"
      >
        {image && (
          <Image
            src={image}
            alt={property.images?.[0]?.alt || property.title}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3.5 lg:pt-1">
        <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-cobalt">
          {getTypeLabel(slug)}
        </span>
        <Link href={href}>
          <h2 className="text-[clamp(1.375rem,2.8vw,1.75rem)] leading-[1.18] font-bold tracking-[-0.02em] text-ink hover:text-cobalt">
            {property.title}
          </h2>
        </Link>
        <p className="text-[17px] leading-[26px] text-graphite">{getLocation(property.location)}</p>
        <dl className="mt-auto flex flex-wrap gap-y-3 border-t border-rule">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-1 pt-3.5 pr-8">
              <dt className="field-label">{spec.label}</dt>
              <dd className="text-[16px] font-semibold text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-6 lg:w-[280px] lg:shrink-0 lg:items-end lg:justify-between lg:pt-1">
        <div className="flex flex-col gap-1 lg:items-end">
          <span className="field-label">Price</span>
          <span className="text-[28px] font-bold tracking-[-0.02em] text-ink md:text-[30px]">
            {formatPrice(property.price)}
            {suffix && <span className="ml-1 text-[15px] font-medium text-graphite">{suffix}</span>}
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <a
            href={getWhatsAppUrl(getPropertyWhatsAppMessage(property, origin), companyInfo)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-wa py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon size={16} color="#FFFFFF" />
            Ask on WhatsApp
          </a>
          <Link
            href={href}
            className="flex justify-center border-[1.5px] border-ink py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            View details &amp; photos
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ListingRowSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6 border-b border-rule py-10 lg:flex-row lg:gap-10">
      <div className="h-[268px] bg-mist lg:w-[400px]" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="h-3 w-24 bg-mist" />
        <div className="h-8 w-2/3 bg-mist" />
        <div className="h-4 w-1/2 bg-mist" />
      </div>
      <div className="flex flex-col gap-3 lg:w-[280px]">
        <div className="h-9 bg-mist" />
        <div className="h-12 bg-mist" />
        <div className="h-12 bg-mist" />
      </div>
    </div>
  );
}
