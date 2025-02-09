import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { User } = require("../../models");
const { Role } = require("../../models");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // Clé secrète JWT

// 🔹 Inscription
export const register = async (req: Request, res: Response) => {
  try {
    // Vérifier les erreurs de validation
    const errors = validationResult(req); // On precise la constante de validation à utiliser dans la route là bas
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, roleName } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({ name, email, password: hashedPassword });

    // Le role renseigné 
    const role = await Role.findOne({ where: { roleName } });

    if (role) {
      user?.addRole(role); // les methodes comme addModel sont fournies par sequelize lorsqu'on implemente des relations 
    } else {
      user?.addRole(3);
    }

    // console.log(role);

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ message: "Inscription réussie", token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 🔹 Connexion
export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req); // On precise la constante de validation à utiliser dans la route
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Identifiants incorrects." });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants incorrects." });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};
