import express from "express";
import { 
    createUser,
    getAllUsers,
    deleteUser, 
    getUserById, 
    updateUser, 
    insertAgentReport,
    getAgentReport,
    getLastAgentReport,
    getAllAgentReports,
    updateAgentReport,
    deleteAllReports,
    deleteAgentReport
} from "../controllers/userController.js";
import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.post("/user", validateUser, createUser);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", deleteUser);
router.post("/report", insertAgentReport);
router.get("/report", getAgentReport);
router.get("/report", getLastAgentReport);
router.get("/report", getAllAgentReports);
router.put("/report", updateAgentReport);
router.delete("/report", deleteAllReports);
router.delete("/report", deleteAgentReport);

export default router;
