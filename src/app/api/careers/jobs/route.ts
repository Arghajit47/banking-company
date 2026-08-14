import { NextResponse } from "next/server";

export interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time";
  description: string;
}

export interface JobsResponse {
  jobs: JobOpening[];
}

const JOBS: JobOpening[] = [
  {
    id: 1,
    title: "Relationship Manager",
    department: "Retail Banking",
    location: "India",
    type: "Full-Time",
    description:
      "As a Relationship Manager at YourBank, you will be responsible for developing and maintaining relationships with our valued customers. You will proactively identify their financial needs and offer tailored solutions to help them achieve their goals.",
  },
  {
    id: 2,
    title: "Risk Analyst",
    department: "Risk Management",
    location: "India",
    type: "Full-Time",
    description:
      "As a Risk Analyst at YourBank, you will play a vital role in identifying and assessing potential risks to our organization. You will analyze data, conduct risk assessments, and develop strategies to mitigate risks.",
  },
  {
    id: 3,
    title: "IT Security Specialist",
    department: "Information Technology",
    location: "India",
    type: "Full-Time",
    description:
      "As an IT Security Specialist at YourBank, you will be responsible for ensuring the security and integrity of our information systems. You will develop and implement security protocols, conduct vulnerability assessments, and respond to security incidents.",
  },
  {
    id: 4,
    title: "Financial Analyst",
    department: "Finance",
    location: "India",
    type: "Full-Time",
    description:
      "As a Financial Analyst at YourBank, you will analyze financial data, prepare reports, and support strategic decision-making. You will work closely with business units to deliver actionable insights and help drive financial performance.",
  },
  {
    id: 5,
    title: "Customer Service Representative",
    department: "Customer Experience",
    location: "India",
    type: "Full-Time",
    description:
      "As a Customer Service Representative at YourBank, you will be the first point of contact for our customers, delivering exceptional service and resolving queries efficiently. You will help build lasting relationships that enhance customer loyalty.",
  },
  {
    id: 6,
    title: "Compliance Officer",
    department: "Legal & Compliance",
    location: "India",
    type: "Full-Time",
    description:
      "As a Compliance Officer at YourBank, you will ensure the bank operates in full compliance with regulatory requirements and internal policies. You will conduct audits, identify compliance gaps, and develop mitigation strategies.",
  },
];

export async function GET(): Promise<NextResponse<JobsResponse>> {
  return NextResponse.json({ jobs: JOBS });
}
