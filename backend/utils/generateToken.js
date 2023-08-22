import jwt from 'jsonwebtoken'


const generateToken = (res, userId) => {
    // Creating The JWT Token
    const token = jwt.sign({userId}, process.env.SECRET || "1234", {
        expiresIn: "30d"
    })

    // Sending It As A HTTP Cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60,
    })
}

export default generateToken;