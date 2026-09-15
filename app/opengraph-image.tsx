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
          backgroundColor: "#05060b",
          backgroundImage:
            "radial-gradient(circle at 75% 15%, rgba(47,224,255,0.25), transparent 55%), radial-gradient(circle at 10% 90%, rgba(176,131,255,0.18), transparent 50%)",
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
            color: "#8b96ac",
          }}
        >
          [ AI Engineer — Multi-agent systems &amp; retrieval ]
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#eaf3ff",
          }}
        >
          <span>I build AI systems</span>
          <span>
            that show their&nbsp;
            <span style={{ color: "#2fe0ff" }}>work.</span>
          </span>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#8b96ac" }}>Dev Patel</div>
      </div>
    ),
    { ...size }
  );
}
