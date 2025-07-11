import z from "zod";

export const MUTATE_LOGIN_SCHEMA = z.object({
  email: z.string().min(1, "Required").email("Invalid email address"),
  password: z.string().min(1, "Required"),
  checked_tnc: z.boolean().nullable().optional(),
});
