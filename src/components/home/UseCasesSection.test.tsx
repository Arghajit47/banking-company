import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { UseCasesSection } from "./UseCasesSection";
import type { UseCasesResponse } from "@/lib/use-cases";

expect.extend(matchers);

const apiUseCasesData: UseCasesResponse = {
  useCases: [
    {
      id: 1,
      icon: "/assets/icons/icon_use_case_1.svg",
      title: "Managing Personal Finances",
      description: "Take control of your finances with our intuitive budgeting and expense tracking tools.",
      audience: "individual",
    },
    {
      id: 2,
      icon: "/assets/icons/icon_use_case_2.svg",
      title: "Saving for the Future",
      description: "Start building your nest egg with our high-yield savings accounts and investment options.",
      audience: "individual",
    },
    {
      id: 3,
      icon: "/assets/icons/icon_use_case_3.svg",
      title: "Homeownership",
      description: "Realize your dream of homeownership with our competitive mortgage rates.",
      audience: "individual",
    },
    {
      id: 4,
      icon: "/assets/icons/icon_use_case_4.svg",
      title: "Education Funding",
      description: "Invest in the future with our education savings accounts and student loan solutions.",
      audience: "individual",
    },
    {
      id: 5,
      icon: "/assets/icons/icon_use_case_5.svg",
      title: "Startups and Entrepreneurs",
      description: "Launch and scale your business with our startup-friendly banking solutions.",
      audience: "business",
    },
    {
      id: 6,
      icon: "/assets/icons/icon_use_case_6.svg",
      title: "Cash Flow Management",
      description: "Keep your business running smoothly with our working capital solutions.",
      audience: "business",
    },
    {
      id: 7,
      icon: "/assets/icons/icon_use_case_7.svg",
      title: "Business Expansion",
      description: "Fuel your growth ambitions with tailored financing options.",
      audience: "business",
    },
    {
      id: 8,
      icon: "/assets/icons/icon_use_case_8.svg",
      title: "Payment Solutions",
      description: "Streamline your payment processing with our comprehensive business payment solutions.",
      audience: "business",
    },
  ],
};

type UseCasesHookState = {
  data: UseCasesResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: UseCasesHookState = {
  data: apiUseCasesData,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let mockState: UseCasesHookState = { ...baseMock };

vi.mock("@/lib/use-cases", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/use-cases")>();
  return {
    ...actual,
    useUseCasesData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("UseCasesSection", () => {
  it("renders section heading and subheading", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-heading")).toHaveTextContent("Use Cases");
    expect(screen.getByTestId("use-cases-subheading")).toHaveTextContent(
      "At YourBank, we cater to the diverse needs of individuals and businesses alike",
    );
  });

  it("renders both row wrappers", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-row-individuals")).toBeInTheDocument();
    expect(screen.getByTestId("use-cases-row-businesses")).toBeInTheDocument();
  });

  it("renders 4 individuals cards with correct titles", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-case-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("use-case-title-1")).toHaveTextContent("Managing Personal Finances");
    expect(screen.getByTestId("use-case-title-2")).toHaveTextContent("Saving for the Future");
    expect(screen.getByTestId("use-case-title-3")).toHaveTextContent("Homeownership");
    expect(screen.getByTestId("use-case-title-4")).toHaveTextContent("Education Funding");
  });

  it("renders 4 businesses cards with correct titles", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-case-card-5")).toBeInTheDocument();
    expect(screen.getByTestId("use-case-title-5")).toHaveTextContent("Startups and Entrepreneurs");
    expect(screen.getByTestId("use-case-title-6")).toHaveTextContent("Cash Flow Management");
    expect(screen.getByTestId("use-case-title-7")).toHaveTextContent("Business Expansion");
    expect(screen.getByTestId("use-case-title-8")).toHaveTextContent("Payment Solutions");
  });

  it("renders all 8 use case icons", () => {
    render(<UseCasesSection />);
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByTestId(`use-case-icon-${i}`)).toBeInTheDocument();
    }
  });

  it("renders individuals text panel with heading and paragraph", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-individuals");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent("For Individuals");
    expect(panel).toHaveTextContent("mortgage services pave the way to homeownership");
  });

  it("renders businesses text panel with heading and paragraph", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-businesses");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent("For Business");
    expect(panel).toHaveTextContent("working capital solutions that optimize cash flow");
  });

  it("renders individuals stats correctly", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-individuals");
    expect(panel).toHaveTextContent("78%");
    expect(panel).toHaveTextContent("Secure Retirement Planning");
    expect(panel).toHaveTextContent("63%");
    expect(panel).toHaveTextContent("Manageable Debt Consolidation");
    expect(panel).toHaveTextContent("91%");
    expect(panel).toHaveTextContent("Reducing financial burdens");
  });

  it("renders businesses stats correctly", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-businesses");
    expect(panel).toHaveTextContent("65%");
    expect(panel).toHaveTextContent("Cash Flow Management");
    expect(panel).toHaveTextContent("70%");
    expect(panel).toHaveTextContent("Drive Business Expansion");
    expect(panel).toHaveTextContent("45%");
    expect(panel).toHaveTextContent("Streamline payroll processing");
  });

  it("renders Learn More buttons for both rows", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-btn-individuals")).toHaveTextContent("Learn More");
    expect(screen.getByTestId("use-cases-btn-businesses")).toHaveTextContent("Learn More");
  });

  it("renders card panels for both audiences", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-cards-panel-individuals")).toBeInTheDocument();
    expect(screen.getByTestId("use-cases-cards-panel-businesses")).toBeInTheDocument();
  });

  it("renders loading skeletons when isLoading is true", () => {
    mockState = { ...baseMock, data: undefined, isLoading: true };
    render(<UseCasesSection />);
    expect(screen.queryByTestId("use-case-card-1")).not.toBeInTheDocument();
    const panels = screen.getAllByRole("article", { hidden: true });
    expect(panels.length).toBeGreaterThanOrEqual(4);
  });

  it("renders error state when API fails", () => {
    mockState = {
      ...baseMock,
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    };
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-cards-error-individuals")).toBeInTheDocument();
    expect(screen.getByTestId("use-cases-cards-error-businesses")).toBeInTheDocument();
    expect(screen.queryByTestId("use-case-card-1")).not.toBeInTheDocument();
  });

  it("heading has lime green color class", () => {
    render(<UseCasesSection />);
    const heading = screen.getByTestId("use-cases-heading");
    expect(heading.className).toContain("text-[#CAFF33]");
  });

  // BC-160 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma desktop (21:140) is 48px; `leading-[150%]` derives the
  // 72px / 57px line boxes on its own.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<UseCasesSection />);
    const heading = screen.getByTestId("use-cases-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
  });

  it("card panels have correct dark background", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-cards-panel-individuals");
    expect(panel.className).toContain("bg-[#1C1C1C]");
    expect(panel.className).toContain("rounded-[20px]");
  });

  it("individual cards have correct dark background and border", () => {
    render(<UseCasesSection />);
    const card = screen.getByTestId("use-case-card-1");
    expect(card.className).toContain("bg-[#1A1A1A]");
    expect(card.className).toContain("border-[#262626]");
    expect(card.className).toContain("rounded-2xl");
  });
});
