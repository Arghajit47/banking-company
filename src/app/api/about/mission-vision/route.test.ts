import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/about/mission-vision", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns mission field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.mission).toBeDefined();
    expect(typeof body.mission.title).toBe("string");
    expect(body.mission.title.length).toBeGreaterThan(0);
    expect(typeof body.mission.description).toBe("string");
    expect(body.mission.description.length).toBeGreaterThan(0);
  });

  it("returns vision field", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.vision).toBeDefined();
    expect(typeof body.vision.title).toBe("string");
    expect(body.vision.title.length).toBeGreaterThan(0);
    expect(typeof body.vision.description).toBe("string");
    expect(body.vision.description.length).toBeGreaterThan(0);
  });

  it("mission title is Mission", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.mission.title).toBe("Mission");
  });

  it("vision title is Vision", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.vision.title).toBe("Vision");
  });

  it("mission description starts with At YourBank", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.mission.description).toContain("At YourBank");
  });

  it("vision description starts with Our vision", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.vision.description).toContain("Our vision");
  });

  it("response contains exactly mission and vision keys", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body).sort()).toEqual(["mission", "vision"]);
  });
});
