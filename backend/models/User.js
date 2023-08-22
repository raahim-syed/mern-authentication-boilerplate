import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true }
) 

// Middleware: Before the data is save to database, this is run.
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    // Hashing and Saving the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Adding Custom Methods To Our User Schema
userSchema.methods.checkPassword = async function(password){
    return bcrypt.compare(password, this.password)
}

export const User = model("User", userSchema)