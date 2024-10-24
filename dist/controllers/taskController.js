"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const task_1 = require("../models/task");
/**
 * Create a task within a project
 */
const createTask = async (req, res) => {
    const { title, description, status, projectId } = req.body;
    const ownerId = req.user;
    try {
        const task = new task_1.Task({ title, description, status, projectId, owner: ownerId });
        await task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ message: 'Task creation failed', error });
    }
};
exports.createTask = createTask;
/**
 * Get all tasks for a project
 */
const getTasks = async (req, res) => {
    const { projectId } = req.params; // Extract projectId from request parameters
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    try {
        // Fetch tasks with pagination using `limit` and `skip`
        const tasks = await task_1.Task.find({ projectId })
            .limit(limitNum)
            .skip((pageNum - 1) * limitNum); // Skip items for pagination
        const totalTasks = await task_1.Task.countDocuments({ projectId }); // Total number of tasks for this project
        res.status(200).json({
            tasks,
            totalPages: Math.ceil(totalTasks / limitNum),
            currentPage: pageNum,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
};
exports.getTasks = getTasks;
/**
 * Update a task
 */
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        // Temporarily remove the owner check to see if the task can be found by ID alone
        const task = await task_1.Task.findOneAndUpdate({ _id: id }, { title, description, status }, { new: true });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
        return;
    }
    catch (error) {
        res.status(400).json({ message: 'Task update failed', error });
        return;
    }
};
exports.updateTask = updateTask;
/**
 * Delete a task
 */
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        // Remove the owner check and delete the task by its ID only
        const task = await task_1.Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return; // Ensure the function returns void after sending the response
        }
        res.status(200).json({ message: 'Task deleted successfully' });
        return; // Ensure the function returns void after sending the response
    }
    catch (error) {
        res.status(400).json({ message: 'Task deletion failed', error });
        return; // Ensure the function returns void after sending the response
    }
};
exports.deleteTask = deleteTask;
