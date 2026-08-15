"use client";

import Image from "next/image";
import { useCareersJobsData, type JobOpening } from "@/lib/careers-jobs";
import { useMounted } from "@/lib/use-mounted";

const SECTION_HEADING = "Job Openings";
const SECTION_BODY =
  "Explore exciting job openings at YourBank, where we value talent, innovation, and a passion for customer service. Join our team and be part of shaping a brighter future in the banking industry.";

function JobOpeningsSkeleton() {
  return (
    <section
      data-testid="job-openings-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="job-openings-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <div
            data-testid="job-openings-section-heading"
            aria-hidden="true"
            className="h-12 w-1/3 animate-pulse rounded bg-[#333333]"
          />
          <div
            data-testid="job-openings-section-paragraph"
            aria-hidden="true"
            className="h-16 w-full animate-pulse rounded bg-[#333333]"
          />
        </div>
        <div
          data-testid="job-openings-grid"
          className="grid grid-cols-1 items-start gap-[30px] md:grid-cols-2"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              data-testid={`job-card-${i}`}
              aria-hidden="true"
              className="flex flex-col gap-[30px] rounded-[16px] border border-[#262626] bg-[#1C1C1C] p-[30px] md:p-[50px]"
            >
              <div className="h-8 w-2/3 animate-pulse rounded bg-[#262626]" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-[#262626]" />
              <div className="h-32 animate-pulse rounded bg-[#262626]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobCard({ job, index }: { job: JobOpening; index: number }) {
  return (
    <article
      data-testid={`job-card-${index}`}
      className="flex flex-col gap-[50px] rounded-[16px] border border-[#262626] bg-[#1C1C1C] p-[30px] md:p-[50px]"
    >
      <div className="flex flex-col gap-[20px]">
        <h3
          data-testid={`job-card-title-${index}`}
          className="text-[24px] font-semibold leading-[150%] text-white md:text-[30px] laptop:text-[24px]"
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
          {job.description}
        </p>
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
  const mounted = useMounted();
  const { data, error, isLoading } = useCareersJobsData();

  if (!mounted || isLoading || !data) {
    return <JobOpeningsSkeleton />;
  }

  return (
    <section
      data-testid="job-openings-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div className="flex flex-col gap-[80px]">
        <div
          data-testid="job-openings-section-header"
          className="flex flex-col gap-[14px] lg:pr-[300px]"
        >
          <h2
            data-testid="job-openings-section-heading"
            className="text-[36px] font-medium leading-[150%] text-[#CAFF33] md:text-[42px] lg:text-[48px] laptop:text-[38px]"
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

        {error && (
          <p className="text-sm text-red-400">
            Unable to load job openings. Please refresh.
          </p>
        )}

        <div
          data-testid="job-openings-grid"
          className="grid grid-cols-1 items-start gap-[30px] md:grid-cols-2"
        >
          {data.jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

