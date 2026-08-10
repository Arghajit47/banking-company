import { test } from "@fixtures/ui-fixtures";

test.describe("Home Page FAQ Section", () => {
  test("FAQ section renders and validates against API response", async ({ faqPage }) => {
    await faqPage.assertFAQSectionFromApi();
  });

  test("FAQ section produces no console errors", async ({ faqPage }) => {
    await faqPage.assertNoFAQConsoleErrors();
  });
});
