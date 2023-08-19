import express from "express";
import { loginController, signupController } from '../Controllers/authControllers.js'
import { protectedRoute } from "../Middleware/authmiddleware.js"



//router object
const router = express.Router();




//-----------routing--------------------
//REGISTER------ POST
router.post("/signup", signupController)

//LOGIN------ POST
router.post("/login", loginController)


//PROTECTED-ROUTE-USER AUTH------GET
router.get("/user-auth",protectedRoute,(req, res) => {
    res.status(200).send({ ok: true })
});








export default router;