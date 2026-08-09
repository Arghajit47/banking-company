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
