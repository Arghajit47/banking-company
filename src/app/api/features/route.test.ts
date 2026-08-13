import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/features", () => {
  it("returns 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has a 'features' key with an array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("features");
    expect(Array.isArray(body.features)).toBe(true);
  });

  it("returns at least 4 features", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.features.length).toBeGreaterThanOrEqual(4);
  });

  it("returns exactly 4 features (Phase 1 seed)", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.features.length).toBe(4);
  });

  it("each feature has id (number), icon (string), title (string), description (string)", async () => {
    const response = await GET();
    const body = await response.json();
    for (const feature of body.features) {
      expect(typeof feature.id).toBe("number");
      expect(typeof feature.icon).toBe("string");
      expect(feature.icon.length).toBeGreaterThan(0);
      expect(typeof feature.title).toBe("string");
      expect(feature.title.length).toBeGreaterThan(0);
      expect(typeof feature.description).toBe("string");
      expect(feature.description.length).toBeGreaterThan(0);
    }
  });

  it("no duplicate ids", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.features.map((f: { id: number }) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("returns correct feature titles", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.features.map((f: { title: string }) => f.title);
    expect(titles).toContain("24/7 Account Access");
    expect(titles).toContain("Mobile Banking App");
    expect(titles).toContain("Secure Transactions");
    expect(titles).toContain("Bill Pay and Transfers");
  });

  it("icons reference correct SVG asset paths", async () => {
    const response = await GET();
    const body = await response.json();
    const icons = body.features.map((f: { icon: string }) => f.icon);
    expect(icons).toContain("/assets/icons/icon_feature_1.svg");
    expect(icons).toContain("/assets/icons/icon_feature_4.svg");
    for (const icon of icons) {
      expect(icon).toMatch(/^\/assets\/icons\/icon_feature_\d+\.svg$/);
    }
  });

  it("features have sequential ids starting from 1", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.features.map((f: { id: number }) => f.id);
    expect(ids).toEqual([1, 2, 3, 4]);
  });
});
