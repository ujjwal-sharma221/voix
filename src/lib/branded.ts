import z from "zod/v4";

// ---------------------------------------------------------------------------
// Branded primitive helpers
// ---------------------------------------------------------------------------

/**
 * Creates a Zod schema for a branded string type.
 *
 * The brand lives purely in the TypeScript type system — at runtime the value
 * is still a plain string, so there is zero serialisation overhead and the
 * value travels transparently over JSON / tRPC / Prisma.
 *
 * Usage:
 *   const VoiceIdSchema = brandedId<"VoiceId">();
 *   type VoiceId = z.infer<typeof VoiceIdSchema>;
 *
 *   // Casting a raw string you trust (e.g. from a DB row):
 *   const id = row.id as VoiceId;
 *
 *   // Parsing + branding an untrusted string (e.g. tRPC input):
 *   const id = VoiceIdSchema.parse(rawString);
 */
function brandedId<Brand extends string>() {
  return z.string().min(1).brand<Brand>();
}

// ---------------------------------------------------------------------------
// Voice
// ---------------------------------------------------------------------------

export const VoiceIdSchema = brandedId<"VoiceId">();

/** An ID that is guaranteed to come from the `voice` table. */
export type VoiceId = z.infer<typeof VoiceIdSchema>;

// ---------------------------------------------------------------------------
// Generation  (add more branded IDs here as the schema grows)
// ---------------------------------------------------------------------------

export const GenerationIdSchema = brandedId<"GenerationId">();

/** An ID that is guaranteed to come from the `generation` table. */
export type GenerationId = z.infer<typeof GenerationIdSchema>;
