import { Router } from "express";
import { createValidation } from "../middlewares/productValidation";
const { authenticate } = require("../middlewares/authMiddleware");

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/ProductController");

const router = Router();

router.post("/", authenticate, createValidation, createProduct);
router.get("/", authenticate, getAllProducts);
router.get("/:id", authenticate, getProductById);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;