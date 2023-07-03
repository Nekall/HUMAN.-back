import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).send({
      success: false,
      message: "Authorization header is missing.",
    });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "User" && decoded.role !== "Employee" && decoded.role !== "Admin")
      return res.status(401).send({
        success: false,
        message: "Not authorized.",
      });

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return res.status(401).send({
        success: false,
        message: "Invalid token.",
      });

    if (err.name === "TokenExpiredError")
      return res.status(401).send({
        success: false,
        message: "Token expired.",
      });

    return res.status(500).send({
      success: false,
      message: "An unexpected error has occurred.",
    });
  }
};

export default isAuth;