import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoute.js'
import caregoryRoute from './routes/categoryRoutes.js'
import productRoute from './routes/productRoutes.js'

//configure env
dotenv.config();

//object
const app=express()

//Database 
connectDb()

//middlerWear
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//rotes
app.use('/api',authRoutes)
app.use('/category',caregoryRoute)
app.use('/product',productRoute)

app.get('/',(req,res)=>{
    res.send("<h1>Hello Dots</h1>")
})

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server Running on Port : ${port} on ${process.env.MODE} Mode`.bgMagenta.white)
})