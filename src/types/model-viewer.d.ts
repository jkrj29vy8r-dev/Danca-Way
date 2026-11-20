import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";

/** Atributele <model-viewer> folosite pe site (https://modelviewer.dev/docs). Atributele booleene primesc "". */
type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src: string;
  alt: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "manual";
  "camera-controls"?: "";
  "disable-zoom"?: "";
  "disable-pan"?: "";
  "disable-tap"?: "";
  "interaction-prompt"?: "auto" | "none";
  "touch-action"?: "pan-y" | "pan-x" | "none";
  "camera-orbit"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "field-of-view"?: string;
  "min-field-of-view"?: string;
  "rotation-per-second"?: string;
  "auto-rotate-delay"?: string;
  "interpolation-decay"?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  exposure?: string;
  "environment-image"?: string;
  "tone-mapping"?: string;
  style?: CSSProperties & Record<`--${string}`, string>;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
