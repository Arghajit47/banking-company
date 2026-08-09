import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { NextRequest } from "next/server";

const createRequest = (tab?: string) =>
  new NextRequest(
    tab
      ? `http://localhost/api/testimonials?tab=${tab}`
      : "http://localhost/api/testimonials"
  );

describe("GET /api/testimonials", () => {
  it("returns 200 with no tab param (defaults to individuals)", async () => {
    const response = await GET(createRequest());
    expect(response.status).toBe(200);
  });

  it("returns 200 for tab=individuals", async () => {
    const response = await GET(createRequest("individuals"));
    expect(response.status).toBe(200);
  });

  it("returns 200 for tab=businesses", async () => {
    const response = await GET(createRequest("businesses"));
    expect(response.status).toBe(200);
  });

  it("response body has a 'testimonials' key with an array", async () => {
    const response = await GET(createRequest());
    const body = await response.json();
    expect(body).toHaveProperty("testimonials");
    expect(Array.isArray(body.testimonials)).toBe(true);
  });

  it("individuals tab returns 3 items including Sara T and Emily G", async () => {
    const response = await GET(createRequest("individuals"));
    const body = await response.json();
    expect(body.testimonials.length).toBe(3);
    const names = body.testimonials.map((t: { name: string }) => t.name);
    expect(names).toContain("Sara T");
    expect(names).toContain("Emily G");
    expect(names).toContain("Michael B");
  });

  it("businesses tab returns 3 items including John D", async () => {
    const response = await GET(createRequest("businesses"));
    const body = await response.json();
    expect(body.testimonials.length).toBe(3);
    const names = body.testimonials.map((t: { name: string }) => t.name);
    expect(names).toContain("John D");
    expect(names).toContain("Alex P");
    expect(names).toContain("Rachel M");
  });

  it("individuals and businesses tabs return different testimonials", async () => {
    const indResp = await GET(createRequest("individuals"));
    const bizResp = await GET(createRequest("businesses"));
    const indBody = await indResp.json();
    const bizBody = await bizResp.json();
    const indNames = indBody.testimonials.map((t: { name: string }) => t.name);
    const bizNames = bizBody.testimonials.map((t: { name: string }) => t.name);
    expect(indNames).not.toEqual(bizNames);
  });

  it("each item has the correct shape", async () => {
    const response = await GET(createRequest());
    const body = await response.json();
    for (const item of body.testimonials) {
      expect(typeof item.id).toBe("number");
      expect(typeof item.name).toBe("string");
      expect(item.name.length).toBeGreaterThan(0);
      expect(typeof item.role).toBe("string");
      expect(item.role.length).toBeGreaterThan(0);
      expect(typeof item.quote).toBe("string");
      expect(item.quote.length).toBeGreaterThan(0);
      expect(item.avatarUrl === null || typeof item.avatarUrl === "string").toBe(true);
    }
  });

  it("invalid tab param defaults to individuals", async () => {
    const response = await GET(createRequest("invalid"));
    expect(response.status).toBe(200);
    const body = await response.json();
    const names = body.testimonials.map((t: { name: string }) => t.name);
    expect(names).toContain("Sara T");
  });
});
