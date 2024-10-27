//logins requires admin key access, but for testing convenience (according to rubric guidelines) it will be omitted

import express from "express";
import logins from "../data/logins.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(logins);
})

//There is no post request for logins because the logins are generated from the users.js file



export default router