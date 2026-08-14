import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { CAREERS_LOCATORS } from "@locators/careers-locators";
import {
  CAREERS_HERO_ENDPOINTS,
  CAREERS_HERO_SCHEMA_LABELS,
  CAREERS_HERO_TEXT,
  careersHeroSchema,
  type CareersHeroData,
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
}
