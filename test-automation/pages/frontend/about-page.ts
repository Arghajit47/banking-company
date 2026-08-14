import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { ABOUT_LOCATORS } from "@locators/about-locators";
import {
  ABOUT_HERO_ENDPOINTS,
  ABOUT_HERO_SCHEMA_LABELS,
  ABOUT_HERO_TEXT,
  aboutHeroSchema,
  type AboutHeroData,
  UI_ROUTES,
} from "@constants/index";

export class AboutPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertAboutHeroFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      ABOUT_HERO_ENDPOINTS.HERO
    )) as AboutHeroData;

    const parsed = aboutHeroSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      ABOUT_HERO_SCHEMA_LABELS.ABOUT_HERO_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.ABOUT);
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.heroSection);
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.heroTextContainer);

    await this.initializationPage.page.waitForSelector(ABOUT_LOCATORS.heroLabelReal);
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.heroLabelReal,
      ABOUT_HERO_TEXT.LABEL
    );

    await this.initializationPage.page.waitForSelector(ABOUT_LOCATORS.heroHeadingReal);
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.heroHeadingReal,
      ABOUT_HERO_TEXT.HEADING_CONTAINS
    );
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.heroHeadingReal,
      ABOUT_HERO_TEXT.HEADING_ACCENT_CONTAINS
    );

    await this.initializationPage.page.waitForSelector(ABOUT_LOCATORS.heroParagraphReal);
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.heroParagraphReal,
      ABOUT_HERO_TEXT.BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(ABOUT_LOCATORS.heroImageWrapper);
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.heroImage);
  }
}
