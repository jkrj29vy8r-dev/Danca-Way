import { WordsReveal } from "../WordsReveal";

export function Statement() {
  return (
    <section className="section-y bg-white" aria-labelledby="statement-title" data-bg="white">
      <div className="container-x">
        <h2 id="statement-title" className="eyebrow text-muted">
          Neamț · București · Otopeni · Constanța
        </h2>
        <WordsReveal
          className="display-md mt-8 max-w-5xl text-ink"
          text="Legăm Neamțul de București, de Aeroportul Otopeni și de Constanța. Autocarul pleacă din Târgu Neamț la 05:00 și 09:00, de la Otopeni te luăm spre casă la 12:00 și 16:00, iar din Constanța la 15:30."
        />
      </div>
    </section>
  );
}
