import { Router } from "express";
const { authenticate } = require("../middlewares/authMiddleware");
const { User } = require("../../models");
const { Product } = require("../../models");
const { Profile } = require("../../models");

// Vérifie si l'objet User est bien chargé 
// console.log(User);

//crée une nouvelle instance de router, qui nous permet de définir des routes 
const router = Router(); 

// Créer un utilisateur
router.post("/", async (req, res) => {
  console.log("Request Body:", req.body);

  // extrait les informations name, email, et password du corps de la requête (req.body).
  const { name, email, password } = req.body; 

  // if (!name || !email || !password) {
  //   res.status(400).json({ error: "Tous les champs sont requis." });
  //   return;
  // }

  try {        
    // Ici on utilise le modèle User pour créer un nouvel utilisateur dans la BD; create() de Sequelize permet d'ajouter un nouvel utilisateur avec les valeurs recupérées dans req.body; await garantit que le serveur attend que l'opération soit terminée avant de passer à l'étape suivante
    const user = await User.create({ name, email, password });
    // Reponse json avec tous les champs de l'utilisateur, y compris probablement son ID généré par la base de données 
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Récupérer tous les utilisateurs
router.get("/", authenticate, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Récupérer un utilisateur par ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: [{ model: Product, as: 'products' }, { model: Profile, as: 'profile' }] }); // Quand on veut charger plusieurs relations, on ajoute les crochets []
    res.json(user);
  } catch (error) {
    console.error("Error showing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

export default router;
