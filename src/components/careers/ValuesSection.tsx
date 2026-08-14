import type { ValueCard } from "@/lib/values";

const VALUES: ValueCard[] = [
  {
    id: 1,
    title: "Integrity",
    description:
      "We conduct ourselves with utmost honesty, transparency, and ethical behavior. We believe in doing what is right for our customers, colleagues, and stakeholders, even when faced with difficult choices.",
  },
  {
    id: 2,
    title: "Customer Centricity",
    description:
      "Our customers are at the heart of everything we do. We are dedicated to understanding their needs, providing personalized solutions, and delivering exceptional service that exceeds expectations.",
  },
  {
    id: 3,
    title: "Collaboration",
    description:
      "We foster a collaborative and inclusive work environment, where teamwork and diversity are celebrated. By leveraging the unique strengths and perspectives of our employees, we drive innovation and achieve greater success together.",
  },
  {
    id: 4,
    title: "Innovation",
    description:
      "We embrace change and constantly seek innovative solutions to meet the evolving needs of our customers. We encourage our employees to think creatively, challenge conventions, and explore new ideas to drive the future of banking.",
  },
];

const SECTION_HEADING_PREFIX = "Our ";
const SECTION_HEADING_ACCENT = "Values";
const SECTION_BODY =
  "At YourBank, our values form the foundation of our organization and guide our actions. We believe in upholding the highest standards of integrity, delivering exceptional service, and embracing innovation. These values define our culture and shape the way we work together to achieve our goals.";

function ValueCardItem({
  card,
  index,
}: {
  card: ValueCard;
  index: number;
}) {
  return (
    <article
      data-testid={`values-card-${index}`}
      className="flex flex-1 flex-col gap-[20px] border-l border-[#CAFF33] pl-[30px] md:gap-[30px]"
    >
      <h3
        data-testid={`values-card-title-${index}`}
        className="font-[var(--font-lexend)] text-[36px] font-medium leading-[150%] text-[#4C4C4D] md:text-[48px] lg:text-[58px]"
      >
        {card.title}
      </h3>
      <p
        data-testid={`values-card-body-${index}`}
        className="font-[var(--font-lexend)] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
      >
        {card.description}
      </p>
    </article>
  );
}

export function ValuesSection() {
  const rows: [ValueCard, ValueCard][] = [
    [VALUES[0], VALUES[1]],
    [VALUES[2], VALUES[3]],
  ];

  return (
    <section
      data-testid="values-section"
      className="px-4 py-12 font-[var(--font-lexend)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div
        data-testid="values-section-header"
        className="mb-[60px] flex flex-col gap-[14px] md:mb-[80px] lg:pr-[300px]"
      >
        <h2
          data-testid="values-section-heading"
          className="text-[36px] font-medium leading-[150%] md:text-[42px] lg:text-[48px]"
        >
          <span className="text-white">{SECTION_HEADING_PREFIX}</span>
          <span className="text-[#CAFF33]">{SECTION_HEADING_ACCENT}</span>
        </h2>
        <p
          data-testid="values-section-paragraph"
          className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
        >
          {SECTION_BODY}
        </p>
      </div>

      <div
        data-testid="values-section-grid"
        className="flex flex-col gap-[50px] md:gap-[80px]"
      >
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-col gap-[40px] md:flex-row md:gap-[80px]"
          >
            {row.map((card, colIdx) => (
              <ValueCardItem
                key={card.id}
                card={card}
                index={rowIdx * 2 + colIdx}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
