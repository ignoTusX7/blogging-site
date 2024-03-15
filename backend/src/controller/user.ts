import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "@hono/zod-openapi";
import { encryptor } from "../../helper";
import { sign } from "hono/jwt";

const signUpBody = z
  .object({
    name: z.string().openapi({
      example: "John Doe",
    }),
    email: z.string().openapi({
      example: "johndoe@example.com",
    }),
    password: z.string().openapi({
      example: "mysecretpass@123",
    }),
  })
  .openapi("SignUp");

const signInBody = z
  .object({
    email: z.string().openapi({
      example: "johndoe@example.com",
    }),
    password: z.string().openapi({
      example: "mysecretpass@123",
    }),
  })
  .openapi("SignIn");

export const signupController = async (c: Context) => {
  const body = signUpBody.safeParse(await c.req.json());

  if (body.success) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email: body.data.email,
      },
    });
    if (!user) {
      const encryptedPass = await encryptor.encryptPassword(body.data.password);

      const newUser = await prisma.user.create({
        data: {
          email: body.data.email.toLowerCase(),
          name: body.data.name,
          password: encryptedPass,
        },
        select: {
          id: true,
        },
      });
      c.status(200);
      return c.json({ success: true, id: newUser });
    }
    c.status(401);
    return c.json({
      status: false,
      message: "User already exist with this email",
    });
  }
  c.status(401);
  return c.json({
    status: false,
    message: "Invalid Inputs",
  });
};

export const signinController = async (c: Context) => {
  const body = signInBody.safeParse(await c.req.json());

  if (body.success) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email: body.data.email,
      },
    });

    if (user) {
      const decPass = await encryptor.decryptPassword(
        body.data.password,
        user.password
      );

      if (decPass) {
        c.status(201);
        //@ts-ignore
        delete user.password;
        const token = await sign(
          { id: user.id, email: user.email },
          c.env.JWT_SECRET
        );
        return c.json({ success: true, token });
      }

      c.status(401);
      return c.json({
        status: false,
        message: "Invalid Credentials",
      });
    }
    c.status(401);
    return c.json({
      status: false,
      message: "Invalid Credentials",
    });
  }
  c.status(401);
  return c.json({
    status: false,
    message: "Invalid Inputs",
  });
};
