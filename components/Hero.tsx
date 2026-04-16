"use client";

import { ArrowRight, PhoneCall } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import DroneModel from "./DroneModel";

import { useTheme } from "@/components/ClientLayout";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const missionImageUrl = "url('https://flymoredrone.in/uploads/1770818149_ChatGPT%20Image%20Feb%2011,%202026,%2007_23_13%20PM.png')";
  const sectionBackground = missionImageUrl;
  const tacticalOverlay = isDark
    ? "linear-gradient(to right, rgba(15, 23, 42, 0.4) 0%, transparent 60%)"
    : "linear-gradient(90deg, rgba(237, 242, 235, 0.84) 0%, rgba(237, 242, 235, 0.58) 34%, rgba(237, 242, 235, 0.18) 66%, rgba(237, 242, 235, 0.02) 100%)";
  const globalDimOverlay = isDark
    ? "rgba(0,0,0,0.1)"
    : "linear-gradient(180deg, rgba(36, 55, 72, 0.04) 0%, rgba(95, 119, 86, 0.03) 100%)";
  const sectionGlow = isDark
    ? "radial-gradient(circle at 70% 40%, rgba(var(--accent-rgb),0.06), transparent 40%)"
    : "radial-gradient(circle at 62% 42%, rgba(var(--accent-rgb),0.14), transparent 42%)";
  const sectionNoise = isDark
    ? "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)"
    : "none";
  const vignetteOverlay = "none"; // Removed irritating white section transition as requested
  const headingColor = isDark ? "#FFFFFF" : "var(--highlight)";
  const headingAccent = isDark ? "#9BE8A8" : "var(--accent)";
  const headingShadow = isDark ? "0 8px 30px rgba(0,0,0,0.8)" : "0 10px 24px rgba(237,242,235,0.45)";
  const bodyColor = isDark ? "#FFFFFF" : "var(--text)";
  const primaryButtonBackground = "linear-gradient(135deg, var(--accent), var(--highlight))";
  const primaryButtonColor = "var(--button-contrast)";
  const primaryButtonShadow = isDark
    ? "0 10px 24px rgba(var(--accent-rgb),0.15)"
    : "0 14px 28px rgba(var(--highlight-rgb),0.14), 0 8px 18px rgba(var(--accent-rgb),0.14)";
  const secondaryButtonBackground = isDark ? "transparent" : "rgba(249, 251, 247, 0.62)";
  const secondaryButtonColor = isDark ? "var(--text)" : "var(--highlight)";
  const secondaryButtonBorder = isDark
    ? "1px solid var(--border)"
    : "1px solid rgba(var(--highlight-rgb),0.16)";
  const secondaryButtonShadow = isDark ? "none" : "0 10px 24px rgba(var(--highlight-rgb),0.08)";
  const droneGlow = isDark
    ? "radial-gradient(ellipse at center, rgba(var(--accent-rgb),0.15), transparent 60%)"
    : "radial-gradient(ellipse at center, rgba(var(--accent-rgb),0.18), transparent 60%)";

  const scrollTo = (id: string) => {
    scrollToSection(id, id === "hero" ? 20 : 104);
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage: sectionBackground,
        backgroundSize: "cover",
        backgroundPosition: "center 46%",
      }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: sectionBackground, backgroundPosition: "center 46%" }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: globalDimOverlay }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: tacticalOverlay }}
      />

      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{ background: sectionGlow }}
      />
      {isDark && (
        <div 
          className="absolute inset-0 z-0 opacity-50"
          style={{ backgroundImage: sectionNoise, backgroundSize: "160px 160px" }}
        />
      )}
      <div className="relative z-10 w-full px-6 pb-12 pt-[calc(var(--nav-offset)+1.5rem)] sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto grid min-h-[calc(100svh-var(--nav-offset)-2rem)] max-w-[1380px] grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-10">
          <div className="flex max-w-4xl flex-col justify-center py-8 lg:pr-4">
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: headingAccent,
                letterSpacing: "0.2em",
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
                textShadow: isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 8px rgba(249,251,247,0.35)",
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
                fontWeight: 500,
                textShadow: isDark ? "0 2px 10px rgba(0,0,0,0.5)" : "0 2px 8px rgba(249,251,247,0.35)",
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

          <div className="relative flex min-h-[340px] items-center justify-center sm:min-h-[420px] lg:min-h-[min(72vh,760px)]">
            <div
              className="pointer-events-none absolute inset-x-[10%] inset-y-[18%] rounded-full"
              style={{
                background: droneGlow,
                filter: "blur(110px)",
                opacity: 0.52,
              }}
            />
            <div className="hero-drone-frame relative h-[340px] w-full max-w-[840px] sm:h-[420px] lg:h-[min(72vh,760px)] lg:translate-x-[5%]">
              <div className="absolute inset-0 pointer-events-none rounded-[32px] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              <div className="absolute inset-0 pointer-events-auto">
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
          </div>
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
    </section>
  );
}
