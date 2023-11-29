import { User } from "../models/User.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../type/jwtToken.js";

// if user jwt token expires then using refresh token we can verify the user
export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  // if user not found
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt to assign the new jwt token to user
  const response: JwtPayload = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  ) as JwtPayload;

  if (foundUser.username !== response.UserInfo.username) {
    return res.sendStatus(403);
  }
  const roles = Object.values(foundUser.roles!);
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: response.UserInfo.username,
        email: response.UserInfo.email,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "72h" }
  );
  res.json({
    roles,
    accessToken,
    email: foundUser.email,
    username: foundUser.username,
  });
};
