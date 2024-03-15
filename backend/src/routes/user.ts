import { Hono } from "hono";
import { signinController, signupController } from "../controller/user";
import { auth } from "../middlewares/auth";

const user = new Hono();

// user.use("/signin/*", auth);

user.post("/signup", signupController);
user.post("/signin", signinController);

export default user;
