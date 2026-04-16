"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#09090b",
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ maxWidth: "720px" }}>
            <p
              style={{
                margin: 0,
                color: "#a1a1aa",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
              }}
            >
              Global Render Error
            </p>
            <h1
              style={{
                margin: "20px 0 0",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              The application hit a critical error.
            </h1>
            <p
              style={{
                margin: "20px 0 0",
                color: "#d4d4d8",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              {error.message || "An unexpected error occurred while rendering the application."}
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "28px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                padding: "14px 24px",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Retry Application
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
