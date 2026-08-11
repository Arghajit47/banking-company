import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ProductsSection } from "./ProductsSection";

expect.extend(matchers);

const products = [
  {
    id: 1,
    title: "Checking Accounts",
    description:
      "Enjoy easy and convenient access to your funds with our range of checking account options.",
  },
  {
    id: 2,
    title: "Savings Accounts",
    description:
      "Build your savings with our competitive interest rates and flexible savings account options.",
  },
  {
    id: 3,
    title: "Loans and Mortgages",
    description:
      "Realize your dreams with our flexible loan and mortgage options.",
  },
];

afterEach(() => {
  cleanup();
});

describe("ProductsSection", () => {
  it("renders the section heading and subheading", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-heading")).toHaveTextContent(
      "Our Products",
    );
    expect(screen.getByTestId("products-subheading")).toHaveTextContent(
      "Discover a range of comprehensive and customizable banking products",
    );
  });

  it("renders the individual and business tabs", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-tab-individuals")).toHaveTextContent(
      "For Individuals",
    );
    expect(screen.getByTestId("products-tab-businesses")).toHaveTextContent(
      "For Businesses",
    );
  });

  it("renders three product cards with icons, titles and descriptions", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();

    products.forEach((product) => {
      expect(
        screen.getByTestId(`product-card-${product.id}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`product-title-${product.id}`),
      ).toHaveTextContent(product.title);
      expect(
        screen.getByTestId(`product-description-${product.id}`),
      ).toHaveTextContent(product.description);
      expect(
        screen.getByTestId(`product-icon-${product.id}`),
      ).toBeInTheDocument();
    });
  });

  it("product cards have no duplicate badge icon", () => {
    render(<ProductsSection />);
    products.forEach((product) => {
      expect(
        screen.queryByTestId(`product-badge-${product.id}`),
      ).not.toBeInTheDocument();
    });
  });

  it("product icon wrapper has Figma double-ring gradient structure", () => {
    render(<ProductsSection />);
    const wrapper = screen.getByTestId("product-icon-wrapper-1");
    expect(wrapper.className).toContain("rounded-[70px]");
    expect(wrapper.className).toContain("from-[rgba(202,255,51,0.05)]");
  });

  it("product cards have correct dark background color", () => {
    render(<ProductsSection />);
    const card = screen.getByTestId("product-card-1");
    expect(card.className).toContain("bg-[#1E1E1E]");
    expect(card.className).not.toContain("bg-[#1A1A2E]");
  });

  it("heading has lime green color class", () => {
    render(<ProductsSection />);
    const heading = screen.getByTestId("products-heading");
    expect(heading.className).toContain("text-[#CAFF33]");
  });

  it("tab container has correct padding class", () => {
    render(<ProductsSection />);
    const tabs = screen.getByTestId("products-tabs");
    expect(tabs.className).toContain("p-[14px]");
  });
});
