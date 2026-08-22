"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HEADING = "Sign Up";
const SUBTEXT = "Join our community today! Create an account to unlock exclusive features and personalized experiences.";
const NAME_PLACEHOLDER = "Enter your Name";
const EMAIL_PLACEHOLDER = "Enter your Email Address";
const PASSWORD_PLACEHOLDER = "Enter your Password";
const CONFIRM_PASSWORD_PLACEHOLDER = "Confirm your Password";
const SIGNUP_BUTTON_LABEL = "Sign Up";
const LOGIN_BUTTON_LABEL = "Login";
const OR_DIVIDER_LABEL = "Or Continue with";
const SIGNUP_API_ENDPOINT = "/api/auth/signup";
const ERROR_NETWORK = "Something went wrong. Please try again.";
const SUCCESS_MESSAGE = "Account created successfully! Welcome to YourBank.";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!name.trim()) {
      next.name = "Name is required";
    }
    if (!email) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }
    if (!password) {
      next.password = "Password is required";
    }
    if (!confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(SIGNUP_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = (await res.json()) as { success: boolean; userId?: string; error?: string };
      if (data.success) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMessage(SUCCESS_MESSAGE);
        setTimeout(() => router.push("/"), 2000);
      } else {
        setApiError(data.error ?? ERROR_NETWORK);
      }
    } catch {
      setApiError(ERROR_NETWORK);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      data-testid="signup-form-card"
      className="relative overflow-hidden rounded-[20px] border border-[#262626] bg-[#1C1C1C] px-6 py-8 font-[var(--font-lexend)] sm:px-[150px] sm:py-[100px]"
    >
      {/* Background image overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/images/background_image.png')] bg-cover opacity-30"
      />

      {/* Abstract design decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[342px]"
      >
        <Image
          src="/assets/illustrations/abstract_design_signup_illustration.svg"
          alt=""
          width={342}
          height={325}
        />
      </div>

      <div className="relative flex flex-col gap-[80px]">
        {/* Text header */}
        <div
          data-testid="signup-form-header"
          className="flex flex-col items-center gap-[20px] text-center"
        >
          <h1
            data-testid="signup-form-heading"
            className="text-[28px] font-medium leading-[1.25] text-[#CAFF33] md:text-[38px] desktop:text-[48px]"
          >
            {HEADING}
          </h1>
          <p
            data-testid="signup-form-subtext"
            className="text-[18px] leading-[1.3] text-[#BFBFBF]"
          >
            {SUBTEXT}
          </p>
        </div>

        {/* Success banner */}
        {successMessage && (
          <div
            data-testid="signup-success-message"
            role="status"
            className="rounded-[12px] border border-green-500/30 bg-green-500/10 px-[24px] py-[16px] text-sm text-green-400"
          >
            {successMessage}
          </div>
        )}

        {/* API error banner */}
        {apiError && (
          <div
            data-testid="signup-api-error"
            role="alert"
            className="rounded-[12px] border border-red-500/30 bg-red-500/10 px-[24px] py-[16px] text-sm text-red-400"
          >
            {apiError}
          </div>
        )}

        {/* Form */}
        <form
          data-testid="signup-form"
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-[40px]"
        >
          {/* Input rows container */}
          <div className="flex flex-col gap-[30px]">
            {/* Row 1: Name + Email */}
            <div className="flex flex-col gap-[30px] sm:flex-row">
              {/* Name input */}
              <div className="flex flex-1 flex-col gap-[8px]">
                <div className="flex items-center rounded-[88px] border border-[#262626] bg-[#1A1A1A] px-[24px] py-[24px]">
                  <input
                    data-testid="signup-name-input"
                    type="text"
                    placeholder={NAME_PLACEHOLDER}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-[18px] text-white placeholder-[#59595A] outline-none"
                    aria-label="Full Name"
                  />
                </div>
                {errors.name && (
                  <p data-testid="signup-name-error" className="pl-[24px] text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email input */}
              <div className="flex flex-1 flex-col gap-[8px]">
                <div className="flex items-center rounded-[88px] border border-[#262626] bg-[#1A1A1A] px-[24px] py-[24px]">
                  <input
                    data-testid="signup-email-input"
                    type="email"
                    placeholder={EMAIL_PLACEHOLDER}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-[18px] text-white placeholder-[#59595A] outline-none"
                    aria-label="Email Address"
                  />
                </div>
                {errors.email && (
                  <p data-testid="signup-email-error" className="pl-[24px] text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Password + Confirm Password */}
            <div className="flex flex-col gap-[30px] sm:flex-row">
              {/* Password input */}
              <div className="flex flex-1 flex-col gap-[8px]">
                <div className="flex items-center rounded-[88px] border border-[#262626] bg-[#1A1A1A] px-[24px] py-[24px]">
                  <input
                    data-testid="signup-password-input"
                    type="password"
                    placeholder={PASSWORD_PLACEHOLDER}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-[18px] text-white placeholder-[#59595A] outline-none"
                    aria-label="Password"
                  />
                </div>
                {errors.password && (
                  <p data-testid="signup-password-error" className="pl-[24px] text-sm text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password input */}
              <div className="flex flex-1 flex-col gap-[8px]">
                <div className="flex items-center gap-[10px] rounded-[88px] border border-[#262626] bg-[#1A1A1A] px-[24px] py-[24px]">
                  <input
                    data-testid="signup-confirm-password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 bg-transparent text-[18px] text-white placeholder-[#59595A] outline-none"
                    aria-label="Confirm Password"
                  />
                  <button
                    type="button"
                    data-testid="signup-password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="flex-shrink-0"
                  >
                    <Image
                      src="/assets/icons/icon_form_logo.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="opacity-60"
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p data-testid="signup-confirm-password-error" className="pl-[24px] text-sm text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CTA container */}
          <div className="flex flex-col gap-[24px] sm:px-[254px]">
            {/* Sign Up button */}
            <button
              data-testid="signup-submit-button"
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="flex w-full items-center justify-center rounded-[63px] bg-[#CAFF33] px-[20px] py-[18px] text-[18px] font-semibold text-[#262626] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : SIGNUP_BUTTON_LABEL}
            </button>

            {/* Login button */}
            <Link
              href="/login"
              data-testid="signup-login-button"
              className="flex w-full items-center justify-center rounded-[63px] border border-[#333333] bg-[#262626] px-[20px] py-[18px] text-[18px] font-semibold text-white transition-opacity hover:opacity-80"
            >
              {LOGIN_BUTTON_LABEL}
            </Link>

            {/* OR divider + social buttons */}
            <div className="flex flex-col gap-[30px]">
              {/* Divider */}
              <div className="flex items-center gap-[20px]">
                <div className="h-px flex-1 bg-[#262626]" />
                <span
                  data-testid="signup-or-divider"
                  className="text-[16px] text-[#B3B3B3]"
                >
                  {OR_DIVIDER_LABEL}
                </span>
                <div className="h-px flex-1 bg-[#262626]" />
              </div>

              {/* Social icons */}
              <div
                data-testid="signup-social-buttons"
                className="flex items-center justify-center gap-[24px]"
              >
                {/* Social button 1 */}
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] p-[12px]">
                  <button
                    type="button"
                    aria-label="Continue with social account"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1C1C1C] p-[20px]"
                  >
                    <Image src="/assets/icons/icon_input_3.svg" alt="" width={30} height={30} />
                  </button>
                </div>

                {/* Social button 2 */}
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] p-[12px]">
                  <button
                    type="button"
                    aria-label="Continue with social account"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1C1C1C] p-[20px]"
                  >
                    <Image src="/assets/icons/icon_input_2.svg" alt="" width={30} height={30} />
                  </button>
                </div>

                {/* Social button 3 */}
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] p-[12px]">
                  <button
                    type="button"
                    aria-label="Continue with social account"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1C1C1C] p-[20px]"
                  >
                    <Image src="/assets/icons/icon_input_1.svg" alt="" width={30} height={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
