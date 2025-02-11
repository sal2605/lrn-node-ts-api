import { Router } from "express";

const { authenticate } = require("../middlewares/authMiddleware");
const { createRole, getAllRoles, updateRole, deleteRole } = require("../controllers/RoleController");

const router = Router();

router.post("/", authenticate, createRole);
router.get("/", authenticate, getAllRoles);
router.put("/:id", authenticate, updateRole);
router.delete("/:id", authenticate, deleteRole);

export default router;