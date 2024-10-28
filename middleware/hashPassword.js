// import crypto from 'crypto'; //native to node

// //middleware to hash password into sha256
// const hashPasswordWithSalt = (req, res, next) => {
//   console.log(req.body);
//   const { password, salt } = req.body;

//   if (!password) return res.status(400).json({ error: "Password is required" });

//   const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
//   req.body.hashedPassword = hash;
//   next();
// };

import CryptoJS from 'crypto-js';

const hashPasswordWithSalt = (req, res, next) => {
  const { password, salt } = req.body;
  if (!password) return res.status(400).json({ error: "Password is required" });
  const hash = CryptoJS.SHA256(password + salt).toString();
  req.body.hashedPassword = hash;
  next();
};

export default hashPasswordWithSalt;