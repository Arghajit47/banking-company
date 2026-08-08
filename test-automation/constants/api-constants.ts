import { z } from "zod";

export const API_PATHS = {
  AUTH_STATUS: "/api/auth/status",
} as const;

export const authStatusSchema = z.object({
  isLoggedIn: z.boolean(),
  user: z.object({
    name: z.string().min(1),
    avatarUrl: z.string().nullable(),
  }).nullable(),
});

export interface AuthStatus {
  isLoggedIn: boolean;
  user: {
    name: string;
    avatarUrl: string | null;
  } | null;
}
