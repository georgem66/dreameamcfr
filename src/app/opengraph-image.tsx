import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "TUT Colour Fun Run 2026 — Run For Change, Run For All";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fdfdf6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* decorative colour blobs */}
        <div style={{ position: "absolute", top: -70, right: -50, width: 300, height: 300, borderRadius: 9999, backgroundColor: "#ff2bd0" }} />
        <div style={{ position: "absolute", top: 90, right: 150, width: 170, height: 170, borderRadius: 9999, backgroundColor: "#ffd400" }} />
        <div style={{ position: "absolute", top: 26, right: 60, width: 120, height: 120, borderRadius: 9999, backgroundColor: "#00c2ff" }} />
        <div style={{ position: "absolute", bottom: 96, left: -60, width: 260, height: 260, borderRadius: 9999, backgroundColor: "#3fd15e" }} />
        <div style={{ position: "absolute", bottom: -50, left: 150, width: 150, height: 150, borderRadius: 9999, backgroundColor: "#8b3fe8" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 76px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: 6, color: "#1741d6" }}>
            THE TUT COLOUR FUN RUN · 2026
          </div>
          <div style={{ display: "flex", fontSize: 116, fontWeight: 900, lineHeight: 1.02, color: "#0d0d0d", marginTop: 18 }}>
            RUN FOR CHANGE,
          </div>
          <div style={{ display: "flex", fontSize: 116, fontWeight: 900, lineHeight: 1.02, color: "#1741d6" }}>
            RUN FOR ALL!
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#0d0d0d", marginTop: 30 }}>
            24 October 2026 · 09:00 · TUT Pretoria Campus
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 84,
            backgroundColor: "#e3ff00",
            color: "#0d0d0d",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 3,
            borderTop: "4px solid #0d0d0d",
          }}
        >
          #RunForChangeRunForAll
        </div>
      </div>
    ),
    { ...size },
  );
}
