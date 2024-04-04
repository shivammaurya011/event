import express from 'express';
import { signup, signin, signout, profile, allUsers, updateUser, deleteUser, google } from '../controllers/user.controller.js';
import { isSignin, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/google', google)

// Protected routes
router.get('/allUsers', isSignin, isAdmin, allUsers);
router.get('/:userId', isSignin, profile);
router.put('/:userId', isSignin, updateUser);
router.delete('/:userId', isSignin, isAdmin, deleteUser);

export default router;
