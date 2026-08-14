import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import {
  SECURITY_PROTECTIONS_ENDPOINTS,
  protectionsResponseSchema,
  SECURITY_PROTECTIONS_SCHEMA_LABELS,
  SECURITY_PROTECTIONS_TEXT,
} from "@constants/index";

test.describe("Security Protections API contract", () => {
  test("/api/security/protections returns valid response with at least 4 entries", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(SECURITY_PROTECTIONS_ENDPOINTS.LIST);
    const validation = protectionsResponseSchema.safeParse(response);
    api.assertSchemaValid(
      validation,
      SECURITY_PROTECTIONS_SCHEMA_LABELS.PROTECTIONS_RESPONSE
    );
    expect(response.protections.length).toBeGreaterThanOrEqual(
      SECURITY_PROTECTIONS_TEXT.MIN_CARD_COUNT
    );
    expect(response.protections[0].title).toBe(
      SECURITY_PROTECTIONS_TEXT.FIRST_CARD_TITLE
    );
  });
});
