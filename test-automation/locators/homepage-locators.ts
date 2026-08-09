export const HOMEPAGE_LOCATORS = {
  navbar: '[data-testid="navbar"]',
  navbarLogo: '[data-testid="navbar-logo"]',
  navLogin: '[data-testid="nav-login"]',
  navSignUp: '[data-testid="nav-sign-up"]',
  navUser: '[data-testid="nav-user"]',
  navLogout: '[data-testid="nav-logout"]',
  mobileMenuButton: '[data-testid="nav-mobile-toggle"]',
  mobileMenu: '[data-testid="mobile-menu"]',
  mobileLogin: '[data-testid="mobile-login"]',
  mobileSignUp: '[data-testid="mobile-sign-up"]',
  ctaSection: '[data-testid="cta-section"]',
  ctaHeading: '[data-testid="cta-heading"]',
  ctaBody: '[data-testid="cta-body"]',
  ctaButton: '[data-testid="cta-button"]',
  // Real content excludes the SWR loading skeleton, which is aria-hidden.
  ctaHeadingReal: '[data-testid="cta-heading"]:not([aria-hidden="true"])',
  ctaButtonReal: '[data-testid="cta-button"]:not([aria-hidden="true"])',
} as const;
