import { type Page } from "@playwright/test";
import InitializationPage from "@base/ui-base";
import { ApiHelper } from "@base/api-base";
import { LOGIN_LOCATORS } from "@locators/login-locators";
import {
  LOGIN_TEXT,
  UI_ROUTES,
  loginResponseSchema,
  LOGIN_SCHEMA_LABELS,
} from "@constants/index";

export class LoginPage {
  private initializationPage: InitializationPage;
  private apiHelper: ApiHelper;

  constructor(page: Page) {
    this.initializationPage = new InitializationPage(page);
    this.apiHelper = new ApiHelper();
  }

  async assertLoginFormRendersCorrectly(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.LOGIN);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginPage);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginFormCard);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginFormHeader);

    await this.initializationPage.page.waitForSelector(LOGIN_LOCATORS.loginFormHeading);
    await this.initializationPage.expectTextContains(
      LOGIN_LOCATORS.loginFormHeading,
      LOGIN_TEXT.HEADING
    );
    await this.initializationPage.expectTextContains(
      LOGIN_LOCATORS.loginFormSubtext,
      LOGIN_TEXT.SUBTEXT
    );

    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginEmailInput);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginPasswordInput);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginForgotPassword);
    await this.initializationPage.expectTextContains(
      LOGIN_LOCATORS.loginForgotPassword,
      LOGIN_TEXT.FORGOT_PASSWORD
    );
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginSubmitButton);
    await this.initializationPage.expectTextContains(
      LOGIN_LOCATORS.loginSubmitButton,
      LOGIN_TEXT.LOGIN_BUTTON
    );
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginSignupButton);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginOrDivider);
    await this.initializationPage.expectVisible(LOGIN_LOCATORS.loginSocialButtons);
  }

  async assertLoginApiIntegration(): Promise<void> {
    await this.initializationPage.goto(UI_ROUTES.LOGIN);
    await this.initializationPage.page.waitForSelector(LOGIN_LOCATORS.loginEmailInput);

    await this.initializationPage.page.fill(LOGIN_LOCATORS.loginEmailInput, "user@example.com");
    await this.initializationPage.page.fill(LOGIN_LOCATORS.loginPasswordInput, "password123");

    const [response] = await Promise.all([
      this.initializationPage.page.waitForResponse(
        (res) => res.url().includes("/api/auth/login") && res.request().method() === "POST"
      ),
      this.initializationPage.page.click(LOGIN_LOCATORS.loginSubmitButton),
    ]);

    const body = (await response.json()) as { success: boolean; token?: string };
    const validation = loginResponseSchema.safeParse(body);
    this.apiHelper.assertSchemaValid(validation, LOGIN_SCHEMA_LABELS.LOGIN_RESPONSE);
  }
}
