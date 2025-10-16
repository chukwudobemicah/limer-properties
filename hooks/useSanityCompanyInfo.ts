"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
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
  const [companyInfo, setCompanyInfo] = useState<SanityCompanyInfo | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCompanyInfo() {
      try {
        setLoading(true);
        const data = await client.fetch<SanityCompanyInfo>(COMPANY_INFO_QUERY);
        setCompanyInfo(data);
      } catch (error) {
        console.error("Error fetching company info:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanyInfo();
  }, []);

  return { companyInfo, loading, error };
}
