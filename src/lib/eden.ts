import { treaty } from "@elysiajs/eden";

import { env } from "./env";
import { app } from "@/app/api/[[...slugs]]/route";

const baseUrl = env.BASE_URI || "localhost:3000";

export const api =
  typeof process !== "undefined"
    ? treaty(app).api
    : treaty<typeof app>(baseUrl).api;
