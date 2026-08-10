import { test as base } from "@playwright/test";
import { HomePage } from "@pages/frontend/home-page";
import { FAQPage } from "@pages/frontend/faq-page";
import { FooterPage } from "@pages/frontend/footer-page";

type UiFixtures = {
  homepage: HomePage;
  faqPage: FAQPage;
  footerPage: FooterPage;
};

export const test = base.extend<UiFixtures>({
  homepage: async ({ page }, fixtureUse) => {
    const hp = new HomePage(page);
    await fixtureUse(hp);
  },
  faqPage: async ({ page }, fixtureUse) => {
    const fp = new FAQPage(page);
    await fixtureUse(fp);
  },
  footerPage: async ({ page }, fixtureUse) => {
    const fp = new FooterPage(page);
    await fixtureUse(fp);
  },
});

export { expect } from "@playwright/test";
