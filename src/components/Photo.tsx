import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Clase pentru cadru (aspect, margini). Colțurile rămân drepte. */
  className?: string;
  priority?: boolean;
};

/**
 * Fotografie cu colțuri drepte. MotionController o dezvăluie cu un clip-path inset la intrarea în ecran
 * (singura animație a fotografiilor). Fără JavaScript sau cu „reduced motion”, imaginea e afișată direct.
 * Folosește-o doar după ce ai verificat cu `hasPhoto()` că fișierul există.
 */
export function Photo({ src, alt, sizes, className = "", priority }: Props) {
  return (
    <div data-photo="" className={`relative overflow-hidden bg-night ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
