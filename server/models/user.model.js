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
    profilePicture:{
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Davatar&psig=AOvVaw2Zqt_nfujJlybDzVqBC-jv&ust=1712152490744000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCcppnXo4UDFQAAAAAdAAAAABAE'
    },
    avatar:{
        type: String,
    }
});

// Create User model
const User = mongoose.model("User", userSchema);

export default User;
