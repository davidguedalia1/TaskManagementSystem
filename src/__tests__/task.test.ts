import request from 'supertest';
import app from '../app';

describe('Task Tests', () => {
  let authToken: string;
  let projectId: string;

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
    await request(app)
      .post('/register')
      .send(testUser);

    const loginRes = await request(app)
      .post('/login')
      .send(testUser);

    authToken = loginRes.body.token;

    const projectRes = await request(app)
      .post('/projects')
      .set('Authorization', 'Bearer ${authToken}')
      .send(testProject);

    projectId = projectRes.body._id;
  });

  describe('Task Management', () => {
    it('should create a new task', async () => {
      const res = await request(app)
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
      const res = await request(app)
        .get('/tasks/${projectId}')
        .set('Authorization', 'Bearer ${authToken}');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.tasks)).toBe(true);
    });

    it('should update task status', async () => {
      // First create a task
      const createRes = await request(app)
        .post('/tasks')
        .set('Authorization', 'Bearer ${authToken}')
        .send({ ...testTask, projectId });

      const taskId = createRes.body._id;

      // Then update its status
      const updateRes = await request(app)
        .put('/tasks/${taskId}')
        .set('Authorization', 'Bearer ${authToken}')
        .send({ status: 'in-progress' });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.status).toBe('in-progress');
    });
  });
});