import { Router } from "express";

import { ProductsController } from "@/controllers/products-controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const productsRoutes = Router();
const productsController = new ProductsController();

// Apply the ensureAuthenticated middleware to all routes in this router
productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin", "sale"]), productsController.create);

export { productsRoutes };
