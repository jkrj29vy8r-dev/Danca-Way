"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * `true` cât timp pe ecran e o zonă care are deja telefonul și WhatsApp-ul (formularul de ofertă, subsolul:
 * marcate cu `data-contact-zone`) sau cât timp se scrie într-un câmp. Atunci butoanele fixe de contact se ascund,
 * ca să nu acopere textul sau tastatura.
 */
export function useContactZone() {
  const pathname = usePathname();
  const [inZone, setInZone] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const zones = document.querySelectorAll("[data-contact-zone]");
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setInZone(visible.size > 0);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    zones.forEach((z) => io.observe(z));
    return () => {
      io.disconnect();
      setInZone(false);
    };
  }, [pathname]);

  useEffect(() => {
    const field = (t: EventTarget | null) => t instanceof HTMLElement && t.matches("input, textarea, select");
    const on = (e: FocusEvent) => field(e.target) && setTyping(true);
    const off = (e: FocusEvent) => field(e.target) && setTyping(false);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => {
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", off);
    };
  }, []);

  return inZone || typing;
}
