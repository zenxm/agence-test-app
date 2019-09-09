import express from 'express';
import userRoutes from './user.route';

const router = express.Router();

// mount user routes at /users
router.use('/users', userRoutes);

export default router;
