import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/auth/status", () => {
  it("returns 200 json with logged-out mock payload", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(body).toEqual({
      isLoggedIn: false,
      user: null,
    });
  });
});
