import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Danca Way — curse Neamț – București, Otopeni, Constanța";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logo = readFileSync(path.join(process.cwd(), "public", "danca-way-logo-alb.svg"));
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
          background: "#0B1426",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} alt="" height={72} width={321} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 600, lineHeight: 1, letterSpacing: -3 }}>Din Neamț la București.</div>
          <div style={{ fontSize: 80, fontWeight: 600, lineHeight: 1, letterSpacing: -3, color: "rgba(255,255,255,0.64)" }}>Din Otopeni, acasă.</div>
          <div style={{ marginTop: 32, fontSize: 30, color: "rgba(255,255,255,0.64)" }}>
            Târgu Neamț 05:00 și 09:00 · Otopeni 12:00 și 16:00 · Roman – Constanța 07:00
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: 1, background: "rgba(255,255,255,0.12)" }} />
      </div>
    ),
    size,
  );
}
