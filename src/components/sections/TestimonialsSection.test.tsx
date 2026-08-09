import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { TestimonialsSection } from "./TestimonialsSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("TestimonialsSection", () => {
  it('renders "Our Testimonials" heading', () => {
    render(<TestimonialsSection />);
    const heading = screen.getByTestId("testimonials-heading");
    expect(heading).toHaveTextContent("Our");
    expect(heading).toHaveTextContent("Testimonials");
  });

  it('renders subheading with "Discover how YourBank"', () => {
    render(<TestimonialsSection />);
    const subheading = screen.getByTestId("testimonials-subheading");
    expect(subheading).toHaveTextContent("Discover how YourBank");
  });

  it("renders at least 3 testimonial cards", () => {
    render(<TestimonialsSection />);
    const card0 = screen.getByTestId("testimonials-card-0");
    const card1 = screen.getByTestId("testimonials-card-1");
    const card2 = screen.getByTestId("testimonials-card-2");
    expect(card0).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });

  it('renders "For Individuals" tab', () => {
    render(<TestimonialsSection />);
    const tab = screen.getByTestId("testimonials-tab-individuals");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveTextContent("For Individuals");
  });

  it('renders "For Businesses" tab', () => {
    render(<TestimonialsSection />);
    const tab = screen.getByTestId("testimonials-tab-businesses");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveTextContent("For Businesses");
  });

  it("each card shows the correct name", () => {
    render(<TestimonialsSection />);
    const names = screen.getAllByTestId("testimonials-card-name");
    expect(names).toHaveLength(3);
    expect(names[0]).toHaveTextContent("Sara T");
    expect(names[1]).toHaveTextContent("John D");
    expect(names[2]).toHaveTextContent("Emily G");
  });

  it("each card shows the correct quote excerpt", () => {
    render(<TestimonialsSection />);
    const quotes = screen.getAllByTestId("testimonials-card-quote");
    expect(quotes).toHaveLength(3);
    expect(quotes[0]).toHaveTextContent("YourBank has been my trusted financial partner");
    expect(quotes[1]).toHaveTextContent("I recently started my own business");
    expect(quotes[2]).toHaveTextContent("I love the convenience of YourBank banking app");
  });

  it("renders prev and next navigation buttons", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-prev")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-next")).toBeInTheDocument();
  });

  it("section renders with correct testid", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
  });
});
