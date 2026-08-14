import { test } from "@fixtures/ui-fixtures";

test.describe("About Page Hero Section", () => {
  test("hero section renders and validates against API response", async ({ aboutPage }) => {
    await aboutPage.assertAboutHeroFromApi();
  });
});

test.describe("About Page Mission & Vision Section", () => {
  test("mission and vision section renders and validates against API response", async ({ aboutPage }) => {
    await aboutPage.assertMissionVisionFromApi();
  });
});
