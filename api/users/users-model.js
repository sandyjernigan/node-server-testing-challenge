const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

// TODO: Add Testing for endpoints
function find() {
  return db('users')
    .select('id', 'username', 'role');
}

function findBy(filter) {
  return db('users')
    .select('id', 'username', 'role')
    .where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'role')
    .where({ id })
    .first();
}