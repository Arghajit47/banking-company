import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { HOMEPAGE_LOCATORS } from "@locators/homepage-locators";
import {
  API_PATHS,
  authStatusSchema,
  AUTH_MOCK_USER,
  CTA_ENDPOINTS,
  CTA_SCHEMA_LABELS,
  CTA_TEXT,
  CTA_UI,
  ctaConfigSchema,
  type CTAConfig,
  UI_ROUTES,
} from "@constants/index";

export class HomePage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertPageComponents(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navbar);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navbarLogo);
  }

  async assertNavbarAuthStatusFromApi(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
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
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navLogin);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.navSignUp);
    await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navUser);
    await this.initializationPage.expectNotPresent(HOMEPAGE_LOCATORS.navLogout);
    await this.assertNoAuthConsoleErrors();
  }

  async assertLoggedInNavbar(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
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
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.page.setViewportSize(CTA_UI.MOBILE_VIEWPORT);
    await this.initializationPage.waitForSomeTime(CTA_UI.MENU_ANIMATION_DELAY_MS);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileMenuButton);
    await this.initializationPage.clickOnElement(HOMEPAGE_LOCATORS.mobileMenuButton);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileMenu);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileLogin);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.mobileSignUp);
  }

  async assertCtaSection(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.ctaSection);

    // Fetch the real API response and validate schema so the integration test
    // checks actual backend data, not just static constants.
    const ctaResponse = (await this.apiHelper.getRequest(
      CTA_ENDPOINTS.HOME
    )) as CTAConfig;
    const validation = ctaConfigSchema.safeParse(ctaResponse);
    this.apiHelper.assertSchemaValid(validation, CTA_SCHEMA_LABELS.CTA_CONFIG);

    // The real content excludes the SWR loading skeleton, which is aria-hidden.
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaHeadingReal,
      CTA_TEXT.HEADING_START
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaHeadingReal,
      ctaResponse.headline
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaButtonReal,
      ctaResponse.buttonLabel
    );
    await this.initializationPage.expectAttributeContains(
      HOMEPAGE_LOCATORS.ctaButtonReal,
      "href",
      CTA_UI.HOME_PATH,
      0
    );
    await this.initializationPage.expectVisible(
      this.initializationPage.page.locator(HOMEPAGE_LOCATORS.ctaButtonReal)
    );
  }

  async assertCtaButtonClickable(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.ctaButtonReal);
    await this.initializationPage.clickOnElement(HOMEPAGE_LOCATORS.ctaButtonReal);
    await this.initializationPage.expectHaveURL(UI_ROUTES.HOME);
  }

  private async assertNoAuthConsoleErrors(): Promise<void> {
    await this.initializationPage.assertNoConsoleErrors(undefined, HOMEPAGE_LOCATORS.navbar);
  }
}
