import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080a0d",
          backgroundImage:
            "radial-gradient(circle at 75% 15%, rgba(201,164,91,0.25), transparent 55%), radial-gradient(circle at 10% 90%, rgba(116,215,196,0.16), transparent 50%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#b6b0a5",
          }}
        >
          AI/ML Engineer / Deep learning & ML systems
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: 0,
            color: "#f7f3ea",
          }}
        >
          <span>Production AI systems</span>
          <span>
            with measurable&nbsp;
            <span style={{ color: "#c9a45b" }}>proof.</span>
          </span>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#b6b0a5" }}>Dev Patel</div>
      </div>
    ),
    { ...size }
  );
}
