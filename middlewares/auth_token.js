const jwt = require("jsonwebtoken");

function auth_token(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(JSON.stringify(req.body) + "in auth");
  console.log("==================>");
  if (!token) {
    console.log(token);
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("error in verifing");
      return res.sendSatus(403);
    }
    // console.log(user);
    // req.user = user;
    next();
  });
}

module.exports = { auth_token };
