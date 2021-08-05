
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {firstName:'wwww',lastName:'hhh', email:'yyy', password: 'ooooo', googleId: 'fff'},
        {firstName:'qqqq',lastName:'xxx', email:'ddd', password: 'sss', googleId: 'kkk'},

      ]);
    });
};
