import { WordsReveal } from "../WordsReveal";

export function Statement() {
  return (
    <section className="section-y bg-white" aria-labelledby="statement-title">
      <div className="container-x">
        <h2 id="statement-title" className="eyebrow text-muted">
          Despre noi
        </h2>
        <WordsReveal
          className="display-md mt-8 max-w-5xl text-ink"
          text="Un drum bun nu înseamnă doar să ajungi. Înseamnă un șofer care te așteaptă, un microbuz curat și cald, un telefon la care răspunde un om și o echipă care știe fiecare kilometru dintre Târgu Neamț și București."
        />
      </div>
    </section>
  );
}
