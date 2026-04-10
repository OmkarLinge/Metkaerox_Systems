"use client";

import { useState } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import DroneModel from "./DroneModel";

interface HeroProps {
  theme: "dark" | "light";
}

export default function Hero({ theme }: HeroProps) {
  const isDark = theme === "dark";

  const sectionBackground =
    "linear-gradient(to bottom, var(--bg) 0%, var(--bg-secondary) 48%, var(--bg) 100%)";
  const sectionGlow = isDark
    ? "radial-gradient(circle at 70% 40%, rgba(var(--accent-rgb),0.06), transparent 40%)"
    : "radial-gradient(circle at 70% 40%, rgba(var(--accent-rgb),0.05), transparent 55%)";
  const sectionNoise = isDark
    ? "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)"
    : "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)";
  const vignetteOverlay = isDark
    ? "linear-gradient(to right, rgba(0,0,0,0.4), transparent 40%)"
    : "linear-gradient(to right, rgba(255,255,255,0.4), transparent 40%)";
  const headingColor = "var(--text)";
  const headingAccent = "var(--accent)";
  const headingShadow = isDark ? "0 0 24px rgba(var(--accent-rgb),0.12)" : "0 1px 0 rgba(255,255,255,0.4)";
  const bodyColor = "var(--text-muted)";
  const primaryButtonBackground = "linear-gradient(135deg, var(--accent), var(--highlight))";
  const primaryButtonColor = "var(--button-contrast)";
  const primaryButtonShadow = "0 10px 24px rgba(var(--accent-rgb),0.15)";
  const secondaryButtonBackground = "transparent";
  const secondaryButtonColor = "var(--text)";
  const secondaryButtonBorder = "1px solid var(--border)";
  const secondaryButtonShadow = "none";
  const droneGlow = "radial-gradient(ellipse at center, rgba(var(--accent-rgb),0.15), transparent 60%)";

  const scrollTo = (id: string) => {
    scrollToSection(id, id === "hero" ? 20 : 104);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: `${sectionGlow}, ${sectionBackground}, ${sectionNoise}`,
        backgroundSize: "cover, cover, 160px 160px",
        backgroundPosition: "center, center, center",
        transition: "background-image 0.6s ease, background 0.6s ease",
      }}
    >
      <div
        className="w-full pt-20 pb-10 relative z-10"
        style={{ paddingLeft: "80px", paddingRight: "80px" }}
      >
        <div className="flex items-center">
          <div className="flex-1 py-10 flex flex-col justify-center max-w-4xl">
              <div
                 style={{
                   fontFamily: "'Share Tech Mono', monospace",
                   color: headingAccent,
                   letterSpacing: "0.2em",
                   fontSize: "0.85rem",
                   marginBottom: "1.5rem",
                 }}
              >
                /// NEXT-GEN TACTICAL PLATFORMS
              </div>
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: headingColor,
                  textShadow: headingShadow,
                }}
              >
                BUILDING
                <br />
                FUTURE-READY DRONES
                <br />
                <span style={{ color: headingAccent, display: "block", marginTop: "10px" }}>FOR YOUR MISSION.</span>
              </h1>

              <p
                className="mt-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.65,
                  color: bodyColor,
                  maxWidth: "500px",
                  fontWeight: 400,
                }}
              >
                Advanced surveillance, payload, agriculture, and emergency-response
                platforms engineered for a cleaner premium landing experience.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={() => scrollTo("products")}
                  className="group inline-flex items-center gap-3 px-6 py-4 rounded-md transition-all duration-300 btn-interaction pointer-events-auto uppercase"
                  style={{
                    background: primaryButtonBackground,
                    color: primaryButtonColor,
                    boxShadow: primaryButtonShadow,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                  }}
                >
                  EXPLORE FLEET
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-md transition-all duration-300 btn-interaction pointer-events-auto uppercase"
                  style={{
                    backgroundColor: secondaryButtonBackground,
                    color: secondaryButtonColor,
                    border: secondaryButtonBorder,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    boxShadow: secondaryButtonShadow,
                  }}
                >
                  <PhoneCall size={16} />
                  CONTACT SALES
                </button>
              </div>
            </div>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none z-[5] overflow-hidden"
        style={{ top: "var(--nav-offset)" }}
      >
        <div
          style={{
            position: "absolute",
            right: "0%",
            top: "64%",
            width: "clamp(540px, 56vw, 880px)",
            height: "clamp(400px, 50vw, 640px)",
            transform: "translateY(-50%)",
            background: droneGlow,
            filter: "blur(120px)",
            opacity: 0.55,
            zIndex: 0,
          }}
        />
        <div
          className="hero-drone-image w-full lg:w-[72%] h-[100vh]"
          style={{
            position: "absolute",
            right: "0",
            top: "58%",
            transform: "translate(min(11vw, 200px), -50%)",
            maxWidth: "1320px",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          <DroneModel
            modelPath="/models/drone-2.glb"
            scale={0.031}
            position={[0, -1.0, 0]}
            playAnimations={true}
            animationMode="once"
            enableAutoRotate={false}
            floatSpeed={2}
            rotationIntensity={0.1}
            floatIntensity={0.08}
            cameraPosition={[0, 0, 11.5]}
            fov={30}
            baseRotation={[0, 0.48, 0]}
            controlsTarget={[0, -0.9, 0]}
            enablePropellerSpin
            propellerSpeed={0.6}
            propellerAxis="z"
            propellerNamePatterns={["4_l004", "4_l001", "4_l002", "4_l003"]}
            propellerTint="#3d4854"
            propellerEmissive="#D4D4D8"
            propellerEmissiveIntensity={0.2}
            propellerScale={0.9}
            lockBasePosition={false}
            hideUntilReady={false}
            animationStrategy="openThenHover"
            freezePositionTracks
            playHoverAnimation={true}
            hoverMode="y"
            openingAnimationName="Scene"
            hoverAnimationName=""
            enableControls={true}
            ambientIntensity={0.88}
            ambientColor="#ffffff"
            keyLightIntensity={1.2}
            keyLightColor="#ffffff"
            keyLightPosition={[3, 2, 4]}
            environmentPreset="city"
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: vignetteOverlay,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-drone-image {
            right: 50% !important;
            top: 58% !important;
            transform: translate(calc(-50% + min(14vw, 80px)), -50%) scale(1) !important;
            width: min(92vw, 600px) !important;
            max-width: 600px !important;
          }
        }
      `}</style>
    </section>
  );
}
