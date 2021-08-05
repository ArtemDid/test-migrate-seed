
exports.up = function(knex) {
  return knex.schema.createTable('cars', function (table) {
    table.increments('id').primary()
    table.string('cars').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
