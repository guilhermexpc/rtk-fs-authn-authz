import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization || "";

  console.log("authHeader", authHeader);

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }
  // Split the authorization header into scheme and token
  const [scheme, token] = authHeader.trim().split(/\s+/);
  const [, token_2] = authHeader.split(" ");
  // console.log(`scheme: ${scheme}, token: ${token}, token2: ${token_2}`);

  if (scheme.toLowerCase() !== "bearer" || !token) {
    throw new AppError("Invalid authorization header", 401);
  }

  // Verify the token using the secret from authConfig
  const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;
  console.log(decoded);

  // Attach the user ID to the request object for further use in the application
  request.user = {
    id: String(decoded.sub),
    role: String(decoded.role)
  };

  return next();
}
