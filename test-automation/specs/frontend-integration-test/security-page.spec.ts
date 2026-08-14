import { test } from "@fixtures/ui-fixtures";

test.describe("Security Page Hero Section", () => {
  test("hero section renders and validates against API response", async ({ securityPage }) => {
    await securityPage.assertSecurityHeroFromApi();
  });
});

test.describe("Security Page Protection Section", () => {
  test("protection section renders and validates against API response", async ({ securityPage }) => {
    await securityPage.assertProtectionsFromApi();
  });
});
