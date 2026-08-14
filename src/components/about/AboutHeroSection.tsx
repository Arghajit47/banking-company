import Image from "next/image";

const LABEL = "Welcome to YourBank";
const HEADING_WHITE = "Where Banking Meets ";
const HEADING_ACCENT = "Excellence!";
const BODY =
  "At YourBank, we believe that banking should be more than just transactions. It should be an experience that empowers individuals and businesses to thrive and reach their financial goals. As a trusted financial institution, we are committed to delivering exceptional banking services that go beyond expectations. With a focus on innovation, personalized solutions, and unwavering integrity, we strive to provide the best banking experience for our valued customers. Join us on this exciting journey and discover a new level of banking excellence.";

export function AboutHeroSection() {
  return (
    <section
      data-testid="about-hero-section"
      className="relative mx-auto w-full max-w-[1599px] overflow-hidden rounded-[20px] bg-[#1C1C1C] p-[50px]"
    >
      <Image
        src="/assets/illustrations/abstract_design_hero_illustration.svg"
        alt=""
        width={505}
        height={480}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden md:block"
        aria-hidden="true"
      />

      <div className="flex flex-col items-start md:flex-row">
        <div
          data-testid="about-hero-text-container"
          className="relative z-20 flex shrink-0 flex-col gap-[23px] rounded-[20px_0_80px_20px] bg-[#1A1A1A] p-8 md:w-[791px] md:p-[80px]"
        >
          <p
            data-testid="about-hero-label"
            className="font-[var(--font-lexend)] text-[18px] font-normal leading-[150%] text-white md:text-[20px]"
          >
            {LABEL}
          </p>
          <h1
            data-testid="about-hero-heading"
            className="font-[var(--font-lexend)] text-[32px] font-medium leading-[130%] md:text-[48px] lg:text-[58px]"
          >
            <span className="text-white">{HEADING_WHITE}</span>
            <span className="text-[#CAFF33]">{HEADING_ACCENT}</span>
          </h1>
          <p
            data-testid="about-hero-paragraph"
            className="font-[var(--font-lexend)] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {BODY}
          </p>
        </div>

        <div
          data-testid="about-hero-image-wrapper"
          className="relative z-10 mt-6 flex-1 md:-ml-[260px] md:mt-0"
        >
          <Image
            data-testid="about-hero-image"
            src="/assets/images/about_hero_image.png"
            alt="YourBank team"
            width={968}
            height={716}
            className="w-full rounded-[16px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
