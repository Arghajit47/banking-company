import { test as base } from "@playwright/test";
import { HomePage } from "@pages/frontend/home-page";
import { FAQPage } from "@pages/frontend/faq-page";
import { FooterPage } from "@pages/frontend/footer-page";
import { CareersPage } from "@pages/frontend/careers-page";
import { AboutPage } from "@pages/frontend/about-page";
import { SecurityPage } from "@pages/frontend/security-page";

type UiFixtures = {
  homepage: HomePage;
  faqPage: FAQPage;
  footerPage: FooterPage;
  careersPage: CareersPage;
  aboutPage: AboutPage;
  securityPage: SecurityPage;
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
  careersPage: async ({ page }, fixtureUse) => {
    const cp = new CareersPage(page);
    await fixtureUse(cp);
  },
  aboutPage: async ({ page }, fixtureUse) => {
    const ap = new AboutPage(page);
    await fixtureUse(ap);
  },
  securityPage: async ({ page }, fixtureUse) => {
    const sp = new SecurityPage(page);
    await fixtureUse(sp);
  },
});

export { expect } from "@playwright/test";
