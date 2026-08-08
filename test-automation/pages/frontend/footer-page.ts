import { expect, type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { FOOTER_LOCATORS } from "@locators/footer-locators";
import {
  FOOTER_TEXT,
  FOOTER_API_PATH,
  type FooterApiResponse,
} from "@constants/index";

export class FooterPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertFooterRendersFromApi(): Promise<void> {
    await this.initializationPage.goto("/");
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footer);
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footerEmail);
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footerPhone);
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footerLocation);
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footerCopyright);
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footerSocials);
    await this.initializationPage.expectVisible(FOOTER_LOCATORS.footerNav);

    const body = (await this.apiHelper.getRequest(
      FOOTER_API_PATH
    )) as FooterApiResponse;

    await this.initializationPage.expectTextContains(
      FOOTER_LOCATORS.footerEmail,
      body.contact.email
    );
    await this.initializationPage.expectAttribute(
      FOOTER_LOCATORS.footerEmail,
      "href",
      `${FOOTER_TEXT.EMAIL_LINK_PREFIX}${body.contact.email}`
    );

    await this.initializationPage.expectText(
      FOOTER_LOCATORS.footerPhone,
      body.contact.phone
    );
    await this.initializationPage.expectText(
      FOOTER_LOCATORS.footerLocation,
      body.contact.location
    );
    await this.initializationPage.expectTextContains(
      FOOTER_LOCATORS.footerCopyright,
      body.copyright
    );
  }
}
