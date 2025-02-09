import { body } from "express-validator";

export const createValidation = [
  body("name")
    .notEmpty().withMessage("Le nom du produit est obligatoire."),
  body("price")
    .notEmpty().withMessage("Le prix du produit est obligatoire.")
    .isFloat().withMessage("Le prix du produit doit être un nombre."),
  body("stock")
    .notEmpty().withMessage("Le stock est obligatoire.")
    .isInt().withMessage("Le stock doit être un entier."),
  body("userId")
    .notEmpty().withMessage("Le userId est obligatoire.")
    .isInt().withMessage("Le userId doit être un entier."),
];

