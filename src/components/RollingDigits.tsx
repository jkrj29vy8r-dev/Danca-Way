/**
 * Cifre care se rotesc discret când se schimbă (ca o tabelă de plecări, dar fără zgomot): fiecare cifră e o bandă
 * verticală 0–9 care alunecă la valoarea nouă (doar transform, 0,5 s). Restul caracterelor rămân fixe.
 * Partea vizuală e ascunsă pentru cititoarele de ecran; textul lor vine din `label` (sau îl pune componenta-părinte).
 */
export function RollingDigits({ value, label, className = "" }: { value: string; label?: string; className?: string }) {
  return (
    <>
      {label && <span className="sr-only">{label}</span>}
      <span className={`roll ${className}`} aria-hidden>
        {Array.from(value).map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="roll-d">
              <span className="roll-strip" style={{ "--n": Number(ch) } as React.CSSProperties}>
                0123456789
              </span>
            </span>
          ) : (
            <span key={i}>{ch}</span>
          ),
        )}
      </span>
    </>
  );
}
