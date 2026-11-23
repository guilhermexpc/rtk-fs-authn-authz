import { Request, Response } from "express";

class ProductsController {
  async index(request: Request, response: Response) {
    return response.json({ message: "Products listed successfully" });
  }

  async create(request: Request, response: Response) {
    // Access the user ID from the request object
    return response.json({ message: `Product created successfully by user ${request.user?.id}` });
  }
}

export { ProductsController };
