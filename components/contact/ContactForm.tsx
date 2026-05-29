"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { FormInput, FormSelect, FormTextarea } from "./FormFields";

type FormStatus = "idle" | "sending" | "success";

const interestOptions = [
  "Surveillance Drones",
  "Agriculture Drones",
  "Payload / Delivery",
  "Fire Fighting",
  "Heavy Lift",
  "Nano / Micro Drones",
  "Tethered Systems",
  "Custom Solution",
  "Technology Licensing",
  "Partnership / Distributorship",
].map((interest) => ({ label: interest, value: interest }));

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [reference, setReference] = useState("FM000000");
  const formRef = useRef<HTMLFormElement>(null);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 900);
    });

    setReference(`FM${Math.floor(100000 + Math.random() * 900000)}`);
    setStatus("success");
    formRef.current?.reset();

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-title"
      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 shadow-[0_18px_48px_rgba(var(--shadow-rgb),0.08)] sm:p-8"
    >
      <div className="relative">
        <div className="absolute -left-6 -right-6 -top-6 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent sm:-left-8 sm:-right-8 sm:-top-8" />

        {status === "success" ? (
          <div className="flex min-h-[520px] flex-col items-center justify-center gap-6 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            <div>
              <h2
                id="contact-form-title"
                className="font-display text-xl font-black uppercase tracking-[0.14em] text-emerald-500"
              >
                Mission Initiated
              </h2>
              <p
                className="mx-auto mt-3 max-w-md text-base leading-7 text-[var(--text-muted)]"
                style={{ fontFamily: "var(--site-font)" }}
              >
                Your message has been transmitted successfully. Our team will
                establish contact within 24 hours.
              </p>
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-emerald-500/70">
              Transmission Confirmed - Ref#{reference}
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <h2
              id="contact-form-title"
              className="mb-6 font-display text-base font-black uppercase tracking-[0.12em] text-[var(--text)]"
            >
              Send A Message
            </h2>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <FormInput
                label="Full Name"
                name="name"
                placeholder="Your full name"
                required
                type="text"
              />
              <FormInput
                label="Email Address"
                name="email"
                placeholder="your@email.com"
                required
                type="email"
              />
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <FormInput
                label="Organization"
                name="organization"
                placeholder="Company / Agency"
                type="text"
              />
              <FormSelect
                label="Area Of Interest"
                name="interest"
                options={interestOptions}
                placeholder="Select a product..."
              />
            </div>

            <div className="mb-4">
              <FormInput
                label="Subject"
                name="subject"
                placeholder="Brief description of your inquiry"
                required
                type="text"
              />
            </div>

            <div className="mb-6">
              <FormTextarea
                label="Message"
                name="message"
                placeholder="Describe your project requirements, use case, or inquiry in detail..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-interaction flex w-full items-center justify-center gap-3 rounded-lg px-5 py-4 font-display text-xs font-bold uppercase tracking-[0.14em]"
              style={{
                background:
                  status === "sending"
                    ? "rgba(var(--accent-rgb),0.3)"
                    : "linear-gradient(135deg, var(--accent), var(--highlight))",
                color:
                  status === "sending"
                    ? "var(--text-muted)"
                    : "var(--button-contrast)",
                boxShadow:
                  status === "sending"
                    ? "none"
                    : "0 0 30px rgba(var(--accent-rgb),0.2)",
              }}
            >
              {status === "sending" ? (
                "Transmitting..."
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            <p className="mt-4 text-center font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Encrypted - Secure - Response Within 24 Hours
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
