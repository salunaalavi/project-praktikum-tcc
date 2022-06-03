const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db2',
    user: 'docker',
    password: '123456',
    database: 'docker',
  },
})
