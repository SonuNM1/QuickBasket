import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  getProductController,
  getProductByCategory,
  getProductCategoryAndSubCategory,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);

productRouter.post("/get", getProductController);

productRouter.post("/get-product-by-category", getProductByCategory);

productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductCategoryAndSubCategory
);

export default productRouter;
