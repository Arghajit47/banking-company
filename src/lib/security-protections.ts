"use client";

import useSWR from "swr";

export interface ProtectionItem {
  id: number;
  icon: string;
  badgeIcon: string;
  title: string;
  description: string;
}

export interface ProtectionsData {
  protections: ProtectionItem[];
}

const fetcher = async (url: string): Promise<ProtectionsData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Security protections data request failed: ${response.status}`);
  }
  return response.json();
};

export function useSecurityProtectionsData() {
  return useSWR<ProtectionsData>("/api/security/protections", fetcher, {
    revalidateOnFocus: false,
  });
}
