import express from 'express';
import { createCourse, dummyRoute } from './courseController';
const router = express.Router();

router.post('/create', createCourse);
router.get('/dummy', dummyRoute);

module.exports = router;
