import express from "express";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import loginsRouter from "./routes/logins.js";
import postsRouter from "./routes/posts.js";
import checkAdminKey from "./middleware/checkAdminKey.js";
/* ------------------------------------ - ----------------------------------- */

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('styles'));
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parsing request bodies
app.use(express.urlencoded({ extended: true })); //forms


app.use("/users", usersRouter);
app.use("/logins", /* checkAdminKey, */ loginsRouter);
app.use("/posts", postsRouter);

//create a new user here; a form will be rendered
app.get(/^\/new(?:user)?$/i, (req, res) => {
  res.render("newUserForm");
})

app.get("/", (req, res) => {
	// res.send("Welcome to the Root API.");
	// res.send("Below is the api routes:");
  res.send("Welcome to the Root API. Check my readme on github for the endpoints")
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
