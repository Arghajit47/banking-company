import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import {
  SECURITY_HERO_ENDPOINTS,
  securityHeroSchema,
  SECURITY_HERO_SCHEMA_LABELS,
  SECURITY_HERO_TEXT,
} from "@constants/index";

test.describe("Security Hero API contract", () => {
  test("/api/security/hero returns valid response", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(SECURITY_HERO_ENDPOINTS.HERO);
    const validation = securityHeroSchema.safeParse(response);
    api.assertSchemaValid(
      validation,
      SECURITY_HERO_SCHEMA_LABELS.SECURITY_HERO_RESPONSE
    );
    expect(response.headline).toContain(SECURITY_HERO_TEXT.HEADLINE_CONTAINS);
    expect(response.headlineAccent).toBe(SECURITY_HERO_TEXT.HEADLINE_ACCENT);
    expect(response.body).toContain(SECURITY_HERO_TEXT.BODY_STARTS_WITH);
  });
});
