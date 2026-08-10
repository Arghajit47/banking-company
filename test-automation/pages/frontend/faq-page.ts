import { expect, type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { FAQ_LOCATORS } from "@locators/faq-locators";
import {
  FAQ_ENDPOINTS,
  FAQ_TEXT,
  FAQ_UI,
  faqResponseSchema,
  FAQ_SCHEMA_LABELS,
  type FAQResponse,
  UI_ROUTES,
} from "@constants/index";

export class FAQPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertFAQSectionFromApi(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.HOME);
    await this.initializationPage.expectVisible(FAQ_LOCATORS.faqSection);

    const faqResponse = (await this.apiHelper.getRequest(
      FAQ_ENDPOINTS.HOME
    )) as FAQResponse;
    const validation = faqResponseSchema.safeParse(faqResponse);
    this.apiHelper.assertSchemaValid(validation, FAQ_SCHEMA_LABELS.FAQ_RESPONSE);

    await this.initializationPage.expectTextContains(
      FAQ_LOCATORS.faqHeading,
      FAQ_TEXT.HEADING_ACCENT
    );
    await this.initializationPage.expectTextContains(
      FAQ_LOCATORS.faqSubheading,
      FAQ_TEXT.SUBHEADING_START
    );

    if (faqResponse.faqs.length === 0) {
      await this.initializationPage.expectVisible(FAQ_LOCATORS.faqEmptyState);
      return;
    }

    const visibleCount = Math.min(
      FAQ_UI.INITIAL_VISIBLE_COUNT,
      faqResponse.faqs.length
    );
    await this.initializationPage.expectCount(
      FAQ_LOCATORS.faqQuestion,
      visibleCount
    );

    if (faqResponse.hasMore) {
      await this.initializationPage.expectVisible(FAQ_LOCATORS.faqFadeOverlay);
      await this.initializationPage.expectVisible(FAQ_LOCATORS.faqLoadAll);
      await this.initializationPage.click(FAQ_LOCATORS.faqLoadAll);
      await this.initializationPage.expectCount(
        FAQ_LOCATORS.faqQuestion,
        faqResponse.faqs.length
      );
    }
  }

  async assertNoFAQConsoleErrors(): Promise<void> {
    await this.initializationPage.assertNoConsoleErrors(
      UI_ROUTES.HOME,
      FAQ_LOCATORS.faqSection
    );
  }
}
