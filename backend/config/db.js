import dotenv from "dotenv"
import mongoose from "mongoose";


dotenv.config();

const connectDb = async () => {
    try {

        // console.log(process.env)

        // Connecting To Database
        const conn = await mongoose.connect("mongodb+srv://raahim:1218@library-app.bvqekej.mongodb.net/?retryWrites=true&w=majority")
    

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error("Error: " + error.message)
        process.exit(1)
    }
}

export default connectDb;