import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "@hono/zod-openapi";
import { encryptor } from "../../helper";

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
      const encryptedPass = encryptor.encryptPassword(body.data.password);
      const newUser = await prisma.user.create({
        data: {
          email: body.data.email,
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

    console.log(encryptor.decryptPassword("1234"));

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const decryptedPassword =  encryptor.decryptPassword(body.data.password);
    
    const user = await prisma.user.findUnique({
      where: {
        email: body.data.email,
      },
    });
    // console.log(user);
    if (user && user.password === decryptedPassword) {
      c.status(201);
      return c.json({ success: true, user });
    }

    c.status(401);
    return c.json({
      status: false,
      message: "User not exist",
    });
  }
  c.status(401);
  return c.json({
    status: false,
    message: "Invalid Inputs",
  });
};
