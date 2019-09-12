const request = require('supertest');
const db = require('../data/dbConfig.js');

const server = require('./server.js');

describe('Server', () => {

  beforeEach(async () => {
    // wipe the database
    await db('users').truncate();
  })

  describe('GET /', () => {
    it('should run the testing env', () => {
      expect(process.env.DB_ENV).toBe('testing');
    })
    
    it('should return status 200', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    })
  });

});