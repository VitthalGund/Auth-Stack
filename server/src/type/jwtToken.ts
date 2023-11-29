import jwt from "jsonwebtoken";

export type JwtPayload = {
  UserInfo: {
    username: string;
    roles: {
      User?: number;
      Editor?: number;
      Admin?: number;
    };
    email: string;
  };
} & jwt.JwtPayload;
