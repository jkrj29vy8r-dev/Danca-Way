"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Close, Menu } from "./icons";
import { Logo } from "./Logo";
import { site, telHref } from "@/config/site";
import { services } from "@/data/services";

const serviceLinks = services.filter((s) =>
  ["transfer-privat", "transfer-aeroport", "inchiriere", "grup", "eveniment", "firma"].includes(s.id),
);

const mainLinks = [
  { href: "/curse-regulate", label: "Curse regulate" },
  { href: "/excursii", label: "Excursii" },
  { href: "/pelerinaje", label: "Pelerinaje" },
  { href: "/contact", label: "Contact" },
];

/**
 * Header plin (fără sticlă mată, fără umbră): preia culoarea secțiunii de sub el (night sau white)
 * și primește o linie de 1 px după ce pagina a fost derulată. Se ascunde la scroll în jos.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  /** Fundalul de sub header: „dark” → logo alb, „light” → logo bleumarin */
  const [surface, setSurface] = useState<"dark" | "light">("dark");
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesId = useId();
  const menuId = useId();

  // „scrolled” și ascunderea la scroll în jos (doar citiri de scrollY).
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      setScrolled(y > 8);
      if (y < 160 || delta < -4) setHidden(false);
      else if (delta > 4 && !headerRef.current?.contains(document.activeElement)) setHidden(true);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isHidden = hidden && !menuOpen && !servicesOpen;

  // Panourile fixate (ex. ora din „Traseul”) stau imediat sub header, oricare ar fi starea lui.
  useEffect(() => {
    const h = headerRef.current?.offsetHeight ?? 64;
    document.documentElement.style.setProperty("--hdr", isHidden ? "0px" : `${h}px`);
  }, [isHidden]);

  // Tema: secțiunea (data-bg) care trece pe sub mijlocul headerului, urmărită cu un IntersectionObserver.
  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const setup = () => {
      io?.disconnect();
      const mid = Math.round((headerRef.current?.offsetHeight ?? 64) / 2);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            setSurface((e.target as HTMLElement).dataset.bg === "night" ? "dark" : "light");
          }
        },
        { rootMargin: `-${mid}px 0px -${window.innerHeight - mid - 1}px 0px` },
      );
      document.querySelectorAll("[data-bg]").forEach((el) => io!.observe(el));
    };
    setup();
    window.addEventListener("resize", setup);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, [pathname]);

  // Închide meniurile la navigare. (Ajustare de stare în timpul randării, nu în efect.)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Blochează scroll-ul paginii cât timp meniul mobil e deschis; Escape închide.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Închide dropdown-ul de servicii la click în afară.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [servicesOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const serviceActive = serviceLinks.some((s) => isActive(s.href));
  const theme = menuOpen ? "dark" : surface;
  const dark = theme === "dark";

  return (
    <>
      <a
        href="#continut"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 font-semibold text-night focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Sari la conținut
      </a>
      <header
        ref={headerRef}
        className={`site-header fixed inset-x-0 top-0 z-50 border-b ${
          dark ? "bg-night text-white" : "bg-white text-night"
        } ${scrolled || menuOpen ? (dark ? "border-line-dark" : "border-line") : "border-transparent"}`}
        data-theme={theme}
        data-hidden={isHidden ? "true" : undefined}
        onFocus={() => setHidden(false)}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="press relative -m-2 block shrink-0 p-2" aria-label="Danca Way — Acasă">
            <Logo variant="alb" priority alt="" className={`h-8 w-auto lg:h-10 ${dark ? "" : "invisible"}`} />
            <Logo variant="navy" alt="" className={`absolute top-2 left-2 h-8 w-auto lg:h-10 ${dark ? "invisible" : ""}`} />
          </Link>

          <nav aria-label="Navigare principală" className="hidden lg:block">
            <ul className="t-14 flex items-center gap-2">
              <li>
                <NavLink href="/curse-regulate" active={isActive("/curse-regulate")}>
                  Curse regulate
                </NavLink>
              </li>
              <li className="relative" ref={servicesRef}>
                <button
                  type="button"
                  className={`press flex items-center gap-1 px-4 py-2 transition-opacity duration-[600ms] ease-[var(--ease-out-expo)] hover:opacity-100 ${
                    serviceActive || servicesOpen ? "font-semibold" : "opacity-64"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Servicii
                  <ChevronDown
                    className={`transition-transform duration-[600ms] ease-[var(--ease-out-expo)] ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={servicesId}
                  hidden={!servicesOpen}
                  className="on-dark absolute top-full left-1/2 mt-4 w-[40rem] -translate-x-1/2 border border-line-dark bg-night text-white"
                >
                  <ul className="grid grid-cols-2">
                    {serviceLinks.map((s, i) => (
                      <li key={s.id} className={`border-line-dark ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t" : ""}`}>
                        <Link href={s.href} className="group block p-6 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:bg-white/[0.06]">
                          <span className="flex items-center justify-between gap-4 font-semibold">
                            {s.title}
                            <ArrowRight size={16} />
                          </span>
                          <span className="mt-2 block text-mist">{s.short}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {mainLinks.slice(1).map((l) => (
                <li key={l.href}>
                  <NavLink href={l.href} active={isActive(l.href)}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className="t-14 hidden px-4 py-2 opacity-64 transition-opacity duration-[600ms] ease-[var(--ease-out-expo)] hover:opacity-100 xl:block"
            >
              {site.contact.phoneDisplay}
            </a>
            <Link
              href="/contact#formular"
              className={`btn hidden min-h-10 px-4 sm:inline-flex ${dark ? "btn-light" : "btn-dark"}`}
            >
              Cere ofertă
            </Link>
            <button
              type="button"
              className="press -mr-2 grid size-12 place-items-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Meniu mobil */}
      <div id={menuId} hidden={!menuOpen} className="on-dark fixed inset-0 z-40 overflow-y-auto bg-night pt-16 text-white lg:hidden">
        <nav aria-label="Navigare mobilă" className="container-x pt-8 pb-16">
          <ul className="border-b border-line-dark">
            {[{ href: "/", label: "Acasă" }, mainLinks[0], ...serviceLinks.map((s) => ({ href: s.href, label: s.title })), ...mainLinks.slice(1)].map(
              (l) => (
                <li key={l.href} className="border-t border-line-dark">
                  <Link
                    href={l.href}
                    className={`press group flex items-center justify-between py-4 t-21 font-semibold ${pathname === l.href ? "" : "text-white/80"}`}
                    aria-current={pathname === l.href ? "page" : undefined}
                  >
                    {l.label}
                    <ArrowRight className="arrow text-mist" />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 grid gap-2">
            <Link href="/contact#formular" className="btn btn-lg btn-light w-full">
              Cere ofertă
            </Link>
            <a href={telHref} className="btn btn-lg btn-line-light w-full">
              {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`press block px-4 py-2 transition-opacity duration-[600ms] ease-[var(--ease-out-expo)] hover:opacity-100 ${
        active ? "font-semibold" : "opacity-64"
      }`}
    >
      {children}
    </Link>
  );
}
