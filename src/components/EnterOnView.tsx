"use client";

import { useEffect, useRef } from "react";

/**
 * Marchează cu `data-in` fiecare `.enter` din interior când intră în ecran (o singură dată); tranziția e în CSS.
 * Fără JavaScript sau cu „reduced motion”, elementele sunt vizibile de la început (regulile stau sub `.js`).
 */
export function EnterOnView({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>(".enter");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
