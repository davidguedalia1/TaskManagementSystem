import { Request, Response } from 'express';
import { Task } from '../models/task';

/**
 * Creates a new task under a specified project.
 * Responds with 201 on success, or 400 on failure.
 */
export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, projectId } = req.body;
  const ownerId = req.user;

  try {
    const task = new Task({ title, description, status, projectId, owner: ownerId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Task creation failed', error });
  }
};

/**
 * Retrieves tasks for a specific project with pagination.
 * Defaults to page 1, limit 10. Responds with 200 on success or 500 on failure.
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params; 
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  try {
    const tasks = await Task.find({ projectId })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const totalTasks = await Task.countDocuments({ projectId });

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(totalTasks / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
};

/**
 * Updates a task by its ID. Responds with 200 if updated, 404 if not found, or 400 on failure.
 */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Task update failed', error });
  }
};

/**
 * Deletes a task by its ID. Responds with 200 if deleted, 404 if not found, or 400 on failure.
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Task deletion failed', error });
  }
};
