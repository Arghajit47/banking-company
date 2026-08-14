import Image from "next/image";

const SECTION_HEADING_PREFIX = "How We ";
const SECTION_HEADING_ACCENT = "Protect You";
const SECTION_BODY =
  "At YourBank, we prioritize the security and confidentiality of your financial information. Our state-of-the-art encryption technology and stringent data protection measures ensure your assets and transactions are safeguarded at all times.";

interface ProtectionFeature {
  id: number;
  icon: string;
  badgeIcon: string;
  title: string;
  description: string;
}

const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_protection_1.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_1.svg",
    title: "Secure Online Banking Platform",
    description:
      "Our online banking platform is built with multiple layers of security to safeguard your information. We utilize industry-standard encryption protocols to ensure that your data remains confidential and protected during transmission.",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_protection_2.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_2.svg",
    title: "Multi-Factor Authentication",
    description:
      "To enhance the security of your online banking experience, we employ multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification, such as a password and a one-time verification code, to access your account.",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_protection_3.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_3.svg",
    title: "Fraud Monitoring",
    description:
      "We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_protection_4.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_4.svg",
    title: "Secure Mobile Banking",
    description:
      "Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions, and manage your finances on the go, knowing that your information is protected.",
  },
];

export function ProtectionSection() {
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
            {PROTECTION_FEATURES.map((feature) => (
              <div
                key={feature.id}
                data-testid={`protection-card-${feature.id}`}
                className="flex flex-col gap-[24px] rounded-[20px] border border-[#262626] bg-[#1C1C1C]/80 p-[50px] backdrop-blur-sm"
              >
                <div className="flex items-center gap-[20px]">
                  <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-[50%] border border-[#262626] bg-[#1A1A1A]">
                    <Image
                      data-testid={`protection-card-icon-${feature.id}`}
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
                    data-testid={`protection-card-title-${feature.id}`}
                    className="text-[18px] font-medium leading-[150%] text-white md:text-[22px]"
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  data-testid={`protection-card-description-${feature.id}`}
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
