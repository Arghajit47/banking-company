import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/about/hero", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns headline field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.headline).toBe("string");
    expect(body.headline.length).toBeGreaterThan(0);
  });

  it("returns subheadline field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.subheadline).toBe("string");
    expect(body.subheadline.length).toBeGreaterThan(0);
  });

  it("returns body field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.body).toBe("string");
    expect(body.body.length).toBeGreaterThan(0);
  });

  it("returns imageUrl field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.imageUrl).toBe("string");
    expect(body.imageUrl.length).toBeGreaterThan(0);
  });

  it("headline contains expected text", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.headline).toContain("Where Banking Meets");
  });

  it("subheadline contains Excellence", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.subheadline).toContain("Excellence");
  });

  it("response contains exactly the expected keys", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body).sort()).toEqual(["body", "headline", "imageUrl", "subheadline"].sort());
  });
});
