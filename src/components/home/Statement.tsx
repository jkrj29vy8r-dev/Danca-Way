import { WordsReveal } from "../WordsReveal";

export function Statement() {
  return (
    <section className="section-y bg-white" aria-labelledby="statement-title" data-surface="light">
      <div className="container-x">
        <h2 id="statement-title" className="eyebrow text-muted">
          Ce mai facem
        </h2>
        <WordsReveal
          className="display-md mt-8 max-w-5xl text-ink"
          text="Pe lângă cursele regulate, facem transferuri private cu microbuz 8+1, închiriem microbuze cu șofer la oră sau pe zi și ducem grupuri la Agapia, Voroneț, Prislop, Brașov și la târgul de Crăciun din Budapesta."
        />
      </div>
    </section>
  );
}
