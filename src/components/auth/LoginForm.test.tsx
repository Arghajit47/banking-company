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
