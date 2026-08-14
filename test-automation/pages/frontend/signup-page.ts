import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { SIGNUP_LOCATORS } from "@locators/signup-locators";
import {
  SIGNUP_TEXT,
  UI_ROUTES,
  signupResponseSchema,
  SIGNUP_SCHEMA_LABELS,
} from "@constants/index";

export class SignupPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertSignupFormRendersCorrectly(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.SIGNUP);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupPage);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupFormCard);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupFormHeader);

    await this.initializationPage.page.waitForSelector(SIGNUP_LOCATORS.signupFormHeading);
    await this.initializationPage.expectTextContains(
      SIGNUP_LOCATORS.signupFormHeading,
      SIGNUP_TEXT.HEADING
    );
    await this.initializationPage.expectTextContains(
      SIGNUP_LOCATORS.signupFormSubtext,
      SIGNUP_TEXT.SUBTEXT
    );

    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupNameInput);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupEmailInput);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupPasswordInput);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupConfirmPasswordInput);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupSubmitButton);
    await this.initializationPage.expectTextContains(
      SIGNUP_LOCATORS.signupSubmitButton,
      SIGNUP_TEXT.SIGNUP_BUTTON
    );
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupLoginButton);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupOrDivider);
    await this.initializationPage.expectVisible(SIGNUP_LOCATORS.signupSocialButtons);
  }

  async assertSignupApiIntegration(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.SIGNUP);
    await this.initializationPage.page.waitForSelector(SIGNUP_LOCATORS.signupNameInput);

    await this.initializationPage.page.fill(SIGNUP_LOCATORS.signupNameInput, "Test User");
    await this.initializationPage.page.fill(SIGNUP_LOCATORS.signupEmailInput, "testuser@example.com");
    await this.initializationPage.page.fill(SIGNUP_LOCATORS.signupPasswordInput, "password123");
    await this.initializationPage.page.fill(SIGNUP_LOCATORS.signupConfirmPasswordInput, "password123");

    const [response] = await Promise.all([
      this.initializationPage.page.waitForResponse(
        (res) => res.url().includes("/api/auth/signup") && res.request().method() === "POST"
      ),
      this.initializationPage.page.click(SIGNUP_LOCATORS.signupSubmitButton),
    ]);

    const body = (await response.json()) as { success: boolean; userId?: string };
    const validation = signupResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(validation, SIGNUP_SCHEMA_LABELS.SIGNUP_RESPONSE);
  }
}
