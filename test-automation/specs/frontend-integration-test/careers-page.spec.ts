import { test } from "@fixtures/ui-fixtures";

test.describe("Careers Page Hero Section", () => {
  test("hero section renders and validates against API response", async ({ careersPage }) => {
    await careersPage.assertCareersHeroFromApi();
  });

  test("abstract design element (Figma node 659:2) is visible", async ({ careersPage }) => {
    await careersPage.assertCareersHeroAbstractDesign();
  });
});
