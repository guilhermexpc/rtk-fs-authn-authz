import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization || "";

  console.log("authHeader", authHeader);

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }
  const [scheme, token] = authHeader.trim().split(/\s+/);
  const [, token2] = authHeader.split(" ");
  console.log(`scheme: ${scheme}, token: ${token}, token2: ${token2}`);

  if (scheme.toLowerCase() !== "bearer" || !token) {
    throw new AppError("Invalid authorization header", 401);
  }

  next();
}
