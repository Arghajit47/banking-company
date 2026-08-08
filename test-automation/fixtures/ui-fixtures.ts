import { test as base } from "@playwright/test";
import { HomePage } from "@pages/frontend/home-page";

type UiFixtures = {
  homepage: HomePage;
};

export const test = base.extend<UiFixtures>({
  homepage: async ({ page }, fixtureUse) => {
    const hp = new HomePage(page);
    await fixtureUse(hp);
  },
});

export { expect } from "@playwright/test";
