import dotenv from "dotenv"
import express from "express"
import connectDb from "./config/db.js"

// Custom Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

// Router Routes
import userRoutes from  "./routes/userRoutes.js"
import cookieParser from "cookie-parser"

/**
 * Main Server Configuration ==================================
*/

// Connecting to database
connectDb();

// Setting up environment variables
dotenv.config()

const port = process.env.PORT || 5000;

// Express ap instantiation
const app = express()

// Form Data Processing Middleware (Body Parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Router Middleware
app.use("/api/users/", userRoutes);

// Basic Routes
app.get("/", (req, res) => {
    res.send("Server Ready")
})

// Error Middleware
app.use(notFound)
app.use(errorHandler)


app.listen(port, 
    () => console.log(`Started on port: ${port}`)
)