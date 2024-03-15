import { Hono } from "hono";
import {
  getBlogController,
  getBlogsController,
  postBlogController,
  updateBlogsController,
} from "../controller/blog";
import { auth } from "../middlewares/auth";

const blog = new Hono();



blog.post("/", auth,postBlogController);
blog.put("/", updateBlogsController);
blog.get("/", getBlogsController);
blog.get("/:slug", getBlogController);

export default blog;
