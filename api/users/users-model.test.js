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
      
      // find() -- all users
      const results = await Users.find()

      // users database should be empty
      expect(results).toEqual([])
    })
  })
  
  // test add user
  describe('function add', () => {
    it('add(user) should resolve to length 1 for database', async () => {
      
      // add(user) - insert user into database
      await Users.add(insertData)

      // assertion
      const results = await db('users');
      expect(results.length).toBe(1);
      expect(results[0].username).toBe('user');
    });

    it('should resolve to the newly created user', async () => {

      // add(user) - insert user into database
      const user = await Users.add(insertData);
      expect(user).toEqual({ id: 1, username: 'user', role: 'admin'});
    });
  });
  
  // test findById(id) user
  describe('function findById(id)', () => {
    it('findById(id) should resolve to 1 user', async () => {
      await db('users').insert(insertData);

      // findById(id) -- search database where({ id })
      const user = await Users.findById(1)

      // assertion
      const results = await db('users');
      expect(results.length).toBe(1);
      expect(user).toEqual(expectedResultsForUser);
    });
  });
  
  // test findBy(filter)
  describe('function findBy(filter)', () => {
    it('findBy(filter) should resolve to 1 user when searching username', async () => {
      await db('users').insert(insertData);
      await db('users').insert({username: 'user2', password: 'testpass2', role: 'standard'});
      await db('users').insert({username: 'user3', password: 'testpass3', role: 'intern'});

      username = { username: 'user' }

      // findBy(filter) -- search database where({ username })
      const user = await Users.findBy(username)

      // assertion
      expect(user.length).toBe(1);
      expect(user).toEqual([expectedResultsForUser]);
    });
    
    it('findBy(filter) should resolve to 2 users when searching role', async () => {
      await db('users').insert(insertData);
      await db('users').insert({username: 'user2', password: 'testpass2', role: 'standard'});
      await db('users').insert({username: 'user3', password: 'testpass3', role: 'admin'});

      role = { role: 'admin' }

      // findBy(filter) -- search database where({ role: 'admin' })
      const results = await Users.findBy(role)

      // assertion
      expect(results.length).toBe(2);
      expect(results[0]).toEqual(expectedResultsForUser);
      expect(results[1].username).toEqual('user3');
    });
  });

});