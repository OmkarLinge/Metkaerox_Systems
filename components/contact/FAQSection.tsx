const faqs = [
  {
    question: "What information should I include in a project inquiry?",
    answer:
      "Share your use case, operating location, expected payload, range or endurance needs, timeline, and any compliance constraints. A short brief is enough for the first review.",
  },
  {
    question: "Can Metkaerox support custom UAV development?",
    answer:
      "Yes. The team can evaluate custom payload integration, autonomy requirements, tethered systems, fleet operations, and special-purpose airframe adaptations.",
  },
  {
    question: "Do you provide product demos or field trials?",
    answer:
      "Demo availability depends on product type, location, and mission profile. Submit the form with your preferred timeline and our team will coordinate the next step.",
  },
  {
    question: "Which industries do you currently serve?",
    answer:
      "Metkaerox supports defense, surveillance, agriculture, firefighting, payload delivery, infrastructure inspection, and industrial monitoring requirements.",
  },
];

export default function FAQSection() {
  return (
    <section
      className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--accent)]">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-[var(--text)] sm:text-4xl">
            Before you transmit.
          </h2>
          <p
            className="mt-4 text-base leading-7 text-[var(--text-muted)]"
            style={{ fontFamily: "var(--site-font)" }}
          >
            A few quick answers to help your message reach the right technical
            desk faster.
          </p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5"
            >
              <summary className="cursor-pointer list-none font-display text-sm font-black uppercase tracking-[0.1em] text-[var(--text)] marker:hidden">
                <span className="flex items-center justify-between gap-5">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)]">
                    +
                  </span>
                </span>
              </summary>
              <p
                className="mt-4 text-base leading-7 text-[var(--text-muted)]"
                style={{ fontFamily: "var(--site-font)" }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
