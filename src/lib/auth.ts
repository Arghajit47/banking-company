"use client";

import useSWR from "swr";

export interface AuthStatus {
  isLoggedIn: boolean;
  user: {
    name: string;
    avatarUrl: string | null;
  } | null;
}

const fetcher = async (url: string): Promise<AuthStatus> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Auth status request failed: ${response.status}`);
  }
  return response.json();
};

export function useAuthStatus() {
  return useSWR<AuthStatus>("/api/auth/status", fetcher, {
    fallbackData: { isLoggedIn: false, user: null },
    revalidateOnFocus: false,
  });
}
