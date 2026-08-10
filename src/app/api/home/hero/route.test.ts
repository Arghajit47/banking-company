import { describe, expect, it } from "vitest";
import { GET, HERO_DATA, heroResponseSchema } from "./route";

describe("GET /api/home/hero", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns the expected hero response body", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body).toEqual(HERO_DATA);
  });

  it("response matches the Zod schema", async () => {
    const response = await GET();
    const body = await response.json();
    const parsed = heroResponseSchema.safeParse(body);
    expect(parsed.success).toBe(true);
  });

  it("returns the seeded headline, subtext, and cta label", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.headline).toBe("Welcome to YourBank");
    expect(body.subtext).toBe(
      "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.",
    );
    expect(body.ctaLabel).toBe("Open Account");
  });

  it("returns the correct number of stats items", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.stats.transactions.length).toBe(3);
    expect(body.stats.exchangeRates.length).toBe(2);
    expect(body.stats.currencies.length).toBe(4);
  });

  it("each transaction has the correct shape", async () => {
    const response = await GET();
    const body = await response.json();
    for (const transaction of body.stats.transactions) {
      expect(typeof transaction.id).toBe("number");
      expect(typeof transaction.name).toBe("string");
      expect(typeof transaction.amount).toBe("string");
    }
  });

  it("each exchange rate has the correct shape", async () => {
    const response = await GET();
    const body = await response.json();
    for (const rate of body.stats.exchangeRates) {
      expect(typeof rate.id).toBe("number");
      expect(typeof rate.code).toBe("string");
      expect(typeof rate.name).toBe("string");
      expect(typeof rate.value).toBe("string");
      expect(typeof rate.icon).toBe("string");
    }
  });

  it("each currency has the correct shape", async () => {
    const response = await GET();
    const body = await response.json();
    for (const currency of body.stats.currencies) {
      expect(typeof currency.icon).toBe("string");
    }
  });

  it("monthly income has the correct shape", async () => {
    const response = await GET();
    const body = await response.json();
    expect(typeof body.stats.monthlyIncome.icon).toBe("string");
    expect(typeof body.stats.monthlyIncome.value).toBe("string");
    expect(typeof body.stats.monthlyIncome.label).toBe("string");
  });
});
