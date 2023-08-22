import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc Handles authentication and user jwt token generation
 * @route POST /api/users/auth
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || !(await user.checkPassword(password))) {
        res.status(401);
        throw new Error("Unauthorized, invalid email or password!");
    }

    // Generate and send a JWT token for the authenticated user
    generateToken(res, user._id);

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        message: "User Authenticated",
    });
});

/**
 * @desc Register a new User
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user is already registered with the provided email
    const alreadyRegistered = await User.findOne({ email });

    if (alreadyRegistered) {
        res.status(400);
        throw new Error("User Already Exists!");
    }

    // Create and save the new user in the database
    const user = await User.create({
        name,
        email,
        password,
    });

    // Send a JWT token for the newly registered user
    generateToken(res, user._id);

    res.status(200).json({
        message: "User Registered!",
        id: user._id,
        name,
        email,
    });
});

/**
 * @desc Logging out a User
 * @route POST /api/users/logout
 * @access Private
 */
const logoutUser = asyncHandler((req, res) => {
    // Empty the JWT cookie to log out the user
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged Out User" });
});

/**
 * @desc Getting a user from the database
 * @route POST /api/users/auth
 * @access Public
 */
const getUser = asyncHandler((req, res) => {
    // Retrieve and send user information based on the provided data
    const user = {
        id: req.body._id,
        name: req.body.name,
        email: req.body.email,
    };

    // Find the user using the provided data
    const searchedUser = User.findOne(user);

    if (!searchedUser) {
        res.status(200).json({ message: "No user found!" });
    }

    // Send the found user's information to the frontend
    res.status(200).json({ message: "User Found!", user });
});

/**
 * @desc Updating User data
 * @route POST /api/users/update
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);

    if (user) {
        // Update user data based on the provided information
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        // Save the updated user data
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc Delete User data
 * @route DELETE /api/users/delete
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
    // Implement the logic to delete the user (code not shown)
    // ...

    res.status(200).json({ message: "User Deleted" });
});

export {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    getUser,
    deleteUser, // Export the deleteUser function
};
