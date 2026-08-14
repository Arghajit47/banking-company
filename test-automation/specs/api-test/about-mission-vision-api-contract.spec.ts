import { test, expect } from "@playwright/test";
import { ApiHelper } from "@base/api-base";
import {
  ABOUT_MISSION_VISION_ENDPOINTS,
  missionVisionResponseSchema,
  ABOUT_MISSION_VISION_SCHEMA_LABELS,
} from "@constants/index";

test.describe("About Mission & Vision API contract", () => {
  test("/api/about/mission-vision returns valid response with mission and vision", async () => {
    const api = new ApiHelper();
    const response = await api.getRequest(
      ABOUT_MISSION_VISION_ENDPOINTS.MISSION_VISION
    );
    const validation = missionVisionResponseSchema.safeParse(response);
    api.assertSchemaValid(
      validation,
      ABOUT_MISSION_VISION_SCHEMA_LABELS.MISSION_VISION_RESPONSE
    );
    expect(Object.keys(response).sort()).toEqual(["mission", "vision"]);
    expect(response.mission.title.length).toBeGreaterThan(0);
    expect(response.vision.title.length).toBeGreaterThan(0);
  });
});
