import Image from "next/image";

export function CareersHeroSection() {
  return (
    <section
      data-testid="careers-hero-section"
      className="relative mx-auto w-full max-w-[1599px] overflow-hidden rounded-[20px] bg-[#1C1C1C] p-[50px]"
    >
      {/* Abstract design illustration — desktop only */}
      <Image
        data-testid="careers-hero-abstract"
        src="/assets/illustrations/abstract_design_hero_illustration.svg"
        alt=""
        width={505}
        height={480}
        className="pointer-events-none absolute right-0 top-0 hidden md:block"
        aria-hidden="true"
      />

      {/* Horizontal flex container */}
      <div className="flex flex-col items-start md:flex-row">
        {/* Text card */}
        <div
          data-testid="careers-hero-text-container"
          className="relative z-10 flex shrink-0 flex-col gap-[23px] rounded-[20px_0_80px_20px] bg-[#1A1A1A] p-[80px] md:w-[791px]"
        >
          <h1
            data-testid="careers-hero-heading"
            className="font-[var(--font-lexend)] text-[58px] font-medium leading-[130%] text-white"
          >
            Welcome to{" "}
            <span className="text-[#CAFF33]">YourBank</span>
            {" "}Careers!
          </h1>
          <p
            data-testid="careers-hero-paragraph"
            className="font-[var(--font-lexend)] text-[18px] font-light leading-[150%] text-[#B3B3B3]"
          >
            Join our team and embark on a rewarding journey in the banking
            industry. At YourBank, we are committed to fostering a culture of
            excellence and providing opportunities for professional growth. With
            a focus on innovation, customer service, and integrity, we strive to
            make a positive impact in the lives of our customers and communities.
            Join us today and be a part of our mission to shape the future of
            banking.
          </p>
        </div>

        {/* Hero image */}
        <div
          data-testid="careers-hero-image-wrapper"
          className="mt-6 flex-1 md:mt-0 md:-ml-[260px]"
        >
          <Image
            data-testid="careers-hero-image"
            src="/assets/images/hero_image.png"
            alt="Careers at YourBank"
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
