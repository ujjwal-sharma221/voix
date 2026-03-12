import z from "zod/v4";

import { prisma } from "@/lib/db";
import { deleteAudio } from "@/lib/r2";

export const deleteVoiceSchema = z.object({
  id: z.string(),
});

export type deleteVoiceType = z.infer<typeof deleteVoiceSchema> & {
  orgId: string;
};

export async function deleteVoice({ id, orgId }: deleteVoiceType) {
  const voice = await prisma.voice.findUnique({
    where: { id, orgId, variant: "CUSTOM" },
    select: { id: true, r2ObjectKey: true },
  });

  if (!voice) {
    throw {
      success: false,
      message: "Voice not found",
    };
  }

  await prisma.voice.delete({ where: { id } });

  if (voice.r2ObjectKey) {
    await deleteAudio(voice.r2ObjectKey).catch((error) => {
      console.error("Error while deleting the R2 object", error);
    });
  }

  return {
    success: true,
    message: "voice delete successfully",
  };
}
