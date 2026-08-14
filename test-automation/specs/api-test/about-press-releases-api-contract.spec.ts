import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import {
  ABOUT_PRESS_RELEASES_ENDPOINTS,
  pressReleasesResponseSchema,
  ABOUT_PRESS_RELEASES_SCHEMA_LABELS,
  ABOUT_PRESS_RELEASES_TEXT,
} from "@constants/index";

test.describe("About Press Releases API contract", () => {
  test("/api/about/press-releases returns valid response with at least 4 entries", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(
      ABOUT_PRESS_RELEASES_ENDPOINTS.LIST
    );
    const validation = pressReleasesResponseSchema.safeParse(response);
    api.assertSchemaValid(
      validation,
      ABOUT_PRESS_RELEASES_SCHEMA_LABELS.PRESS_RELEASES_RESPONSE
    );
    expect(response.pressReleases.length).toBeGreaterThanOrEqual(
      ABOUT_PRESS_RELEASES_TEXT.MIN_CARD_COUNT
    );
    expect(response.pressReleases[0].headline).toContain(
      ABOUT_PRESS_RELEASES_TEXT.FIRST_CARD_TITLE_CONTAINS
    );
  });
});
