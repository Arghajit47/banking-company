import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import {
  SIGNUP_ENDPOINTS,
  signupResponseSchema,
  SIGNUP_SCHEMA_LABELS,
} from "@constants/index";

test.describe("Signup API contract", () => {
  test("POST /api/auth/signup with valid credentials returns success and mock-user-id", async () => {
    const api = new ApiHelper();
    const response = await api.postRequest(
      SIGNUP_ENDPOINTS.SIGNUP,
      { "Content-Type": "application/json" },
      {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123",
      }
    );
    const validation = signupResponseSchema.safeParse(response);
    api.assertSchemaValid(validation, SIGNUP_SCHEMA_LABELS.SIGNUP_RESPONSE);
    expect(response.success).toBe(true);
    expect(response.userId).toBe("mock-user-id");
  });

  test("POST /api/auth/signup with mismatched passwords returns success false", async () => {
    const api = new ApiHelper();
    const response = await api.postRequest(
      SIGNUP_ENDPOINTS.SIGNUP,
      { "Content-Type": "application/json" },
      {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "different123",
      }
    );
    expect(response.success).toBe(false);
    expect(response.error).toBe("Passwords do not match");
  });

  test("POST /api/auth/signup with invalid email returns success false", async () => {
    const api = new ApiHelper();
    const response = await api.postRequest(
      SIGNUP_ENDPOINTS.SIGNUP,
      { "Content-Type": "application/json" },
      {
        name: "Test User",
        email: "notanemail",
        password: "password123",
        confirmPassword: "password123",
      }
    );
    expect(response.success).toBe(false);
  });
});
