import mongoose from "mongoose";
import colors from 'colors'

const connectDb= async()=>{
    try {
        const con=mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connetion Success in host ${(await con).Connection.host}`.bgBlue.white)
        
    } catch (error) {
        console.log(`Eroor in MongoDb Connection ${error}`.bgRed.white)
    }

}
export default connectDb;