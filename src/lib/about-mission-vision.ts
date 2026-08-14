"use client";

import useSWR from "swr";

export interface MissionVisionItem {
  title: string;
  description: string;
}

export interface MissionVisionData {
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

const fetcher = async (url: string): Promise<MissionVisionData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Mission vision data request failed: ${response.status}`);
  }
  return response.json();
};

export function useAboutMissionVisionData() {
  return useSWR<MissionVisionData>("/api/about/mission-vision", fetcher, {
    revalidateOnFocus: false,
  });
}
