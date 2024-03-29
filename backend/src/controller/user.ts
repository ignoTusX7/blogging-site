import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { encryptor } from "../../helper";
import { sign } from "hono/jwt";
import { signInBody, signUpBody } from "../zodTypes";

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

//Get a Blog of a user
export const getBlog = async (c: Context) => {
  const slug: string = c.req.param("slug");
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        slug: slug,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        published : true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ message: "Blog not found" });
    }

    c.status(200);
    return c.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

//Get All Blogs of a user
export const getBlogs = async (c: Context) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        published : true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!allBlogs) {
      c.status(404);
      return c.json({ message: "Blog not found" });
    }
    c.status(200);
    return c.json(allBlogs);
  } catch (error) {
    console.error("Error fetching blog:", error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
  return c.json({ message: "Failed to load Blogs" });
};
