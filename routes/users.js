import express from 'express';
import users from '../data/users.js';
import logins from '../data/logins.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
})

router.post('/', async(req, res) => {
  //using api to basically get a randomized salt 
  const response = await fetch('https://randomuser.me/api/')
  const data = await response.json();
  console.log(data.results[0].login.salt);


  const {name, email, username, password} = req.body;
  const valid = name && name.first && name.display && email && username && password;
  if(!valid) return res.status(400).json({ error: "Insufficient data" });

  const newUser = {
    id: users[users.length - 1].id + 1,
    name: {
      first: name.first,
      last: name.last || null, //set to null if not provided
      display: name.display
    },
    email
  }
  users.push(newUser);

  const newLogin = {
    id: logins[logins.length - 1].id + 1,
    username,
    password,
    salt: data.results[0].login.salt,
    sha256: data.results[0].login.sha256,
    email
  }
  users.push(newLogin);
  res.json({newUser, newLogin});
})

router.patch('/:id', (req, res, next) => {
  const user = users.find(user => user.id == req.params.id);
  if(!user) return next();

  for(const key in req.body){
    user[key] = typeof req.body[key] === 'object' && !Array.isArray(req.body[key]) ? {...user[key], ...req.body[key]} : req.body[key];
  }
  res.json(user);
})

router.delete('/:id', (req, res, next) => {
  const user = users.find(user => user.id == req.params.id);
  if(!user) return next();
  users.splice(users.indexOf(user), 1);
  res.json(user);
})

export default router