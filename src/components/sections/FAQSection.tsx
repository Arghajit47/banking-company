"use client";

import { useState } from "react";
import Image from "next/image";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const ALL_FAQS: FAQ[] = [
  {
    id: 1,
    question: "How do I open an account with YourBank?",
    answer: `Opening an account with YourBank is easy. Simply visit our website and click on the "Open an Account" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.`,
  },
  {
    id: 2,
    question: "What documents do I need to provide to apply for a loan?",
    answer: `The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.`,
  },
  {
    id: 3,
    question: "How can I access my accounts online?",
    answer: `Accessing your accounts online is simple and secure. Visit our website and click on the "Login" button. Enter your username and password to access your accounts. If you haven't registered for online banking, click on the "Enroll Now" button and follow the registration process. If you need assistance, our customer support team is available to guide you.`,
  },
  {
    id: 4,
    question: "Are my transactions and personal information secure?",
    answer: `At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.`,
  },
  {
    id: 5,
    question: "How can I apply for a credit card with YourBank?",
    answer: `Applying for a YourBank credit card is straightforward. Visit our website and navigate to the credit cards section. Choose the card that best suits your needs and click "Apply Now". Complete the online application form with your personal and financial information. Our team will review your application and get back to you promptly.`,
  },
  {
    id: 6,
    question: "What should I do if I forget my online banking password?",
    answer: `If you forget your online banking password, click on the "Forgot Password" link on the login page. You will be prompted to enter your registered email address or phone number. Follow the instructions sent to you to reset your password. For security purposes, passwords are never stored in plain text. Contact support if you need further assistance.`,
  },
];

const INITIAL_VISIBLE_COUNT = 4;

export function FAQSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? ALL_FAQS : ALL_FAQS.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section
      data-testid="faq-section"
      aria-labelledby="faq-heading"
      className="w-full bg-[#1A1A1A]"
    >
      <div className="mx-auto max-w-[1920px] px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20 xl:px-12">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <h2
            id="faq-heading"
            data-testid="faq-heading"
            className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px]"
          >
            <span className="text-[#CAFF33]">Frequently</span>
            {" Asked Questions"}
          </h2>
          <p
            data-testid="faq-subheading"
            className="mt-3 text-sm leading-relaxed text-[#999999] sm:text-base"
          >
            Still you have any questions? Contact our Team via{" "}
            <a
              href="mailto:support@yourbank.com"
              className="text-[#CAFF33] underline-offset-2 hover:underline"
            >
              support@yourbank.com
            </a>
          </p>
        </div>

        {/* FAQ Grid — 2 columns on desktop, 1 on mobile */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {visibleFaqs.map((faq) => (
              <div
                key={faq.id}
                data-testid={`faq-item-${faq.id}`}
                className="rounded-2xl border border-[#262626] bg-[#1E1E1E] p-6"
              >
                <p data-testid="faq-question" className="text-base font-medium text-white">
                  {faq.question}
                </p>
                <hr data-testid="faq-separator" className="my-4 border-[#999999]/30" />
                <p data-testid="faq-answer" className="text-sm leading-relaxed text-[#999999]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          {!showAll && (
            <div
              data-testid="faq-fade-overlay"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1A1A1A] to-transparent"
            />
          )}
        </div>

        {/* Load All button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            data-testid="faq-load-all"
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-2 rounded-[82px] border border-[#CAFF33] px-8 py-4 text-sm font-medium text-[#CAFF33] transition-all hover:bg-[#CAFF33]/10 focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
          >
            {showAll ? "Show Less" : "Load All FAQ's"}
            <Image
              src="/assets/icons/icon_expand_collapse.svg"
              alt=""
              width={22}
              height={22}
              aria-hidden="true"
              className={`transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
