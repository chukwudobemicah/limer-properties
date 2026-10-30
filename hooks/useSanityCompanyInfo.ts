"use client";

import { useCachedQuery } from "@/lib/sanity.cache";
import { SanityCompanyInfo } from "@/types/sanity";

const COMPANY_INFO_QUERY = `*[_type == "companyInfo"][0] {
  _id,
  companyName,
  phone,
  email,
  address,
  description,
  socials
}`;

export function useSanityCompanyInfo() {
  const { data, loading, error } = useCachedQuery<SanityCompanyInfo | null>(COMPANY_INFO_QUERY, null);
  return { companyInfo: data, loading, error };
}
