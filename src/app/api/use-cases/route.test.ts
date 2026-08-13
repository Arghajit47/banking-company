import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/use-cases", () => {
  it("returns 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has a 'useCases' key with an array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("useCases");
    expect(Array.isArray(body.useCases)).toBe(true);
  });

  it("returns exactly 8 use cases (4 individual + 4 business)", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.useCases.length).toBe(8);
  });

  it("returns 4 use cases per audience", async () => {
    const response = await GET();
    const body = await response.json();
    const individual = body.useCases.filter(
      (u: { audience: string }) => u.audience === "individual"
    );
    const business = body.useCases.filter(
      (u: { audience: string }) => u.audience === "business"
    );
    expect(individual.length).toBe(4);
    expect(business.length).toBe(4);
  });

  it("each use case has id (number), icon (string), title (string), description (string), audience (string)", async () => {
    const response = await GET();
    const body = await response.json();
    for (const useCase of body.useCases) {
      expect(typeof useCase.id).toBe("number");
      expect(typeof useCase.icon).toBe("string");
      expect(useCase.icon.length).toBeGreaterThan(0);
      expect(typeof useCase.title).toBe("string");
      expect(useCase.title.length).toBeGreaterThan(0);
      expect(typeof useCase.description).toBe("string");
      expect(useCase.description.length).toBeGreaterThan(0);
      expect(["individual", "business"]).toContain(useCase.audience);
    }
  });

  it("no duplicate ids", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.useCases.map((u: { id: number }) => u.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("individual use cases have correct titles", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.useCases
      .filter((u: { audience: string }) => u.audience === "individual")
      .map((u: { title: string }) => u.title);
    expect(titles).toContain("Managing Personal Finances");
    expect(titles).toContain("Saving for the Future");
    expect(titles).toContain("Homeownership");
    expect(titles).toContain("Education Funding");
  });

  it("business use cases have correct titles", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.useCases
      .filter((u: { audience: string }) => u.audience === "business")
      .map((u: { title: string }) => u.title);
    expect(titles).toContain("Startups and Entrepreneurs");
    expect(titles).toContain("Cash Flow Management");
    expect(titles).toContain("Business Expansion");
    expect(titles).toContain("Payment Solutions");
  });

  it("icons reference correct SVG asset paths", async () => {
    const response = await GET();
    const body = await response.json();
    const icons = body.useCases.map((u: { icon: string }) => u.icon);
    expect(icons).toContain("/assets/icons/icon_use_case_1.svg");
    expect(icons).toContain("/assets/icons/icon_use_case_8.svg");
    for (const icon of icons) {
      expect(icon).toMatch(/^\/assets\/icons\/icon_use_case_\d+\.svg$/);
    }
  });
});
