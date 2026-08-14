import { describe, expect, test, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function makeRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/auth/signup", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.resetModules();
});

describe("POST /api/auth/signup", () => {
  test("returns success and mock-user-id for valid credentials", async () => {
    const req = makeRequest({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    }, "20.0.0.1");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.userId).toBe("mock-user-id");
  });

  test("returns error for invalid email format", async () => {
    const req = makeRequest({
      name: "John",
      email: "notanemail",
      password: "password123",
      confirmPassword: "password123",
    }, "20.0.0.2");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test("returns error for password too short", async () => {
    const req = makeRequest({
      name: "John",
      email: "john@example.com",
      password: "short",
      confirmPassword: "short",
    }, "20.0.0.3");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test("returns error when passwords do not match", async () => {
    const req = makeRequest({
      name: "John",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "different123",
    }, "20.0.0.4");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Passwords do not match");
  });

  test("returns error for missing name", async () => {
    const req = makeRequest({
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    }, "20.0.0.5");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test("returns error for missing email", async () => {
    const req = makeRequest({
      name: "John",
      password: "password123",
      confirmPassword: "password123",
    }, "20.0.0.6");
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  test("returns 429 after exceeding rate limit (3 req/min) for same IP", async () => {
    const ip = "20.9.9.1";
    for (let i = 0; i < 3; i++) {
      await POST(makeRequest({
        name: "John",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      }, ip));
    }
    const res = await POST(makeRequest({
      name: "John",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    }, ip));
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  test("returns 400 for malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "20.0.1.1" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
