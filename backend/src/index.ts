import { Context, Hono } from "hono";
import mainRouter from "./routes";

import { cors } from "hono/cors";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

app.use("/*", cors());

app.route("/api/v1", mainRouter);

app.get("/", (c: Context) => {
  return c.json({ message: "Hello from Hono" });
});

export default app;
