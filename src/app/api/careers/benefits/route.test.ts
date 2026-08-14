import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/careers/benefits", () => {
  it("returns 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has benefits array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("benefits");
    expect(Array.isArray(body.benefits)).toBe(true);
  });

  it("returns at least 4 benefit items", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.benefits.length).toBeGreaterThanOrEqual(4);
  });

  it("each item has required fields", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.benefits) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("description");
    }
  });

  it("each item has correct field types", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.benefits) {
      expect(typeof item.id).toBe("number");
      expect(typeof item.icon).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.description).toBe("string");
    }
  });

  it("each item has non-empty title and description", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.benefits) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
    }
  });

  it("ids are unique integers", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.benefits.map((b: { id: number }) => b.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
    ids.forEach((id: number) => expect(Number.isInteger(id)).toBe(true));
  });

  it("icon paths reference svg assets", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.benefits) {
      expect(item.icon).toMatch(/\.svg$/);
    }
  });
});
