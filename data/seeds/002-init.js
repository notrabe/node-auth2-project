
exports.seed = function(knex) {

  const roles = [
    {name: 'admin'},
    {name: 'user'}
  ]

  return knex('roles')
    .insert(roles)
    .then(function () {
      console.log('Seed data has been added.')
    });
};
