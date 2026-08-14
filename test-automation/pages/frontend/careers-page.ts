import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { CAREERS_LOCATORS } from "@locators/careers-locators";
import {
  CAREERS_HERO_ENDPOINTS,
  CAREERS_HERO_SCHEMA_LABELS,
  CAREERS_HERO_TEXT,
  CAREERS_VALUES_ENDPOINTS,
  CAREERS_VALUES_SCHEMA_LABELS,
  CAREERS_VALUES_TEXT,
  careersHeroSchema,
  careersValuesResponseSchema,
  type CareersHeroData,
  type CareersValuesData,
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
