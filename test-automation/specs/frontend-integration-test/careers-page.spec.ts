import { test } from "@fixtures/ui-fixtures";

test.describe("Careers Page Hero Section", () => {
  test("hero section renders and validates against API response", async ({ careersPage }) => {
    await careersPage.assertCareersHeroFromApi();
  });

  test("abstract design element (Figma node 659:2) is visible", async ({ careersPage }) => {
    await careersPage.assertCareersHeroAbstractDesign();
  });
});

test.describe("Careers Page Values Section", () => {
  test("values section renders ≥4 cards validated against API response", async ({ careersPage }) => {
    await careersPage.assertValuesFromApi();
  });
});

test.describe("Careers Page Benefits Section", () => {
  test("benefits section renders ≥4 cards validated against API response", async ({ careersPage }) => {
    await careersPage.assertBenefitsFromApi();
  });
});
