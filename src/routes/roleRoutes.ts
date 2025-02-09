import { Router } from "express";

const { createRole, getAllRoles, updateRole, deleteRole } = require("../controllers/RoleController");

const router = Router();

router.post("/", createRole);
router.get("/", getAllRoles);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;