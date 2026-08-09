import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { TestimonialsSection } from "./TestimonialsSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

const mockData = {
  testimonials: [
    { id: 1, name: "Sara T", role: "Individual Customer", quote: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.", avatarUrl: null },
    { id: 2, name: "John D", role: "Business Owner", quote: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.", avatarUrl: null },
    { id: 3, name: "Emily G", role: "Individual Customer", quote: "I love the convenience of YourBank banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.", avatarUrl: null },
  ],
};

vi.mock("swr", () => ({ default: vi.fn() }));
vi.mock("@/lib/use-mounted", () => ({ useMounted: vi.fn() }));

import useSWR from "swr";
import { useMounted } from "@/lib/use-mounted";

beforeEach(() => {
  vi.mocked(useMounted).mockReturnValue(true);
  vi.mocked(useSWR).mockReturnValue({ data: mockData, isLoading: false, error: undefined } as ReturnType<typeof useSWR>);
});

describe("TestimonialsSection", () => {
  it("renders the testimonials section", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
  });

  it("displays Testimonials heading", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-heading")).toHaveTextContent("Testimonials");
  });

  it("displays subheading", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-subheading")).toHaveTextContent("Discover how YourBank");
  });

  it("renders 3 testimonial cards", () => {
    render(<TestimonialsSection />);
    const cards = screen.getAllByTestId(/testimonials-card-/);
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("displays Sara T", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Sara T")).toBeInTheDocument();
  });

  it("displays John D", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("John D")).toBeInTheDocument();
  });

  it("displays Emily G", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Emily G")).toBeInTheDocument();
  });

  it("shows For Individuals tab", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-individuals")).toBeInTheDocument();
  });

  it("shows For Businesses tab", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-businesses")).toBeInTheDocument();
  });

  it("shows skeleton when loading", () => {
    vi.mocked(useSWR).mockReturnValue({ data: undefined, isLoading: true, error: undefined } as ReturnType<typeof useSWR>);
    vi.mocked(useMounted).mockReturnValue(true);
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-section")).toHaveAttribute("aria-busy", "true");
  });
});
