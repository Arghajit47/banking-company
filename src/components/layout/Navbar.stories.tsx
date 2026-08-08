import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1A1A1A" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Laptop: Story = {
  parameters: {
    viewport: { defaultViewport: "laptop" },
  },
};

export const MobileClosed: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const MobileOpen: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector('[data-testid="nav-mobile-toggle"]') as HTMLButtonElement | null;
    if (toggle) {
      toggle.click();
    }
  },
};
