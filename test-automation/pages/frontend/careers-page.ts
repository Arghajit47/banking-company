import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { CAREERS_LOCATORS } from "@locators/careers-locators";
import {
  CAREERS_BENEFITS_ENDPOINTS,
  CAREERS_BENEFITS_SCHEMA_LABELS,
  CAREERS_BENEFITS_TEXT,
  CAREERS_HERO_ENDPOINTS,
  CAREERS_HERO_SCHEMA_LABELS,
  CAREERS_HERO_TEXT,
  CAREERS_JOBS_ENDPOINTS,
  CAREERS_JOBS_SCHEMA_LABELS,
  CAREERS_JOBS_TEXT,
  CAREERS_VALUES_ENDPOINTS,
  CAREERS_VALUES_SCHEMA_LABELS,
  CAREERS_VALUES_TEXT,
  careersBenefitsResponseSchema,
  careersHeroSchema,
  careersValuesResponseSchema,
  jobsResponseSchema,
  type CareersBenefitsData,
  type CareersHeroData,
  type CareersValuesData,
  type JobsData,
  UI_ROUTES,
} from "@constants/index";

export class CareersPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertCareersHeroFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      CAREERS_HERO_ENDPOINTS.HERO
    )) as CareersHeroData;

    const parsed = careersHeroSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      CAREERS_HERO_SCHEMA_LABELS.CAREERS_HERO_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.CAREERS);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.heroSection);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.heroTextContainer);

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.heroHeadingReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.heroHeadingReal,
      CAREERS_HERO_TEXT.HEADLINE
    );

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.heroParagraphReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.heroParagraphReal,
      CAREERS_HERO_TEXT.BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(CAREERS_LOCATORS.heroImageWrapper);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.heroImage);
  }

  async assertBenefitsFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      CAREERS_BENEFITS_ENDPOINTS.BENEFITS
    )) as CareersBenefitsData;

    const parsed = careersBenefitsResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      CAREERS_BENEFITS_SCHEMA_LABELS.CAREERS_BENEFITS_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.CAREERS);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.benefitsSection);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.benefitsSectionHeader);

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.benefitsSectionHeadingReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitsSectionHeadingReal,
      CAREERS_BENEFITS_TEXT.HEADING_PREFIX
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitsSectionHeadingReal,
      CAREERS_BENEFITS_TEXT.HEADING_ACCENT
    );

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.benefitsSectionParagraphReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitsSectionParagraphReal,
      CAREERS_BENEFITS_TEXT.SECTION_BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(CAREERS_LOCATORS.benefitsSectionGrid);

    const cardCount = await this.initializationPage.page
      .locator(CAREERS_LOCATORS.benefitCardArticles)
      .count();
    await this.initializationPage.expectNumberGreaterThan(
      cardCount,
      CAREERS_BENEFITS_TEXT.MIN_CARD_COUNT - 1
    );

    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitCardTitle0,
      CAREERS_BENEFITS_TEXT.EXPECTED_TITLES[0]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitCardTitle1,
      CAREERS_BENEFITS_TEXT.EXPECTED_TITLES[1]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitCardTitle2,
      CAREERS_BENEFITS_TEXT.EXPECTED_TITLES[2]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.benefitCardTitle3,
      CAREERS_BENEFITS_TEXT.EXPECTED_TITLES[3]
    );
  }

  async assertJobsFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      CAREERS_JOBS_ENDPOINTS.LIST
    )) as JobsData;

    const parsed = jobsResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      CAREERS_JOBS_SCHEMA_LABELS.JOBS_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.CAREERS);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.jobOpeningsSection);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.jobOpeningsSectionHeader);

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.jobOpeningsSectionHeadingReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.jobOpeningsSectionHeadingReal,
      CAREERS_JOBS_TEXT.HEADING
    );

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.jobOpeningsSectionParagraphReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.jobOpeningsSectionParagraphReal,
      CAREERS_JOBS_TEXT.SECTION_BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(CAREERS_LOCATORS.jobOpeningsGrid);

    const cardCount = await this.initializationPage.page
      .locator(CAREERS_LOCATORS.jobCardArticles)
      .count();
    await this.initializationPage.expectNumberGreaterThan(
      cardCount,
      CAREERS_JOBS_TEXT.MIN_CARD_COUNT - 1
    );

    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.jobCardTitle0,
      CAREERS_JOBS_TEXT.EXPECTED_TITLES[0]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.jobCardTitle1,
      CAREERS_JOBS_TEXT.EXPECTED_TITLES[1]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.jobCardApplyBtn0,
      CAREERS_JOBS_TEXT.APPLY_BUTTON_TEXT
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.jobCardApplyBtn1,
      CAREERS_JOBS_TEXT.APPLY_BUTTON_TEXT
    );
  }

  async assertCareersHeroAbstractDesign(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.CAREERS);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.heroSection);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.heroAbstractDesign);
  }

  async assertValuesFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      CAREERS_VALUES_ENDPOINTS.VALUES
    )) as CareersValuesData;

    const parsed = careersValuesResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      CAREERS_VALUES_SCHEMA_LABELS.CAREERS_VALUES_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.CAREERS);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.valuesSection);
    await this.initializationPage.expectVisible(CAREERS_LOCATORS.valuesSectionHeader);

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.valuesSectionHeadingReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesSectionHeadingReal,
      CAREERS_VALUES_TEXT.HEADING_PREFIX
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesSectionHeadingReal,
      CAREERS_VALUES_TEXT.HEADING_ACCENT
    );

    await this.initializationPage.page.waitForSelector(
      CAREERS_LOCATORS.valuesSectionParagraphReal
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesSectionParagraphReal,
      CAREERS_VALUES_TEXT.SECTION_BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(CAREERS_LOCATORS.valuesSectionGrid);

    const cardCount = await this.initializationPage.page
      .locator(CAREERS_LOCATORS.valuesCardArticles)
      .count();
    await this.initializationPage.expectNumberGreaterThan(
      cardCount,
      CAREERS_VALUES_TEXT.MIN_CARD_COUNT - 1
    );

    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesCardTitle0,
      CAREERS_VALUES_TEXT.EXPECTED_TITLES[0]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesCardTitle1,
      CAREERS_VALUES_TEXT.EXPECTED_TITLES[1]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesCardTitle2,
      CAREERS_VALUES_TEXT.EXPECTED_TITLES[2]
    );
    await this.initializationPage.expectTextContains(
      CAREERS_LOCATORS.valuesCardTitle3,
      CAREERS_VALUES_TEXT.EXPECTED_TITLES[3]
    );
  }
}
