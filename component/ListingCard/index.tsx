"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SanityCompanyInfo, SanityProperty } from "@/types/sanity";
import { WhatsAppIcon } from "@/component/Icons";
import { getWhatsAppUrl } from "@/lib/contact";
import {
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

interface ListingCardProps {
  property: SanityProperty;
  companyInfo: SanityCompanyInfo | null;
}

/** Homepage "plot sheet" card. */
export default function ListingCard({ property, companyInfo }: ListingCardProps) {
  const origin = useOrigin();
  const slug = getTypeSlug(property.propertyType);
  const image = getImageUrl(property, 800, 536);
  const href = getPropertyPath(property);
  const suffix = getPriceSuffix(slug);

  return (
    <article className="flex h-full flex-col gap-5">
      <Link href={href} className="relative block h-[260px] w-full overflow-hidden bg-mist">
        {image && (
          <Image
            src={image}
            alt={property.images?.[0]?.alt || property.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        )}
        <span className="absolute top-3 left-3 bg-white px-2.5 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
          {getTypeLabel(slug)}
        </span>
      </Link>

      <Link href={href} className="flex flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 text-[21px] leading-[26px] font-bold tracking-[-0.01em] text-ink">
          {property.title}
        </h3>
        <p className="line-clamp-2 text-[15px] leading-[22px] text-graphite">
          {getLocation(property.location)}
        </p>
      </Link>

      <div className="flex items-baseline justify-between border-t border-rule pt-3.5">
        <span className="font-mono text-[12px] tracking-[0.06em] text-graphite">
          {getSizeLabel(property)}
        </span>
        <span className="text-[19px] font-bold text-ink">
          {formatPrice(property.price)}
          {suffix && <span className="ml-1 text-[13px] font-medium text-graphite">{suffix}</span>}
        </span>
      </div>

      <div className="flex gap-2">
        <a
          href={getWhatsAppUrl(getPropertyWhatsAppMessage(property, origin), companyInfo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-wa py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon size={16} color="#FFFFFF" />
          Ask on WhatsApp
        </a>
        <Link
          href={href}
          className="flex items-center justify-center border-[1.5px] border-ink px-4 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Details
        </Link>
      </div>
    </article>
  );
}

/** window.location.origin after mount (avoids hydration mismatch). */
export function useOrigin() {
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return origin;
}

export function ListingCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-5">
      <div className="h-[260px] bg-mist" />
      <div className="h-6 w-3/4 bg-mist" />
      <div className="h-4 w-1/2 bg-mist" />
      <div className="h-px bg-rule" />
      <div className="h-11 bg-mist" />
    </div>
  );
}
