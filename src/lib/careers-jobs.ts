"use client";

import useSWR from "swr";

export interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time";
  description: string;
}

export interface JobsResponse {
  jobs: JobOpening[];
}

const fetcher = async (url: string): Promise<JobsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Careers jobs data request failed: ${response.status}`);
  }
  return response.json();
};

export function useCareersJobsData() {
  return useSWR<JobsResponse>("/api/careers/jobs", fetcher, {
    revalidateOnFocus: false,
  });
}
