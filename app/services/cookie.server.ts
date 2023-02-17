import { createCookie } from "@remix-run/node";

export const jwtCookie = createCookie("jwt");