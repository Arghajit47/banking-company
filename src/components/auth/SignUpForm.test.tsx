import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi, beforeEach } from "vitest";
import { SignUpForm } from "./SignUpForm";

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

describe("SignUpForm", () => {
  test("renders Sign Up heading", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-form-heading").textContent).toBe("Sign Up");
  });

  test("renders Join our community today! subtext", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-form-subtext").textContent).toBe(
      "Join our community today! Create an account to unlock exclusive features and personalized experiences.",
    );
  });

  test("renders name input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-name-input")).toBeDefined();
  });

  test("renders email input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-email-input")).toBeDefined();
  });

  test("renders password input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-password-input")).toBeDefined();
  });

  test("renders confirm password input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-confirm-password-input")).toBeDefined();
  });

  test("renders Sign Up submit button", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-submit-button").textContent).toBe("Sign Up");
  });

  test("renders Login secondary button", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-login-button").textContent).toBe("Login");
  });

  test("renders OR divider", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-or-divider")).toBeDefined();
  });

  test("renders social login buttons", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("signup-social-buttons")).toBeDefined();
  });

  test("shows name required error on empty submit", () => {
    render(<SignUpForm />);
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(screen.getByTestId("signup-name-error").textContent).toBe("Name is required");
  });

  test("shows email required error when name present but email empty", () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(screen.getByTestId("signup-email-error").textContent).toBe("Email is required");
  });

  test("shows email format error on invalid email", () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "notanemail" } });
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(screen.getByTestId("signup-email-error").textContent).toBe("Enter a valid email address");
  });

  test("shows password required error on empty password", () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "john@example.com" } });
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(screen.getByTestId("signup-password-error").textContent).toBe("Password is required");
  });

  test("shows password mismatch error when passwords differ", () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("signup-password-input"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("signup-confirm-password-input"), { target: { value: "different" } });
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(screen.getByTestId("signup-confirm-password-error").textContent).toBe("Passwords do not match");
  });

  test("no validation errors when all fields valid and passwords match", () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("signup-password-input"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("signup-confirm-password-input"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByTestId("signup-form"));
    expect(screen.queryByTestId("signup-name-error")).toBeNull();
    expect(screen.queryByTestId("signup-email-error")).toBeNull();
    expect(screen.queryByTestId("signup-password-error")).toBeNull();
    expect(screen.queryByTestId("signup-confirm-password-error")).toBeNull();
  });

  test("confirm password visibility toggle changes input type", () => {
    render(<SignUpForm />);
    const confirmInput = screen.getByTestId("signup-confirm-password-input") as HTMLInputElement;
    expect(confirmInput.type).toBe("password");
    fireEvent.click(screen.getByTestId("signup-password-toggle"));
    expect(confirmInput.type).toBe("text");
  });

  test("shows api error banner on failed signup", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ success: false, error: "Passwords do not match" }),
    } as Response);

    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("signup-password-input"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("signup-confirm-password-input"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByTestId("signup-form"));

    await waitFor(() => {
      expect(screen.getByTestId("signup-api-error")).toBeDefined();
    });
  });

  test("shows success message on successful signup", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ success: true, userId: "mock-user-id" }),
    } as Response);

    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("signup-password-input"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("signup-confirm-password-input"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByTestId("signup-form"));

    await waitFor(() => {
      expect(screen.getByTestId("signup-success-message")).toBeDefined();
    });
  });

  test("calls signup API with correct payload on valid submit", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ success: true, userId: "mock-user-id" }),
    } as Response);

    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId("signup-name-input"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("signup-email-input"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("signup-password-input"), { target: { value: "password123" } });
    fireEvent.change(screen.getByTestId("signup-confirm-password-input"), { target: { value: "password123" } });
    fireEvent.submit(screen.getByTestId("signup-form"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/auth/signup",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "John",
            email: "john@example.com",
            password: "password123",
            confirmPassword: "password123",
          }),
        })
      );
    });
  });
});
