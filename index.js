import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/users.js';

/* ------------------------------------ - ----------------------------------- */

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);

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

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}.`)
})