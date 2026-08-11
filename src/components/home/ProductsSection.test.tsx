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
      expect(
        screen.getByTestId(`product-badge-${product.id}`),
      ).toBeInTheDocument();
    });
  });

  it("heading has lime green color class", () => {
    render(<ProductsSection />);
    const heading = screen.getByTestId("products-heading");
    expect(heading.className).toContain("text-[#CAFF33]");
  });
});
