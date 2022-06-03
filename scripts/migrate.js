const db = require('../db')
const db2 = require('../db2.js')

;(async () => {
  try {
    await db.schema.dropTableIfExists('users')
    await db2.schema.dropTableIfExists('posts')
    await db.schema.withSchema('public').createTable('users', (table) => {
      table.increments('id')
      table.string('name')
    })
    await db2.schema.withSchema('public').createTable('posts', (table) => {
      table.increments('id')
      table.string('title')
      table.string('body')
    })
    console.log('Created users table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
