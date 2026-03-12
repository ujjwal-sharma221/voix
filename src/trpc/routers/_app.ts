import { VoicesRouter } from "./voices";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  voices: VoicesRouter,
});

export type AppRouter = typeof appRouter;
