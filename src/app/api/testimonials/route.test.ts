import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/testimonials", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has a 'testimonials' key with an array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("testimonials");
    expect(Array.isArray(body.testimonials)).toBe(true);
  });

  it("array has at least 3 items", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.testimonials.length).toBeGreaterThanOrEqual(3);
  });

  it("each item has the correct shape", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.testimonials) {
      expect(typeof item.id).toBe("number");
      expect(typeof item.name).toBe("string");
      expect(item.name.length).toBeGreaterThan(0);
      expect(typeof item.role).toBe("string");
      expect(item.role.length).toBeGreaterThan(0);
      expect(typeof item.quote).toBe("string");
      expect(item.quote.length).toBeGreaterThan(0);
      expect(item.avatarUrl === null || typeof item.avatarUrl === "string").toBe(
        true,
      );
    }
  });

  it("all 3 testimonials are present: Sara T, John D, Emily G", async () => {
    const response = await GET();
    const body = await response.json();
    const names: string[] = body.testimonials.map(
      (t: { name: string }) => t.name,
    );
    expect(names).toContain("Sara T");
    expect(names).toContain("John D");
    expect(names).toContain("Emily G");
  });

  it("response shape: keys of testimonials[0] are exactly the expected set", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body.testimonials[0]).sort()).toEqual([
      "avatarUrl",
      "id",
      "name",
      "quote",
      "role",
    ]);
  });
});
