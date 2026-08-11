import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

vi.mock("@/components/home/HeroSection", () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));
vi.mock("@/components/home/ProductsSection", () => ({
  ProductsSection: () => <div data-testid="products-section" />,
}));
vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar" />,
}));
vi.mock("@/components/sections/CTASection", () => ({
  CTASection: () => <div data-testid="cta-section" />,
}));
vi.mock("@/components/sections/FAQSection", () => ({
  FAQSection: () => <div data-testid="faq-section" />,
}));
vi.mock("@/components/sections/TestimonialsSection", () => ({
  TestimonialsSection: () => <div data-testid="testimonials-section" />,
}));

describe("Home page section order", () => {
  it("renders FAQSection before TestimonialsSection", () => {
    const { container } = render(<Home />);
    const faq = container.querySelector('[data-testid="faq-section"]');
    const testimonials = container.querySelector('[data-testid="testimonials-section"]');
    expect(faq).not.toBeNull();
    expect(testimonials).not.toBeNull();
    // compareDocumentPosition: if faq is before testimonials, result has DOCUMENT_POSITION_FOLLOWING (4) set
    expect(faq!.compareDocumentPosition(testimonials!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
