import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './config/db.js';
import userRoute from './routes/user.route.js';

dotenv.config()
const port = process.env.PORT || 3031

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);


// Server
app.listen(port, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
});
