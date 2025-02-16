import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const payload = {
        userId
    };

    const options = {
        expiresIn: "7d",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })

    return token;
};