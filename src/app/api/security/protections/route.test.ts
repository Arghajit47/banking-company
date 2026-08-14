import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/security/protections", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns protections array", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.protections).toBeDefined();
    expect(Array.isArray(body.protections)).toBe(true);
  });

  it("returns at least 4 protections", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.protections.length).toBeGreaterThanOrEqual(4);
  });

  it("each item has id field", async () => {
    const response = await GET();
    const body = await response.json();
    body.protections.forEach((item: { id: unknown }) => {
      expect(typeof item.id).toBe("number");
    });
  });

  it("each item has icon field", async () => {
    const response = await GET();
    const body = await response.json();
    body.protections.forEach((item: { icon: unknown }) => {
      expect(typeof item.icon).toBe("string");
      expect((item.icon as string).length).toBeGreaterThan(0);
    });
  });

  it("each item has title field", async () => {
    const response = await GET();
    const body = await response.json();
    body.protections.forEach((item: { title: unknown }) => {
      expect(typeof item.title).toBe("string");
      expect((item.title as string).length).toBeGreaterThan(0);
    });
  });

  it("each item has description field", async () => {
    const response = await GET();
    const body = await response.json();
    body.protections.forEach((item: { description: unknown }) => {
      expect(typeof item.description).toBe("string");
      expect((item.description as string).length).toBeGreaterThan(0);
    });
  });

  it("first item title is 'Secure Online Banking Platform'", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.protections[0].title).toBe("Secure Online Banking Platform");
  });

  it("response contains exactly protections key", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body)).toEqual(["protections"]);
  });
});
