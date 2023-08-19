import express from "express";
import { addfriendController,  getFriendController,  getFriendPostController, notfriend } from '../Controllers/friendController.js'
import { protectedRoute } from "../Middleware/authmiddleware.js"

//router object
const router = express.Router();


//-----------friend--------------------
router.post("/addfriend/:id",protectedRoute, addfriendController)
router.get("/getfriendPost/",protectedRoute,getFriendPostController)
router.get("/getfriend/:id",protectedRoute,getFriendController)
router.get("/notfriend/",protectedRoute,notfriend)



//PROTECTED-ROUTE-USER AUTH------GET
router.get("/user-auth",protectedRoute,(req, res) => {
    res.status(200).send({ ok: true })
});








export default router;