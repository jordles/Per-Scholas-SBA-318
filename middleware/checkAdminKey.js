const adminKeys = JSON.parse(process.env.ADMIN_KEYS);
const checkAdminKey = (req, res, next) => {
  const adminKey = req.query["admin-key"];
  if(!adminKey) return res.status(400).json({error: "Admin Key Required"});
  if(!adminKeys.includes(adminKey)) return res.status(401).json({error: "Invalid Admin Key"});

  next();
}

export default checkAdminKey