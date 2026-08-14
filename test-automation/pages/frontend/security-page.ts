import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { SECURITY_LOCATORS } from "@locators/security-locators";
import {
  SECURITY_HERO_ENDPOINTS,
  SECURITY_HERO_SCHEMA_LABELS,
  SECURITY_HERO_TEXT,
  securityHeroSchema,
  type SecurityHeroDataType,
  UI_ROUTES,
} from "@constants/index";

export class SecurityPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertSecurityHeroFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      SECURITY_HERO_ENDPOINTS.HERO
    )) as SecurityHeroDataType;

    const parsed = securityHeroSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      SECURITY_HERO_SCHEMA_LABELS.SECURITY_HERO_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.SECURITY);
    await this.initializationPage.expectVisible(SECURITY_LOCATORS.heroSection);
    await this.initializationPage.expectVisible(SECURITY_LOCATORS.heroTextContainer);

    await this.initializationPage.page.waitForSelector(SECURITY_LOCATORS.heroHeading);
    await this.initializationPage.expectTextContains(
      SECURITY_LOCATORS.heroHeading,
      SECURITY_HERO_TEXT.HEADLINE_CONTAINS
    );
    await this.initializationPage.expectTextContains(
      SECURITY_LOCATORS.heroHeading,
      SECURITY_HERO_TEXT.HEADLINE_ACCENT
    );

    await this.initializationPage.page.waitForSelector(SECURITY_LOCATORS.heroParagraph);
    await this.initializationPage.expectTextContains(
      SECURITY_LOCATORS.heroParagraph,
      SECURITY_HERO_TEXT.BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(SECURITY_LOCATORS.heroImageWrapper);
    await this.initializationPage.expectVisible(SECURITY_LOCATORS.heroImage);
  }
}
