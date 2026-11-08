/**
 * Text afișat ca pe o tabelă de plecări (split-flap). MotionController întoarce cifrele
 * una câte una când textul intră în ecran. Cititoarele de ecran primesc textul întreg.
 */
export function FlapText({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span className="flap" data-flap="" aria-hidden>
        {Array.from(value).map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="flap-c">
              {ch}
            </span>
          ) : (
            <span key={i} className="flap-sep">
              {ch}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
