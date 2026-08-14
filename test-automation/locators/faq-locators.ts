export const FAQ_LOCATORS = {
  faqSection: '[data-testid="faq-section"]',
  faqHeading: '[data-testid="faq-heading"]',
  faqHeadingReal: '[data-testid="faq-heading"]:not([aria-hidden="true"])',
  faqSubheading: '[data-testid="faq-subheading"]',
  faqSubheadingReal: '[data-testid="faq-subheading"]:not([aria-hidden="true"])',
  faqItem: '[data-testid^="faq-item-"]',
  faqQuestion: '[data-testid="faq-question"]',
  faqAnswer: '[data-testid="faq-answer"]',
  faqSeparator: '[data-testid="faq-separator"]',
  faqLoadAll: '[data-testid="faq-load-all"]',
  faqFadeOverlay: '[data-testid="faq-fade-overlay"]',
  faqEmptyState: '[data-testid="faq-empty-state"]',
} as const;
