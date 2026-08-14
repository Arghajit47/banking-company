import { test } from "@fixtures/ui-fixtures";

test.describe("Security Page Hero Section", () => {
  test("hero section renders and validates against API response", async ({ securityPage }) => {
    await securityPage.assertSecurityHeroFromApi();
  });
});
