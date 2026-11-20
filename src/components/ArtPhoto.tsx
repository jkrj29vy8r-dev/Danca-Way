import { getImageProps } from "next/image";
import { ViewTransition } from "react";
import { sizeOf } from "@/data/images";

type Props = {
  src: string;
  /** Altă încadrare pentru telefon (sub 768 px), ex. fotografia verticală */
  mobileSrc?: string;
  alt: string;
  sizes: string;
  /** Cadrul: aspectul și marginile. Colțurile rămân drepte. */
  className?: string;
  /** Imaginea de deasupra liniei de plutire: se încarcă prima */
  priority?: boolean;
  /** Paralaxă lentă la scroll (imaginea e cu 12% mai mare decât cadrul, ca să nu se vadă marginile) */
  parallax?: boolean;
  /** Dezvăluire cu clip-path la intrarea în ecran (implicit da) */
  reveal?: boolean;
  /** Numele pentru View Transitions: aceeași fotografie pe două pagini se mută dintr-una în alta */
  transitionName?: string;
  /** Unde stă subiectul în cadru (object-position), ex. "60% 50%" */
  position?: string;
};

/**
 * Fotografie responsivă: <picture> cu sursă separată pentru telefon (art direction), srcset generat de next/image,
 * spațiul rezervat de cadru (fără layout shift). Fără JavaScript sau cu „reduced motion”: imagine statică.
 */
export function ArtPhoto({ src, mobileSrc, alt, sizes, className = "", priority, parallax, reveal = true, transitionName, position }: Props) {
  const common = { alt, sizes, quality: 75 };
  const desk = getImageProps({ ...common, src, ...sizeOf(src), ...(priority ? { fetchPriority: "high" as const, loading: "eager" as const } : {}) }).props;
  const mob = mobileSrc ? getImageProps({ ...common, src: mobileSrc, ...sizeOf(mobileSrc) }).props : null;
  // `style` din getImageProps (color: transparent) e înlocuit mai jos de stilul nostru
  const { srcSet: deskSet, ...img } = desk;

  const frame = (
    <div data-photo={reveal ? "" : undefined} className={`relative overflow-hidden bg-night ${className}`}>
      <picture>
        {mob && <source media="(max-width: 47.99rem)" srcSet={mob.srcSet} sizes={sizes} />}
        {mob && <source media="(min-width: 48rem)" srcSet={deskSet} sizes={sizes} />}
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vine din props */}
        <img
          {...img}
          srcSet={mob ? undefined : deskSet}
          data-parallax={parallax ? "" : undefined}
          className={`absolute inset-0 size-full object-cover ${parallax ? "scale-[1.12] will-change-transform" : ""}`}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
    </div>
  );

  return transitionName ? (
    <ViewTransition name={transitionName} share="morph" default="none">
      {frame}
    </ViewTransition>
  ) : (
    frame
  );
}
