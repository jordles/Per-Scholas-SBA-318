// Middleware to fetch salt and add to the request
const fetchSalt = async (req, res, next) => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    req.body.salt = data.results[0].login.salt; // Store salt in req object
    next();
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch salt" });
  }
};

export default fetchSalt