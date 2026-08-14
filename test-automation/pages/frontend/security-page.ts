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
  SECURITY_PROTECTIONS_ENDPOINTS,
  SECURITY_PROTECTIONS_SCHEMA_LABELS,
  SECURITY_PROTECTIONS_TEXT,
  protectionsResponseSchema,
  type ProtectionsDataType,
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

  async assertProtectionsFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      SECURITY_PROTECTIONS_ENDPOINTS.LIST
    )) as ProtectionsDataType;

    const parsed = protectionsResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      SECURITY_PROTECTIONS_SCHEMA_LABELS.PROTECTIONS_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.SECURITY);
    await this.initializationPage.expectVisible(SECURITY_LOCATORS.protectionSection);

    await this.initializationPage.expectTextContains(
      SECURITY_LOCATORS.protectionSectionHeading,
      SECURITY_PROTECTIONS_TEXT.SECTION_HEADING_CONTAINS
    );
    await this.initializationPage.expectTextContains(
      SECURITY_LOCATORS.protectionSectionParagraph,
      SECURITY_PROTECTIONS_TEXT.SECTION_BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(SECURITY_LOCATORS.protectionCardsContainer);
    await this.initializationPage.expectVisible(SECURITY_LOCATORS.protectionCard1);
    await this.initializationPage.expectTextContains(
      SECURITY_LOCATORS.protectionCardTitle1,
      SECURITY_PROTECTIONS_TEXT.FIRST_CARD_TITLE
    );
  }
}
