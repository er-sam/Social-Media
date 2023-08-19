//imported files
import express from 'express'
import cors from 'cors'
const app = express();
import dotenv from 'dotenv' 
import connectDB from "./Config/db.js"
import authRoutes from "./Routes/authRoutes.js"
import postsRoutes from "./Routes/postsRoutes.js"
import friendRoutes from "./Routes/friendRoutes.js"
import profileRoute from './Routes/profileRoute.js'

// import postsRoutes from "./Routes/postsRoutes.js"

//--config----
dotenv.config();
connectDB();  
 

//----middleware----
app.use(cors());
app.use(express.json({ limit: '10mb' }));


//----routes-------
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/post',postsRoutes)
app.use('/api/v1/friend',friendRoutes)
app.use('/api/v1/profile',profileRoute)
// app.use('/api/v1/profile',ProfiletRoutes)

    
//port
const PORT = process.env.PORT || 8000

//listenning.......
app.listen(PORT ,()=>{
    console.log(`Server running on ${PORT}`)
})