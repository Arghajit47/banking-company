export const ABOUT_LOCATORS = {
  heroSection: '[data-testid="about-hero-section"]',
  heroTextContainer: '[data-testid="about-hero-text-container"]',
  heroLabelReal: '[data-testid="about-hero-label"]:not([aria-hidden="true"])',
  heroHeadingReal: '[data-testid="about-hero-heading"]:not([aria-hidden="true"])',
  heroParagraphReal: '[data-testid="about-hero-paragraph"]:not([aria-hidden="true"])',
  heroImageWrapper: '[data-testid="about-hero-image-wrapper"]',
  heroImage: '[data-testid="about-hero-image"]',
} as const;
