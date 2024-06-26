import User from "../models/user.model.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const tokenData = {
            userId: user._id,
            email: user.email,
            role: user.role
        };
        const token = jwt.sign(tokenData, secretKey, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000, 
        });
        res.status(200).json({ message: "Signin successful", user });
    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            // If user exists, generate token and send it in response
            const tokenData = {
                userId: user._id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(tokenData, secretKey, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000, // 1 hour
            });
            res.status(200).json({ message: "Signin successful", user });
        } else {
            // If user doesn't exist, create new user
            const hashedPassword = await generatePassword();
            const newUser = new User({
                fullName: name,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl // Assuming your user model has a field for profile picture
            });
            await newUser.save();

            // Generate token for new user
            const tokenData = {
                userId: newUser._id,
                email: newUser.email,
                role: newUser.role
            };
            const token = jwt.sign(tokenData, secretKey, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000, // 1 hour
            });
            res.status(201).json({ message: "User created successfully", user: newUser });
        }
    } catch (error) {
        console.error("Error in Google authentication:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Signout successful" });
};

const profile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error in allUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ message: "Email address already exists" });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error in updateUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Error in deleteUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const generatePassword = async () => {
    try {
        const randomString = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomString, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Error generating password:", error);
        throw error;
    }
};

export { signup, signin, google, signout, profile, allUsers, updateUser, deleteUser };
