import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // Pour lire le JSON des requêtes
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// console.log(app.use(express.json()));

// Route simple
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Node.js avec TypeScript !");
});

// Pour importer la connexion sequelize initialisée dans le model/index.js à partir des données de connexion dans config/config.js 
const db = require("../models"); // depuis models/index.js, sequelize est exporté via db 
const { sequelize } = db;

sequelize
  .sync() // sync() creates the table if it doesn't exist (and does nothing if it already exists)
  .then(() => console.log("Connexion à MySQL réussie"))
  .catch((err: any) => console.error("Erreur de connexion MySQL :", err));

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import profileRoutes from "./routes/profileRoutes";

app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profiles", profileRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
