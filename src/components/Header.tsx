"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Close, Menu, Phone } from "./icons";
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

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /** Ascuns la scroll în jos, reapare la scroll în sus */
  const [hidden, setHidden] = useState(false);
  /** Fundalul de sub header: „dark” → logo alb, „light” → logo bleumarin */
  const [surface, setSurface] = useState<"dark" | "light">("dark");
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesId = useId();
  const menuId = useId();

  // „scrolled” și ascunderea la scroll în jos (doar citiri de scrollY, fără măsurători de layout).
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      setScrolled(y > 24);
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

  // Tema: secțiunea (data-bg) care trece pe sub mijlocul headerului, urmărită cu un IntersectionObserver
  // pe o linie de 1px — fără citiri de layout la fiecare cadru de scroll.
  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const setup = () => {
      io?.disconnect();
      const mid = Math.round((headerRef.current?.offsetHeight ?? 72) / 2);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const bg = (e.target as HTMLElement).dataset.bg;
            setSurface(bg === "night" || bg === "navy" ? "dark" : "light");
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

  return (
    <>
      <a
        href="#continut"
        className="sr-only z-[60] rounded-full bg-accent px-4 py-2 font-semibold text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Sari la conținut
      </a>
      <header
        ref={headerRef}
        className="site-header group/hdr fixed inset-x-0 top-0 z-50 text-white data-[theme=light]:text-night"
        data-scrolled={scrolled || menuOpen ? "true" : "false"}
        data-theme={menuOpen ? "dark" : surface}
        data-hidden={hidden && !menuOpen && !servicesOpen ? "true" : undefined}
        onFocus={() => setHidden(false)}
      >
        {/* Sticlă mată: două straturi, schimbate doar prin opacitate */}
        <span aria-hidden className="hdr-bg hdr-bg-dark" />
        <span aria-hidden className="hdr-bg hdr-bg-light" />
        <div className="container-x relative flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="relative -m-2 block shrink-0 rounded-lg p-2" aria-label="Danca Way — Acasă">
            <Logo
              variant="alb"
              priority
              alt=""
              className="h-8 w-auto transition-opacity duration-300 group-data-[theme=light]/hdr:opacity-0 md:h-10"
            />
            <Logo
              variant="navy"
              alt=""
              className="absolute top-2 left-2 h-8 w-auto opacity-0 transition-opacity duration-300 group-data-[theme=light]/hdr:opacity-100 md:h-10"
            />
          </Link>

          <nav aria-label="Navigare principală" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-[0.92rem] font-medium">
              <li>
                <NavLink href="/curse-regulate" active={isActive("/curse-regulate")}>
                  Curse regulate
                </NavLink>
              </li>
              <li className="relative" ref={servicesRef}>
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 transition-opacity hover:opacity-100 ${
                    serviceActive || servicesOpen ? "" : "opacity-75"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Servicii
                  <ChevronDown
                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={servicesId}
                  hidden={!servicesOpen}
                  className="absolute top-full left-1/2 mt-3 w-[34rem] -translate-x-1/2 rounded-3xl border border-white/10 bg-navy/95 p-3 shadow-2xl backdrop-blur-xl"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {serviceLinks.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={s.href}
                          className="group block rounded-2xl p-4 hover:bg-white/[0.06]"
                        >
                          <span className="flex items-center justify-between font-display font-semibold text-white">
                            {s.title}
                            <ArrowRight
                              size={16}
                              className="arrow opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                            />
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-mist">{s.short}</span>
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
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100 xl:flex"
            >
              <Phone size={16} />
              {site.contact.phoneDisplay}
            </a>
            <Link href="/contact#formular" className="btn btn-primary hidden min-h-10 px-5 text-sm sm:inline-flex">
              Cere ofertă
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
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
      <div
        id={menuId}
        hidden={!menuOpen}
        className="fixed inset-0 z-40 overflow-y-auto bg-night pt-20 text-white lg:hidden"
      >
        <nav aria-label="Navigare mobilă" className="container-x pb-12">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {[{ href: "/", label: "Acasă" }, mainLinks[0], ...serviceLinks.map((s) => ({ href: s.href, label: s.title })), ...mainLinks.slice(1)].map(
              (l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`flex items-center justify-between py-4 font-display text-2xl font-semibold tracking-tight ${
                      pathname === l.href ? "text-accent" : ""
                    }`}
                    aria-current={pathname === l.href ? "page" : undefined}
                  >
                    {l.label}
                    <ArrowRight className="arrow text-white/40" />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact#formular" className="btn btn-primary w-full">
              Cere ofertă <ArrowRight />
            </Link>
            <a href={telHref} className="btn btn-ghost-light w-full">
              <Phone size={18} /> {site.contact.phoneDisplay}
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
      className={`relative rounded-full px-3.5 py-2 transition-opacity hover:opacity-100 ${active ? "" : "opacity-75"}`}
    >
      <span className="link-u">{children}</span>
      {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" aria-hidden />}
    </Link>
  );
}
