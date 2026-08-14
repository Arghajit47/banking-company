"use client";

import Image from "next/image";
import { useSecurityProtectionsData } from "@/lib/security-protections";
import { useMounted } from "@/lib/use-mounted";

const SECTION_HEADING_PREFIX = "How We ";
const SECTION_HEADING_ACCENT = "Protect You";
const SECTION_BODY =
  "At YourBank, we prioritize the security and confidentiality of your financial information. Our state-of-the-art encryption technology and stringent data protection measures ensure your assets and transactions are safeguarded at all times.";

function ProtectionSkeleton() {
  return (
    <section
      data-testid="protection-section"
      className="px-4 py-12 font-[var(--font-lexend)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="protection-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <div
            data-testid="protection-section-heading"
            aria-hidden="true"
            className="h-12 w-1/3 animate-pulse rounded bg-[#333333]"
          />
          <div
            data-testid="protection-section-paragraph"
            aria-hidden="true"
            className="h-20 w-full animate-pulse rounded bg-[#333333]"
          />
        </div>
        <div
          data-testid="protection-cards-container"
          className="grid grid-cols-1 gap-[30px] rounded-[20px] p-[50px] md:grid-cols-2"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-testid={`protection-card-${i}`}
              className="h-[250px] animate-pulse rounded-[20px] bg-[#333333]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProtectionSection() {
  const mounted = useMounted();
  const { data, error } = useSecurityProtectionsData();

  if (!mounted || !data) {
    return <ProtectionSkeleton />;
  }

  return (
    <section
      data-testid="protection-section"
      className="px-4 py-12 font-[var(--font-lexend)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="protection-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <h2
            data-testid="protection-section-heading"
            className="text-[36px] font-normal leading-[150%] md:text-[42px] lg:text-[48px]"
          >
            <span className="text-white">{SECTION_HEADING_PREFIX}</span>
            <span className="text-[#CAFF33]">{SECTION_HEADING_ACCENT}</span>
          </h2>
          <p
            data-testid="protection-section-paragraph"
            className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {SECTION_BODY}
          </p>
        </div>

        <div
          data-testid="protection-cards-container"
          className="relative overflow-hidden rounded-[20px]"
        >
          <Image
            src="/assets/images/background_image.png"
            alt=""
            fill
            className="object-cover opacity-50"
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-1 gap-[30px] p-[50px] md:grid-cols-2">
            {error && (
              <p className="col-span-2 text-sm text-red-400">
                Unable to load content. Please refresh.
              </p>
            )}
            {data.protections.map((feature, idx) => (
              <div
                key={feature.id}
                data-testid={`protection-card-${idx + 1}`}
                className="flex flex-col gap-[24px] rounded-[20px] border border-[#262626] bg-[#1C1C1C]/80 p-[50px] backdrop-blur-sm"
              >
                <div className="flex items-center gap-[20px]">
                  <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-[50%] border border-[#262626] bg-[#1A1A1A]">
                    <Image
                      data-testid={`protection-card-icon-${idx + 1}`}
                      src={feature.icon}
                      alt=""
                      width={40}
                      height={40}
                      aria-hidden="true"
                    />
                    <div className="absolute -bottom-1 -right-1 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A]">
                      <Image
                        src={feature.badgeIcon}
                        alt=""
                        width={20}
                        height={20}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3
                    data-testid={`protection-card-title-${idx + 1}`}
                    className="text-[18px] font-medium leading-[150%] text-white md:text-[22px]"
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  data-testid={`protection-card-description-${idx + 1}`}
                  className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
