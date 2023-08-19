import userModel from "../Models/UserModels.js"
export const getProfile = async (req, res) => {
    try {
        const profile = await userModel.findById(req.params.id)
        return res.status(200).send({
            success : true,
            message : "profile detail",
            profile :{
                name: profile.name,
                Image : profile.Image,
                email: profile.email,
                Posts: profile.Posts,
                Friend: profile.Friend,
                work : profile.work,
                gender : profile.gender
            }
        })

    } catch (error) { 
        return res.status(500).send({
            success: false,
            message: "Internal error in profile view",
            error
        })
    }
}

export const SearchController=async(req,res)=>{
    try {
        const {key} = req.params;
        const data = await userModel.find({
            "$or":[
                {name:{$regex:key}},
                {address:{$regex:key}},
                {work:{$regex:key}}
            ]
        })
        return res.status(200).send({
            success : true,
            message : "search result is here",
            data : data
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message :"Internal error",
            error
        })
    }
}