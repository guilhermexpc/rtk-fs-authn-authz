import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

// Mock data for user
const fakerUser = {
  id: "1",
  username: "onildo",
  password: "123456"
};

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    if (username !== fakerUser.username || password !== fakerUser.password) {
      throw new AppError("Incorrect username/password combination", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      expiresIn: expiresIn,
      subject: String(fakerUser.id)
    });

    return response.json({ message: "User authenticated successfully", token: token });
  }
}

export { SessionsController };
