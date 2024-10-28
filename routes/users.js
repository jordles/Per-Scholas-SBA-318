import express from 'express';
import users from '../data/users.js';
import logins from '../data/logins.js';
import fetchSalt from '../middleware/fetchSalt.js';
import hashPassword from '../middleware/hashPassword.js';
import isUserCreated from '../middleware/userCreated.js';

const router = express.Router();

router.get('/', (req, res) => {
  const queries = ["id", "display", "email"];
  for(const queryKey of queries){
    if(req.query[queryKey]){
      const user = users.find(user => queryKey == "display" ? user.name.display == req.query[queryKey] : user[queryKey] == req.query[queryKey])
      return user ? res.json(user) : next();
    }
  }
  res.json(users);
})

router.get('/:id', (req, res, next) => {
  const user = users.find(user => user.id == req.params.id);
  if(!user) return next();
  res.json(user);
})

router.post('/', isUserCreated, fetchSalt, hashPassword, (req, res) => {
  console.log(req.body);
  const {name, email, username, password, salt, hashedPassword, userCreated} = req.body;
  const valid = name.first && name.display && email && username && password;
  if(!valid) res.status(400).json({ error: "Insufficient data" });

  const newUser = {
    id: users[users.length - 1].id + 1,
    name: {
      first: name.first,
      last: name.last == (undefined || "") ?  null : name.last, //set to null if not provided
      display: name.display
    },
    email,
    userCreated // Flag to check if user has been created through a form submission
  }
  users.push(newUser);

  const isFormSubmission = req.headers['content-type'] === 'application/x-www-form-urlencoded';
  console.log(isFormSubmission);

  const newLogin = {
    id: logins[logins.length - 1].id + 1,
    username,
    password,
    salt,
    sha256: hashedPassword,
    email
  }
  logins.push(newLogin);
  res.json({newUser, newLogin});
})

router.patch('/', (req, res, next) => {
  if(req.query.id){
    const user = users.find(user => user.id == req.query.id);
    if(!user) return next();
    for(const key in req.body){
      if(key == 'id') return res.status(400).json({ error: "Cannot change id" });
      user[key] = typeof req.body[key] === 'object' && !Array.isArray(req.body[key]) ? {...user[key], ...req.body[key]} : req.body[key];
      if(key == 'email') logins.find(login => login.id == req.query.id)[key] = req.body[key];
    }
    res.json(user);
  }
  else next();
})
router.patch('/:id', (req, res, next) => {
  const user = users.find(user => user.id == req.params.id);
  if(!user) return next();

  for(const key in req.body){
    if(key == 'id') return res.status(400).json({ error: "Cannot change id" });
    user[key] = typeof req.body[key] === 'object' && !Array.isArray(req.body[key]) ? {...user[key], ...req.body[key]} : req.body[key];
    if(key == 'email') logins.find(login => login.id == req.params.id)[key] = req.body[key];
  }
  res.json(user);
})

router.delete('/', (req, res, next) => {
  const user = users.find(user => user.userCreated == true);
  if(user) {
    users.splice(users.indexOf(user), 1);
    res.json(user);
  }
  else res.json({error: "You can only delete users that have been created through a form submission. If you're an admin, you can delete any user. Please use /users/:id instead"});
})

router.delete('/:id', (req, res, next) => {
  const user = users.find(user => user.id == req.params.id);
  if(!user) return next();
  users.splice(users.indexOf(user), 1);
  res.json(user);
})

export default router