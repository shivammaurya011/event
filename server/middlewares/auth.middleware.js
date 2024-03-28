import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const isSignin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: User not signed in" });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

const isAdmin = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
        return res.status(403).json({ message: "Forbidden: User is not an admin" });
    }
    next();
};

export { isSignin, isAdmin };
