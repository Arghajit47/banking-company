import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ValuesSection } from "./ValuesSection";
import type { CareersValuesResponse } from "@/lib/careers-values";

expect.extend(matchers);

const apiValuesData: CareersValuesResponse = {
  values: [
    {
      id: 1,
      icon: "",
      title: "Integrity",
      description:
        "We conduct ourselves with utmost honesty, transparency, and ethical behavior.",
    },
    {
      id: 2,
      icon: "",
      title: "Customer Centricity",
      description: "Our customers are at the heart of everything we do.",
    },
    {
      id: 3,
      icon: "",
      title: "Collaboration",
      description: "We foster a collaborative and inclusive work environment.",
    },
    {
      id: 4,
      icon: "",
      title: "Innovation",
      description:
        "We embrace change and constantly seek innovative solutions.",
    },
  ],
};

type ValuesHookState = {
  data: CareersValuesResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: ValuesHookState = {
  data: apiValuesData,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let mockState: ValuesHookState = { ...baseMock };

vi.mock("@/lib/careers-values", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/careers-values")>();
  return { ...actual, useCareersValuesData: () => mockState };
});

vi.mock("@/lib/use-mounted", () => ({ useMounted: () => true }));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("ValuesSection (SWR integration)", () => {
  it("renders the section with correct testid", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-section")).toBeInTheDocument();
  });

  it("renders the header area", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-section-header")).toBeInTheDocument();
  });

  it("renders heading with 'Our' and 'Values' text", () => {
    render(<ValuesSection />);
    const heading = screen.getByTestId("values-section-heading");
    expect(heading).toHaveTextContent("Our");
    expect(heading).toHaveTextContent("Values");
  });

  it("renders the section paragraph", () => {
    render(<ValuesSection />);
    const para = screen.getByTestId("values-section-paragraph");
    expect(para).toHaveTextContent("At YourBank");
  });

  it("renders the card grid", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-section-grid")).toBeInTheDocument();
  });

  it("renders 4 value cards from API data", () => {
    render(<ValuesSection />);
    for (let i = 0; i < 4; i++) {
      expect(screen.getByTestId(`values-card-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card titles from API data", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-card-title-0")).toHaveTextContent(
      "Integrity"
    );
    expect(screen.getByTestId("values-card-title-1")).toHaveTextContent(
      "Customer Centricity"
    );
    expect(screen.getByTestId("values-card-title-2")).toHaveTextContent(
      "Collaboration"
    );
    expect(screen.getByTestId("values-card-title-3")).toHaveTextContent(
      "Innovation"
    );
  });

  it("renders card body text from API data", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-card-body-0")).toHaveTextContent(
      "honesty"
    );
    expect(screen.getByTestId("values-card-body-1")).toHaveTextContent(
      "heart"
    );
    expect(screen.getByTestId("values-card-body-2")).toHaveTextContent(
      "collaborative"
    );
    expect(screen.getByTestId("values-card-body-3")).toHaveTextContent(
      "innovative"
    );
  });

  it("shows loading skeleton when isLoading=true", () => {
    mockState = { ...baseMock, data: undefined, isLoading: true };
    render(<ValuesSection />);
    const skeletons = document.querySelectorAll('[aria-hidden="true"]');
    expect(skeletons.length).toBeGreaterThan(0);
    expect(screen.queryByTestId("values-card-title-0")).toBeNull();
  });

  it("contains no light-theme class names", () => {
    const { container } = render(<ValuesSection />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/\bbg-white\b/);
    expect(html).not.toMatch(/\btext-zinc-/);
    expect(html).not.toMatch(/\btext-gray-/);
    expect(html).not.toMatch(/\btext-slate-/);
  });

  // BC-162 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma "Our Values": desktop 49:493 = 48px, laptop 113:7176 = 38px,
  // mobile 113:9573 = 28px, lineHeight 150% at every breakpoint.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<ValuesSection />);
    const heading = screen.getByTestId("values-section-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
  });

  // Line height must stay derived from `leading-[150%]`; a hardcoded per-breakpoint
  // pixel leading would desync from the font size and reintroduce BC-162.
  it("heading has no hardcoded per-breakpoint pixel line-height", () => {
    render(<ValuesSection />);
    const heading = screen.getByTestId("values-section-heading");
    expect(heading.className).not.toMatch(/laptop:leading-\[/);
    expect(heading.className).not.toMatch(/desktop:leading-\[/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-\[\d+px\]/);
  });
});
