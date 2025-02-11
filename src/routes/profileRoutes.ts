import { Router } from "express";

const { authenticate } = require("../middlewares/authMiddleware");

const { createProfile, getAllProfiles, updateProfile, deleteProfile } = require("../controllers/ProfileController");

const router = Router();

router.post("/", authenticate, createProfile);
router.get("/", authenticate, getAllProfiles);
router.put("/:id", authenticate, updateProfile);
router.delete("/:id", authenticate, deleteProfile);

export default router;