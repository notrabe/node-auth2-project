const cleaner = require('knex-cleaner')

function cleanTalbes(knex) {
  return cleaner 
    .clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
    .then(() => console.log('All tables truncated, ready to seed'))
}
exports.seed = function(knex) {
  if(knex.client.config.client === 'sqlite3') {
    return knex.raw('PRAGMA foreign_keys = OFF').then(() => cleanTalbes(knex))
  } else {
    return cleanTalbes(knex)
  }
};
