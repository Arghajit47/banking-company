"use client";

import Image from "next/image";
import { useAboutMissionVisionData } from "@/lib/about-mission-vision";
import { useMounted } from "@/lib/use-mounted";

const SECTION_HEADING = "Mission & Vision";
const SECTION_BODY =
  "We envision being a leading force in the industry, driven by innovation, integrity, and inclusivity, creating a brighter financial future for individuals and businesses while maintaining a strong commitment to customer satisfaction and community development";

function MissionVisionSkeleton() {
  return (
    <section
      data-testid="mission-vision-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="mission-vision-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <div
            data-testid="mission-vision-section-heading"
            aria-hidden="true"
            className="h-12 w-1/3 animate-pulse rounded bg-[#333333]"
          />
          <div
            data-testid="mission-vision-section-paragraph"
            aria-hidden="true"
            className="h-20 w-full animate-pulse rounded bg-[#333333]"
          />
        </div>
        <div
          data-testid="mission-vision-cards"
          className="flex flex-col gap-[30px]"
        >
          <div
            data-testid="mission-card"
            className="flex flex-col gap-[30px] lg:flex-row"
          >
            <div className="h-[400px] animate-pulse rounded-[50px_50px_20px_20px] bg-[#333333] lg:w-[41%]" />
            <div
              data-testid="mission-card-content"
              className="flex flex-col gap-[14px] lg:w-[59%] lg:pl-[50px] lg:pt-[60px]"
            >
              <div
                data-testid="mission-card-heading"
                aria-hidden="true"
                className="h-10 w-1/4 animate-pulse rounded bg-[#333333]"
              />
              <div
                data-testid="mission-card-body"
                aria-hidden="true"
                className="h-40 w-full animate-pulse rounded bg-[#333333]"
              />
            </div>
          </div>
          <div
            data-testid="vision-card"
            className="flex flex-col-reverse gap-[30px] lg:flex-row"
          >
            <div
              data-testid="vision-card-content"
              className="flex flex-col gap-[14px] lg:w-[59%] lg:pr-[50px] lg:pt-[60px]"
            >
              <div
                data-testid="vision-card-heading"
                aria-hidden="true"
                className="h-10 w-1/4 animate-pulse rounded bg-[#333333]"
              />
              <div
                data-testid="vision-card-body"
                aria-hidden="true"
                className="h-40 w-full animate-pulse rounded bg-[#333333]"
              />
            </div>
            <div className="h-[400px] animate-pulse rounded-[50px_50px_20px_20px] bg-[#333333] lg:w-[41%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MissionVisionSection() {
  const mounted = useMounted();
  const { data, error } = useAboutMissionVisionData();

  if (!mounted || !data) {
    return <MissionVisionSkeleton />;
  }

  return (
    <section
      data-testid="mission-vision-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="mission-vision-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <h2
            data-testid="mission-vision-section-heading"
            className="text-[36px] font-normal leading-[150%] text-[#CAFF33] md:text-[42px] lg:text-[48px] laptop:text-[38px] laptop:font-medium"
          >
            {SECTION_HEADING}
          </h2>
          <p
            data-testid="mission-vision-section-paragraph"
            className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {SECTION_BODY}
          </p>
        </div>

        <div
          data-testid="mission-vision-cards"
          className="flex flex-col gap-[30px]"
        >
          {error && (
            <p className="text-sm text-red-400">
              Unable to load content. Please refresh.
            </p>
          )}

          {/* Mission row */}
          <div
            data-testid="mission-card"
            className="flex flex-col gap-[30px] lg:flex-row"
          >
            <div className="relative h-[400px] overflow-hidden rounded-[50px_50px_20px_20px] lg:h-auto lg:w-[41%] lg:rounded-[50px_50px_20px_20px]">
              <Image
                data-testid="mission-card-image"
                src="/assets/images/mission_image.png"
                alt="Mission"
                width={544}
                height={561}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/80 to-transparent" />
              <Image
                src="/assets/illustrations/abstract_design_mission.svg"
                alt=""
                width={634}
                height={602}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
                aria-hidden="true"
              />
            </div>
            <div
              data-testid="mission-card-content"
              className="flex flex-col gap-[14px] lg:w-[59%] lg:pl-[50px] lg:pt-[60px]"
            >
              <h3
                data-testid="mission-card-heading"
                className="text-[28px] font-medium leading-[150%] text-white md:text-[34px] lg:text-[38px] laptop:text-[32px]"
              >
                {data.mission.title}
              </h3>
              <p
                data-testid="mission-card-body"
                className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
              >
                {data.mission.description}
              </p>
            </div>
          </div>

          {/* Vision row */}
          <div
            data-testid="vision-card"
            className="flex flex-col-reverse gap-[30px] lg:flex-row"
          >
            <div
              data-testid="vision-card-content"
              className="flex flex-col gap-[14px] lg:w-[59%] lg:pr-[50px] lg:pt-[60px]"
            >
              <h3
                data-testid="vision-card-heading"
                className="text-[28px] font-medium leading-[150%] text-white md:text-[34px] lg:text-[38px] laptop:text-[32px]"
              >
                {data.vision.title}
              </h3>
              <p
                data-testid="vision-card-body"
                className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
              >
                {data.vision.description}
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-[50px_50px_20px_20px] lg:h-auto lg:w-[41%] lg:rounded-[50px_50px_20px_20px]">
              <Image
                data-testid="vision-card-image"
                src="/assets/images/vision_image.png"
                alt="Vision"
                width={544}
                height={561}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1C1C1C]/80 to-transparent" />
              <Image
                src="/assets/illustrations/abstract_design_vision.svg"
                alt=""
                width={634}
                height={602}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
