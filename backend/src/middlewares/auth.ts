import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const auth = async (c: Context, next: Next) => {
  const header = c.req.header("authorization");

  if (!header) {
    return unauthorized(c);
  }

  const token = header.split(" ")[1];

  try {
    const isValid = await verify(token, c.env.JWT_SECRET);

    if (isValid.id || isValid.email) {
      c.set("userId", isValid.id);
      return await next();
    } else {
      return unauthorized(c);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return unauthorized(c);
  }
};

function unauthorized(c: Context) {
  c.status(401);
  return c.json({ message: "You are not Authorized" });
}
