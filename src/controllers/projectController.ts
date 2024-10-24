import { Request, Response } from 'express';
import { Project } from '../models/project';

/**
 * Creates a new project for the authenticated user.
 * Responds with 201 on success, or 400/401 on failure.
 */
export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const ownerId = req.user?.sub;
  if (!ownerId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const project = new Project({ name, description, owner: ownerId });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Project creation failed', error });
  }
};

/**
 * Retrieves paginated list of projects. Defaults to page 1, limit 10.
 * Responds with 200 on success or 500 on failure.
 */
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  try {
    const projects = await Project.find().limit(limitNum).skip((pageNum - 1) * limitNum);
    const totalProjects = await Project.countDocuments();
    res.status(200).json({ projects, totalPages: Math.ceil(totalProjects / limitNum), currentPage: pageNum });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve projects' });
  }
};

/**
 * Updates a project by ID. Responds with 200 if updated, 404 if not found, or 400 on error.
 */
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};

/**
 * Deletes a project by ID. Responds with 200 if deleted, 404 if not found, or 500 on error.
 */
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
