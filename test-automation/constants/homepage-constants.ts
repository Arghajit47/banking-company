// BC-10 / BC-12 — CTA Section
export const CTA_TEXT = {
  HEADING_START: "Start your financial journey with ",
  HEADING_ACCENT: "YourBank today!",
  BODY: "At YourBank, our mission is to provide comprehensive banking solutions",
  BUTTON_LABEL: "Open Account",
} as const;

export const CTA_UI = {
  HOME_PATH: "/",
  DEFAULT_PAGE_PARAM: "home",
  MOBILE_VIEWPORT: { width: 375, height: 667 },
  MENU_ANIMATION_DELAY_MS: 300,
} as const;

export const CTA_SCHEMA_LABELS = {
  CTA_CONFIG: "cta config schema",
} as const;

// BC-6 — Navbar auth integration constants
export const NAVBAR_TEXT = {
  LOGIN: "Login",
  SIGN_UP: "Sign Up",
  LOGOUT: "Logout",
} as const;

export const AUTH_MOCK_USER = {
  name: "Jane Doe",
  avatarUrl: null,
} as const;

// BC-13 — Testimonials Section
export const TESTIMONIALS_TEXT = {
  HEADING: "Testimonials",
  SUBHEADING_START: "Discover how YourBank",
  TAB_INDIVIDUALS: "For Individuals",
  TAB_BUSINESSES: "For Businesses",
} as const;

// BC-21 — Hero Section
export const HERO_TEXT = {
  HEADLINE_START: "Welcome to ",
  HEADLINE_ACCENT: "YourBank",
  SUBHEADING_START: "At YourBank, our mission is to provide comprehensive banking solutions",
  CTA_LABEL: "Open Account",
  BADGE: "No LLC Required, No Credit Check.",
  MONTHLY_INCOME_LABEL: "Monthly Income",
  TRANSACTIONS_HEADING: "Your Transactions",
  EXCHANGE_HEADING: "Money Exchange",
  EXCHANGE_BUTTON: "Exchange",
  SUPPORTED_CURRENCY: "Supported Currency",
} as const;

export const HERO_UI = {
  DESKTOP_VIEWPORT: { width: 1920, height: 1080 },
  MOBILE_VIEWPORT: { width: 375, height: 667 },
  ANIMATION_DELAY_MS: 300,
} as const;

// BC-24 — Products Section
export const PRODUCTS_TEXT = {
  HEADING: "Our Products",
  SUBHEADING_START: "Discover a range of comprehensive",
  TAB_INDIVIDUALS: "For Individuals",
  TAB_BUSINESSES: "For Businesses",
} as const;

export const PRODUCTS_COUNTS = {
  EXPECTED_CARDS: 6,
  SWR_LOAD_TIMEOUT_MS: 15000,
} as const;
