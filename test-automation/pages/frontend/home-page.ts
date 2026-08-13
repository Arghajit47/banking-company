import { expect, type Page } from "@playwright/test";
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
  HERO_ENDPOINTS,
  HERO_SCHEMA_LABELS,
  HERO_TEXT,
  heroResponseSchema,
  type HeroResponse,
  PRODUCTS_COUNTS,
  PRODUCTS_ENDPOINTS,
  PRODUCTS_SCHEMA_LABELS,
  PRODUCTS_TEXT,
  productsResponseSchema,
  type ProductsResponse,
  TESTIMONIALS_TEXT,
  TESTIMONIALS_ENDPOINTS,
  type TestimonialsResponse,
  testimonialsResponseSchema,
  USE_CASES_COUNTS,
  USE_CASES_ENDPOINTS,
  USE_CASES_SCHEMA_LABELS,
  USE_CASES_TEXT,
  useCasesResponseSchema,
  type UseCasesResponse,
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

  async assertCtaApiContent(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.ctaSection);

    // Fetch the real API response and validate schema so the integration test
    // checks actual backend data, not just static constants.
    const ctaResponse = (await this.apiHelper.getRequest(
      CTA_ENDPOINTS.HOME
    )) as CTAConfig;
    const validation = ctaConfigSchema.safeParse(ctaResponse);
    this.apiHelper.assertSchemaValid(validation, CTA_SCHEMA_LABELS.CTA_CONFIG);

    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.ctaBodyReal,
      ctaResponse.body
    );
  }

  async assertTestimonialsSection(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.testimonialsSection);
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.testimonialsHeading,
      TESTIMONIALS_TEXT.HEADING
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.testimonialsSubheading,
      TESTIMONIALS_TEXT.SUBHEADING_START
    );
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.testimonialsTabIndividuals);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.testimonialsTabBusinesses);

    const testimonialsResponse = (await this.apiHelper.getRequest(
      TESTIMONIALS_ENDPOINTS.LIST
    )) as TestimonialsResponse;
    const validation = testimonialsResponseSchema.safeParse(testimonialsResponse);
    this.apiHelper.assertSchemaValid(validation, "testimonials response schema");

    const cards = this.initializationPage.page.locator(HOMEPAGE_LOCATORS.testimonialsCard);
    expect(await cards.count()).toBeGreaterThanOrEqual(testimonialsResponse.testimonials.length);
  }

  async assertUseCasesSectionFromApi(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.useCasesSection);

    const useCasesResponse = (await this.apiHelper.getRequest(
      USE_CASES_ENDPOINTS.LIST
    )) as UseCasesResponse;
    const validation = useCasesResponseSchema.safeParse(useCasesResponse);
    this.apiHelper.assertSchemaValid(validation, USE_CASES_SCHEMA_LABELS.USE_CASES_RESPONSE);

    expect(useCasesResponse.useCases).toHaveLength(USE_CASES_COUNTS.EXPECTED_API_TOTAL);

    const individualCards = useCasesResponse.useCases.filter(
      (u) => u.audience === "individual"
    );
    const businessCards = useCasesResponse.useCases.filter(
      (u) => u.audience === "business"
    );
    expect(individualCards).toHaveLength(USE_CASES_COUNTS.EXPECTED_INDIVIDUAL);
    expect(businessCards).toHaveLength(USE_CASES_COUNTS.EXPECTED_BUSINESS);

    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.useCasesHeading,
      USE_CASES_TEXT.HEADING
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.useCasesSubheading,
      USE_CASES_TEXT.SUBHEADING_START
    );
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.useCasesRowIndividuals);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.useCasesRowBusinesses);

    await this.initializationPage.expectVisibleWithTimeout(
      HOMEPAGE_LOCATORS.useCaseCardFirst,
      0,
      USE_CASES_COUNTS.SWR_LOAD_TIMEOUT_MS
    );

    const cards = this.initializationPage.page.locator(HOMEPAGE_LOCATORS.useCaseCard);
    expect(await cards.count()).toBe(USE_CASES_COUNTS.EXPECTED_API_TOTAL);

    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.useCaseTitleFirst,
      useCasesResponse.useCases[0].title
    );
  }

  private async assertNoAuthConsoleErrors(): Promise<void> {
    await this.initializationPage.assertNoConsoleErrors(undefined, HOMEPAGE_LOCATORS.navbar);
  }

  async assertHeroSectionFromApi(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroSection);

    const heroResponse = (await this.apiHelper.getRequest(
      HERO_ENDPOINTS.HOME
    )) as HeroResponse;
    const validation = heroResponseSchema.safeParse(heroResponse);
    this.apiHelper.assertSchemaValid(validation, HERO_SCHEMA_LABELS.HERO_RESPONSE);

    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.heroBadge,
      HERO_TEXT.BADGE
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.heroHeadingReal,
      heroResponse.headline
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.heroParagraphReal,
      heroResponse.subtext
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.heroOpenAccountReal,
      heroResponse.ctaLabel
    );

    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroMockup);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroMonthlyIncomeReal);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroTransactionsCardReal);
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.heroTransactionsHeading,
      HERO_TEXT.TRANSACTIONS_HEADING
    );
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroExchangeCard);
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.heroExchangeHeading,
      HERO_TEXT.EXCHANGE_HEADING
    );
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroSupportedCurrencyReal);
  }

  async assertHeroCtaClickable(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.heroOpenAccountReal);
    await this.initializationPage.clickOnElement(HOMEPAGE_LOCATORS.heroOpenAccountReal);
  }

  async assertProductsSectionFromApi(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.productsSection);

    const productsResponse = (await this.apiHelper.getRequest(
      PRODUCTS_ENDPOINTS.LIST
    )) as ProductsResponse;
    const validation = productsResponseSchema.safeParse(productsResponse);
    this.apiHelper.assertSchemaValid(validation, PRODUCTS_SCHEMA_LABELS.PRODUCTS_RESPONSE);

    expect(productsResponse.products).toHaveLength(PRODUCTS_COUNTS.EXPECTED_API_TOTAL);

    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.productsHeading,
      PRODUCTS_TEXT.HEADING
    );
    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.productsSubheading,
      PRODUCTS_TEXT.SUBHEADING_START
    );
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.productsTabIndividuals);
    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.productsTabBusinesses);

    // SWR fetches after React hydration; wait for the first real card to appear
    // before asserting the count (skeleton cards are aria-hidden and won't match).
    await this.initializationPage.expectVisibleWithTimeout(
      HOMEPAGE_LOCATORS.productsCardFirst,
      0,
      PRODUCTS_COUNTS.SWR_LOAD_TIMEOUT_MS
    );

    await this.initializationPage.expectVisible(HOMEPAGE_LOCATORS.productsGrid);

    const cards = this.initializationPage.page.locator(HOMEPAGE_LOCATORS.productsCard);
    expect(await cards.count()).toBe(PRODUCTS_COUNTS.EXPECTED_VISIBLE_CARDS);

    await this.initializationPage.expectTextContains(
      HOMEPAGE_LOCATORS.productsTitleFirst,
      productsResponse.products[0].title
    );
  }
}
