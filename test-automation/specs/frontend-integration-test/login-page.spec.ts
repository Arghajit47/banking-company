import { test } from "@fixtures/ui-fixtures";

test.describe("Login Page Form Section", () => {
  test("login form renders with all required elements", async ({ loginPage }) => {
    await loginPage.assertLoginFormRendersCorrectly();
  });

  test("login form submits to API and receives valid response", async ({ loginPage }) => {
    await loginPage.assertLoginApiIntegration();
  });
});
