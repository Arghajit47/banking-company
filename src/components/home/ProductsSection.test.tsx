import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ProductsSection } from "./ProductsSection";
import type { ProductsResponse } from "@/lib/products";

expect.extend(matchers);

const apiProductsData: ProductsResponse = {
  products: [
    {
      id: 1,
      icon: "checking",
      title: "Checking Accounts",
      description:
        "Enjoy easy and convenient banking with our range of checking account options.",
    },
    {
      id: 2,
      icon: "savings",
      title: "Savings Accounts",
      description:
        "Build your savings with competitive interest rates and flexible account options.",
    },
    {
      id: 3,
      icon: "loans",
      title: "Home Loans",
      description:
        "Realize your dream of homeownership with our flexible mortgage solutions.",
    },
    {
      id: 4,
      icon: "insurance",
      title: "Insurance",
      description:
        "Protect what matters most with our comprehensive insurance products.",
    },
    {
      id: 5,
      icon: "investing",
      title: "Investments",
      description:
        "Grow your wealth with our tailored investment plans and expert guidance.",
    },
    {
      id: 6,
      icon: "credit",
      title: "Credit Cards",
      description:
        "Earn rewards and enjoy financial flexibility with our range of credit card options.",
    },
  ],
};

type ProductsHookState = {
  data: ProductsResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: ProductsHookState = {
  data: apiProductsData,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let mockState: ProductsHookState = { ...baseMock };

vi.mock("@/lib/products", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/products")>();
  return {
    ...actual,
    useProductsData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  mockState = { ...baseMock };
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

  it("renders at least 2 product cards with titles from API", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-1")).toHaveTextContent(
      "Checking Accounts",
    );
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-2")).toHaveTextContent(
      "Savings Accounts",
    );
  });

  it("renders all 6 product cards from API", () => {
    render(<ProductsSection />);
    apiProductsData.products.forEach((product) => {
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

  it("renders loading skeleton when isLoading is true", () => {
    mockState = { ...baseMock, data: undefined, isLoading: true };
    render(<ProductsSection />);
    expect(screen.getByTestId("product-card-skeleton-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-skeleton-2")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-1")).not.toBeInTheDocument();
  });

  it("renders error fallback when API fails", () => {
    mockState = {
      ...baseMock,
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    };
    render(<ProductsSection />);
    expect(screen.getByTestId("products-error-state")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-1")).not.toBeInTheDocument();
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
