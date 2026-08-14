import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/security/hero", () => {
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

  it("returns headlineAccent field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.headlineAccent).toBe("string");
    expect(body.headlineAccent.length).toBeGreaterThan(0);
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

  it("headline contains 'Your Security is Our'", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.headline).toContain("Your Security is Our");
  });

  it("headlineAccent is 'Top Priority'", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.headlineAccent).toBe("Top Priority");
  });

  it("body mentions At YourBank", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.body).toContain("At YourBank");
  });

  it("response contains exactly the expected keys", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body).sort()).toEqual(["body", "headline", "headlineAccent", "imageUrl"]);
  });
});
