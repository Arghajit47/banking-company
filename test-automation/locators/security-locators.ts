export const SECURITY_LOCATORS = {
  heroSection: '[data-testid="security-hero-section"]',
  heroTextContainer: '[data-testid="security-hero-text-container"]',
  heroHeading: '[data-testid="security-hero-heading"]:not([aria-hidden="true"])',
  heroParagraph: '[data-testid="security-hero-paragraph"]:not([aria-hidden="true"])',
  heroImageWrapper: '[data-testid="security-hero-image-wrapper"]',
  heroImage: '[data-testid="security-hero-image"]',
  protectionSection: '[data-testid="protection-section"]',
  protectionSectionHeading: '[data-testid="protection-section-heading"]',
  protectionSectionParagraph: '[data-testid="protection-section-paragraph"]',
  protectionCardsContainer: '[data-testid="protection-cards-container"]',
  protectionCard1: '[data-testid="protection-card-1"]',
  protectionCardTitle1: '[data-testid="protection-card-title-1"]',
} as const;
