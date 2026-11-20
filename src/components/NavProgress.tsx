"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Starea de încărcare la navigare: o linie subțire sus, doar dacă pagina nouă întârzie peste 150 ms
 * (paginile preîncărcate se deschid instant, fără să apară). Dispare când se schimbă adresa.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  // Navigarea s-a încheiat: ascundem linia (ajustare de stare în timpul randării, nu în efect).
  const [prev, setPrev] = useState(pathname);
  if (prev !== pathname) {
    setPrev(pathname);
    setPending(false);
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      clearTimeout(timer);
      timer = setTimeout(() => setPending(true), 150);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div aria-hidden className="nav-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden" data-on={pending ? "" : undefined}>
      <div className="h-full w-full bg-accent" />
    </div>
  );
}
