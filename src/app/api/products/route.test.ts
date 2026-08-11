import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/products", () => {
  it("returns 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("response body has a 'products' key with an array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toHaveProperty("products");
    expect(Array.isArray(body.products)).toBe(true);
  });

  it("returns exactly 6 products", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.products.length).toBe(6);
  });

  it("each product has id (number), icon (string), title (string), description (string)", async () => {
    const response = await GET();
    const body = await response.json();
    for (const product of body.products) {
      expect(typeof product.id).toBe("number");
      expect(typeof product.icon).toBe("string");
      expect(product.icon.length).toBeGreaterThan(0);
      expect(typeof product.title).toBe("string");
      expect(product.title.length).toBeGreaterThan(0);
      expect(typeof product.description).toBe("string");
      expect(product.description.length).toBeGreaterThan(0);
    }
  });

  it("no duplicate ids", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.products.map((p: { id: number }) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("returns all expected products by title", async () => {
    const response = await GET();
    const body = await response.json();
    const titles = body.products.map((p: { title: string }) => p.title);
    expect(titles).toContain("Checking Accounts");
    expect(titles).toContain("Savings Accounts");
    expect(titles).toContain("Home Loans");
    expect(titles).toContain("Insurance");
    expect(titles).toContain("Investments");
    expect(titles).toContain("Credit Cards");
  });

  it("icons match expected values", async () => {
    const response = await GET();
    const body = await response.json();
    const icons = body.products.map((p: { icon: string }) => p.icon);
    expect(icons).toContain("checking");
    expect(icons).toContain("savings");
    expect(icons).toContain("loans");
    expect(icons).toContain("insurance");
    expect(icons).toContain("investing");
    expect(icons).toContain("credit");
  });
});
