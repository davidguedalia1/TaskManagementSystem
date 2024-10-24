import { Router } from 'express';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projectController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', isAuthenticated, createProject);

router.get('/', isAuthenticated, getProjects);

router.put('/:id', isAuthenticated, updateProject);

router.delete('/:id', isAuthenticated, deleteProject);

export default router;
