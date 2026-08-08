import { test, expect } from "@playwright/test";
import { BASE_URL } from "@constants/index";

test.describe("Footer Integration", () => {
  test("footer renders with API-driven email visible", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "load" });
    const footerEmail = page.locator('[data-testid="footer-email"]');
    await expect(footerEmail).toBeVisible();
    await expect(footerEmail).toContainText("@");
  });
});
