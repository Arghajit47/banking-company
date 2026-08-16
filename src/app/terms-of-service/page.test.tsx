import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import TermsOfServicePage, { metadata } from "./page";

vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar" />,
}));

afterEach(() => {
  cleanup();
});

describe("Terms of Service page", () => {
  it("renders the heading", () => {
    render(<TermsOfServicePage />);
    const heading = screen.getByTestId("terms-of-service-heading");
    expect(heading.tagName).toBe("H1");
    expect(heading.textContent).toBe("Terms of Service");
  });

  it("renders the placeholder body copy verbatim", () => {
    render(<TermsOfServicePage />);
    expect(screen.getByTestId("terms-of-service-body-1").textContent).toBe(
      "We're finalising our terms of service. The full terms will be published on this page shortly.",
    );
    expect(screen.getByTestId("terms-of-service-body-2").textContent).toBe(
      "If you have questions about using YourBank's products and services in the meantime, please contact us at support@yourbank.com.",
    );
  });

  it("renders the contact email as a mailto link", () => {
    render(<TermsOfServicePage />);
    const link = screen.getByTestId("terms-of-service-contact-email");
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
