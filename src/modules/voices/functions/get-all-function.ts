import z from "zod/v4";
import { prisma } from "@/lib/db";

export const getAllVoicesSchema = z.object({
  query: z.string().trim().optional(),
});

export type getAllVoicesType = z.infer<typeof getAllVoicesSchema> & {
  orgId: string;
};

export async function getAll({ query, orgId }: getAllVoicesType) {
  const searchFilter = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          {
            description: { contains: query, mode: "insensitive" as const },
          },
        ],
      }
    : {};

  const voiceSelect = {
    id: true,
    name: true,
    description: true,
    category: true,
    language: true,
    variant: true,
  };

  const [custom, system] = await Promise.all([
    prisma.voice.findMany({
      where: {
        variant: "CUSTOM",
        orgId,
        ...searchFilter,
      },
      orderBy: { createdAt: "desc" },
      select: voiceSelect,
    }),

    prisma.voice.findMany({
      where: {
        variant: "SYSTEM",
        ...searchFilter,
      },
      orderBy: { createdAt: "desc" },
      select: voiceSelect,
    }),
  ]);

  return {
    success: true,
    data: {
      custom,
      system,
    },
    message: "All voices fetched successfully",
  };
}
