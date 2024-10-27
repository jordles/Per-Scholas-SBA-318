import express from "express";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import loginsRouter from "./routes/logins.js";
/* ------------------------------------ - ----------------------------------- */

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/logins", loginsRouter);

app.get("/", (req, res) => {
	// res.send("Welcome to the Root API.");
	// res.send("Below is the api routes:");
	res.json({
		message: "Welcome to the Root API. Below is the api routes:",
		links: [
			{
				href: "/users",
				rel: "users",
				type: "GET",
			},
			{
				href: "/users",
				rel: "users",
				type: "POST",
			},
			{
				href: "/posts",
				rel: "posts",
				type: "GET",
			},
			{
				href: "/posts",
				rel: "posts",
				type: "POST",
			},
			{
				href: "/login?admin=",
				rel: "login",
				type: "GET",
			},
			{
				href: "/login?admin=",
				rel: "login",
				type: "POST",
			},
		],
	});
});

//404 error handler
app.use((req, res) => {
  res.status(404).json({ error: "Resource Not found" });
});


//general error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message});
});

app.listen(PORT, () => {
	console.log(`Server is running on port: http://localhost:${PORT}.`);
});
