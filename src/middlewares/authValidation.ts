import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("Le nom est obligatoire."),
  body("email").isEmail().withMessage("L'email doit être valide."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit avoir au moins 6 caractères."),
];

export const loginValidation = [
  body("email").isEmail().withMessage("L'email doit être valide."),
  body("password").notEmpty().withMessage("Le mot de passe est requis."),
];
