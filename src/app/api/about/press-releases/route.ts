import { NextResponse } from "next/server";

export interface PressReleaseItem {
  id: number;
  date: string;
  headline: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

export interface PressReleasesData {
  pressReleases: PressReleaseItem[];
}

const PRESS_RELEASES: PressReleaseItem[] = [
  {
    id: 1,
    date: "2024-11-06",
    headline:
      "YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
    excerpt:
      "YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences.",
    imageUrl: "/assets/images/press_image_1.png",
    url: "#",
  },
  {
    id: 2,
    date: "2024-11-12",
    headline:
      "YourBank Expands Branch Network with Opening of New Location in Chennai",
    excerpt:
      "YourBank is excited to announce the grand opening of our newest branch in the city. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services.",
    imageUrl: "/assets/images/press_image_2.png",
    url: "#",
  },
  {
    id: 3,
    date: "2024-12-24",
    headline:
      "YourBank Partners with Local Nonprofit to Support Financial Education Initiatives",
    excerpt:
      "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions.",
    imageUrl: "/assets/images/press_image_3.png",
    url: "#",
  },
  {
    id: 4,
    date: "2024-12-28",
    headline:
      "YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility",
    excerpt:
      "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions.",
    imageUrl: "/assets/images/press_image_4.png",
    url: "#",
  },
];

export async function GET(): Promise<NextResponse<PressReleasesData>> {
  return NextResponse.json({ pressReleases: PRESS_RELEASES });
}
