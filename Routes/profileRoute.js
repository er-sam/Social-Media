import express from 'express'
import { protectedRoute } from "../Middleware/authmiddleware.js"
import { SearchController, getProfile } from '../Controllers/profileController.js';

const router = express.Router();

router.get("/:id",protectedRoute,getProfile)
router.get("/search/:key",protectedRoute,SearchController)

export default router
       