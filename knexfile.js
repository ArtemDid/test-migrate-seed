// Update with your config settings.
const path = require('path')

module.exports = {

  development: {
    client: 'mysql',
    // connection: 'mysql://localhost:3306/testDB',
    connection: {
      database: 'newDB',
      user:     'new_user',
      password: '1234asdfA/',
      host: 'localhost',
      port: 3306,
      insecureAuth: true

    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, './db/migrations'),
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'testDB',
      user: 'my_user',
      password: '12345678'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
