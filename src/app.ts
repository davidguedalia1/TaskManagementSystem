import express from 'express';
import logger from './middlewares/loggerMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(express.json());

app.use(logger);

// Routes
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use(errorMiddleware);
export default app;
