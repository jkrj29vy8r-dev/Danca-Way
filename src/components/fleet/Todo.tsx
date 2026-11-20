/** Doar în dezvoltare: arată unde lipsește o valoare din src/config/fleet.ts */
export function Todo({ field }: { field: string }) {
  return (
    <span className="t-14 inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1 font-sans font-normal tracking-normal text-muted">
      de completat în fleet.ts ({field})
    </span>
  );
}
