import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { HeroSection } from "./HeroSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("HeroSection", () => {
  it("renders the hero section", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("renders the trust badge", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-badge")).toBeInTheDocument();
    expect(screen.getByText("No LLC Required, No Credit Check.")).toBeInTheDocument();
  });

  it("renders the heading text", () => {
    render(<HeroSection />);
    expect(screen.getByText("Welcome to YourBank")).toBeInTheDocument();
    expect(screen.getByText(/Empowering Your/)).toBeInTheDocument();
    expect(screen.getByText("Journey")).toBeInTheDocument();
  });

  it("renders the subtext paragraph", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-paragraph")).toHaveTextContent(
      "At YourBank, our mission is to provide comprehensive banking solutions"
    );
  });

  it("renders the Open Account CTA button with correct styling", () => {
    render(<HeroSection />);
    const button = screen.getByTestId("hero-open-account");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Open Account");
    expect(button).toHaveClass("bg-[#CAFF33]");
    expect(button).toHaveClass("rounded-[82px]");
  });

  it("renders the transactions mockup card", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-transactions-card")).toBeInTheDocument();
    expect(screen.getByTestId("hero-transactions-heading")).toHaveTextContent(
      "Your Transactions"
    );
    expect(screen.getByText("Joel Kenley")).toBeInTheDocument();
    expect(screen.getByText("Mark Smith")).toBeInTheDocument();
    expect(screen.getByText("Lenen Roy")).toBeInTheDocument();
  });

  it("renders the money exchange mockup card", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-exchange-card")).toBeInTheDocument();
    expect(screen.getByTestId("hero-exchange-heading")).toHaveTextContent(
      "Money Exchange"
    );
    expect(screen.getByText("INR")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByTestId("hero-exchange-button")).toHaveTextContent(
      "Exchange"
    );
  });

  it("renders the monthly income badge", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-monthly-income")).toBeInTheDocument();
    expect(screen.getByText("+ $5000,00")).toBeInTheDocument();
    expect(screen.getByText("Monthly Income")).toBeInTheDocument();
  });

  it("renders the supported currency pill", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-supported-currency")).toBeInTheDocument();
    expect(screen.getByTestId("hero-supported-currency-text")).toHaveTextContent(
      "Supported Currency"
    );
  });

  it("renders the decorative images", () => {
    render(<HeroSection />);
    expect(
      screen.getByTestId("hero-abstract-illustration")
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-background-arrows")).toBeInTheDocument();
  });
});
