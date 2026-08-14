import { test } from "@fixtures/ui-fixtures";

test.describe("Signup Page Form Section", () => {
  test("signup form renders with all required elements", async ({ signupPage }) => {
    await signupPage.assertSignupFormRendersCorrectly();
  });

  test("signup form submits to API and receives valid response", async ({ signupPage }) => {
    await signupPage.assertSignupApiIntegration();
  });
});
