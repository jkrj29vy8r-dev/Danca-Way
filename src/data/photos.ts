/**
 * Fotografiile mari ale site-ului. Fișierele sunt în /public/images.
 * Până la fotografiile reale, fiecare fișier este un placeholder bleumarin;
 * înlocuiește-l păstrând același nume (vezi public/images/README.md).
 */
export type Photo = { src: string; alt: string };

export const photos = {
  hero: {
    src: "/images/hero-microbuz-drum-munte.jpg",
    alt: "Microbuz Danca Way pe un drum de munte, la ora albastră",
  },
  road: {
    src: "/images/drum-neamt-bucuresti.jpg",
    alt: "Autocar Danca Way pe drumul dintre Neamț și București",
  },
} satisfies Record<string, Photo>;
