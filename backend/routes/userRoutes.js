import express from "express";
import { authUser, registerUser, logoutUser, updateUser, getUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"
// import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()


router.post("/auth", authUser);
router.post("/register", protect, registerUser)
router.post("/logout", logoutUser)

router.get("/", getUser);
router.put("/update", updateUser);

export default router