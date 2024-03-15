import { Hono } from "hono";
import user from "./user";
import blog from "./blog";
const mainRouter = new Hono();

mainRouter.route("/user", user);
mainRouter.route("/blog", blog);

export default mainRouter;
