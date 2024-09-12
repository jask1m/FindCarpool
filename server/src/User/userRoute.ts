import express from 'express';
import { registerUser, loginUser, refreshToken, logoutUser } from './userController';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);

module.exports = router;