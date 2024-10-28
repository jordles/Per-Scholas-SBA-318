// Middleware to set userCreated based on form submission
function checkFormSubmission(req, res, next) {
  console.log("inside checking form submission")
  console.log(req.method === "POST" && req.is("application/x-www-form-urlencoded"))
  if (req.method === "POST" && req.is("application/x-www-form-urlencoded")) {
    req.body.userCreated = true; // Set the flag in req.body
  }
  next();
}

export default checkFormSubmission