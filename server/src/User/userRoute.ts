import express from 'express';
import { registerUser, loginUser } from './userController';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;