import { Context } from "hono";

export const postBlogController = async (c: Context) => {
  return c.text("Post blog controller");
};

export const getBlogController = async (c: Context) => {
  return c.text("get a blog controller");
};

export const getBlogsController = async (c: Context) => {
  return c.text("get blogs controller");
};

export const updateBlogsController = async (c: Context) => {
  return c.text("update blogs controller");
};
