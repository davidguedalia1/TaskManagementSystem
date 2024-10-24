import { Router } from 'express';
import { login, register, confirmRegistration } from '../controllers/authController';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.post('/confirm-registration', confirmRegistration);


export default router;
