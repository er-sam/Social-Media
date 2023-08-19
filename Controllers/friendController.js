import userModel from '../Models/UserModels.js'
import postModels from '../Models/PostModels.js'

export const getFriendController = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.findById(id).populate('Friend', 'name Image');
        // console.log("friendlist",user.Friend)
        return res.send({
            message: "Friend fetched....",
            success: true,
            user: {
                "name": user.name,
                "Friend": user.Friend
            }
        })
    } catch (error) {
        return res.status(501).send({
            success: false,
            message: "Internal error",
            error
        })
    }
}

export const addfriendController = async (req, res) => {
    try {
        const userid = req.user._id;
        const friendid = req.params.id
        // console.log(userid,friendid)
        if (userid === friendid) {
            return res.status(405).send({
                message: "You cananot add yourself",
                error: new Error("You cananot add yourself")
            })
        }

        const user = await userModel.findById(userid);
        const friend = await userModel.findById(friendid);
        const isfriend = user.Friend.includes(friendid)
        if (isfriend) {
            user.Friend.splice(friendid, 1);
            friend.Friend.splice(userid, 1);
            await user.save();
            await friend.save();
            return res.status(200).send({
                success: true,
                message: 'Unfriended........',
            })
        }
        else {
            user.Friend.push(friendid);
            friend.Friend.push(user);
            await user.save();
            await friend.save();
            return res.status(200).send({
                success: true,
                message: "Friend-added",
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: "Internal server errr",
            error
        })
    }

}


export const getFriendPostController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        const post = await postModels.find({
            Owner: {
                $in: user.Friend
            }
        }).populate("Owner", "Image name")
        return res.status(200).send({
            success: true,
            message: "friend fetched...",
            post
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "internal server error",
            error
        })
    }

}

export const notfriend = async (req, res) => {
    try {
        const data = await userModel.find({
            Friend: {
                $nin: req.user._id
            }  
        }, { "id": 1, "name": 1, "Image": 1 })
        return res.status(200).send({
            success: true,
            message: "to be added",
            res: data
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal error in notfriend"
        })
    }
} 