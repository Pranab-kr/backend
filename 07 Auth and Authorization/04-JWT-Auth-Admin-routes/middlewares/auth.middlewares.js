import JWT from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    //Header authorization: Bearer <token>
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) {
      return next();
    }

    if (!tokenHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = tokenHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    next();
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "you are not authorized to access this route" });
  }
  next();
};

export const ensureAdmin = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({ error: "you are not authorized to access this resource" });
    }
    return next();
  };
};
