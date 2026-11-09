import { PageHero } from "./PageHero";

type Props = { title: string; updated: string; children: React.ReactNode };

/** Pagină legală: titlu, data actualizării și text lizibil (max. ~70 de caractere pe rând). */
export function LegalPage({ title, updated, children }: Props) {
  return (
    <>
      <PageHero eyebrow="Informații legale" title={title} intro={<p>Ultima actualizare: {updated}</p>} compact />
      <section className="section-y bg-white" data-bg="white">
        <div className="container-x">
          <div className="legal max-w-3xl">{children}</div>
        </div>
      </section>
    </>
  );
}
