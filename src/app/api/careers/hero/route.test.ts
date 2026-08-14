import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/careers/hero", () => {
  it("returns 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has all required fields", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("headline");
    expect(body).toHaveProperty("body");
    expect(body).toHaveProperty("ctaLabel");
    expect(body).toHaveProperty("imageUrl");
  });

  it("all fields are non-empty strings", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.headline).toBe("string");
    expect(body.headline.length).toBeGreaterThan(0);
    expect(typeof body.body).toBe("string");
    expect(body.body.length).toBeGreaterThan(0);
    expect(typeof body.ctaLabel).toBe("string");
    expect(body.ctaLabel.length).toBeGreaterThan(0);
    expect(typeof body.imageUrl).toBe("string");
    expect(body.imageUrl.length).toBeGreaterThan(0);
  });

  it("returns the correct headline", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.headline).toBe("Welcome to YourBank Careers!");
  });

  it("returns the correct ctaLabel", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.ctaLabel).toBe("Apply Now");
  });

  it("imageUrl is a valid asset path", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.imageUrl).toMatch(/^\/assets\//);
  });

  it("body text references YourBank", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.body).toContain("YourBank");
  });
});
