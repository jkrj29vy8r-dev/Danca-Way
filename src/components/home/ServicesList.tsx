import Link from "next/link";
import { ChevronRight } from "../icons";
import { Photo } from "../Photo";
import { mainServices, serviceById, type ServiceId } from "@/data/services";
import { hasPhoto } from "@/lib/photo";

const ORDER: ServiceId[] = ["transfer-privat", "transfer-aeroport", "inchiriere", "excursie", "pelerinaj", "grup", "eveniment", "firma"];

/** Un rând = un serviciu: titlul mare ca link, descrierea scurtă în gri, chevron subțire la dreapta. */
export function ServiceLinkList({ ids, tone = "light" }: { ids: ServiceId[]; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "border-line-dark" : "border-line";
  const muted = tone === "dark" ? "text-mist" : "text-muted";
  return (
    <ul className={`border-b ${line}`}>
      {ids.map((id) => {
        const s = serviceById(id)!;
        return (
          <li key={id} className={`border-t ${line}`}>
            <Link href={s.href} className="press group grid-12 items-center gap-y-2 py-6 lg:py-8">
              <span className="t-32 col-span-11 font-semibold transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:translate-x-2 lg:col-span-6">
                {s.title}
              </span>
              <ChevronRight className={`arrow col-span-1 justify-self-end lg:order-last ${muted}`} />
              <span className={`col-span-11 lg:col-span-5 ${muted}`}>{s.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ServicesList() {
  // Cele trei servicii principale apar cu imagine doar dacă toate trei au fotografie.
  const withImages = mainServices.every((s) => hasPhoto(s.image.src));

  return (
    <section className="section-y bg-white" aria-labelledby="servicii-title" data-bg="white">
      <div className="container-x">
        <h2 id="servicii-title" className="t-48 max-w-[22ch]" data-reveal="lines">
          Microbuz 8+1 sau autocar, cu șofer.{" "}
          <span className="text-muted">Pentru transfer, închiriere, excursie, grup sau eveniment.</span>
        </h2>

        {withImages && (
          <ul className="grid-12 mt-16 gap-y-12 lg:mt-24">
            {mainServices.map((s) => (
              <li key={s.href} className="col-span-12 md:col-span-4">
                <Link href={s.href} className="group block">
                  <Photo src={s.image.src} alt={s.image.alt} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3]" />
                  <span className="t-21 mt-4 block font-semibold">{s.title}</span>
                  <span className="mt-2 block text-muted">{s.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className={withImages ? "mt-16" : "mt-16 lg:mt-24"}>
          <ServiceLinkList ids={ORDER} />
        </div>
      </div>
    </section>
  );
}
