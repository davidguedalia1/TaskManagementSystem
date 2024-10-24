"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Create a new task within a project
router.post('/', authMiddleware_1.isAuthenticated, taskController_1.createTask);
// Get all tasks for a project
router.get('/:projectId', authMiddleware_1.isAuthenticated, taskController_1.getTasks);
// Update an existing task
router.put('/:id', authMiddleware_1.isAuthenticated, taskController_1.updateTask);
// Delete a task
router.delete('/:id', authMiddleware_1.isAuthenticated, taskController_1.deleteTask);
exports.default = router;
