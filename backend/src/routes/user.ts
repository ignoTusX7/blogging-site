import { Hono } from "hono";
import { getBlog, getBlogs, signinController, signupController } from "../controller/user";
import { auth } from "../middlewares/auth";

const user = new Hono();

// user.use("/signin/*", auth);

user.post("/signup", signupController);
user.post("/signin", signinController);
user.get("/blogs", auth, getBlogs);
user.get("/blog/:slug", auth, getBlog);

export default user;
