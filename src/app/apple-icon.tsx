import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

/** apple-touch-icon (PNG 180×180), generat la build din /public/danca-way-simbol.svg. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const svg = readFileSync(path.join(process.cwd(), "public", "danca-way-simbol.svg"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF" }}>
        <img src={`data:image/svg+xml;base64,${svg.toString("base64")}`} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
