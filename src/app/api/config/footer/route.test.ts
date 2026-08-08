import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/config/footer", () => {
  it("returns 200 with the footer configuration shape", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.navLinks).toHaveLength(4);
    expect(body.navLinks[0]).toEqual({ label: "Home", href: "/" });
    expect(body.contact).toEqual({
      email: "hello@skillbridge.com",
      phone: "+91 91813 23 2309",
      location: "Somewhere in the World",
    });
    expect(body.social).toHaveLength(3);
    expect(body.social[0]).toEqual({ name: "facebook", url: "#" });
    expect(body.copyright).toBe("YourBank All Rights Reserved");
  });
});
