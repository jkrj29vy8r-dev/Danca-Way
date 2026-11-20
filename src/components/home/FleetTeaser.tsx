import Link from "next/link";
import { ArtPhoto } from "../ArtPhoto";
import { ArrowRight } from "../icons";
import { coach } from "@/config/fleet";
import { routes } from "@/data/routes";

/** Codurile curselor regulate făcute cu autocarul (din orar) */
const coachRoutes = routes.filter((r) => r.vehicle === "Autocar").map((r) => r.code);

/**
 * Flota, pe un ecran: fotografia reală a autocarului pe toată lățimea (paralaxă lentă), numele modelului și un link
 * spre fișa tehnică a autocarului (/flota/<id>).
 */
export function FleetTeaser() {
  const photo = coach.photos[0];
  return (
    <section className="bg-night text-white" data-bg="night" aria-labelledby="flota-title">
      <Link href={`/flota/${coach.id}`} className="group block" aria-describedby="flota-more">
        <ArtPhoto
          src={photo.src}
          mobileSrc={photo.mobileSrc}
          alt={photo.alt}
          sizes="100vw"
          parallax
          position="50% 70%"
          className="aspect-[3/4] w-full sm:aspect-[16/10] lg:aspect-[21/9]"
        />
        <div className="container-x grid-12 gap-y-6 py-12 lg:py-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="label text-mist">Flota</p>
            <h2 id="flota-title" className="t-72 mt-4">
              {coach.name}.
            </h2>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
            <p className="text-mist">
              Cursele cu autocar: <span className="font-mono text-white">{coachRoutes.join(" · ")}</span>, între Neamț, Otopeni și București.
            </p>
            <span id="flota-more" className="link-arrow">
              <span className="link-u">Fișa tehnică</span> <ArrowRight />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
