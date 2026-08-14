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
  ABOUT_MISSION_VISION_ENDPOINTS,
  ABOUT_MISSION_VISION_SCHEMA_LABELS,
  ABOUT_MISSION_VISION_TEXT,
  missionVisionResponseSchema,
  type MissionVisionData,
  ABOUT_PRESS_RELEASES_ENDPOINTS,
  ABOUT_PRESS_RELEASES_SCHEMA_LABELS,
  ABOUT_PRESS_RELEASES_TEXT,
  pressReleasesResponseSchema,
  type PressReleasesDataType,
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

  async assertMissionVisionFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      ABOUT_MISSION_VISION_ENDPOINTS.MISSION_VISION
    )) as MissionVisionData;

    const parsed = missionVisionResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      ABOUT_MISSION_VISION_SCHEMA_LABELS.MISSION_VISION_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.ABOUT);
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.missionVisionSection);

    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.missionVisionSectionHeading,
      ABOUT_MISSION_VISION_TEXT.SECTION_HEADING
    );
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.missionVisionSectionParagraph,
      ABOUT_MISSION_VISION_TEXT.SECTION_BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(ABOUT_LOCATORS.missionCard);
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.missionCardHeading,
      ABOUT_MISSION_VISION_TEXT.MISSION_HEADING
    );
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.missionCardBody,
      ABOUT_MISSION_VISION_TEXT.MISSION_BODY_STARTS_WITH
    );
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.missionCardImage);

    await this.initializationPage.expectVisible(ABOUT_LOCATORS.visionCard);
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.visionCardHeading,
      ABOUT_MISSION_VISION_TEXT.VISION_HEADING
    );
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.visionCardBody,
      ABOUT_MISSION_VISION_TEXT.VISION_BODY_STARTS_WITH
    );
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.visionCardImage);
  }

  async assertPressReleasesFromApi(): Promise<void> {
    const body = (await this.apiHelper.getRequest(
      ABOUT_PRESS_RELEASES_ENDPOINTS.LIST
    )) as PressReleasesDataType;

    const parsed = pressReleasesResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(
      parsed,
      ABOUT_PRESS_RELEASES_SCHEMA_LABELS.PRESS_RELEASES_RESPONSE
    );

    await this.initializationPage.goto(UI_ROUTES.ABOUT);
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.pressReleasesSection);

    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.pressReleasesSectionHeading,
      ABOUT_PRESS_RELEASES_TEXT.SECTION_HEADING
    );
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.pressReleasesSectionParagraph,
      ABOUT_PRESS_RELEASES_TEXT.SECTION_BODY_STARTS_WITH
    );

    await this.initializationPage.expectVisible(ABOUT_LOCATORS.pressReleasesGrid);
    await this.initializationPage.expectVisible(ABOUT_LOCATORS.pressReleaseCard1);
    await this.initializationPage.expectTextContains(
      ABOUT_LOCATORS.pressReleaseCardTitle1,
      ABOUT_PRESS_RELEASES_TEXT.FIRST_CARD_TITLE_CONTAINS
    );
  }
}
