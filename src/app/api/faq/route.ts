import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQResponse {
  faqs: FAQ[];
  hasMore: boolean;
}

const pageSchema = z.enum(["home", "careers", "security"]);

const HOME_FAQS: FAQ[] = [
  {
    id: 1,
    question: "How do I open an account with YourBank?",
    answer:
      'Opening an account with YourBank is easy. Simply visit our website and click on the "Open an Account" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.',
  },
  {
    id: 2,
    question: "What documents do I need to provide to apply for a loan?",
    answer:
      "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.",
  },
  {
    id: 3,
    question: "How can I access my accounts online?",
    answer:
      'Accessing your accounts online is simple and secure. Visit our website and click on the "Login" button. Enter your username and password to access your accounts. If you haven\'t registered for online banking, click on the "Enroll Now" button and follow the registration process. If you need assistance, our customer support team is available to guide you.',
  },
  {
    id: 4,
    question: "Are my transactions and personal information secure?",
    answer:
      "At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.",
  },
  {
    id: 5,
    question: "How can I apply for a credit card with YourBank?",
    answer:
      'Applying for a YourBank credit card is straightforward. Visit our website and navigate to the credit cards section. Choose the card that best suits your needs and click "Apply Now". Complete the online application form with your personal and financial information. Our team will review your application and get back to you promptly.',
  },
  {
    id: 6,
    question: "What should I do if I forget my online banking password?",
    answer:
      'If you forget your online banking password, click on the "Forgot Password" link on the login page. You will be prompted to enter your registered email address or phone number. Follow the instructions sent to you to reset your password. For security purposes, passwords are never stored in plain text. Contact support if you need further assistance.',
  },
];

const CAREERS_FAQS: FAQ[] = [
  {
    id: 1,
    question: "What career opportunities are available at YourBank?",
    answer:
      "YourBank offers a wide range of career opportunities across banking operations, technology, finance, customer service, and risk management. Visit our careers page to browse current openings and apply for positions that match your skills and aspirations.",
  },
  {
    id: 2,
    question: "How do I apply for a job at YourBank?",
    answer:
      "To apply for a position at YourBank, visit our careers page, browse available roles, and submit your application online. You will need to provide your resume, a cover letter, and any other requested documents. Our recruitment team will review your application and contact you if your profile matches the role.",
  },
  {
    id: 3,
    question: "What is the interview process like at YourBank?",
    answer:
      "Our interview process typically includes an initial phone screening, followed by one or more in-person or virtual interviews with the hiring team. Depending on the role, you may also be asked to complete a skills assessment or case study. We aim to make the process transparent and respectful of your time.",
  },
  {
    id: 4,
    question: "Does YourBank offer internship or graduate programs?",
    answer:
      "Yes, YourBank offers structured internship and graduate development programs designed to give early-career candidates hands-on experience in banking and finance. These programs include mentorship, rotational assignments, and networking opportunities to accelerate your career growth.",
  },
  {
    id: 5,
    question: "What benefits does YourBank offer its employees?",
    answer:
      "YourBank provides a comprehensive benefits package including competitive salaries, health and wellness coverage, retirement savings plans, paid leave, continuous learning opportunities, and employee banking benefits. We are committed to the well-being and professional growth of all our team members.",
  },
];

const SECURITY_FAQS: FAQ[] = [
  {
    id: 1,
    question: "How does YourBank protect my personal data?",
    answer:
      "YourBank employs industry-leading security measures including 256-bit SSL encryption, multi-factor authentication, and continuous transaction monitoring to protect your personal data. Our dedicated security team regularly audits systems and applies patches to guard against emerging threats.",
  },
  {
    id: 2,
    question: "What should I do if I suspect fraudulent activity on my account?",
    answer:
      "If you notice any suspicious transactions or believe your account has been compromised, contact our 24/7 security hotline immediately at the number on the back of your card. You should also change your online banking password and enable additional authentication layers. We will investigate and take appropriate action to protect your funds.",
  },
  {
    id: 3,
    question: "Is my mobile banking app safe to use on public Wi-Fi?",
    answer:
      "We recommend avoiding public Wi-Fi for banking transactions. If you must use it, ensure you are connected via a trusted VPN. The YourBank app uses end-to-end encryption for all data transmissions, but using a secure private network adds an additional layer of protection.",
  },
  {
    id: 4,
    question: "How do I enable two-factor authentication on my account?",
    answer:
      'To enable two-factor authentication, log in to your YourBank account, navigate to Security Settings, and select "Enable Two-Factor Authentication". You can choose to receive a one-time code via SMS or an authenticator app. Follow the on-screen instructions to complete the setup.',
  },
];

const FAQ_DATA: Record<z.infer<typeof pageSchema>, FAQ[]> = {
  home: HOME_FAQS,
  careers: CAREERS_FAQS,
  security: SECURITY_FAQS,
};

export async function GET(
  req: NextRequest,
): Promise<NextResponse<FAQResponse | { error: string }>> {
  const pageParam = req.nextUrl.searchParams.get("page");
  const parsed = pageSchema.safeParse(pageParam);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid page parameter" },
      { status: 400 },
    );
  }

  const pageFaqs = FAQ_DATA[parsed.data];
  return NextResponse.json({ faqs: pageFaqs, hasMore: pageFaqs.length > 4 });
}
