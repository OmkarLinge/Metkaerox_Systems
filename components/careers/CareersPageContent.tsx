"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Briefcase, CheckCircle2, Filter, MapPin, Send, ShieldCheck } from "lucide-react";
import { benefits, jobOpenings, type JobOpening } from "@/data/careers";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/shared/Section";
import SiteShell from "@/components/layout/SiteShell";
import { FileUpload, FormField, Input, Select, Textarea } from "@/components/shared/form";

type SubmitState = "idle" | "submitting" | "success" | "error";

const allFilter = "All";

function uniqueValues(key: keyof Pick<JobOpening, "department" | "type" | "location">) {
  return [allFilter, ...Array.from(new Set(jobOpenings.map((job) => job[key])))];
}

function JobMeta({ job }: { job: JobOpening }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {[job.department, job.type, job.mode, job.location, job.experience].map((item) => (
        <span
          key={item}
          className="rounded-full border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function JobCard({
  active,
  job,
  onSelect,
}: {
  active: boolean;
  job: JobOpening;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="block w-full text-left"
      aria-pressed={active}
    >
      <Card
        className={`p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 ${
          active ? "border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.10)]" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
              {job.department}
            </p>
            <h3 className="mt-2 text-xl font-black uppercase text-[var(--text)]">
              {job.title}
            </h3>
          </div>
          <Briefcase size={20} className="shrink-0 text-[var(--text-muted)]" />
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">
          {job.description}
        </p>
        <JobMeta job={job} />
      </Card>
    </button>
  );
}

function JobDetails({ job }: { job: JobOpening }) {
  return (
    <Card className="sticky top-28 p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
        Selected Role
      </p>
      <h2 className="mt-3 text-2xl font-black uppercase text-[var(--text)]">
        {job.title}
      </h2>
      <JobMeta job={job} />
      <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">{job.description}</p>

      <div className="mt-6 grid gap-6">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[var(--text)]">
            Responsibilities
          </h3>
          <ul className="mt-3 space-y-2">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-[var(--text-muted)]">
                <CheckCircle2 size={16} className="mt-1 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[var(--text)]">
            Requirements
          </h3>
          <ul className="mt-3 space-y-2">
            {job.requirements.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-[var(--text-muted)]">
                <CheckCircle2 size={16} className="mt-1 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button href="#apply" className="mt-7 w-full" size="lg">
        Apply For This Role
      </Button>
    </Card>
  );
}

function CareersApplicationForm({ selectedJob }: { selectedJob: JobOpening }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to submit your application.");
      }

      formRef.current?.reset();
      setState("success");
      setMessage(payload.message ?? "Application submitted successfully.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit your application.");
    }
  }

  return (
    <Card id="apply" className="p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)]">
            Application Portal
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase text-[var(--text)]">
            Apply to Metkaerox
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          <ShieldCheck size={14} />
          Secure Upload
        </span>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Full name" required>
            <Input name="name" required placeholder="Your full name" />
          </FormField>
          <FormField label="Email" required>
            <Input name="email" type="email" required placeholder="you@example.com" />
          </FormField>
          <FormField label="Phone" required>
            <Input name="phone" required placeholder="+91..." />
          </FormField>
          <FormField label="Current location" required>
            <Input name="location" required placeholder="City, country" />
          </FormField>
          <FormField label="Role" required>
            <Select name="jobId" required defaultValue={selectedJob.id}>
              {jobOpenings.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Experience" required>
            <Input name="experience" required placeholder="e.g. 3 years" />
          </FormField>
        </div>

        <FormField label="LinkedIn / portfolio">
          <Input name="portfolio" type="url" placeholder="https://..." />
        </FormField>

        <FormField label="Cover letter" required hint="Tell us why this role and Metkaerox are a good fit.">
          <Textarea name="coverLetter" required placeholder="Write your note..." />
        </FormField>

        <FormField label="Resume" required>
          <FileUpload
            name="resume"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            description="PDF, DOC, or DOCX. Maximum 5 MB."
          />
        </FormField>

        <label className="flex gap-3 text-sm leading-6 text-[var(--text-muted)]">
          <input
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-[var(--border)] bg-[var(--bg)]"
          />
          I consent to Metkaerox Systems processing my application and contacting me about relevant opportunities.
        </label>

        {message ? (
          <div
            className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
              state === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
          >
            {message}
          </div>
        ) : null}

        <Button type="submit" disabled={state === "submitting"} size="lg" className="w-full">
          <Send size={16} />
          {state === "submitting" ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Card>
  );
}

export default function CareersPageContent() {
  const [department, setDepartment] = useState(allFilter);
  const [type, setType] = useState(allFilter);
  const [location, setLocation] = useState(allFilter);
  const [selectedJobId, setSelectedJobId] = useState(jobOpenings[0]?.id ?? "");

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      return (
        (department === allFilter || job.department === department) &&
        (type === allFilter || job.type === type) &&
        (location === allFilter || job.location === location)
      );
    });
  }, [department, location, type]);

  const selectedJob =
    filteredJobs.find((job) => job.id === selectedJobId) ?? filteredJobs[0] ?? jobOpenings[0];

  return (
    <SiteShell>
      <Section className="pt-12">
        <PageHeader
          eyebrow="Careers"
          title={
            <>
              Build autonomous systems with us.
            </>
          }
          description="Join the team designing, testing, and deploying UAV platforms for defense, agriculture, industrial, and emergency-response missions."
          actions={
            <>
              <Button href="#openings" size="lg">View Openings</Button>
              <Button href="#apply" size="lg" variant="secondary">Apply Now</Button>
            </>
          }
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-5">
              <CheckCircle2 size={20} className="text-[var(--accent)]" />
              <h3 className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--text)]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="openings" className="pt-0">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--accent)]">
              <Filter size={14} />
              Open Roles
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase text-[var(--text)]">
              Careers Portal
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              Filter roles, review the full brief, and submit your application directly.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Select value={department} onChange={(event) => setDepartment(event.target.value)} aria-label="Department filter">
              {uniqueValues("department").map((item) => <option key={item}>{item}</option>)}
            </Select>
            <Select value={type} onChange={(event) => setType(event.target.value)} aria-label="Type filter">
              {uniqueValues("type").map((item) => <option key={item}>{item}</option>)}
            </Select>
            <Select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Location filter">
              {uniqueValues("location").map((item) => <option key={item}>{item}</option>)}
            </Select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)]">
          <div className="grid gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  active={selectedJob.id === job.id}
                  onSelect={() => setSelectedJobId(job.id)}
                />
              ))
            ) : (
              <EmptyState
                title="No matching roles"
                description="Try adjusting the filters or submit a general application below."
              />
            )}
          </div>
          {selectedJob ? <JobDetails job={selectedJob} /> : null}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Card className="p-6">
            <MapPin size={22} className="text-[var(--accent)]" />
            <h2 className="mt-4 text-2xl font-black uppercase text-[var(--text)]">
              Pune engineering base
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              Most roles are based around hands-on hardware, flight validation, field operations, and customer mission support from Pune.
            </p>
          </Card>
          {selectedJob ? (
            <CareersApplicationForm key={selectedJob.id} selectedJob={selectedJob} />
          ) : null}
        </div>
      </Section>
    </SiteShell>
  );
}
