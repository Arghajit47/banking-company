import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import { FAQ_ENDPOINTS, faqResponseSchema, FAQ_SCHEMA_LABELS } from "@constants/index";

test.describe("FAQ API contract across pages", () => {
  test("/api/faq?page=home returns valid response", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(FAQ_ENDPOINTS.HOME);
    const validation = faqResponseSchema.safeParse(response);
    api.assertSchemaValid(validation, `${FAQ_SCHEMA_LABELS.FAQ_RESPONSE} home`);
    expect(response.faqs.length).toBeGreaterThan(0);
  });

  test("/api/faq?page=careers returns valid response", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(FAQ_ENDPOINTS.CAREERS);
    const validation = faqResponseSchema.safeParse(response);
    api.assertSchemaValid(validation, `${FAQ_SCHEMA_LABELS.FAQ_RESPONSE} careers`);
    expect(response.faqs.length).toBeGreaterThan(0);
  });

  test("/api/faq?page=security returns valid response", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(FAQ_ENDPOINTS.SECURITY);
    const validation = faqResponseSchema.safeParse(response);
    api.assertSchemaValid(validation, `${FAQ_SCHEMA_LABELS.FAQ_RESPONSE} security`);
    expect(response.faqs.length).toBeGreaterThan(0);
  });
});
