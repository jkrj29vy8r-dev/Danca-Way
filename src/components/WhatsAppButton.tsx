import { whatsappHref } from "@/config/site";
import { WhatsApp } from "./icons";

/** Buton WhatsApp fix, în colțul ecranului. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener"
      aria-label="Scrie-ne pe WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#128C7E] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsApp size={28} />
    </a>
  );
}
