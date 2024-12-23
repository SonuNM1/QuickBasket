import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  getProductController,
  getProductByCategory,
  getProductCategoryAndSubCategory,
  getProductDetails, 
  updateProductDetails,
  deleteProductDetails, 
  searchProduct
} from "../controllers/productController.js";
import admin from "../middleware/Admin.js";

const productRouter = Router();

productRouter.post("/create", auth, admin, createProductController);

productRouter.post("/get", getProductController);

productRouter.post("/get-product-by-category", getProductByCategory);

productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductCategoryAndSubCategory
);

productRouter.post('/get-product-details', getProductDetails)

// update product 

productRouter.put('/update-product-details', auth, admin, updateProductDetails)

// delete product 

productRouter.delete('/delete-product', auth, admin, deleteProductDetails)

// search product 

productRouter.post('/search-product', searchProduct)

export default productRouter;
