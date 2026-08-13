import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import { FeaturesSection } from "./FeaturesSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("FeaturesSection", () => {
  it("renders the section with heading and subheading", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("features-section")).toBeDefined();
    expect(screen.getByTestId("features-heading")).toBeDefined();
    expect(screen.getByTestId("features-subheading")).toBeDefined();
    expect(screen.getByText("Our Features")).toBeDefined();
    expect(
      screen.getByText(/Experience a host of powerful features/)
    ).toBeDefined();
  });

  it("renders three navigation tabs", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByTestId("features-tab-online-banking")
    ).toBeDefined();
    expect(
      screen.getByTestId("features-tab-financial-tools")
    ).toBeDefined();
    expect(
      screen.getByTestId("features-tab-customer-support")
    ).toBeDefined();
    expect(screen.getByText("Online Banking")).toBeDefined();
    expect(screen.getByText("Financial Tools")).toBeDefined();
    expect(screen.getByText("Customer Support")).toBeDefined();
  });

  it("defaults to Online Banking tab active", () => {
    render(<FeaturesSection />);
    const activeTab = screen.getByTestId("features-tab-online-banking");
    expect(activeTab.getAttribute("aria-pressed")).toBe("true");
    expect(
      screen.getByTestId("features-tab-financial-tools").getAttribute("aria-pressed")
    ).toBe("false");
    expect(
      screen.getByTestId("features-tab-customer-support").getAttribute("aria-pressed")
    ).toBe("false");
  });

  it("switches active tab on click", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    const financialTab = screen.getByTestId("features-tab-financial-tools");
    await user.click(financialTab);
    expect(financialTab.getAttribute("aria-pressed")).toBe("true");
    expect(
      screen.getByTestId("features-tab-online-banking").getAttribute("aria-pressed")
    ).toBe("false");
  });

  it("renders all 4 feature cards", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("feature-card-1")).toBeDefined();
    expect(screen.getByTestId("feature-card-2")).toBeDefined();
    expect(screen.getByTestId("feature-card-3")).toBeDefined();
    expect(screen.getByTestId("feature-card-4")).toBeDefined();
  });

  it("renders correct card titles", () => {
    render(<FeaturesSection />);
    expect(screen.getByText("24/7 Account Access")).toBeDefined();
    expect(screen.getByText("Mobile Banking App")).toBeDefined();
    expect(screen.getByText("Secure Transactions")).toBeDefined();
    expect(screen.getByText("Bill Pay and Transfers")).toBeDefined();
  });

  it("renders correct card descriptions", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByText(/Enjoy the convenience of accessing your accounts/)
    ).toBeDefined();
    expect(
      screen.getByText(/Stay connected to your finances on the go/)
    ).toBeDefined();
    expect(
      screen.getByText(/Rest assured knowing that your transactions/)
    ).toBeDefined();
    expect(
      screen.getByText(/Save time and avoid late fees/)
    ).toBeDefined();
  });

  it("renders card icons", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("feature-card-icon-1")).toBeDefined();
    expect(screen.getByTestId("feature-card-icon-2")).toBeDefined();
    expect(screen.getByTestId("feature-card-icon-3")).toBeDefined();
    expect(screen.getByTestId("feature-card-icon-4")).toBeDefined();
  });

  it("renders the cards grid container", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("features-cards-grid")).toBeDefined();
  });

  it("tabs nav has accessible label", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByRole("navigation", { name: "Feature categories" })
    ).toBeDefined();
  });
});
