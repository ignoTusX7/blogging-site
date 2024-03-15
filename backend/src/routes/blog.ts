import { Hono } from "hono";
import {
  getBlogController,
  getBlogsController,
  postBlogController,
  updateBlogsController,
} from "../controller/blog";

const blog = new Hono();

blog.post("/blog", postBlogController);
blog.put("/blog", updateBlogsController);
blog.get("/blogs", getBlogsController);
blog.get("/blog/:id", getBlogController);

export default blog;
