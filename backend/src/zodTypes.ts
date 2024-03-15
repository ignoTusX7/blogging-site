import { z } from "@hono/zod-openapi";

export const signUpBody = z.object({
  name: z.string().openapi({
    example: "John Doe",
  }),
  email: z.string().openapi({
    example: "johndoe@example.com",
  }),
  password: z.string().openapi({
    example: "mysecretpass@123",
  }),
});

export const signInBody = z.object({
  email: z.string().openapi({
    example: "johndoe@example.com",
  }),
  password: z.string().openapi({
    example: "mysecretpass@123",
  }),
});

export const postBody = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  published: z.boolean(),
});
