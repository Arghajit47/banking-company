import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

const req = (page?: string) =>
  new NextRequest(`http://localhost/api/faq${page ? `?page=${page}` : ""}`);

describe("GET /api/faq", () => {
  it("returns 400 for missing page param", async () => {
    const response = await GET(req());
    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid page param", async () => {
    const response = await GET(req("invalid"));
    expect(response.status).toBe(400);
  });

  it("returns 200 for page=home", async () => {
    const response = await GET(req("home"));
    expect(response.status).toBe(200);
  });

  it("returns 200 for page=careers", async () => {
    const response = await GET(req("careers"));
    expect(response.status).toBe(200);
  });

  it("returns 200 for page=security", async () => {
    const response = await GET(req("security"));
    expect(response.status).toBe(200);
  });

  it("response has faqs array and hasMore boolean for all page contexts", async () => {
    for (const page of ["home", "careers", "security"] as const) {
      const response = await GET(req(page));
      const body = await response.json();
      expect(Array.isArray(body.faqs)).toBe(true);
      expect(typeof body.hasMore).toBe("boolean");
    }
  });

  it("home page returns 6 faqs and hasMore true", async () => {
    const response = await GET(req("home"));
    const body = await response.json();
    expect(body.faqs.length).toBe(6);
    expect(body.hasMore).toBe(true);
  });

  it("careers page returns 5 faqs and hasMore true", async () => {
    const response = await GET(req("careers"));
    const body = await response.json();
    expect(body.faqs.length).toBe(5);
    expect(body.hasMore).toBe(true);
  });

  it("security page returns 4 faqs and hasMore false", async () => {
    const response = await GET(req("security"));
    const body = await response.json();
    expect(body.faqs.length).toBe(4);
    expect(body.hasMore).toBe(false);
  });

  it("each FAQ item has correct shape", async () => {
    const response = await GET(req("home"));
    const body = await response.json();
    for (const item of body.faqs) {
      expect(typeof item.id).toBe("number");
      expect(typeof item.question).toBe("string");
      expect(item.question.length).toBeGreaterThan(0);
      expect(typeof item.answer).toBe("string");
      expect(item.answer.length).toBeGreaterThan(0);
    }
  });
});
