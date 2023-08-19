import userModel from '../Models/UserModels.js'
import { hashPassword, comparePassword } from '../Helpers/authHelper.js'
import JWT from 'jsonwebtoken'



// -----SignUP
export const signupController = async (req, res) => {
    try {
        const { name, email, password, address, Image,gender,work,relationship } = req.body
        if (!name || !email || !password) {
            return res.status(200).send({
                success: false,
                message: 'Invalid empty fields'
            })
        }

        //existing user already
        const ex_user = await userModel.findOne({ email: email })
        if (ex_user) {
            return res.status(200).send({
                success: false,
                postMessage: "success",
                message: 'Already registered please login.....'
            })

        }

        //registring
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({
            name,
            email,
            gender,
            work,
            relationship,
            address,
            Image,
            password: hashedPassword
        }).save();
        res.status(201).send({
            success: true,
            message: "User registered...",
            user,
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Errr in registartion',
            err
        })
    }
}



//----LOGIN   
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                redirect: false,
                success: false,
                message: "Invalid email or password."
            })
        } 
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "invalid password"
            })
        }

        //--TOKEN CREATED----
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_C, { expiresIn: "170d" });

        res.status(200).cookie("token",token).send({
            success: true,
            message: "login successfull...",
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                image : user.Image,
                gender : user.gender,
                work : user.work,
                relationship : user.relationship,
                friend : user.Friend,
                posts : user.Posts,
                id : user._id
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.send(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

