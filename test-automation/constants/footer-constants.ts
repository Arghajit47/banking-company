export const FOOTER_TEXT = {
  DEFAULT_EMAIL: "hello@skillbirdge.com",
  DEFAULT_PHONE: "+91 91813 23 2309",
  DEFAULT_LOCATION: "Somewhere in the World",
  DEFAULT_COPYRIGHT: "YourBank All Rights Reserved",
  EMAIL_LINK_PREFIX: "mailto:",
  PHONE_LINK_PREFIX: "tel:",
  PRIVACY_POLICY: "Privacy Policy",
  TERMS_OF_SERVICE: "Terms of Service",
} as const;

export const FOOTER_API_PATH = "/api/config/footer";

export interface FooterApiResponse {
  navLinks: Array<{ label: string; href: string }>;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: Array<{ name: string; url: string }>;
  copyright: string;
}
