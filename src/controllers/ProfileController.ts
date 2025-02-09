import { Request, Response } from "express";
import { validationResult } from "express-validator";
const { Profile } = require("../../models");
const { User } = require("../../models");

// Ajouter un profil 
export const createProfile = async (req: Request, res: Response) => {
    try {
        const { bio, avatar, userId } = req.body;

        // Vérifier si le userId a déjà un profil 
        const existingProfile = await Profile.findOne({ where: { userId } });
        if (existingProfile) {
            return res.status(400).json({ message: "Ce user a déjà un profil." });
        }

        // Vérifier si le userId envoyé existe 
        const existingUser = await User.findOne({ where: { id: userId } });
        if (!existingUser) {
            return res.status(400).json({ message: "L'utilisateur sélectionné n'existe pas." });
        }

        const profile = await Profile.create({ bio, avatar, userId });
        return res.status(201).json({ message: "Profile created successfuly..", profile });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Impossible de créer le profil" });
    }
};

// Recuperer tous les profils 
export const getAllProfiles = async (req: Request, res: Response) => {
    const profiles = await Profile.findAll();
    return res.json(profiles);
};

// Modifier un profil 
export const updateProfile = async (req:Request, res:Response) => {
    const profile = await Profile.findByPk(req.params.id);

    if (!profile) return res.status(404).json({ error: "Profil non trouvé" });

    // Dans ce update, je vais ecarter le champ userId pour empêcher sa modification
    // Ci-dessous, on recupère userId à part et toutes les autres données dans updateDate
    const { userId, ...updateData } = req.body;

    await profile.update(updateData); 
    return res.status(201).json(profile);
};

// Supprimer un profil 
export const deleteProfile = async (req:Request, res:Response) => {
    const profile = await Profile.findByPk(req.params.id);
    const user = await User.findByPk(profile.userId);

    if (!profile) return res.status(404).json({ error: "Profil non trouvé" });

    await profile.destroy(); 
    return res.status(201).json({ message: "Profil de (" + user.name + ") supprimé avec succès.." });
};