import { Router } from "express";
import { createValidation } from "../middlewares/productValidation";

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/ProductController");

const router = Router();

router.post("/", createValidation, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;