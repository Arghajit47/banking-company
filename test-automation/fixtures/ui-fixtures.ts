import { test as base } from "@playwright/test";
import { HomePage } from "@pages/frontend/home-page";
import { FooterPage } from "@pages/frontend/footer-page";

type UiFixtures = {
  homepage: HomePage;
  footerPage: FooterPage;
};

export const test = base.extend<UiFixtures>({
  homepage: async ({ page }, fixtureUse) => {
    const hp = new HomePage(page);
    await fixtureUse(hp);
  },
  footerPage: async ({ page }, fixtureUse) => {
    const fp = new FooterPage(page);
    await fixtureUse(fp);
  },
});

export { expect } from "@playwright/test";
