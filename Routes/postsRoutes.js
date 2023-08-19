import express from 'express'
import {protectedRoute } from "../Middleware/authmiddleware.js"
import {PostComments, createPostController,getUserPost,likeUnliked} from '../Controllers/PostController.js'

const router = express.Router();

router.post("/create-post", protectedRoute, createPostController)
router.post("/likeUnlike/:id" ,protectedRoute,likeUnliked)
router.put("/addcomments/:id",protectedRoute,PostComments)
router.get("/getpost/:id",protectedRoute,getUserPost)



export default router   