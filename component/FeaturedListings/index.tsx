import Link from "next/link";
import { SanityCompanyInfo, SanityProperty } from "@/types/sanity";
import ListingCard, { ListingCardSkeleton } from "@/component/ListingCard";
import { ArrowRightIcon } from "@/component/Icons";

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
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <span className="label-mono text-cobalt">Featured listings</span>
          <h2 className="max-w-[640px] text-[40px] leading-[44px] font-extrabold tracking-[-0.03em] text-ink md:text-[56px] md:leading-[58px]">
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
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <ListingCardSkeleton key={index} />)
          : properties.map((property) => (
              <ListingCard key={property._id} property={property} companyInfo={companyInfo} />
            ))}
      </div>

      {!loading && properties.length === 0 && (
        <p className="text-[17px] text-graphite">
          New listings are on their way. Message us on WhatsApp and we&apos;ll tell you first.
        </p>
      )}
    </section>
  );
}
