export const CAREERS_LOCATORS = {
  heroSection: '[data-testid="careers-hero-section"]',
  heroTextContainer: '[data-testid="careers-hero-text-container"]',
  heroHeadingReal: '[data-testid="careers-hero-heading"]:not([aria-hidden="true"])',
  heroParagraphReal: '[data-testid="careers-hero-paragraph"]:not([aria-hidden="true"])',
  heroImage: '[data-testid="careers-hero-image"]',
  heroImageWrapper: '[data-testid="careers-hero-image-wrapper"]',
  heroAbstractDesign: '[data-testid="careers-hero-abstract-design"]',
} as const;
