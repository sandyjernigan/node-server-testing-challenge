const request = require('supertest');
const db = require('../../data/dbConfig.js');

const router = require('./auth-router.js');
const Users = require('../users/users-model.js');

describe('Auth Router', () => {

  beforeEach(async () => {
    // wipe the database
    await db('users').truncate();
  })

  // Add Testing for GET /api/auth/register
  describe('POST /api/auth/register', () => {
        
    it('should return status 201', () => {

      // test setup
      const testunit = {
        username: 'user',
        password: 'pass',
        role: 'role'
      };

      request(router)
        .post('/register')
        .send(testunit)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, testunit);
    })

  });

});