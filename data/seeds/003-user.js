
exports.seed = function(knex) {

  const users = [
    {
      username: 'admin',
      password: 'password', 
      role: 1
    },
    {
      username: 'user',
      password: 'password',
      role: 2
    },
  ]

  return knex('users')
  .del()
  .insert(users)
    .then(function () {
      console.log('Seed data for users table has been added.')
    });
};
