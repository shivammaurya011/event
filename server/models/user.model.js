import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role:{
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar:{
        type: String,
    }
});

// Create User model
const User = mongoose.model("User", userSchema);

export default User;
