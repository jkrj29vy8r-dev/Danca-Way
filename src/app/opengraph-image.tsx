import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Danca Way — autocarul într-o piață, la răsărit; curse Neamț – București, Otopeni, Constanța";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fotografia autocarului sus, banda night cu logo-ul și titlul jos (fără gradient, fără umbre). */
export default function OpengraphImage() {
  const logo = `data:image/svg+xml;base64,${readFileSync(path.join(process.cwd(), "public", "danca-way-logo-alb.svg")).toString("base64")}`;
  const photo = `data:image/jpeg;base64,${readFileSync(path.join(process.cwd(), "src", "app", "og-autocar.jpg")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0B1426", color: "#fff", fontFamily: "sans-serif" }}>
        <img src={photo} alt="" width={1200} height={462} style={{ objectFit: "cover" }} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 64px" }}>
          <img src={logo} alt="" height={56} width={250} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.5 }}>Din Neamț la București.</div>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.5, color: "rgba(255,255,255,0.64)" }}>Din Otopeni, acasă.</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
