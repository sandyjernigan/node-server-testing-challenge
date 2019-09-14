const request = require('supertest');
const db = require('../../data/dbConfig.js');

const router = require('./auth-router.js');
const Users = require('../users/users-model.js');

describe('Auth Router', () => {

  beforeEach(async () => {
    // wipe the database
    await db('users').truncate();
  })

  // Add Testing for POST /api/auth/register
  describe('POST /api/auth/register', () => {
        
    it('test register', () => {

      // test setup
      const addUser = {
        username: 'user',
        password: 'pass',
        role: 'role'
      };

      request(router)
        .post('/register')
        .type('application/json')
        .send(addUser)
        .expect(201);
    })

  });

  // Add Testing for POST /api/auth/login
  describe('POST /api/auth/login', () => {
        
    it('test login', () => {

      // test setup
      const loginUser = {
        username: 'user',
        password: 'pass',
        role: 'role'
      };

      request(router)
        .post('/login')
        .send(loginUser)
        .set('Accept', 'application/json')
        .expect(200, loginUser);
        
    })

  });
});