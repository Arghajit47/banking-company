import Image from "next/image";

const SECTION_HEADING = "Press Releases";
const SECTION_BODY =
  "Stay updated with the latest happenings and exciting developments at YourBank through our press releases.";

interface PressRelease {
  id: number;
  title: string;
  location: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

const PRESS_RELEASES: PressRelease[] = [
  {
    id: 1,
    title:
      "YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
    location: "India",
    date: "06/11/2024",
    excerpt:
      "YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to delivering exceptional value and building lasting relationships with our valued customers.",
    imageUrl: "/assets/images/press_image_1.png",
    url: "#",
  },
  {
    id: 2,
    title:
      "YourBank Expands Branch Network with Opening of New Location in Chennai",
    location: "India",
    date: "12/11/2024",
    excerpt:
      "YourBank is excited to announce the grand opening of our newest branch in the city. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking, further strengthening our presence in the local community.",
    imageUrl: "/assets/images/press_image_2.png",
    url: "#",
  },
  {
    id: 3,
    title:
      "YourBank Partners with Local Nonprofit to Support Financial Education Initiatives",
    location: "India",
    date: "24/12/2024",
    excerpt:
      "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.",
    imageUrl: "/assets/images/press_image_3.png",
    url: "#",
  },
  {
    id: 4,
    title:
      "YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility",
    location: "India",
    date: "28/12/2024",
    excerpt:
      "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.",
    imageUrl: "/assets/images/press_image_4.png",
    url: "#",
  },
];

export function PressReleasesSection() {
  return (
    <section
      data-testid="press-releases-section"
      className="px-4 py-12 font-[var(--font-lexend)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="press-releases-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <h2
            data-testid="press-releases-section-heading"
            className="text-[36px] font-normal leading-[150%] text-[#CAFF33] md:text-[42px] lg:text-[48px]"
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
          {PRESS_RELEASES.map((pr) => (
            <article
              key={pr.id}
              data-testid={`press-release-card-${pr.id}`}
              className="flex flex-col gap-[51px] rounded-[40px_40px_16px_16px] border border-[#262626] bg-[#1C1C1C] p-[30px]"
            >
              <div className="relative h-[250px] w-full overflow-hidden rounded-[30px_30px_12px_12px] md:h-[333px]">
                <Image
                  data-testid={`press-release-card-image-${pr.id}`}
                  src={pr.imageUrl}
                  alt={pr.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <h3
                    data-testid={`press-release-card-title-${pr.id}`}
                    className="text-[20px] font-normal leading-[150%] text-white md:text-[24px]"
                  >
                    {pr.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-[10px]">
                    <span
                      data-testid={`press-release-card-location-${pr.id}`}
                      className="rounded-[68px] border border-[#262626] bg-[#1A1A1A] px-[16px] py-[8px] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
                    >
                      Location: {pr.location}
                    </span>
                    <span
                      data-testid={`press-release-card-date-${pr.id}`}
                      className="rounded-[68px] border border-[#262626] bg-[#1A1A1A] px-[16px] py-[8px] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
                    >
                      Date: {pr.date}
                    </span>
                  </div>
                </div>

                <p
                  data-testid={`press-release-card-excerpt-${pr.id}`}
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
