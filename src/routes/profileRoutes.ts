import { Router } from "express";

const { createProfile, getAllProfiles, updateProfile, deleteProfile } = require("../controllers/ProfileController");

const router = Router();

router.post("/", createProfile);
router.get("/", getAllProfiles);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;