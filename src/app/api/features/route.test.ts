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

  it("returns exactly 12 features (4 per sub-tab)", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.features.length).toBe(12);
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
      expect(typeof feature.tab).toBe("string");
    }
  });

  it("every feature carries a valid tab discriminator", async () => {
    const response = await GET();
    const body = await response.json();
    const validTabs = ["online-banking", "financial-tools", "customer-support"];
    for (const feature of body.features) {
      expect(validTabs).toContain(feature.tab);
    }
  });

  it("returns exactly 4 features per tab", async () => {
    const response = await GET();
    const body = await response.json();
    for (const tab of [
      "online-banking",
      "financial-tools",
      "customer-support",
    ]) {
      const forTab = body.features.filter(
        (f: { tab: string }) => f.tab === tab
      );
      expect(forTab.length).toBe(4);
    }
  });

  it("keeps the original four cards on the online-banking tab", async () => {
    const response = await GET();
    const body = await response.json();
    const onlineBanking = body.features.filter(
      (f: { tab: string }) => f.tab === "online-banking"
    );
    expect(onlineBanking.map((f: { id: number }) => f.id)).toEqual([1, 2, 3, 4]);
    expect(onlineBanking.map((f: { title: string }) => f.title)).toEqual([
      "24/7 Account Access",
      "Mobile Banking App",
      "Secure Transactions",
      "Bill Pay and Transfers",
    ]);
  });

  it("returns the financial-tools card titles", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.features
      .filter((f: { tab: string }) => f.tab === "financial-tools")
      .map((f: { title: string }) => f.title);
    expect(titles).toEqual([
      "Smart Budget Planner",
      "Investment & Portfolio Tracker",
      "Loan & Mortgage Calculator",
      "Credit Health Monitoring",
    ]);
  });

  it("returns the customer-support card titles", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.features
      .filter((f: { tab: string }) => f.tab === "customer-support")
      .map((f: { title: string }) => f.title);
    expect(titles).toEqual([
      "Live Concierge Chat",
      "Appointment Scheduling",
      "Dedicated Dispute Center",
      "Personalized Financial Advisory",
    ]);
  });

  it("each tab reuses icon_feature_1..4 in order", async () => {
    const response = await GET();
    const body = await response.json();
    for (const tab of [
      "online-banking",
      "financial-tools",
      "customer-support",
    ]) {
      const icons = body.features
        .filter((f: { tab: string }) => f.tab === tab)
        .map((f: { icon: string }) => f.icon);
      expect(icons).toEqual([
        "/assets/icons/icon_feature_1.svg",
        "/assets/icons/icon_feature_2.svg",
        "/assets/icons/icon_feature_3.svg",
        "/assets/icons/icon_feature_4.svg",
      ]);
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
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});
