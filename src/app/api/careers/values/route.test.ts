import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/careers/values", () => {
  it("returns 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has values array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("values");
    expect(Array.isArray(body.values)).toBe(true);
  });

  it("returns at least 4 value items", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.values.length).toBeGreaterThanOrEqual(4);
  });

  it("each item has required fields", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.values) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("description");
    }
  });

  it("each item has correct field types", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.values) {
      expect(typeof item.id).toBe("number");
      expect(typeof item.icon).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.description).toBe("string");
    }
  });

  it("each item has non-empty title and description", async () => {
    const response = await GET();
    const body = await response.json();
    for (const item of body.values) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
    }
  });

  it("returns the expected value titles", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.values.map((v: { title: string }) => v.title);
    expect(titles).toContain("Integrity");
    expect(titles).toContain("Customer Centricity");
    expect(titles).toContain("Collaboration");
    expect(titles).toContain("Innovation");
  });

  it("items have unique ids", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.values.map((v: { id: number }) => v.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
