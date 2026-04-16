"use client";

import { useEffect, useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import DroneModel from "./DroneModel";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
    interest: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 2000));
    setFormState("success");
    setTimeout(() => {
      setFormState("idle");
      setForm({ name: "", email: "", organization: "", subject: "", message: "", interest: "" });
    }, 4000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      label: "Headquarters",
      value: "Pune, Maharashtra, India",
      color: "#00E5FF",
    },
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "contact@metkaeroxsystems.com",
      color: "#3B82F6",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+91 900 000 0000",
      color: "#10B981",
    },
  ];

  const interests = [
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
  ];

  const inputStyle = (field: string) => ({
    background: "var(--bg)",
    border: `1px solid ${focused === field ? "var(--accent)" : "var(--border)"}`,
    color: "var(--text)",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "1rem",
    fontWeight: 500,
    padding: "14px 18px",
    borderRadius: "8px",
    width: "100%",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: focused === field ? "0 0 0 3px rgba(var(--accent-rgb),0.08)" : "none",
  });

  return (
    <section
      id="contact"
      className={`relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden section-reveal ${inView ? "visible" : ""}`}
      style={{ backgroundColor: "var(--bg)" }}
      ref={ref}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(var(--accent-rgb),0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            START YOUR <span style={{ color: "var(--accent)" }}>MISSION</span>
          </h2>
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Ready to integrate advanced drone technology into your operations? Our team of specialists is standing by to design your perfect aerial solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left panel — contact info + visual */}
          <div
            className="lg:col-span-2 flex flex-col gap-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
              {/* Center Staged 3D Drone Display */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  minHeight: "410px",
                  boxShadow: "0 14px 36px rgba(0,0,0,0.04)",
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-x-[10%] bottom-[14%] h-14 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(var(--accent-rgb),0.12) 0%, rgba(var(--accent-rgb),0) 72%)",
                    filter: "blur(14px)",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <DroneModel 
                      modelPath="/models/drone.glb"
                      scale={5.5}
                      position={[0, -0.3, 0]}
                      rotationSpeed={0.003}
                      enableAutoRotate={true}
                      floatIntensity={0.3}
                      cameraPosition={[0, 1, 4]}
                      fov={40}
                      environmentPreset="studio"
                      enableControls={true}
                      enableZoom={true}
                      minDistance={2}
                      maxDistance={8}
                    />
                </div>

                {/* Scan line effect */}
                <div
                  className="absolute left-0 right-0 h-px pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                    opacity: 0.16,
                    animation: "scanLine 4s ease-in-out infinite",
                  }}
                />

                {/* Corner marks */}
                {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-6 h-6`}
                    style={{
                      borderTop: i < 2 ? "2px solid var(--accent)" : "none",
                      borderBottom: i >= 2 ? "2px solid var(--accent)" : "none",
                      borderLeft: i % 2 === 0 ? "2px solid var(--accent)" : "none",
                      borderRight: i % 2 === 1 ? "2px solid var(--accent)" : "none",
                      opacity: 0.3,
                    }}
                  />
                ))}
              </div>



            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `1px solid ${info.color}44`,
                      backgroundColor: `${info.color}11`,
                      color: info.color,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      {info.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--text)",
                        marginTop: "2px",
                      }}
                    >
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "var(--text-muted)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                FOLLOW US
              </p>
              <div className="flex gap-3">
                {["LinkedIn", "Twitter", "YouTube", "Instagram"].map((platform) => (
                  <button
                    key={platform}
                    className="px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 btn-interaction"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                    }}
                  >
                    {platform.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div
            className="lg:col-span-3"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            <div
              className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                }}
              />

              {/* Success state */}
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      border: "2px solid #10B981",
                      backgroundColor: "rgba(16,185,129,0.1)",
                    }}
                  >
                    <CheckCircle size={36} style={{ color: "#10B981" }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "#10B981",
                        marginBottom: "8px",
                      }}
                    >
                      MISSION INITIATED
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "1rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      Your message has been transmitted successfully. Our team will establish contact within 24 hours.
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "rgba(16,185,129,0.6)",
                    }}
                  >
                    TRANSMISSION CONFIRMED — REF#FM{Date.now().toString().slice(-6)}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3
                    className="mb-6"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "var(--text)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    SEND A MESSAGE
                  </h3>

                  {/* Row 1 */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          color: "var(--text-muted)",
                        }}
                      >
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your full name"
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          color: "var(--text-muted)",
                        }}
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          color: "var(--text-muted)",
                        }}
                      >
                        ORGANIZATION
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        onFocus={() => setFocused("organization")}
                        onBlur={() => setFocused(null)}
                        placeholder="Company / Agency"
                        style={inputStyle("organization")}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          color: "var(--text-muted)",
                        }}
                      >
                        AREA OF INTEREST
                      </label>
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        onFocus={() => setFocused("interest")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle("interest"),
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select a product...</option>
                        {interests.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <label
                      className="block mb-2"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        color: "var(--text-muted)",
                      }}
                    >
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      placeholder="Brief description of your inquiry"
                      style={inputStyle("subject")}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label
                      className="block mb-2"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        color: "var(--text-muted)",
                      }}
                    >
                      MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Describe your project requirements, use case, or inquiry in detail..."
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: "140px",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-lg font-bold transition-all duration-300 btn-interaction"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      background:
                        formState === "sending"
                          ? "rgba(var(--accent-rgb),0.3)"
                          : "linear-gradient(135deg, var(--accent), var(--highlight))",
                      color: formState === "sending" ? "var(--text-muted)" : "var(--button-contrast)",
                      cursor: formState === "sending" ? "not-allowed" : "pointer",
                      boxShadow: formState !== "sending" ? "0 0 30px rgba(var(--accent-rgb),0.2)" : "none",
                    }}
                  >
                    {formState === "sending" ? (
                      <>
                        <div
                          className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                          style={{ borderColor: "rgba(var(--accent-rgb),0.5)", borderTopColor: "transparent" }}
                        />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        SEND MESSAGE
                      </>
                    )}
                  </button>

                  <p
                    className="mt-4 text-center"
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "var(--text-muted)",
                    }}
                  >
                    ENCRYPTED · SECURE · RESPONSE WITHIN 24 HOURS
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blip {
          0%, 100% { opacity: 1; r: 3; }
          50% { opacity: 0.3; r: 1; }
        }
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { top: 100%; opacity: 0; }
        }
      `,
        }}
      />
    </section>
  );
}
