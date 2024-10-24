// src/tests/project.test.ts
import request from 'supertest';
import app from '../app';

describe('Project Tests', () => {
  let authToken: string;

  const testUser = {
    email: 'davidgued8@gmail.com',
    password: 'Userpassword123!',
  };

  const testProject = {
    name: 'Test Project',
    description: 'Test Description',
  };

  beforeAll(async () => {
    const loginRes = await request(app).post('/auth/login').send(testUser);
    console.log('/auth/login response:', JSON.stringify(loginRes.body, null, 2));
    
    // Ensure login was successful
    expect(loginRes.status).toBe(200);
    authToken = loginRes.body.AuthenticationResult.AccessToken;
    console.log('authToken:', authToken);
  });

  describe('Project Management', () => {
    // Increase the timeout limit for these long-running async tests
    it('should create a new project', async () => {
      const res = await request(app)
        .post('/projects')
        .set('Authorization', `Bearer ${authToken}`) // Use correct template string syntax
        .send(testProject);

      console.log('create a new project response:', JSON.stringify(res.body, null, 2));
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        name: testProject.name,
        description: testProject.description,
      });
    }, 10000); // Set custom timeout of 10 seconds for the test

    it('should get all projects', async () => {
      const res = await request(app)
        .get('/projects')
        .set('Authorization', `Bearer ${authToken}`); // Correct template string

      console.log('get all projects response:', JSON.stringify(res.body, null, 2));
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.projects)).toBe(true);
    }, 10000); // Set custom timeout of 10 seconds for the test
  });
});
