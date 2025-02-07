import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); //ceci charge les variables d'environnement depuis le .env 

// Créer une instance de Sequelize avec les informations de connexion
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: "mysql", //type de base de données 
    logging: false, // Désactive les logs SQL dans la console
  }
);

export default sequelize;