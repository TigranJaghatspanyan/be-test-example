import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(
    token,
    process.env.JWT_SECRET ?? "secret_jwt",
    //@ts-ignore
    (err, user: User) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
      //@ts-ignore
      req.user = user;
      next();
    }
  );
};
