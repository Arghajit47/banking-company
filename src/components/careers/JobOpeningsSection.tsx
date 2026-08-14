import Image from "next/image";

const SECTION_HEADING = "Job Openings";
const SECTION_BODY =
  "Explore exciting job openings at YourBank, where we value talent, innovation, and a passion for customer service. Join our team and be part of shaping a brighter future in the banking industry.";

interface JobOpening {
  id: number;
  title: string;
  location: string;
  department: string;
  about: string;
  requirements: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: 1,
    title: "Relationship Manager",
    location: "India",
    department: "Retail Banking",
    about:
      "As a Relationship Manager at YourBank, you will be responsible for developing and maintaining relationships with our valued customers. You will proactively identify their financial needs and offer tailored solutions to help them achieve their goals. We are seeking individuals with excellent communication skills, a strong sales acumen, and a passion for delivering exceptional customer service.",
    requirements: [
      "Bachelor's degree in Business, Finance, or a related field",
      "Minimum of 3 years of experience in sales or relationship management in the banking industry",
      "Proven track record of meeting and exceeding sales targets",
      "Excellent interpersonal and negotiation skills",
      "Strong knowledge of banking products and services",
    ],
  },
  {
    id: 2,
    title: "Risk Analyst",
    location: "India",
    department: "Risk Management",
    about:
      "As a Risk Analyst at YourBank, you will play a vital role in identifying and assessing potential risks to our organization. You will analyze data, conduct risk assessments, and develop strategies to mitigate risks. We are looking for detail-oriented individuals with strong analytical skills and a solid understanding of risk management principles.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or a related field",
      "Minimum of 2 years of experience in risk management or a similar role",
      "Proficiency in risk analysis tools and techniques",
      "Strong analytical and problem-solving skills",
      "Knowledge of regulatory requirements and industry best practices",
    ],
  },
  {
    id: 3,
    title: "IT Security Specialist",
    location: "India",
    department: "Information Technology",
    about:
      "As an IT Security Specialist at YourBank, you will be responsible for ensuring the security and integrity of our information systems. You will develop and implement security protocols, conduct vulnerability assessments, and respond to security incidents. We are seeking individuals with a strong technical background, knowledge of cybersecurity best practices, and a commitment to maintaining the confidentiality of customer data.",
    requirements: [
      "Bachelor's degree in Computer Science, Information Security, or a related field",
      "Minimum of 5 years of experience in IT security or a similar role",
      "In-depth knowledge of network security protocols and technologies",
      "Familiarity with regulatory frameworks such as PCI DSS and GDPR",
      "Professional certifications such as CISSP or CISM are preferred",
    ],
  },
];

function JobCard({ job, index }: { job: JobOpening; index: number }) {
  return (
    <article
      data-testid={`job-card-${index}`}
      className="flex flex-col gap-[50px] rounded-[16px] border border-[#262626] bg-[#1C1C1C] p-[30px] md:p-[50px]"
    >
      <div className="flex flex-col gap-[20px]">
        <h3
          data-testid={`job-card-title-${index}`}
          className="text-[24px] font-semibold leading-[150%] text-white md:text-[30px]"
        >
          {job.title}
        </h3>
        <div className="flex flex-wrap gap-[10px]">
          <span
            data-testid={`job-card-location-${index}`}
            className="rounded-[68px] bg-[#1A1A1A] px-[16px] py-[8px] text-[14px] text-white"
          >
            Location: {job.location}
          </span>
          <span
            data-testid={`job-card-department-${index}`}
            className="rounded-[68px] bg-[#1A1A1A] px-[16px] py-[8px] text-[14px] text-white"
          >
            Department: {job.department}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <h4
          data-testid={`job-card-about-heading-${index}`}
          className="text-[20px] font-semibold leading-[150%] text-white md:text-[24px]"
        >
          About This Job
        </h4>
        <p
          data-testid={`job-card-about-body-${index}`}
          className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
        >
          {job.about}
        </p>
      </div>

      <div className="flex flex-col gap-[20px]">
        <h4
          data-testid={`job-card-req-heading-${index}`}
          className="text-[20px] font-semibold leading-[150%] text-white md:text-[24px]"
        >
          Requirements &amp; Qualifications
        </h4>
        <ul
          data-testid={`job-card-req-list-${index}`}
          className="flex flex-col gap-[12px]"
        >
          {job.requirements.map((req, reqIdx) => (
            <li
              key={reqIdx}
              data-testid={`job-card-req-item-${index}-${reqIdx}`}
              className="flex items-center gap-[10px]"
            >
              <Image
                src="/assets/icons/icon_job_requirement.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
                className="shrink-0"
              />
              <span className="text-[14px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]">
                {req}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="mailto:careers@yourbank.com"
        data-testid={`job-card-apply-btn-${index}`}
        className="inline-flex w-fit items-center justify-center rounded-[82px] bg-[#CAFF33] px-[30px] py-[16px] text-[16px] font-medium text-black"
      >
        Apply Now
      </a>
    </article>
  );
}

export function JobOpeningsSection() {
  return (
    <section
      data-testid="job-openings-section"
      className="px-4 py-12 font-[var(--font-lexend)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="job-openings-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <h2
            data-testid="job-openings-section-heading"
            className="text-[36px] font-medium leading-[150%] text-[#CAFF33] md:text-[42px] lg:text-[48px]"
          >
            {SECTION_HEADING}
          </h2>
          <p
            data-testid="job-openings-section-paragraph"
            className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {SECTION_BODY}
          </p>
        </div>

        <div
          data-testid="job-openings-grid"
          className="grid grid-cols-1 items-start gap-[30px] md:grid-cols-2"
        >
          {JOB_OPENINGS.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
