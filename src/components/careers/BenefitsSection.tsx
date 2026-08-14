import Image from "next/image";

const SECTION_HEADING_PREFIX = "Our ";
const SECTION_HEADING_ACCENT = "Benefits";
const SECTION_BODY =
  "At YourBank, we value our employees and are dedicated to their well-being and success. We offer a comprehensive range of benefits designed to support their personal and professional growth.";

interface BenefitItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const BENEFITS: BenefitItem[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_benefit_1.svg",
    title: "Competitive Compensation",
    description:
      "We provide a competitive salary package that recognizes the skills and expertise of our employees. YourBank believes in rewarding exceptional performance and offering opportunities for financial growth.",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_benefit_2.svg",
    title: "Health and Wellness",
    description:
      "We prioritize the health and well-being of our employees by providing comprehensive medical, dental, and vision insurance plans. We also offer wellness programs, gym memberships, and resources to support a healthy lifestyle.",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_benefit_3.svg",
    title: "Retirement Planning",
    description:
      "YourBank is committed to helping employees plan for their future. We offer a retirement savings plan with a generous employer match to help them build a secure financial foundation for the long term.",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_benefit_4.svg",
    title: "Work-Life Balance",
    description:
      "We understand the importance of maintaining a healthy work-life balance. YourBank offers flexible work arrangements, paid time off, parental leave, and other programs that support employees in managing their personal and professional commitments.",
  },
];

const CORNER_RADII = [
  "rounded-tl-[50px] rounded-tr-[20px] rounded-br-[50px] rounded-bl-[20px]",
  "rounded-tl-[20px] rounded-tr-[50px] rounded-br-[20px] rounded-bl-[50px]",
  "rounded-tl-[20px] rounded-tr-[50px] rounded-br-[20px] rounded-bl-[50px]",
  "rounded-tl-[50px] rounded-tr-[20px] rounded-br-[50px] rounded-bl-[20px]",
];

function BenefitCard({ benefit, index }: { benefit: BenefitItem; index: number }) {
  return (
    <article
      data-testid={`benefit-card-${index}`}
      className={`relative flex flex-1 flex-col gap-[30px] overflow-hidden border border-[#CAFF33]/10 bg-[#1C1C1C] p-[30px] md:p-[50px] ${CORNER_RADII[index]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#CAFF33]/5 to-transparent" />
      <div className="flex flex-row items-center gap-[20px]">
        <div
          data-testid={`benefit-card-icon-container-${index}`}
          className="flex h-[98px] w-[98px] shrink-0 items-center justify-center rounded-[70px] bg-gradient-to-b from-[#CAFF33]/5 to-transparent p-[12px]"
        >
          <div className="flex h-[74px] w-[74px] items-center justify-center rounded-[50px] border border-[#CAFF33]/20 bg-gradient-to-b from-[#CAFF33]/10 to-transparent p-[20px]">
            <Image
              src={benefit.icon}
              alt=""
              width={34}
              height={34}
              aria-hidden="true"
              data-testid={`benefit-card-icon-${index}`}
            />
          </div>
        </div>
        <h3
          data-testid={`benefit-card-title-${index}`}
          className="text-[20px] font-normal leading-[150%] text-white md:text-[24px]"
        >
          {benefit.title}
        </h3>
      </div>
      <p
        data-testid={`benefit-card-body-${index}`}
        className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
      >
        {benefit.description}
      </p>
    </article>
  );
}

export function BenefitsSection() {
  const rows: [BenefitItem, BenefitItem][] = [
    [BENEFITS[0], BENEFITS[1]],
    [BENEFITS[2], BENEFITS[3]],
  ];

  return (
    <section
      data-testid="benefits-section"
      className="px-4 py-12 font-[var(--font-lexend)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div
        data-testid="benefits-section-header"
        className="mb-[60px] flex flex-col gap-[14px] md:mb-[80px] lg:pr-[300px]"
      >
        <h2
          data-testid="benefits-section-heading"
          className="text-[36px] font-medium leading-[150%] md:text-[42px] lg:text-[48px]"
        >
          <span className="text-white">{SECTION_HEADING_PREFIX}</span>
          <span className="text-[#CAFF33]">{SECTION_HEADING_ACCENT}</span>
        </h2>
        <p
          data-testid="benefits-section-paragraph"
          className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
        >
          {SECTION_BODY}
        </p>
      </div>

      <div
        data-testid="benefits-section-grid"
        className="flex flex-col gap-[50px]"
      >
        {rows.map((row, rowIdx) => (
          <div key={rowIdx}>
            {rowIdx > 0 && (
              <hr
                data-testid={`benefits-row-divider-${rowIdx}`}
                className="mb-[50px] border-t border-dashed border-[#262626]"
              />
            )}
            <div className="flex flex-col gap-[40px] md:flex-row md:gap-0">
              <BenefitCard benefit={row[0]} index={rowIdx * 2} />
              <div className="hidden w-[50px] shrink-0 md:block">
                <div className="mx-auto h-full w-px border-r border-dashed border-[#262626]" />
              </div>
              <BenefitCard benefit={row[1]} index={rowIdx * 2 + 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
