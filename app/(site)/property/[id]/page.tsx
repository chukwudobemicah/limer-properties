"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import RollingPrice from "@/component/RollingPrice";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SanityProperty } from "@/types/sanity";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { ArrowRightIcon, CloseIcon, PhoneIcon, PlayIcon, WhatsAppIcon } from "@/component/Icons";
import ListingCard from "@/component/ListingCard";
import { EASE, Reveal, Stagger, StaggerItem } from "@/component/Motion";
import { getPhoneDisplay, getTelUrl, getWhatsAppUrl } from "@/lib/contact";
import {
  getAreaName,
  getLocation,
  getPriceSuffix,
  getSizeLabel,
  getTypeLabel,
  getTypeSlug,
} from "@/lib/property";
import { formatPrice } from "@/utils/functions";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16";

const PROPERTY_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  _id, _createdAt, title, slug, propertyType, status, location, documentTitle,
  structure, description, price,
  images[]{ asset, alt, caption },
  videos[]{ asset->{ _ref, _type, url }, title },
  bedrooms, bathrooms, area, floors, floorPosition, parking, yearBuilt,
  furnished, features, isFeatured, publishedAt
}`;

type MediaItem =
  | { kind: "image"; asset: SanityImageSource; alt?: string; caption?: string }
  | { kind: "video"; url: string; title?: string };

const ordinal = (n: number) => {
  const suffix = ["th", "st", "nd", "rd"][(n % 100 >= 11 && n % 100 <= 13) || n % 10 > 3 ? 0 : n % 10];
  return `${n}${suffix}`;
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const slug = params.id as string;

  const [property, setProperty] = useState<SanityProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState<string | undefined>();
  const { companyInfo } = useSanityCompanyInfo();
  const { properties } = useSanityProperties();

  useEffect(() => setOrigin(window.location.origin), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await client.fetch<SanityProperty | null>(PROPERTY_QUERY, { slug });
        if (!cancelled) setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const media = useMemo<MediaItem[]>(() => {
    if (!property) return [];
    const images: MediaItem[] = (property.images ?? [])
      .filter((image) => image?.asset)
      .map((image) => ({ kind: "image", asset: image.asset, alt: image.alt, caption: image.caption }));
    const videos: MediaItem[] = (property.videos ?? [])
      .filter((video) => video?.asset?.url)
      .map((video) => ({ kind: "video", url: video.asset.url as string, title: video.title }));
    return [...images, ...videos];
  }, [property]);

  const similar = useMemo(() => {
    if (!property) return [];
    const slugType = getTypeSlug(property.propertyType);
    return properties
      .filter((item) => item._id !== property._id && getTypeSlug(item.propertyType) === slugType)
      .slice(0, 3);
  }, [properties, property]);

  if (loading) return <DetailsSkeleton />;
  if (!property) return <NotFound />;

  const typeSlug = getTypeSlug(property.propertyType);
  const location = getLocation(property.location);
  const suffix = getPriceSuffix(typeSlug);
  const isUnavailable = property.status === "sold" || property.status === "rented";
  const link = origin ? `\n${origin}/property/${property.slug.current}` : "";

  const askMessage = `Hello Limer! I'm interested in "${property.title}" (${location}) listed at ${formatPrice(
    property.price,
  )}. Is it still available? Please send me more details.${link}`;
  const inspectionMessage = `Hello Limer! I'd like to book an inspection for "${property.title}" (${location}). What days and times are available?${link}`;

  const structure =
    typeof property.structure === "string" ? property.structure : property.structure?.title;

  const specs = [
    { label: "Size", value: getSizeLabel(property) },
    property.bedrooms ? { label: "Bedrooms", value: String(property.bedrooms) } : null,
    property.bathrooms ? { label: "Bathrooms", value: String(property.bathrooms) } : null,
    structure ? { label: "Building", value: structure } : null,
    property.floors
      ? { label: "Floors", value: `${property.floors} ${property.floors === 1 ? "floor" : "floors"}` }
      : null,
    property.floorPosition !== undefined && property.floorPosition !== null
      ? {
          label: "Floor level",
          value: property.floorPosition === 0 ? "Ground floor" : `${ordinal(property.floorPosition)} floor`,
        }
      : null,
    property.parking ? { label: "Parking", value: `${property.parking} spaces` } : null,
    property.yearBuilt ? { label: "Year built", value: String(property.yearBuilt) } : null,
    property.furnished !== undefined && property.furnished !== null
      ? { label: "Furnishing", value: property.furnished ? "Furnished" : "Unfurnished" }
      : null,
    property.documentTitle ? { label: "Title document", value: property.documentTitle } : null,
    { label: "Area", value: getAreaName(property.location) },
  ].filter((spec): spec is { label: string; value: string } => spec !== null);

  return (
    <div className="bg-white pb-28 lg:pb-0">
      {/* Header */}
      <section className={`${CONTAINER} flex flex-col gap-6 pt-10 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pt-14`}>
        <Reveal className="flex max-w-[860px] flex-col gap-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[12px] tracking-[0.1em] uppercase">
            <Link href="/properties" className="text-graphite hover:text-ink">
              Properties
            </Link>
            <span className="text-rule" aria-hidden="true">/</span>
            <span className="text-cobalt">{getTypeLabel(typeSlug)}</span>
            {isUnavailable && (
              <span className="ml-1 bg-ink px-2 py-1 text-[11px] text-white">
                {property.status === "sold" ? "Sold" : "Rented"}
              </span>
            )}
          </nav>
          <h1 className="text-[clamp(2rem,5.2vw,4rem)] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance text-ink [overflow-wrap:anywhere]">
            {property.title}
          </h1>
          <p className="text-[17px] leading-[26px] text-graphite sm:text-[19px] sm:leading-[30px]">{location}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-1 lg:items-end lg:pb-1">
          <span className="field-label">Price</span>
          <span className="text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.03em] text-ink">
            <RollingPrice price={property.price} delay={0.25} />
            {suffix && <span className="ml-1.5 text-[17px] font-medium text-graphite">{suffix}</span>}
          </span>
        </Reveal>
      </section>

      {/* Gallery */}
      <Reveal className={CONTAINER}>
        <Gallery media={media} title={property.title} />
      </Reveal>

      {/* Body */}
      <section className={`${CONTAINER} grid grid-cols-1 gap-14 pt-14 pb-24 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 xl:pb-32`}>
        <div className="flex min-w-0 flex-col gap-16">
          {/* Plot sheet */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="label-mono text-cobalt">Property details</h2>
            </Reveal>
            <Stagger as="dl" stagger={0.05} className="grid grid-cols-2 border-t-[1.5px] border-ink sm:grid-cols-3">
              {specs.map((spec) => (
                <StaggerItem key={spec.label} className="flex flex-col gap-1.5 border-b border-rule py-5 pr-4">
                  <dt className="field-label">{spec.label}</dt>
                  <dd className="text-[18px] font-semibold text-ink [overflow-wrap:anywhere]">{spec.value}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {property.description && (
            <Reveal className="flex flex-col gap-5">
              <h2 className="label-mono text-cobalt">About this property</h2>
              <p className="max-w-[760px] text-[18px] leading-[30px] whitespace-pre-line text-ink [overflow-wrap:anywhere]">
                {property.description}
              </p>
            </Reveal>
          )}

          {property.features && property.features.length > 0 && (
            <Reveal className="flex flex-col gap-5">
              <h2 className="label-mono text-cobalt">Features</h2>
              <ul className="grid grid-cols-1 border-t border-rule sm:grid-cols-2 sm:gap-x-8">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 border-b border-rule py-4 text-[17px] text-ink">
                    <span className="h-2 w-2 shrink-0 bg-cobalt" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {/* Enquiry card */}
        <aside className="lg:relative">
          <Reveal delay={0.1} className="flex flex-col gap-6 border-[1.5px] border-ink p-6 sm:p-8 lg:sticky lg:top-28">
            <div className="flex flex-col gap-1">
              <span className="field-label">Interested?</span>
              <span className="text-[26px] leading-8 font-extrabold tracking-[-0.02em] text-ink">
                Talk to us about this {typeSlug === "land" ? "plot" : "property"}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-y border-rule py-4">
              <span className="font-mono text-[12px] tracking-[0.06em] text-graphite">{getSizeLabel(property)}</span>
              <span className="text-[22px] font-extrabold text-ink">
                <RollingPrice price={property.price} />
                {suffix && <span className="ml-1 text-[14px] font-medium text-graphite">{suffix}</span>}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl(askMessage, companyInfo)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-wa py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon size={18} color="#FFFFFF" />
                Ask on WhatsApp
              </a>
              <a
                href={getWhatsAppUrl(inspectionMessage, companyInfo)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 border-[1.5px] border-ink py-[15px] text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Book an inspection
                <ArrowRightIcon size={16} />
              </a>
            </div>
            <a
              href={getTelUrl(companyInfo)}
              className="flex items-center gap-3 text-[15px] text-graphite hover:text-ink"
            >
              <PhoneIcon size={20} />
              Or call {getPhoneDisplay(companyInfo)}
            </a>
          </Reveal>
        </aside>
      </section>

      {/* Similar listings */}
      {similar.length > 0 && (
        <section className="border-t border-rule">
          <div className={`${CONTAINER} flex flex-col gap-10 py-24 xl:py-28`}>
            <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4">
                <span className="label-mono text-cobalt">More like this</span>
                <h2 className="text-[clamp(1.875rem,4.5vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink">
                  Similar listings
                </h2>
              </div>
              <Link
                href="/properties"
                className="flex w-fit items-center gap-2.5 border-b-[1.5px] border-ink pb-2 text-[16px] font-semibold text-ink hover:text-cobalt"
              >
                View all listings
                <ArrowRightIcon size={16} />
              </Link>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3" stagger={0.12}>
              {similar.map((item) => (
                <StaggerItem key={item._id} className="h-full">
                  <ListingCard property={item} companyInfo={companyInfo} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Phones: sticky enquiry bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-rule bg-white px-5 py-3 lg:hidden">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="field-label">Price</span>
          <span className="truncate text-[18px] font-extrabold text-ink"><RollingPrice price={property.price} delay={0.4} /></span>
        </span>
        <a
          href={getWhatsAppUrl(askMessage, companyInfo)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 bg-wa px-5 py-3.5 text-[15px] font-semibold text-white"
        >
          <WhatsAppIcon size={18} color="#FFFFFF" />
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}

function useSwipe(onSwipe: (step: number) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  return {
    swiped,
    handlers: {
      onTouchStart: (event: React.TouchEvent) => {
        const touch = event.touches[0];
        start.current = { x: touch.clientX, y: touch.clientY };
        swiped.current = false;
      },
      onTouchEnd: (event: React.TouchEvent) => {
        if (!start.current) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - start.current.x;
        const dy = touch.clientY - start.current.y;
        start.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          swiped.current = true;
          onSwipe(dx < 0 ? 1 : -1);
        }
      },
    },
  };
}

const croppedUrl = (item: MediaItem, width: number, height: number) =>
  item.kind === "image" ? urlFor(item.asset).width(width).height(height).fit("crop").auto("format").url() : "";

function Gallery({ media, title }: { media: MediaItem[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = media.length;
  const go = useCallback(
    (step: number) => setIndex((current) => (current + step + count) % count),
    [count],
  );
  const { swiped, handlers } = useSwipe((step) => count > 1 && go(step));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") setOpen(false);
      if (count < 2) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, go, open]);

  if (count === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center bg-mist font-mono text-[12px] tracking-[0.12em] text-graphite uppercase lg:aspect-[21/9]">
        Photos coming soon
      </div>
    );
  }

  const current = media[index];

  return (
    <div className="flex flex-col gap-3">
      {/* The whole photo opens the full-screen viewer; no controls sit on it. */}
      <button
        type="button"
        onClick={() => {
          if (swiped.current) return;
          setOpen(true);
        }}
        {...handlers}
        aria-label={`View ${current.kind === "video" ? "video" : "photo"} ${index + 1} of ${count} full screen`}
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-mist sm:aspect-[16/10] lg:aspect-[21/9]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, transform: "scale(1.03)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {current.kind === "image" ? (
              <Image
                src={croppedUrl(current, 1800, 860)}
                alt={current.alt || title}
                fill
                priority={index === 0}
                sizes="(min-width: 1440px) 1312px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            ) : (
              <>
                <video
                  src={`${current.url}#t=0.1`}
                  muted
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                  className="pointer-events-none h-full w-full bg-ink object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 text-ink transition-transform group-hover:scale-105">
                    <PlayIcon size={30} className="ml-1" />
                  </span>
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((item, itemIndex) => (
            <button
              key={itemIndex}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={`Show ${item.kind === "video" ? "video" : "photo"} ${itemIndex + 1}`}
              aria-current={itemIndex === index}
              className={`relative h-[68px] w-[96px] shrink-0 overflow-hidden bg-mist transition-opacity ${
                itemIndex === index ? "outline-2 outline-offset-2 outline-cobalt" : "opacity-60 hover:opacity-100"
              }`}
            >
              {item.kind === "image" ? (
                <Image src={croppedUrl(item, 200, 140)} alt="" fill sizes="96px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-ink text-white">
                  <PlayIcon size={22} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {open && (
        <Lightbox
          media={media}
          index={index}
          title={title}
          onStep={go}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function Lightbox({
  media,
  index,
  title,
  onStep,
  onClose,
}: {
  media: MediaItem[];
  index: number;
  title: string;
  onStep: (step: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = media.length;
  const current = media[index];
  const { handlers } = useSwipe((step) => count > 1 && onStep(step));

  // Lock the page behind, and hand focus back to where it was on close.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  const caption = current.kind === "image" ? current.caption : current.title;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — media viewer`}
      className="lightbox fixed inset-0 z-[200] flex flex-col bg-[#07090f] text-white"
    >
      <div className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8">
        <span className="font-mono text-[12px] tracking-[0.12em] text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close full screen"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
        >
          <CloseIcon size={26} />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1"
        {...handlers}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {current.kind === "image" ? (
          <Image
            key={index}
            src={urlFor(current.asset).width(2400).fit("max").auto("format").url()}
            alt={current.alt || title}
            fill
            sizes="100vw"
            className="lightbox object-contain"
          />
        ) : (
          <div className="lightbox absolute inset-0 flex items-center justify-center px-0 sm:px-20">
            <video
              key={index}
              src={current.url}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full"
            >
              <track kind="captions" />
            </video>
          </div>
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous"
              className="absolute top-1/2 left-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex md:left-6"
            >
              <ArrowRightIcon size={20} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next"
              className="absolute top-1/2 right-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex md:right-6"
            >
              <ArrowRightIcon size={20} />
            </button>
          </>
        )}
      </div>

      <div className="flex min-h-14 shrink-0 items-center justify-center px-5 py-4 text-center text-[14px] leading-5 text-white/70">
        {caption || (count > 1 ? <span className="sm:hidden">Swipe to see more</span> : null)}
      </div>
    </div>,
    document.body,
  );
}

function DetailsSkeleton() {
  return (
    <div className={`${CONTAINER} flex animate-pulse flex-col gap-8 py-14`}>
      <div className="h-3 w-40 bg-mist" />
      <div className="h-14 w-3/4 bg-mist" />
      <div className="h-5 w-1/2 bg-mist" />
      <div className="aspect-[16/10] w-full bg-mist lg:aspect-[21/9]" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-14 bg-mist" />
        ))}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <section className={`${CONTAINER} flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24`}>
      <span className="label-mono text-cobalt">404 · Listing not found</span>
      <h1 className="max-w-[720px] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.03] font-extrabold tracking-[-0.035em] text-ink">
        This property isn&apos;t available any more.
      </h1>
      <p className="max-w-[520px] text-[18px] leading-[30px] text-graphite">
        It may have been sold or taken down. Have a look at what&apos;s listed now, or tell us what
        you&apos;re looking for.
      </p>
      <Link
        href="/properties"
        className="flex items-center gap-2.5 bg-ink px-7 py-[18px] text-[16px] font-semibold text-white hover:bg-cobalt"
      >
        Browse properties
        <ArrowRightIcon size={16} />
      </Link>
    </section>
  );
}
