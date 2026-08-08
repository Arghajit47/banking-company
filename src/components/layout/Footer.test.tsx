import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { Footer } from "./Footer";

expect.extend(matchers);

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders logo and navigation links", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-logo")).toBeInTheDocument();
    expect(screen.getByTestId("footer-nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("footer-nav-careers")).toHaveTextContent("Careers");
    expect(screen.getByTestId("footer-nav-about")).toHaveTextContent("About");
    expect(screen.getByTestId("footer-nav-security")).toHaveTextContent("Security");
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-email")).toHaveTextContent("hello@skillbirdge.com");
    expect(screen.getByTestId("footer-phone")).toHaveTextContent("+91 91813 23 2309");
    expect(screen.getByTestId("footer-location")).toHaveTextContent("Somewhere in the World");
  });

  it("renders social icons, copyright, and legal links", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-socials")).toBeInTheDocument();
    expect(screen.getByTestId("footer-copyright")).toHaveTextContent("YourBank All Rights Reserved");
    expect(screen.getByTestId("footer-privacy")).toHaveTextContent("Privacy Policy");
    expect(screen.getByTestId("footer-terms")).toHaveTextContent("Terms of Service");
  });
});
