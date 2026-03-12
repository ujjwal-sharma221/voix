import z from "zod/v4";

import { prisma } from "@/lib/db";
import { deleteAudio } from "@/lib/r2";
import { VoiceId, VoiceIdSchema } from "@/lib/branded";
import { authProcedure, createTRPCRouter } from "../init";

export const VoicesRouter = createTRPCRouter({
  getAll: authProcedure
    .input(
      z
        .object({
          query: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const searchFilter = input?.query
        ? {
            OR: [
              { name: { contains: input.query, mode: "insensitive" as const } },
              {
                description: {
                  contains: input.query,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {};

      const [custom, system] = await Promise.all([
        prisma.voice.findMany({
          where: { variant: "CUSTOM", orgId: ctx.orgId, ...searchFilter },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            variant: true,
            language: true,
          },
        }),

        prisma.voice.findMany({
          where: { variant: "SYSTEM", ...searchFilter },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            variant: true,
            language: true,
          },
        }),
      ]);

      return {
        custom: custom.map((v) => ({ ...v, id: v.id as VoiceId })),
        system: system.map((v) => ({ ...v, id: v.id as VoiceId })),
      };
    }),

  delete: authProcedure
    .input(
      z.object({
        id: VoiceIdSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingVoice = await prisma.voice.findUnique({
        where: { id: input.id, variant: "CUSTOM", orgId: ctx.orgId },
        select: {
          id: true,
          r2ObjectKey: true,
        },
      });

      if (!existingVoice) {
        return { success: false, message: "Voice not found" };
      }

      await prisma.voice.delete({
        where: { id: existingVoice.id },
      });

      if (existingVoice.r2ObjectKey) {
        await deleteAudio(existingVoice.r2ObjectKey).catch((error) => {
          console.error("Failed to delete audio from R2", error);
        });
      }

      return { success: true, message: "Voice deleted successfully" };
    }),
});
