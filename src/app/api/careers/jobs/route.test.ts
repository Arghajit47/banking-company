import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/careers/jobs", () => {
  it("returns 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns a jobs array with at least 6 items", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Array.isArray(body.jobs)).toBe(true);
    expect(body.jobs.length).toBeGreaterThanOrEqual(6);
  });

  it("each job has required fields", async () => {
    const response = await GET();
    const body = await response.json();
    for (const job of body.jobs) {
      expect(typeof job.id).toBe("number");
      expect(typeof job.title).toBe("string");
      expect(job.title.length).toBeGreaterThan(0);
      expect(typeof job.department).toBe("string");
      expect(job.department.length).toBeGreaterThan(0);
      expect(typeof job.location).toBe("string");
      expect(job.location.length).toBeGreaterThan(0);
      expect(["Full-Time", "Part-Time"]).toContain(job.type);
      expect(typeof job.description).toBe("string");
      expect(job.description.length).toBeGreaterThan(0);
    }
  });

  it("each job has a unique id", async () => {
    const response = await GET();
    const body = await response.json();
    const ids = body.jobs.map((j: { id: number }) => j.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("first job is Relationship Manager", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.jobs[0].title).toBe("Relationship Manager");
    expect(body.jobs[0].department).toBe("Retail Banking");
  });

  it("jobs envelope key is 'jobs'", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body)).toContain("jobs");
  });

  it("does not return extra fields at root level", async () => {
    const response = await GET();
    const body = await response.json();
    expect(Object.keys(body)).toEqual(["jobs"]);
  });

  it("all types are Full-Time or Part-Time", async () => {
    const response = await GET();
    const body = await response.json();
    for (const job of body.jobs) {
      expect(["Full-Time", "Part-Time"]).toContain(job.type);
    }
  });
});
