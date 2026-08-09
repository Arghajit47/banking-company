import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { HOMEPAGE_LOCATORS } from "@locators/homepage-locators";
import {
  API_PATHS,
  authStatusSchema,
  AUTH_MOCK_USER,
  CTA_TEXT,
} from "@constants/index";

export class HomePage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertPageComponents(): Promise<void> {
    await this.initializationPage.goto("/");
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navbar);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navbarLogo);
  }

  async assertNavbarAuthStatusFromApi(): Promise<void> {
    await this.initializationPage.goto("/");
    const authResponse = await this.initializationPage.captureResponseWhenPageLoad(
      Promise.resolve(),
      { url: API_PATHS.AUTH_STATUS, method: "GET", status: 200 }
    );
    const parsed = JSON.parse(authResponse.firstResponse);
    const validation = authStatusSchema.safeParse(parsed);
    this.apiHelper.assertSchemaValid(validation, "auth status schema");

    if (parsed.isLoggedIn) {
      await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navUser);
      await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navLogout);
      await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navLogin);
      await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navSignUp);
    } else {
      await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navLogin);
      await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navSignUp);
      await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navUser);
      await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navLogout);
    }
  }

  async assertLoggedOutNavbar(): Promise<void> {
    await this.initializationPage.goto("/");
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navLogin);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navSignUp);
    await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navUser);
    await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navLogout);
    await this.assertNoAuthConsoleErrors();
  }

  async assertLoggedInNavbar(): Promise<void> {
    await this.initializationPage.goto("/");
    await this.initializationPage.mockJsonResponse(API_PATHS.AUTH_STATUS, {
      isLoggedIn: true,
      user: AUTH_MOCK_USER,
    });
    await this.initializationPage.reload();
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navUser);
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.navUser,
      AUTH_MOCK_USER.name
    );
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navLogout);
    await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navLogin);
    await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navSignUp);
    await this.assertNoAuthConsoleErrors();
  }

  async assertMobileAuthToggle(): Promise<void> {
    await this.initializationPage.goto("/");
    await this.initializationPage.page.setViewportSize({ width: 375, height: 667 });
    await this.initializationPage.waitForSomeTime(300);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileMenuButton);
    await this.initializationPage.clickOnElement(HOMEPAGE_LOCATORS.mobileMenuButton);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileMenu);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileLogin);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileSignUp);
  }

  async assertCtaSection(): Promise<void> {
    await this.initializationPage.goto("/");
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.ctaSection);

    // CTASection renders a SWR loading skeleton with the same data-testid as
    // the real content. The skeleton is aria-hidden="true"; the resolved
    // content is not. The real-content selectors (ctaHeadingReal /
    // ctaButtonReal) exclude the skeleton, so every assertion below auto-waits
    // for the resolved element via Playwright's locator retry behavior.
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaHeadingReal,
      CTA_TEXT.HEADING_START
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaHeadingReal,
      CTA_TEXT.HEADING_ACCENT
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaButtonReal,
      CTA_TEXT.BUTTON_LABEL
    );
    await this.initializationPage.expectAttributeContains(
      HOMEPAGE_LOCATORS.ctaButtonReal,
      "href",
      "/",
      0
    );
    await this.initializationPage.expectVisible(
      this.initializationPage.page.locator(HOMEPAGE_LOCATORS.ctaButtonReal)
    );
  }

  private async assertNoAuthConsoleErrors(): Promise<void> {
    await this.initializationPage.assertNoConsoleErrors(undefined, HOMEPAGE_LOCATORS.navbar);
  }
}
