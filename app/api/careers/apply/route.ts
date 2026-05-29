import { NextResponse } from "next/server";
import { jobOpenings } from "@/data/careers";

export const runtime = "nodejs";

const maxResumeSize = 5 * 1024 * 1024;
const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const allowedResumeExtensions = new Set([".pdf", ".doc", ".docx"]);

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isAllowedResume(file: File) {
  const fileName = file.name.toLowerCase();
  const extension = fileName.slice(fileName.lastIndexOf("."));
  return allowedResumeTypes.has(file.type) || allowedResumeExtensions.has(extension);
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Please submit the application form.");
  }

  const honeypot = getString(formData, "companyWebsite");

  if (honeypot) {
    return NextResponse.json({
      message: "Application received. Our careers team will review it shortly.",
    });
  }

  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const phone = getString(formData, "phone");
  const location = getString(formData, "location");
  const jobId = getString(formData, "jobId");
  const experience = getString(formData, "experience");
  const portfolio = getString(formData, "portfolio");
  const coverLetter = getString(formData, "coverLetter");
  const consent = getString(formData, "consent");
  const resume = formData.get("resume");

  if (!name || !email || !phone || !location || !jobId || !experience || !coverLetter || !consent) {
    return jsonError("Please complete all required fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError("Please enter a valid email address.");
  }

  const selectedJob = jobOpenings.find((job) => job.id === jobId);
  if (!selectedJob) {
    return jsonError("Please select a valid role.");
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return jsonError("Please upload your resume.");
  }

  if (resume.size > maxResumeSize) {
    return jsonError("Resume file size must be 5 MB or less.");
  }

  if (!isAllowedResume(resume)) {
    return jsonError("Resume must be a PDF, DOC, or DOCX file.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CAREERS_TO_EMAIL;
  const fromEmail = process.env.CAREERS_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return jsonError("Careers email delivery is not configured.", 503);
  }

  const resumeBuffer = Buffer.from(await resume.arrayBuffer());
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    location: escapeHtml(location),
    experience: escapeHtml(experience),
    portfolio: escapeHtml(portfolio || "Not provided"),
    coverLetter: escapeHtml(coverLetter).replace(/\n/g, "<br />"),
    role: escapeHtml(selectedJob.title),
  };

  const text = [
    `New Metkaerox careers application`,
    `Role: ${selectedJob.title}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Location: ${location}`,
    `Experience: ${experience}`,
    `Portfolio: ${portfolio || "Not provided"}`,
    "",
    "Cover letter:",
    coverLetter,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `Careers Application: ${selectedJob.title} - ${name}`,
      html: `
        <h2>New Metkaerox careers application</h2>
        <p><strong>Role:</strong> ${safe.role}</p>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Location:</strong> ${safe.location}</p>
        <p><strong>Experience:</strong> ${safe.experience}</p>
        <p><strong>LinkedIn / Portfolio:</strong> ${safe.portfolio}</p>
        <h3>Cover letter</h3>
        <p>${safe.coverLetter}</p>
      `,
      text,
      attachments: [
        {
          filename: resume.name || "resume",
          content: resumeBuffer.toString("base64"),
        },
      ],
    }),
  });

  if (!resendResponse.ok) {
    return jsonError("Unable to send application right now. Please try again later.", 502);
  }

  return NextResponse.json({
    message: "Application submitted successfully. Our careers team will review it shortly.",
  });
}
