import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/about/press-releases", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns pressReleases array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.pressReleases).toBeDefined();
    expect(Array.isArray(body.pressReleases)).toBe(true);
  });

  it("returns at least 4 press releases", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.pressReleases.length).toBeGreaterThanOrEqual(4);
  });

  it("each item has id field", async () => {
    const response = await GET();
    const body = await response.json();
    body.pressReleases.forEach((item: { id: unknown }) => {
      expect(typeof item.id).toBe("number");
    });
  });

  it("each item has date field", async () => {
    const response = await GET();
    const body = await response.json();
    body.pressReleases.forEach((item: { date: unknown }) => {
      expect(typeof item.date).toBe("string");
      expect((item.date as string).length).toBeGreaterThan(0);
    });
  });

  it("each item has headline field", async () => {
    const response = await GET();
    const body = await response.json();
    body.pressReleases.forEach((item: { headline: unknown }) => {
      expect(typeof item.headline).toBe("string");
      expect((item.headline as string).length).toBeGreaterThan(0);
    });
  });

  it("each item has excerpt field", async () => {
    const response = await GET();
    const body = await response.json();
    body.pressReleases.forEach((item: { excerpt: unknown }) => {
      expect(typeof item.excerpt).toBe("string");
      expect((item.excerpt as string).length).toBeGreaterThan(0);
    });
  });

  it("each item has url field", async () => {
    const response = await GET();
    const body = await response.json();
    body.pressReleases.forEach((item: { url: unknown }) => {
      expect(typeof item.url).toBe("string");
    });
  });

  it("response contains exactly pressReleases key", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body)).toEqual(["pressReleases"]);
  });

  it("first item headline mentions YourBank", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.pressReleases[0].headline).toContain("YourBank");
  });
});
