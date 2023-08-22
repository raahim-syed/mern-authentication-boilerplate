import jwt from "jsonwebtoken"

import asyncHandler from "express-async-handler"

import { User } from "../models/User.js"

/**
 * @desc Protects routes from users who do not have a JWT token.
 */
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET || "1234")

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            res.status(401)
            throw new Error("Invalid Token!")
        }
    }else{
        res.status(401);
        throw new Error("Not authorized, token not found!")
    }
})


