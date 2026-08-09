import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

function buildRequest(page?: string): NextRequest {
  const url = page
    ? `http://localhost:3000/api/config/cta?page=${page}`
    : "http://localhost:3000/api/config/cta";
  return new NextRequest(url);
}

const homeConfig = {
  headline: "Start your financial journey with YourBank today!",
  body: "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.",
  buttonLabel: "Open Account",
};

const careersConfig = {
  headline: "Start your financial journey with YourBank today!",
  body: "Lorem ipsum dolor sit amet consectetur. Blandit odio semper risus pellentesque elit. Pellentesque eget ut imperdiet nulla penatibus. Nascetur viverra arcu sed amet cursus purus.",
  buttonLabel: "Open Account",
};

describe("GET /api/config/cta", () => {
  it("returns the home configuration when no page param is provided", async () => {
    const response = await GET(buildRequest());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(homeConfig);
  });

  it("returns the home configuration when page=home", async () => {
    const response = await GET(buildRequest("home"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(homeConfig);
  });

  it("returns the careers configuration when page=careers", async () => {
    const response = await GET(buildRequest("careers"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(careersConfig);
  });

  it("falls back to the home configuration for an invalid page param", async () => {
    const response = await GET(buildRequest("invalid"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(homeConfig);
  });

  it("returns the expected response shape", async () => {
    const response = await GET(buildRequest("careers"));
    const body = await response.json();
    expect(Object.keys(body).sort()).toEqual([
      "body",
      "buttonLabel",
      "headline",
    ]);
    expect(typeof body.headline).toBe("string");
    expect(typeof body.body).toBe("string");
    expect(typeof body.buttonLabel).toBe("string");
  });
});
