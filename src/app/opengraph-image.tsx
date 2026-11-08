import { ImageResponse } from "next/og";
import { SWALLOW_BEAK, SWALLOW_PATH } from "@/components/icons";

export const alt = "Danca Way — Transport persoane din Neamț";
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
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 15%, #1c2d57 0%, #0B1426 60%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 60 64">
            <path d={SWALLOW_PATH} fill="#fff" />
            <path d={SWALLOW_BEAK} fill="#F2B705" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 1 }}>DANCA WAY</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>Din Neamț,</div>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>oriunde vrei să ajungi.</div>
          <div style={{ marginTop: 32, fontSize: 30, color: "#AAB3C7" }}>
            Curse zilnice București · Otopeni · Constanța · Transfer 8+1 · Excursii · Pelerinaje
          </div>
        </div>
        <div style={{ display: "flex", width: 160, height: 8, borderRadius: 4, background: "#F2B705" }} />
      </div>
    ),
    size,
  );
}
