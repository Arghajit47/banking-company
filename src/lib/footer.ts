"use client";

import useSWR from "swr";

export interface FooterConfig {
  navLinks: Array<{ label: string; href: string }>;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: Array<{ name: string; url: string }>;
  copyright: string;
}

const fetcher = async (url: string): Promise<FooterConfig> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Footer config request failed: ${response.status}`);
  }
  return response.json();
};

export function useFooterConfig() {
  return useSWR<FooterConfig>("/api/config/footer", fetcher, {
    revalidateOnFocus: false,
  });
}
