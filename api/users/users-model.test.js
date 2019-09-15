// Testing for users model
const request = require('supertest');
const db = require('../../data/dbConfig.js');

// Server file
const Users = require('./users-model.js');

// test setup content
const insertData = { 
  username: 'user', 
  password: 'testpass', 
  role: 'admin' 
};
const expectedResultsForUser = { 
  id: 1,
  username: 'user', 
  role: 'admin' 
};

describe('Users Model', () => {

  beforeEach(async () => {
    // wipe the database
    await db('users').truncate()
  })

  // test find users
  describe('function find', () => {
    it('find users', async () => {
      const results = await Users.find()

      // users database will be empty
      expect(results).toEqual([])
    })
  })
  
  // test add user
  describe('function add', () => {
    it('add(user) should resolve to length 1 for database', async () => {
      await Users.add(insertData)

      // assertion
      const results = await db('users');
      expect(results.length).toBe(1);
      expect(results[0].username).toBe('user');
    });

    it('should resolve to the newly created user', async () => {
      const user = await Users.add(insertData);
      expect(user).toEqual({ id: 1, username: 'user', role: 'admin'});
    });
  });
  
  // test findById(id) user
  describe('function findById(id)', () => {
    it('findById(id) should resolve to 1 user', async () => {
      await db('users').insert(insertData);

      // findById(id)
      const user = await Users.findById(1)

      // assertion
      const results = await db('users');
      expect(results.length).toBe(1);
      expect(user).toEqual(expectedResultsForUser);
      
    });
  });

});