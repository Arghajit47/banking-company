import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PrivacyPolicyPage, { metadata } from "./page";

vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar" />,
}));

afterEach(() => {
  cleanup();
});

describe("Privacy Policy page", () => {
  it("renders the heading", () => {
    render(<PrivacyPolicyPage />);
    const heading = screen.getByTestId("privacy-policy-heading");
    expect(heading.tagName).toBe("H1");
    expect(heading.textContent).toBe("Privacy Policy");
  });

  it("renders the placeholder body copy verbatim", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByTestId("privacy-policy-body-1").textContent).toBe(
      "We're finalising our privacy policy. The full policy will be published on this page shortly.",
    );
    expect(screen.getByTestId("privacy-policy-body-2").textContent).toBe(
      "In the meantime, if you have questions about how YourBank collects, uses, or protects your personal information, please contact us at support@yourbank.com.",
    );
  });

  it("renders the contact email as a mailto link", () => {
    render(<PrivacyPolicyPage />);
    const link = screen.getByTestId("privacy-policy-contact-email");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("mailto:support@yourbank.com");
    expect(link.textContent).toBe("support@yourbank.com");
  });

  it("is marked noindex in metadata", () => {
    expect(metadata.robots).toBeTypeOf("object");
    expect(
      (metadata.robots as { index?: boolean | null }).index,
    ).toBe(false);
  });

  it("has a title and description", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
