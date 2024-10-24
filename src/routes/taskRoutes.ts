import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', isAuthenticated, createTask);

router.get('/:projectId', isAuthenticated, getTasks);

router.put('/:id', isAuthenticated, updateTask);

router.delete('/:id', isAuthenticated, deleteTask);

export default router;
