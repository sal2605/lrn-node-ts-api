import { Request, Response } from "express";
import { validationResult } from "express-validator";
const { Role } = require("../../models");

// Ajouter un role 
export const createRole = async (req: Request, res: Response) => {
    try {
        const { roleName } = req.body;

        // Vérifier si le role existe deja  
        const existingRole = await Role.findOne({ where: { roleName } });
        if (existingRole) {
            return res.status(400).json({ message: "Ce nom de role existe déjà." });
        }

        const role = await Role.create({ roleName });
        return res.status(201).json({ message: "Role created successfuly..", role });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Impossible de créer le role" });
    }
};

// Recuperer tous les roles 
export const getAllRoles = async (req: Request, res: Response) => {
    const roles = await Role.findAll();
    return res.json(roles);
};

// Modifier un role 
export const updateRole = async (req:Request, res:Response) => {
    const role = await Role.findByPk(req.params.id);

    if (!role) return res.status(404).json({ error: "Role non trouvé" });

    await role.update(req.body); 
    return res.status(201).json(role);
};

// Supprimer un role 
export const deleteRole = async (req:Request, res:Response) => {
    const role = await Role.findByPk(req.params.id);

    if (!role) return res.status(404).json({ error: "Role non trouvé" });

    await role.destroy(); 
    return res.status(201).json({ message: "Role (" + role.roleName + ") supprimé avec succès.." });
};