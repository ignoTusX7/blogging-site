import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { postBody, updateBody } from "../zodTypes";
import { createSlug } from "../../helper";

export const postBlogController = async (c: Context) => {
  const userId = c.get("userId");
  const body = postBody.safeParse(await c.req.json());

  if (body.success) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const exist = await prisma.post.findFirst({
        where: {
          slug: createSlug(body.data.slug),
        },
      });

      if (exist) {
        c.status(401);
        return c.json({
          status: false,
          message: "Post with same slug already exist",
        });
      }
      const newPost = await prisma.post.create({
        data: {
          title: body.data.title,
          slug: createSlug(body.data.slug),
          content: body.data.content,
          published: body.data.published,
          authorId: userId,
        },
      });
      c.status(200);
      return c.json(newPost);
    } catch (error) {
      console.error("Error Posting blog:", error);
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  }
  c.status(401);
  return c.json({ message: "Invalid Body" });
};

export const getBlogController = async (c: Context) => {
  const slug: string = c.req.param("slug");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        slug: slug,
        published: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
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

export const getBlogsController = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const allBlogs = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
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

export const updateBlogsController = async (c: Context) => {
  const body = updateBody.safeParse(await c.req.json());
  const userId: string = c.get("userId");

  if (!body.success) {
    c.status(411);
    return c.json({ message: "Invalid Inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.data.id,
        authorId: userId,
      },
      data: {
        title: body.data.title,
        slug: body.data.slug,
        content: body.data.content,
        published: body.data.published,
      },
    });

    c.status(200);
    return c.json({ message: "Blog Updated", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteBlogController = async (c: Context) => {
  const postId: string = c.req.param("id");
  const authorId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: authorId,
      },
    });

    c.status(200);
    return c.json({ message: "Post Deleted" });
  } catch (error) {
    c.status(400);
    console.error("Error : ", error);
    return c.json({ message: "Failed to delete Post" });
  } finally {
    prisma.$disconnect();
  }
};
