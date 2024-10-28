//logins requires admin key access, but for testing convenience (according to rubric guidelines) it will be omitted

import express from "express";
import logins from "../data/logins.js";
import users from "../data/users.js";

const router = express.Router();
router.use(express.static('styles'));
//router to render the logins with user and login data; view template is ejs
router.get("/view", (req, res) => {
  res.render("logins", {logins, users})
})

router.get("/", (req, res, next) => {
  const queries = ["id","username", "password", "email"];
  for(const queryKey of queries){
    if(req.query[queryKey]){
      const login = logins.find(login => login[queryKey] == req.query[queryKey]);
      return login ? res.json(login) : next();
    }
  }
  res.json(logins);
})

router.get("/:id", (req, res, next) => {
  const login = logins.find(login => login.id == req.params.id);
  if(!login) return next();
  res.json(login);
})

//There is no post request for logins because the logins are generated from the users.js file

router.patch("/", (req, res, next) => {
  const queries = ["id", "sha256"];
  for(const queryKey of queries){
    if(req.query[queryKey]){
      const login = logins.find(login => login[queryKey] == req.query[queryKey]);
      if(!login) return next();
      for(const key in req.body){
        if(key == "sha256" || key == "id") return res.status(400).json({ error: `You cannot change this key: ${key}` });
        if(key == "email") users.find(user => (user.id || user.sha256) == req.query[queryKey])[key] = req.body[key];
        login[key] = req.body[key];
      } 
      return res.json(login);
    }
  }
  res.json(logins);
})

router.patch("/:identifier", (req, res, next) => {
  const { identifier } = req.params;
  // Check if identifier is an id (numeric) or a sha256 (non-numeric)
  const login = isNaN(identifier)
    ? logins.find(login => login.sha256 === identifier)
    : logins.find(login => login.id == identifier);
  
  if(!login) next()
  for(const key in req.body){
    if(key == "sha256" || key == "id" || key == "salt") return res.status(400).json({ error: `You cannot change this key: ${key}` });
    if(key == "email") users.find(user => (user.id || user.sha256) == identifier)[key] = req.body[key];
    login[key] = req.body[key];
  } 
  res.json(login);
})


//only admins can delete any users and their respective login info
//if users want to delete their own account they cannot access through here, it must be through the users route and it will check only for their id to delete. 
router.delete("/", (req, res, next) => {
  const queries = ["id", "sha256"];
  for(const queryKey of queries){
    if(req.query[queryKey]){
      
      const login = logins.find(login => login[queryKey] == req.query[queryKey]);
      if(!login) return next();
      const removedLogin = logins.splice(logins.indexOf(login), 1);
      const removedUser = users.splice(logins.indexOf(login), 1);
      return res.json({removedLogin, removedUser});
    }
  }
  next();
})

router.delete("/:identifier", (req, res, next) => {
  const { identifier } = req.params;
  // Check if identifier is an id (numeric) or a sha256 (non-numeric)
  const login = isNaN(identifier)
    ? logins.find(login => login.sha256 === identifier)
    : logins.find(login => login.id == identifier);

  if(!login) return next();
  const removedLogin = logins.splice(logins.indexOf(login), 1);
  const removedUser = users.splice(logins.indexOf(login), 1);
  res.json({removedLogin, removedUser});
})


export default router