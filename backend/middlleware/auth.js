const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {


  let token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).send("Not authorized");
  }
  const data = jwt.verify(token, "1234");
  console.log("data", data);
  req.user = data.id;
  next();
};
module.exports = verifyToken;
