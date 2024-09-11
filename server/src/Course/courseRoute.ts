import express from 'express';
import { createCourse } from './courseController';
const router = express.Router();

router.post('/create', createCourse);

module.exports = router;
