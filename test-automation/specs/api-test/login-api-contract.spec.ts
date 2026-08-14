import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import {
  LOGIN_ENDPOINTS,
  loginResponseSchema,
  LOGIN_SCHEMA_LABELS,
} from "@constants/index";

test.describe("Login API contract", () => {
  test("POST /api/auth/login with valid credentials returns success and mock-token", async () => {
    const api = new ApiHelper();
    const response = await api.postRequest(
      LOGIN_ENDPOINTS.LOGIN,
      { "Content-Type": "application/json" },
      { email: "user@example.com", password: "password123" }
    );
    const validation = loginResponseSchema.safeParse(response);
    api.assertSchemaValid(validation, LOGIN_SCHEMA_LABELS.LOGIN_RESPONSE);
    expect(response.success).toBe(true);
    expect(response.token).toBe("mock-token");
  });

  test("POST /api/auth/login with invalid email returns success false", async () => {
    const api = new ApiHelper();
    const response = await api.postRequest(
      LOGIN_ENDPOINTS.LOGIN,
      { "Content-Type": "application/json" },
      { email: "notanemail", password: "password123" }
    );
    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();
  });

  test("POST /api/auth/login with short password returns success false", async () => {
    const api = new ApiHelper();
    const response = await api.postRequest(
      LOGIN_ENDPOINTS.LOGIN,
      { "Content-Type": "application/json" },
      { email: "user@example.com", password: "short" }
    );
    expect(response.success).toBe(false);
  });
});
