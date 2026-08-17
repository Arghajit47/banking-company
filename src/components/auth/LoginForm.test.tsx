import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi, beforeEach } from "vitest";
import { LoginForm } from "./LoginForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? ""} />;
  },
}));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe("LoginForm", () => {
  test("renders Login heading", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-form-heading").textContent).toBe("Login");
  });

  // BC-177 — heading size ladder. Figma "Login": desktop 67:148 = 48px @1920,
  // laptop 116:11471 = 38px @1440. `laptop:` and `desktop:` are min-width
  // breakpoints (90rem / 120rem), so a bare `laptop:text-[38px]` with no
  // `desktop:` counterpart leaks 38px all the way up to 1920.
  test("heading renders the 38px/48px size ladder across breakpoints", () => {
    render(<LoginForm />);
    const heading = screen.getByTestId("login-form-heading");
    expect(heading.className).toContain("text-[48px]");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[1.25]");
    expect(heading.className).not.toMatch(
      /(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/,
    );
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl):text-\[/);
    expect(heading.className).not.toMatch(
      /(?:sm|md|lg|xl|2xl|laptop|desktop):text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/,
    );
  });

  // BC-177 — heading font-weight must be uniform across every breakpoint.
  // Figma confirms fontWeight 500 (Medium) at desktop 67:148, laptop 116:11471
  // and mobile 116:11682. The base class was `font-semibold` (600), so every
  // width below 1440 rendered 600. A `laptop:`/`desktop:` weight variant is a
  // min-width override, so any such class would re-split the weight at 1440.
  test("heading renders font-weight 500 at every breakpoint", () => {
    render(<LoginForm />);
    const heading = screen.getByTestId("login-form-heading");
    expect(heading.className).toMatch(/(?:^|\s)font-medium(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:^|\s)font-semibold(?:\s|$)/);
    expect(heading.className).not.toMatch(
      /(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
    );
  });

  test("renders Welcome back! subtext", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-form-subtext").textContent).toBe(
      "Welcome back! Please log in to access your account.",
    );
  });

  test("renders email input", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-email-input")).toBeDefined();
  });

  test("renders password input", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-password-input")).toBeDefined();
  });

  test("renders Forgot Password? link", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-forgot-password").textContent).toBe("Forgot Password?");
  });

  test("renders Login submit button with correct label", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-submit-button").textContent).toBe("Login");
  });

  test("renders Sign Up button", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-signup-button").textContent).toBe("Sign Up");
  });

  test("renders social login buttons", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-social-buttons")).toBeDefined();
  });

  test("renders OR divider", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-or-divider")).toBeDefined();
  });

  test("shows email required error on empty submit", () => {
    render(<LoginForm />);
    fireEvent.submit(screen.getByTestId("login-form"));
    expect(screen.getByTestId("login-email-error").textContent).toBe("Email is required");
  });

  test("shows email format error on invalid email", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("login-email-input"), { target: { value: "notanemail" } });
    fireEvent.submit(screen.getByTestId("login-form"));
    expect(screen.getByTestId("login-email-error").textContent).toBe("Enter a valid email address");
  });

  test("shows password required error on empty password", () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("login-email-input"), { target: { value: "user@example.com" } });
    fireEvent.submit(screen.getByTestId("login-form"));
    expect(screen.getByTestId("login-password-error").textContent).toBe("Password is required");
  });

  test("password visibility toggle changes input type", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByTestId("login-password-input") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");
    fireEvent.click(screen.getByTestId("login-password-toggle"));
    expect(passwordInput.type).toBe("text");
  });

  test("shows api error banner on failed login", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ success: false, error: "Invalid credentials" }),
    } as Response);

    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("login-email-input"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByTestId("login-password-input"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByTestId("login-form"));

    await waitFor(() => {
      expect(screen.getByTestId("login-api-error")).toBeDefined();
    });
  });

  test("calls login API with correct payload on valid submit", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ success: true, token: "mock-token" }),
    } as Response);

    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("login-email-input"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByTestId("login-password-input"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByTestId("login-form"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/auth/login",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "user@example.com", password: "password123" }),
        })
      );
    });
  });
});
