import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LoginForm } from "./LoginForm";

afterEach(() => {
  cleanup();
});

describe("LoginForm", () => {
  test("renders Login heading", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-form-heading")).toBeDefined();
    expect(screen.getByTestId("login-form-heading").textContent).toBe("Login");
  });

  test("renders Welcome back! subtext", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-form-subtext").textContent).toBe("Welcome back!");
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
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(screen.getByTestId("login-email-error").textContent).toBe("Email is required");
  });

  test("shows email format error on invalid email", () => {
    render(<LoginForm />);
    const emailInput = screen.getByTestId("login-email-input");
    fireEvent.change(emailInput, { target: { value: "notanemail" } });
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(screen.getByTestId("login-email-error").textContent).toBe("Enter a valid email address");
  });

  test("shows password required error on empty password", () => {
    render(<LoginForm />);
    const emailInput = screen.getByTestId("login-email-input");
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(screen.getByTestId("login-password-error").textContent).toBe("Password is required");
  });

  test("no validation errors when all fields valid", () => {
    render(<LoginForm />);
    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);
    expect(screen.queryByTestId("login-email-error")).toBeNull();
    expect(screen.queryByTestId("login-password-error")).toBeNull();
  });

  test("password visibility toggle changes input type", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByTestId("login-password-input") as HTMLInputElement;
    expect(passwordInput.type).toBe("password");
    const toggle = screen.getByTestId("login-password-toggle");
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe("text");
  });
});
