import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Danca Way — curse Neamț – București, Otopeni, Constanța";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logo = readFileSync(path.join(process.cwd(), "public", "brand", "danca-way-logo-alb.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 15%, #1c2d57 0%, #0B1426 60%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} alt="" height={64} width={281} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>Din Neamț la București.</div>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>Din Otopeni, acasă.</div>
          <div style={{ marginTop: 32, fontSize: 30, color: "#AAB3C7" }}>
            Târgu Neamț 05:00 și 09:00 · Otopeni 12:00 și 16:00 · Roman – Constanța 07:00
          </div>
        </div>
        <div style={{ display: "flex", width: 160, height: 8, borderRadius: 4, background: "#F2B705" }} />
      </div>
    ),
    size,
  );
}
