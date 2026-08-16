import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { TestimonialsSection } from "./TestimonialsSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

const mockIndividualsData = {
  testimonials: [
    { id: 1, name: "Sara T", role: "Individual Customer", quote: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.", avatarUrl: null },
    { id: 2, name: "Emily G", role: "Individual Customer", quote: "I love the convenience of YourBank banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.", avatarUrl: null },
    { id: 3, name: "Michael B", role: "Individual Customer", quote: "Switching to YourBank was the best financial decision I ever made. Their zero-fee accounts and competitive interest rates have helped me save more and grow my personal wealth steadily.", avatarUrl: null },
  ],
};

const mockBusinessesData = {
  testimonials: [
    { id: 4, name: "John D", role: "Business Owner", quote: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.", avatarUrl: null },
    { id: 5, name: "Alex P", role: "Business Director", quote: "YourBank's business banking suite is exactly what our growing company needed. From multi-user account access to seamless payroll integration, every feature is designed with businesses like ours in mind.", avatarUrl: null },
    { id: 6, name: "Rachel M", role: "Business Manager", quote: "The dedicated relationship manager at YourBank truly understands our industry. They helped us restructure our credit lines and unlock better cash flow management — our business has never been more financially healthy.", avatarUrl: null },
  ],
};

vi.mock("swr", () => ({ default: vi.fn() }));
vi.mock("@/lib/use-mounted", () => ({ useMounted: vi.fn() }));

import useSWR from "swr";
import { useMounted } from "@/lib/use-mounted";

beforeEach(() => {
  vi.mocked(useMounted).mockReturnValue(true);
  vi.mocked(useSWR).mockReturnValue({ data: mockIndividualsData, isLoading: false, error: undefined } as ReturnType<typeof useSWR>);
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

  it("displays Sara T in individuals tab", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Sara T")).toBeInTheDocument();
  });

  it("displays Emily G in individuals tab", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Emily G")).toBeInTheDocument();
  });

  it("shows For Individuals tab button", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-individuals")).toBeInTheDocument();
  });

  it("shows For Businesses tab button", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-businesses")).toBeInTheDocument();
  });

  it("renders tabs inside a container with data-testid testimonials-tabs", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tabs")).toBeInTheDocument();
  });

  it("shows skeleton when loading", () => {
    vi.mocked(useSWR).mockReturnValue({ data: undefined, isLoading: true, error: undefined } as ReturnType<typeof useSWR>);
    vi.mocked(useMounted).mockReturnValue(true);
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-section")).toHaveAttribute("aria-busy", "true");
  });

  it("switching to businesses tab updates SWR call key", () => {
    render(<TestimonialsSection />);
    const bizTab = screen.getByTestId("testimonials-tab-businesses");
    fireEvent.click(bizTab);
    // After tab switch, useSWR is called with businesses tab key
    const calls = vi.mocked(useSWR).mock.calls;
    const lastCall = calls[calls.length - 1];
    expect(lastCall[0]).toContain("businesses");
  });

  it("outer cards have opacity-40 class", () => {
    render(<TestimonialsSection />);
    const card0 = screen.getByTestId("testimonials-card-0");
    const card2 = screen.getByTestId("testimonials-card-2");
    expect(card0.className).toContain("opacity-40");
    expect(card2.className).toContain("opacity-40");
  });

  it("center card does not have opacity-40 class", () => {
    render(<TestimonialsSection />);
    const card1 = screen.getByTestId("testimonials-card-1");
    expect(card1.className).not.toContain("opacity-40");
  });

  // BC-167 — monotonic heading ladder. Figma has exactly three frames for this
  // heading: 390 = 28px, 1440 = 38px, 1920 = 48px, lineHeight 150% at all three.
  // Resolved: < 768 -> 28px, 768-1919 -> 38px, >= 1920 -> 48px. `lg` is 1024 while
  // `laptop` is 1440, so an lg/laptop pair made 1280 render larger (48) than 1440 (38).
  it("heading renders the Figma 28/38/48 ladder with 150% line-height", () => {
    render(<TestimonialsSection />);
    const heading = screen.getByTestId("testimonials-heading");
    expect(heading.className).toContain("text-[28px]");
    expect(heading.className).toContain("md:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
    expect(heading.className).not.toMatch(/(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|lg|xl|2xl|laptop):text-\[/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/leading-\[\d+px\]/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-(?:tight|snug|normal|relaxed|loose)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):leading-/);
  });

  // BC-167 — the skeleton branch renders a second <h2> with the same testid;
  // it must carry the identical ladder, not drift from the loaded branch.
  it("heading renders the same 28/38/48 ladder in the loading skeleton branch", () => {
    vi.mocked(useSWR).mockReturnValue({ data: undefined, isLoading: true, error: undefined } as ReturnType<typeof useSWR>);
    render(<TestimonialsSection />);
    const heading = screen.getByTestId("testimonials-heading");
    expect(heading.className).toContain("text-[28px]");
    expect(heading.className).toContain("md:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
    expect(heading.className).not.toMatch(/(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|lg|xl|2xl|laptop):text-\[/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/leading-\[\d+px\]/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-(?:tight|snug|normal|relaxed|loose)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):leading-/);
  });

  // BC-155 QA remediation — BUG C: tabs must expose tab semantics
  it("tab container exposes role=tablist and buttons expose role=tab", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tabs")).toHaveAttribute("role", "tablist");
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("role", "tab");
    expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("role", "tab");
  });

  it("on load businesses tab is aria-selected=true and individuals is false", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("aria-selected", "false");
  });

  it("aria-selected swaps when the individuals tab is clicked", () => {
    render(<TestimonialsSection />);
    fireEvent.click(screen.getByTestId("testimonials-tab-individuals"));
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("aria-selected", "false");
  });

  it("adding tab semantics leaves the active/inactive pill colours unchanged", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-businesses").className).toContain("bg-[#CAFF33]");
    expect(screen.getByTestId("testimonials-tab-individuals").className).toContain("bg-transparent");
  });

  // BC-155 QA remediation — BUG C follow-up: complete tab-widget semantics
  it("each tab points at the tabpanel via aria-controls", () => {
    render(<TestimonialsSection />);
    const panel = screen.getByTestId("testimonials-panel");
    const panelId = panel.getAttribute("id");
    expect(panelId).toBeTruthy();
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("aria-controls", panelId as string);
    expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("aria-controls", panelId as string);
  });

  it("the panel is a tabpanel labelled by the active tab and relabels on switch", () => {
    render(<TestimonialsSection />);
    const panel = screen.getByTestId("testimonials-panel");
    expect(panel).toHaveAttribute("role", "tabpanel");
    expect(panel).toHaveAttribute(
      "aria-labelledby",
      screen.getByTestId("testimonials-tab-businesses").getAttribute("id") as string,
    );

    fireEvent.click(screen.getByTestId("testimonials-tab-individuals"));
    expect(screen.getByTestId("testimonials-panel")).toHaveAttribute(
      "aria-labelledby",
      screen.getByTestId("testimonials-tab-individuals").getAttribute("id") as string,
    );
  });

  it("roving tabindex keeps only the active tab in the tab sequence", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("tabindex", "0");
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("tabindex", "-1");

    fireEvent.click(screen.getByTestId("testimonials-tab-individuals"));
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("tabindex", "0");
    expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("tabindex", "-1");
  });

  it("ArrowLeft moves focus and activates the previous tab", () => {
    render(<TestimonialsSection />);
    const businesses = screen.getByTestId("testimonials-tab-businesses");
    businesses.focus();
    fireEvent.keyDown(businesses, { key: "ArrowLeft" });

    const individuals = screen.getByTestId("testimonials-tab-individuals");
    expect(individuals).toHaveAttribute("aria-selected", "true");
    expect(businesses).toHaveAttribute("aria-selected", "false");
    expect(individuals).toHaveFocus();
  });

  it("ArrowRight wraps from the last tab back to the first", () => {
    render(<TestimonialsSection />);
    const businesses = screen.getByTestId("testimonials-tab-businesses");
    businesses.focus();
    fireEvent.keyDown(businesses, { key: "ArrowRight" });

    const individuals = screen.getByTestId("testimonials-tab-individuals");
    expect(individuals).toHaveAttribute("aria-selected", "true");
    expect(individuals).toHaveFocus();
  });

  it("ArrowRight from the first tab activates the next one", () => {
    render(<TestimonialsSection />);
    fireEvent.click(screen.getByTestId("testimonials-tab-individuals"));

    const individuals = screen.getByTestId("testimonials-tab-individuals");
    individuals.focus();
    fireEvent.keyDown(individuals, { key: "ArrowRight" });

    const businesses = screen.getByTestId("testimonials-tab-businesses");
    expect(businesses).toHaveAttribute("aria-selected", "true");
    expect(businesses).toHaveFocus();
  });

  it("arrow-key activation also rewinds the carousel to the first testimonial", () => {
    render(<TestimonialsSection />);
    fireEvent.click(screen.getByTestId("testimonials-next"));

    const businesses = screen.getByTestId("testimonials-tab-businesses");
    fireEvent.keyDown(businesses, { key: "ArrowLeft" });

    // useSWR is mocked to always return the individuals fixture, so index 0 is Sara T
    expect(screen.getByTestId("testimonials-card-1").textContent).toContain("Sara T");
  });

  it("non-horizontal keys leave the tablist untouched", () => {
    render(<TestimonialsSection />);
    const businesses = screen.getByTestId("testimonials-tab-businesses");
    fireEvent.keyDown(businesses, { key: "ArrowDown" });
    expect(businesses).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("aria-selected", "false");
  });

  describe("loading branch", () => {
    beforeEach(() => {
      vi.mocked(useSWR).mockReturnValue({ data: undefined, isLoading: true, error: undefined } as ReturnType<typeof useSWR>);
    });

    it("retains role=tablist and role=tab while loading", () => {
      render(<TestimonialsSection />);
      expect(screen.getByTestId("testimonials-tabs")).toHaveAttribute("role", "tablist");
      expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("role", "tab");
      expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("role", "tab");
    });

    it("retains correct aria-selected values while loading", () => {
      render(<TestimonialsSection />);
      expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("aria-selected", "true");
      expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("aria-selected", "false");
    });

    it("exposes the tabpanel, aria-controls and roving tabindex while loading", () => {
      render(<TestimonialsSection />);
      const panel = screen.getByTestId("testimonials-panel");
      const panelId = panel.getAttribute("id");
      expect(panel).toHaveAttribute("role", "tabpanel");
      expect(panel).toHaveAttribute(
        "aria-labelledby",
        screen.getByTestId("testimonials-tab-businesses").getAttribute("id") as string,
      );
      expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("aria-controls", panelId as string);
      expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("aria-controls", panelId as string);
      expect(screen.getByTestId("testimonials-tab-businesses")).toHaveAttribute("tabindex", "0");
      expect(screen.getByTestId("testimonials-tab-individuals")).toHaveAttribute("tabindex", "-1");
    });

    it("supports arrow-key tab navigation while loading", () => {
      render(<TestimonialsSection />);
      const businesses = screen.getByTestId("testimonials-tab-businesses");
      businesses.focus();
      fireEvent.keyDown(businesses, { key: "ArrowLeft" });

      const individuals = screen.getByTestId("testimonials-tab-individuals");
      expect(individuals).toHaveAttribute("aria-selected", "true");
      expect(individuals).toHaveFocus();
      expect(screen.getByTestId("testimonials-panel")).toHaveAttribute(
        "aria-labelledby",
        individuals.getAttribute("id") as string,
      );
    });

    it("keeps the pill colours unchanged while loading", () => {
      render(<TestimonialsSection />);
      expect(screen.getByTestId("testimonials-tab-businesses").className).toContain("bg-[#CAFF33]");
      expect(screen.getByTestId("testimonials-tab-individuals").className).toContain("bg-transparent");
    });
  });
});
