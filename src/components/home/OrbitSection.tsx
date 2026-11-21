import Link from "next/link";
import { ArrowRight } from "../icons";
import { Orbit, type Caption } from "./Orbit";
import { coach } from "@/config/fleet";

/**
 * Autocarul din toate unghiurile, la derulare (în locul fotografiilor de telefon).
 * Legendele: textele cerute; sub ele doar valori din src/config/fleet.ts, și doar dacă sunt completate (fără numere inventate).
 */
export function OrbitSection() {
  const join = (xs: (string | null | undefined)[]) => xs.filter(Boolean).join(" · ") || null;
  const captions: Caption[] = [
    { title: coach.name, note: join([coach.category, coach.euro]) },
    { title: "Spațiu pentru tine și bagajele tale", note: join([coach.seats ? `${coach.seats} locuri pentru pasageri` : null, coach.luggage]) },
    { title: "Plecări zilnice spre București și Otopeni" },
  ];
  return (
    <Orbit captions={captions} still={{ desktop: "/media/orbita-16x9/1600/000.webp", mobil: "/media/orbita-9x16/800/000.webp" }}>
      <div className="orbit-link container-x">
        <Link href={`/flota/${coach.id}`} className="link-arrow t-14 text-white">
          <span className="link-u">Fișa tehnică {coach.name}</span> <ArrowRight size={16} />
        </Link>
      </div>
    </Orbit>
  );
}
