import { ViewTransition } from "react";

/**
 * Șablonul se montează din nou la fiecare navigare: pagina veche iese, cea nouă intră (View Transitions API).
 * Elementele cu nume comun (ex. fotografia autocarului) se mută între pagini. Fără suport: navigare instantanee.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
