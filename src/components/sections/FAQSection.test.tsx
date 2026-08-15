import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { FAQSection } from "./FAQSection";

expect.extend(matchers);

const mockUseFAQConfig = vi.fn();

vi.mock("@/lib/faq", () => ({
  useFAQConfig: (page: string) => mockUseFAQConfig(page),
}));

function baseReturn(
  data: { faqs: Array<{ id: number; question: string; answer: string }>; hasMore: boolean } | undefined,
  error: Error | null = null,
  isLoading = false
) {
  return {
    data,
    error,
    isLoading,
    mutate: vi.fn(),
    isValidating: false,
  };
}

const ALL_FAQS = [
  {
    id: 1,
    question: "How do I open an account with YourBank?",
    answer: "Opening an account with YourBank is easy. Simply visit our website and click on the Open an Account button.",
  },
  {
    id: 2,
    question: "What documents do I need to provide to apply for a loan?",
    answer: "The documents required for a loan application may vary depending on the type of loan.",
  },
  {
    id: 3,
    question: "How can I access my accounts online?",
    answer: "Accessing your accounts online is simple and secure.",
  },
  {
    id: 4,
    question: "Are my transactions and personal information secure?",
    answer: "At YourBank, we prioritize the security of your transactions and personal information.",
  },
  {
    id: 5,
    question: "How can I apply for a credit card with YourBank?",
    answer: "Applying for a YourBank credit card is straightforward.",
  },
  {
    id: 6,
    question: "What should I do if I forget my online banking password?",
    answer: "If you forget your online banking password, click on the Forgot Password link.",
  },
];

const DEFAULT_FAQS = ALL_FAQS.slice(0, 4);

afterEach(() => {
  cleanup();
  mockUseFAQConfig.mockReset();
});

describe("FAQSection", () => {
  it("renders loading skeleton when isLoading is true", () => {
    mockUseFAQConfig.mockReturnValue(baseReturn(undefined, null, true));
    render(<FAQSection />);
    expect(screen.getByTestId("faq-heading")).toBeInTheDocument();
    expect(screen.getByTestId("faq-subheading")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^faq-item-/)).toHaveLength(4);
  });

  it("renders empty state when no FAQs are returned", () => {
    mockUseFAQConfig.mockReturnValue(baseReturn({ faqs: [], hasMore: false }));
    render(<FAQSection />);
    expect(screen.getByTestId("faq-empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("faq-load-all")).not.toBeInTheDocument();
  });

  it("renders the FAQ section with API data", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
  });

  it("displays FAQ heading with Frequently and Asked Questions", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    const heading = screen.getByTestId("faq-heading");
    expect(heading).toHaveTextContent("Frequently");
    expect(heading).toHaveTextContent("Asked Questions");
  });

  // BC-157 — heading must render 38px at the laptop breakpoint
  it("heading carries the laptop 38px override matching the other section headings", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    const heading = screen.getByTestId("faq-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("laptop:leading-[48px]");
  });

  it("displays FAQ subheading", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    expect(screen.getByTestId("faq-subheading")).toHaveTextContent(
      "Still you have any questions"
    );
  });

  it("shows 4 items initially when hasMore is false", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    const items = screen.getAllByTestId(/^faq-item-/);
    expect(items).toHaveLength(4);
  });

  it("shows 4 items initially and hides load all when no more data", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    const items = screen.getAllByTestId(/^faq-item-/);
    expect(items).toHaveLength(4);
    expect(screen.queryByTestId("faq-fade-overlay")).not.toBeInTheDocument();
  });

  it("all 4 initial items show answers immediately", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: DEFAULT_FAQS, hasMore: false })
    );
    render(<FAQSection />);
    const answers = screen.getAllByTestId("faq-answer");
    expect(answers).toHaveLength(4);
  });

  it("faq-fade-overlay is present when not all shown", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: ALL_FAQS, hasMore: true })
    );
    render(<FAQSection />);
    expect(screen.getByTestId("faq-fade-overlay")).toBeInTheDocument();
  });

  it("faq-fade-overlay is absent after Load All click", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: ALL_FAQS, hasMore: true })
    );
    render(<FAQSection />);
    fireEvent.click(screen.getByTestId("faq-load-all"));
    expect(screen.queryByTestId("faq-fade-overlay")).not.toBeInTheDocument();
  });

  it("Load All FAQ button is visible when hasMore is true", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: ALL_FAQS, hasMore: true })
    );
    render(<FAQSection />);
    expect(screen.getByTestId("faq-load-all")).toBeInTheDocument();
  });

  it("Load All button shows all FAQs", () => {
    mockUseFAQConfig.mockReturnValue(
      baseReturn({ faqs: ALL_FAQS, hasMore: true })
    );
    render(<FAQSection />);
    fireEvent.click(screen.getByTestId("faq-load-all"));
    const items = screen.getAllByTestId(/^faq-item-/);
    expect(items.length).toBeGreaterThan(4);
  });
});
