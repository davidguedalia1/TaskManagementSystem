"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjects = exports.createProject = void 0;
const project_1 = require("../models/project");
// The return type is Promise<void> to ensure no Response is returned directly
const createProject = async (req, res) => {
    var _a;
    const { name, description } = req.body;
    // Ensure req.user is available, and extract the user ID
    const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub; // 'sub' is the user's ID in the JWT payload
    if (!ownerId) {
        res.status(401).json({ message: 'Unauthorized: User ID missing' });
        return; // Ensure the function returns void after sending a response
    }
    try {
        const project = new project_1.Project({ name, description, owner: ownerId });
        await project.save();
        res.status(201).json(project);
        return; // Ensure the function returns void after sending a response
    }
    catch (error) {
        res.status(400).json({ message: 'Project creation failed', error });
        return; // Ensure the function returns void after sending a response
    }
};
exports.createProject = createProject;
// Get a project by ID
const getProjects = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page
    const pageNum = parseInt(page); // Parse page number
    const limitNum = parseInt(limit); // Parse limit number
    try {
        // Fetch projects with pagination
        const projects = await project_1.Project.find()
            .limit(limitNum)
            .skip((pageNum - 1) * limitNum); // Skip projects for pagination
        const totalProjects = await project_1.Project.countDocuments(); // Total number of projects
        res.status(200).json({
            projects,
            totalPages: Math.ceil(totalProjects / limitNum), // Total number of pages
            currentPage: pageNum, // Current page number
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve projects' });
    }
};
exports.getProjects = getProjects;
// Update a project
const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedProject = await project_1.Project.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedProject) {
            res.status(404).json({ message: 'Project not found' });
            return; // Ensure the function returns void after sending the response
        }
        res.status(200).json(updatedProject);
        return; // Ensure the function returns void after sending the response
    }
    catch (error) {
        res.status(400).json({ message: 'An unknown error occurred' });
        return; // Ensure the function returns void after sending the response
    }
};
exports.updateProject = updateProject;
// Delete a project
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await project_1.Project.findByIdAndDelete(id);
        if (!deletedProject) {
            res.status(404).json({ message: 'Project not found' });
            return; // Ensure the function returns void after sending the response
        }
        res.status(200).json({ message: 'Project deleted successfully' });
        return; // Ensure the function returns void after sending the response
    }
    catch (error) {
        res.status(500).json({ message: 'An unknown error occurred' });
        return; // Ensure the function returns void after sending the response
    }
};
exports.deleteProject = deleteProject;
