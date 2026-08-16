import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("excludes the placeholder legal pages", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/privacy-policy"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/terms-of-service"))).toBe(false);
  });
});
