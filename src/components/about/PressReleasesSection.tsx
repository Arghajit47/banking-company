"use client";

import Image from "next/image";
import { useAboutPressReleasesData } from "@/lib/about-press-releases";
import { useMounted } from "@/lib/use-mounted";

const SECTION_HEADING = "Press Releases";
const SECTION_BODY =
  "Stay updated with the latest happenings and exciting developments at YourBank through our press releases.";

function PressReleasesSkeleton() {
  return (
    <section
      data-testid="press-releases-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="press-releases-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <div
            data-testid="press-releases-section-heading"
            aria-hidden="true"
            className="h-12 w-1/3 animate-pulse rounded bg-[#333333]"
          />
          <div
            data-testid="press-releases-section-paragraph"
            aria-hidden="true"
            className="h-8 w-2/3 animate-pulse rounded bg-[#333333]"
          />
        </div>
        <div
          data-testid="press-releases-grid"
          className="grid grid-cols-1 gap-[30px] md:grid-cols-2"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-testid={`press-release-card-${i}`}
              className="flex flex-col gap-[51px] rounded-[40px_40px_16px_16px] border border-[#262626] bg-[#1C1C1C] p-[30px]"
            >
              <div className="h-[333px] animate-pulse rounded-[30px_30px_12px_12px] bg-[#333333]" />
              <div className="flex flex-col gap-[30px]">
                <div className="h-16 animate-pulse rounded bg-[#333333]" />
                <div className="flex gap-[10px]">
                  <div className="h-10 w-32 animate-pulse rounded-[68px] bg-[#333333]" />
                  <div className="h-10 w-32 animate-pulse rounded-[68px] bg-[#333333]" />
                </div>
                <div className="h-24 animate-pulse rounded bg-[#333333]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PressReleasesSection() {
  const mounted = useMounted();
  const { data, error } = useAboutPressReleasesData();

  if (!mounted || !data) {
    return <PressReleasesSkeleton />;
  }

  return (
    <section
      data-testid="press-releases-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="press-releases-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <h2
            data-testid="press-releases-section-heading"
            className="text-[28px] font-normal leading-[150%] text-[#CAFF33] md:text-[38px] desktop:text-[48px]"
          >
            {SECTION_HEADING}
          </h2>
          <p
            data-testid="press-releases-section-paragraph"
            className="text-[16px] font-normal leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {SECTION_BODY}
          </p>
        </div>

        <div
          data-testid="press-releases-grid"
          className="grid grid-cols-1 gap-[30px] md:grid-cols-2"
        >
          {error && (
            <p className="col-span-2 text-sm text-red-400">
              Unable to load press releases. Please refresh.
            </p>
          )}

          {data.pressReleases.map((pr, idx) => (
            <article
              key={pr.id}
              data-testid={`press-release-card-${idx + 1}`}
              className="flex flex-col gap-[51px] rounded-[40px_40px_16px_16px] border border-[#262626] bg-[#1C1C1C] p-[30px]"
            >
              <div className="relative h-[250px] w-full overflow-hidden rounded-[30px_30px_12px_12px] md:h-[333px]">
                <Image
                  data-testid={`press-release-card-image-${idx + 1}`}
                  src={pr.imageUrl}
                  alt={pr.headline}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <h3
                    data-testid={`press-release-card-title-${idx + 1}`}
                    className="text-[18px] font-normal leading-[150%] text-white laptop:text-[20px] desktop:text-[24px]"
                  >
                    {pr.headline}
                  </h3>

                  <div className="flex flex-wrap items-center gap-[10px]">
                    <span
                      data-testid={`press-release-card-location-${idx + 1}`}
                      className="rounded-[68px] border border-[#262626] bg-[#1A1A1A] px-[16px] py-[8px] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
                    >
                      Location: India
                    </span>
                    <span
                      data-testid={`press-release-card-date-${idx + 1}`}
                      className="rounded-[68px] border border-[#262626] bg-[#1A1A1A] px-[16px] py-[8px] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
                    >
                      Date: {pr.date}
                    </span>
                  </div>
                </div>

                <p
                  data-testid={`press-release-card-excerpt-${idx + 1}`}
                  className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
                >
                  {pr.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
