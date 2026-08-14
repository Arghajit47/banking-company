"use client";

import { useState } from "react";
import Image from "next/image";

const HEADING = "Login";
const SUBTEXT = "Welcome back!";
const EMAIL_PLACEHOLDER = "Enter your Email Address";
const PASSWORD_PLACEHOLDER = "Enter your Password";
const FORGOT_PASSWORD_LABEL = "Forgot Password?";
const LOGIN_BUTTON_LABEL = "Login";
const REGISTER_BUTTON_LABEL = "Sign Up";
const OR_DIVIDER_LABEL = "Or";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!email) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }
    if (!password) {
      next.password = "Password is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validate();
  }

  return (
    <div
      data-testid="login-form-card"
      className="relative overflow-hidden rounded-[20px] border border-[#262626] bg-[#1C1C1C] px-[150px] py-[100px] font-[var(--font-lexend)]"
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
          src="/assets/illustrations/abstract_design_login_illustration.svg"
          alt=""
          width={342}
          height={325}
        />
      </div>

      <div className="relative flex flex-col gap-[80px]">
        {/* Text header */}
        <div
          data-testid="login-form-header"
          className="flex flex-col items-center gap-[20px] text-center"
        >
          <h1
            data-testid="login-form-heading"
            className="text-[48px] font-semibold leading-[1.25] text-[#CAFF33]"
          >
            {HEADING}
          </h1>
          <p
            data-testid="login-form-subtext"
            className="text-[18px] leading-[1.3] text-[#BFBFBF]"
          >
            {SUBTEXT}
          </p>
        </div>

        {/* Form */}
        <form
          data-testid="login-form"
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-[40px]"
        >
          {/* Input row */}
          <div className="flex gap-[30px]">
            {/* Email input */}
            <div className="flex flex-1 flex-col gap-[8px]">
              <div
                className="flex items-center rounded-[88px] border border-[#262626] bg-[#1A1A1A] px-[24px] py-[24px]"
              >
                <input
                  data-testid="login-email-input"
                  type="email"
                  placeholder={EMAIL_PLACEHOLDER}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[18px] text-white placeholder-[#59595A] outline-none"
                  aria-label="Email Address"
                />
              </div>
              {errors.email && (
                <p data-testid="login-email-error" className="pl-[24px] text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password input */}
            <div className="flex flex-1 flex-col gap-[8px]">
              <div
                className="flex items-center gap-[10px] rounded-[88px] border border-[#262626] bg-[#1A1A1A] px-[24px] py-[24px]"
              >
                <input
                  data-testid="login-password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder={PASSWORD_PLACEHOLDER}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[18px] text-white placeholder-[#59595A] outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  data-testid="login-password-toggle"
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
              {errors.password && (
                <p data-testid="login-password-error" className="pl-[24px] text-sm text-red-400">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a
              data-testid="login-forgot-password"
              href="#"
              className="text-[16px] text-white hover:text-[#CAFF33]"
            >
              {FORGOT_PASSWORD_LABEL}
            </a>
          </div>

          {/* CTA container */}
          <div className="flex flex-col gap-[24px] px-[254px]">
            {/* Login button */}
            <button
              data-testid="login-submit-button"
              type="submit"
              className="flex w-full items-center justify-center rounded-[63px] bg-[#CAFF33] px-[20px] py-[18px] text-[18px] font-semibold text-[#262626] transition-opacity hover:opacity-90"
            >
              {LOGIN_BUTTON_LABEL}
            </button>

            {/* Sign up button */}
            <button
              data-testid="login-signup-button"
              type="button"
              className="flex w-full items-center justify-center rounded-[63px] border border-[#333333] bg-[#262626] px-[20px] py-[18px] text-[18px] font-semibold text-white transition-opacity hover:opacity-80"
            >
              {REGISTER_BUTTON_LABEL}
            </button>

            {/* OR divider + social buttons */}
            <div className="flex flex-col gap-[30px]">
              {/* Divider */}
              <div className="flex items-center gap-[20px]">
                <div className="h-px flex-1 bg-[#262626]" />
                <span
                  data-testid="login-or-divider"
                  className="text-[16px] text-[#B3B3B3]"
                >
                  {OR_DIVIDER_LABEL}
                </span>
                <div className="h-px flex-1 bg-[#262626]" />
              </div>

              {/* Social icons */}
              <div
                data-testid="login-social-buttons"
                className="flex items-center justify-center gap-[24px]"
              >
                {/* Social button 1 */}
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] p-[12px]">
                  <button
                    type="button"
                    aria-label="Continue with social account"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1C1C1C] p-[20px]"
                  >
                    <Image
                      src="/assets/icons/icon_input_3.svg"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </button>
                </div>

                {/* Social button 2 */}
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] p-[12px]">
                  <button
                    type="button"
                    aria-label="Continue with social account"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1C1C1C] p-[20px]"
                  >
                    <Image
                      src="/assets/icons/icon_input_2.svg"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </button>
                </div>

                {/* Social button 3 */}
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] p-[12px]">
                  <button
                    type="button"
                    aria-label="Continue with social account"
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#1C1C1C] p-[20px]"
                  >
                    <Image
                      src="/assets/icons/icon_input_1.svg"
                      alt=""
                      width={30}
                      height={30}
                    />
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
