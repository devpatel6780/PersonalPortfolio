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
          backgroundColor: "#0b0d12",
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
            color: "#5a5b64",
          }}
        >
          AI Engineer — Multi-agent systems &amp; retrieval
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#ededf0",
          }}
        >
          <span>I build AI systems</span>
          <span>
            that show their&nbsp;
            <span style={{ color: "#818cf8" }}>work.</span>
          </span>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#96979f" }}>Dev Patel</div>
      </div>
    ),
    { ...size }
  );
}
