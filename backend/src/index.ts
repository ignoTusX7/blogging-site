import { Context, Hono } from "hono";
import mainRouter from "./routes";


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();


app.route("/api/v1", mainRouter);

app.get("/", (c: Context) => {
  return c.json({ message: "Hello from Hono" });
});

export default app;
