import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  UserInfo: {
    username: string;
    roles: {
      User?: number;
      Editor?: number;
      Admin?: number;
    };
  };
} & jwt.JwtPayload;

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string =
    (req.headers.authorization as string) ||
    (req.headers.Authorization as string);

  const response: JwtPayload = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  ) as JwtPayload;

  Object.defineProperty(req, "user", {
    value: response.UserInfo.username,
    writable: false,
  });
  Object.defineProperty(req, "roles", {
    value: response.UserInfo.roles,
    writable: false,
  });
  next();
};
