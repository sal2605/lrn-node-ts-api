import { Request, Response } from "express";
import { validationResult } from "express-validator";
const { Product } = require("../../models");
const { User } = require("../../models");

// Ajouter un produit 
export const createProduct = async (req: Request, res: Response) => {
    try {
        // Vérifier les erreurs de validation
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price, stock, userId } = req.body;

        // Vérifier si le produit existe déjà
        const existingProduct = await Product.findOne({ where: { name: name } });
        if (existingProduct) {
            return res.status(400).json({ message: "Ce nom de produit est déjà utilisé." });
        }

        // Vérifier si le userId envoyé existe 
        const existingUser = await User.findOne({ where: { id: userId } });
        if (!existingUser) {
            return res.status(400).json({ message: "L'utilisateur sélectionné n'existe pas." });
        }

        const product = await Product.create({ name, price, stock, userId });
        return res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Impossible de créer le produit" });
    }
};

// Recuperer tous les produits 
export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll();
    return res.json(products);
};

// Recupérer un produit par ID 
export const getProductById = async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id, { include: { model: User, as: 'owner' } });

    if (!product) res.status(404).json({ error: "Produit non trouvé" });
    
    return res.status(201).json(product);
};

// Modifier un produit 
export const updateProduct = async (req:Request, res:Response) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: "Produit non trouvé" });

    await product.update(req.body); 
    return res.status(201).json(product);
};

// Supprimer un produit 
export const deleteProduct = async (req:Request, res:Response) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: "Produit non trouvé" });

    await product.destroy(); 
    return res.status(201).json({ message: "Produit (" + product.name + ") supprimé avec succès.." });
};