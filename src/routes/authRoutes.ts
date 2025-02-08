import express from "express";
const { register, login } = require("../controllers/AuthController");
import { registerValidation, loginValidation } from "../middlewares/authValidation";

const router = express.Router();

// Route d'inscription
router.post("/register", registerValidation, register);

// Route de connexion 
router.post("/login", loginValidation, login);

export default router;