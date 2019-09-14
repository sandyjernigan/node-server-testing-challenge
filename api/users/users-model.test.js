// Testing for users model
const request = require('supertest');
const db = require('../../data/dbConfig.js');

// Server file
const Users = require('./users-model.js');

describe('Users Model', () => {

  beforeEach(async () => {
    // wipe the database
    await db('users').truncate()
  })

  // test find users
  describe('find users', () => {
    it('test find', async () => {
      const results = await Users.find()

      // users database will be empty
      expect(results).toEqual([])
    })
  })

});