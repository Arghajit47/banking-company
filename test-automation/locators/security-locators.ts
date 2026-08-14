export const SECURITY_LOCATORS = {
  heroSection: '[data-testid="security-hero-section"]',
  heroTextContainer: '[data-testid="security-hero-text-container"]',
  heroHeading: '[data-testid="security-hero-heading"]:not([aria-hidden="true"])',
  heroParagraph: '[data-testid="security-hero-paragraph"]:not([aria-hidden="true"])',
  heroImageWrapper: '[data-testid="security-hero-image-wrapper"]',
  heroImage: '[data-testid="security-hero-image"]',
} as const;
