import PostModels from '../Models/PostModels.js'
import userModel from '../Models/UserModels.js';


//----------CREATE POST--------------------
export const createPostController = async (req, res) => {
    try {
        const { Caption, Image, } = req.body;
        if (!Caption && !Image) {
            return res.status(401).send({
                success: false,
                message: 'please provide image or caption/strory',
            })
        } 
        const results = new PostModels({
            Caption: Caption, 
            Image: Image,
            Owner: req.user
        })
        const postowner = await userModel.findById(req.user)
        const postsaved=await results.save();
        postowner.Posts.push(postsaved._id);
        await postowner.save();

        return res.status(201).send({
            success: true,
            message: "New Post created",
            results
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Post creation',
            error
        })
    }
}






//-----------LIKE--UNLIKE------------------------
export const likeUnliked = async (req, res) => {
    const userid = req.user._id;
    const { id } = req.params;
    const post = await PostModels.findById(req.params.id)
    const liked = post.Likes.includes(userid);
    if (liked) {
        post.Likes.splice(req.user._id, 1);
        const length = post.Likes.length
        await post.save();
        return res.status(200).send({
            success: true,
            message: "Post unliked......",
            length
        })
    } else {
        post.Likes.push(userid);
        const length2 = post.Likes.length
        await post.save()
        return res.status(200).send({
            success: true,
            message: "Post liked......",
            'length': length2
        })
    }
} 



//----------Get Post-----------------
export const getUserPost = async(req,res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        let post = await PostModels.find({Owner :user._id}).populate("Owner","name Image")
        if (!post) {
            return res.status(400).send({
                success: true,
                message: 'post not found'
            })
        }
        return res.status(200).send({
            success : true,
            message : "successfull fetched post",
            post
        })
        
    } catch (error) {
        return res.status(501).send({
            success : false,
            message : "Internal error in getting post",
            error
        })
        
    }
}




// --------------COMMENTS---------------------------
export const PostComments = async (req, res) => {
    try {
        const post = await PostModels.findById(req.params.id)
        if (!post) {
            return res.status(400).send({
                success: true,
                message: 'post not found'
            })
        }


        // -------CHECKING IF COMMENTS ALREADY EXISTS------
        let commentExists = -1;
        let index = 0;
        post.Comments.forEach((iteam, index) => {
            if (iteam.User.toString() === req.user._id.toString()) {
                commentExists = index;
            }
        })

        if (commentExists !== -1) {
            post.Comments[index].Comment = req.body.comment;
            await post.save();
            index = 0;
            return res.status(200).send({
                success: "true",
                message: "Comments added",
                post
            })
            //UPDATED COMMENTS WITH SAME USERID
        }
        else {
            //IF NEW USER
            post.Comments.push({
                User: req.user._id,
                Comment: req.body.comment
            })
            await post.save();
            return res.status(200).send({
                success: true,
                message: "comments done",
                post
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal error",
            error
        })
    }


}



