import { cache } from "react";
import superjson from "superjson";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";

export const createTRPCContext = cache(async () => {
  return {};
});

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const authProcedure = t.procedure.use(async ({ next }) => {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!orgId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message:
        "You must be a member of an organization to perform this action.",
    });
  }

  return next({ ctx: { userId, orgId } });
});
