import Link from "next/link";
import { SanityCompanyInfo, SanityProperty } from "@/types/sanity";
import ListingCard, { ListingCardSkeleton } from "@/component/ListingCard";
import { ArrowRightIcon } from "@/component/Icons";
import { Reveal, Stagger, StaggerItem } from "@/component/Motion";

interface FeaturedListingsProps {
  properties: SanityProperty[];
  companyInfo: SanityCompanyInfo | null;
  loading: boolean;
}

export default function FeaturedListings({
  properties,
  companyInfo,
  loading,
}: FeaturedListingsProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 py-24 md:px-10 xl:px-16 xl:py-32">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <span className="label-mono text-cobalt">Featured listings</span>
          <h2 className="max-w-[640px] text-[clamp(2rem,8vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-ink">
            Plots and homes we&apos;d buy ourselves.
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

      {loading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Stagger className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4" stagger={0.12}>
          {properties.map((property) => (
            <StaggerItem key={property._id} className="h-full">
              <ListingCard property={property} companyInfo={companyInfo} />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {!loading && properties.length === 0 && (
        <p className="text-[17px] text-graphite">
          New listings are on their way. Message us on WhatsApp and we&apos;ll tell you first.
        </p>
      )}
    </section>
  );
}
