import { getImageProps } from "next/image";
import { ScrollHero } from "./ScrollHero";
import { sizeOf } from "@/data/images";

const POSTER = "/images/hero-autocar-piata.jpg";
const POSTER_PHONE = "/images/hero-autocar-piata-4x3.jpg";
const ALT = "Autocarul Danca Way într-o piață, la răsărit, cu farurile aprinse";

/**
 * Hero: pe desktop, o singură mișcare de cameră condusă de scroll — de la rândunica de pe panoul autocarului
 * până la autocarul întreg; apoi apare titlul. Pe telefon și cu „reduced motion”: posterul (cadrul final).
 */
export function Hero() {
  const common = { alt: ALT, sizes: "100vw", quality: 75 };
  const desk = getImageProps({ ...common, src: POSTER, ...sizeOf(POSTER) }).props;
  const phone = getImageProps({ ...common, src: POSTER_PHONE, ...sizeOf(POSTER_PHONE), fetchPriority: "high", loading: "eager" }).props;
  return <ScrollHero desktopSrcSet={desk.srcSet ?? desk.src} phone={{ src: phone.src, srcSet: phone.srcSet, width: phone.width, height: phone.height }} alt={ALT} />;
}
