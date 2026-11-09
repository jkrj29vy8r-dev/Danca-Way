import { PageHero } from "./PageHero";

type Props = { title: string; updated: string; children: React.ReactNode };

/** Pagină legală: titlu, data actualizării și text lizibil (cel mult 62 de caractere pe rând). */
export function LegalPage({ title, updated, children }: Props) {
  return (
    <>
      <PageHero eyebrow={title} title={title} intro={<p>Ultima actualizare: {updated}</p>} compact />
      <section className="section-y bg-white" data-bg="white">
        <div className="container-x grid-12">
          <div className="legal col-span-12 lg:col-span-8 lg:col-start-3">{children}</div>
        </div>
      </section>
    </>
  );
}
