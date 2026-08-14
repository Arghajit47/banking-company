import { describe, expect, test, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function makeRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.resetModules();
});

describe("POST /api/auth/login", () => {
  test("returns success and mock-token for valid credentials", async () => {
    const req = makeRequest({ email: "user@example.com", password: "password123" }, "10.0.0.1");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.token).toBe("mock-token");
  });

  test("returns error for invalid email format", async () => {
    const req = makeRequest({ email: "notanemail", password: "password123" }, "10.0.0.2");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid credentials");
  });

  test("returns error for password too short", async () => {
    const req = makeRequest({ email: "user@example.com", password: "short" }, "10.0.0.3");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid credentials");
  });

  test("returns error for missing email", async () => {
    const req = makeRequest({ password: "password123" }, "10.0.0.4");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test("returns error for missing password", async () => {
    const req = makeRequest({ email: "user@example.com" }, "10.0.0.5");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test("returns 429 after exceeding rate limit for same IP", async () => {
    const ip = "10.9.9.9";
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest({ email: "user@example.com", password: "password123" }, ip));
    }
    const res = await POST(makeRequest({ email: "user@example.com", password: "password123" }, ip));
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  test("does not rate limit different IPs independently", async () => {
    const res = await POST(makeRequest({ email: "user@example.com", password: "password123" }, "192.168.1.1"));
    expect(res.status).toBe(200);
  });

  test("returns 400 for malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.0.1.1" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
