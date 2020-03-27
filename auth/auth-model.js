const db = require('../database/dbConfig')

module.exports = {
  get,
  getBy,
  add
}

function get(id) {
  return db('users')
}

function getBy(filter) {
  return db('users')
    .where(filter)
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id')
  return getBy({ id }).first()
}