"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Task Tests', () => {
    let authToken;
    let projectId;
    const testUser = {
        email: 'test@example.com',
        password: 'Test123!'
    };
    const testProject = {
        name: 'Test Project',
        description: 'Test Description'
    };
    const testTask = {
        title: 'Test Task',
        description: 'Task Description',
        status: 'todo'
    };
    beforeAll(async () => {
        // Setup: Register, login, and create a project
        await (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send(testUser);
        const loginRes = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send(testUser);
        authToken = loginRes.body.token;
        const projectRes = await (0, supertest_1.default)(app_1.default)
            .post('/projects')
            .set('Authorization', 'Bearer ${authToken}')
            .send(testProject);
        projectId = projectRes.body._id;
    });
    describe('Task Management', () => {
        it('should create a new task', async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .post('/tasks')
                .set('Authorization', 'Bearer ${authToken}')
                .send({ ...testTask, projectId });
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                title: testTask.title,
                description: testTask.description,
                status: testTask.status
            });
        });
        it('should get all tasks for a project', async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .get('/tasks/${projectId}')
                .set('Authorization', 'Bearer ${authToken}');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.tasks)).toBe(true);
        });
        it('should update task status', async () => {
            // First create a task
            const createRes = await (0, supertest_1.default)(app_1.default)
                .post('/tasks')
                .set('Authorization', 'Bearer ${authToken}')
                .send({ ...testTask, projectId });
            const taskId = createRes.body._id;
            // Then update its status
            const updateRes = await (0, supertest_1.default)(app_1.default)
                .put('/tasks/${taskId}')
                .set('Authorization', 'Bearer ${authToken}')
                .send({ status: 'in-progress' });
            expect(updateRes.status).toBe(200);
            expect(updateRes.body.status).toBe('in-progress');
        });
    });
});
