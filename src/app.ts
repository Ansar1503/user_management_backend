import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import connectDB from "./infrastructure/database/config/db.config"
import userRoute from './interface/api/routes/userRoutes';
import fileUpload from 'express-fileupload'
import adminRoute from './interface/api/routes/adminRoutes';
import { refresh } from './interface/api/middlewares/Authentication';

dotenv.config()
const app = express()
const PORT = process.env.PORT
const allowedOrigins = process.env.CLIENT_ORIGIN
app.use(cors({
    origin:allowedOrigins,
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use('/',userRoute)
app.use('/admin',adminRoute)
app.post('/refresh',refresh)


connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started running on http://localhost:${PORT}`)
    })
})
.catch(error=>console.log(`failed to connect DB ${error}`))