import { z } from "zod";
import { services } from "@/data/services";

const serviceIds = services.map((s) => s.id) as [string, ...string[]];

export const quoteSchema = z.object({
  serviciu: z.enum(serviceIds, { error: "Alege tipul de serviciu." }),
  plecare: z.string().trim().min(2, "Scrie locul de plecare.").max(120),
  destinatie: z.string().trim().min(2, "Scrie destinația.").max(120),
  data: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Alege data plecării."),
  pasageri: z.coerce
    .number({ error: "Numărul de pasageri trebuie să fie un număr." })
    .int("Numărul de pasageri trebuie să fie întreg.")
    .min(1, "Minimum 1 pasager.")
    .max(500, "Pentru peste 500 de pasageri, sună-ne."),
  nume: z.string().trim().min(2, "Scrie-ne numele tău.").max(100),
  telefon: z
    .string()
    .trim()
    .regex(/^[+()\d\s.-]{9,20}$/, "Numărul de telefon nu pare corect."),
  email: z.union([z.literal(""), z.email("Adresa de email nu pare corectă.")]).optional(),
  detalii: z.string().trim().max(2000, "Maximum 2000 de caractere.").optional(),
  acord: z.literal("da", { error: "Este necesar acordul pentru prelucrarea datelor." }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;

export type QuoteState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<QuoteField, string>>;
      values?: Partial<Record<string, string>>;
    };
