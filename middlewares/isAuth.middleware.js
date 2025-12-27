/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //returns payload of the jwt token in the decoded 
    req.user = decoded;
    console.log(decoded)

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;
