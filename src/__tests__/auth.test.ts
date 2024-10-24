import request from 'supertest';
import app from '../app';

describe('Authentication Tests', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Test123!'
  };

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(testUser);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should not register user with invalid email', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ ...testUser, email: 'invalid-email' });
      expect(res.status).toBe(400);
    });
  });

  describe('User Login', () => {
    beforeAll(async () => {
      // Register a user before testing login
      await request(app)
        .post('/auth/register')
        .send(testUser);
    });

    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send(testUser);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with wrong password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ ...testUser, password: 'wrongpass' });
      
      expect(res.status).toBe(401);
    });
  });
});