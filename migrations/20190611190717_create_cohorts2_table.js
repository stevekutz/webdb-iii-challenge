
exports.up = function(knex, Promise) {
  // we create a table for cohorts
    return knex.schema.createTable('cohorts2', function(tbl) {
        // pk called id, auto-incr, int   >> tbl.icrements()  DOES THIS !!!
        tbl.increments();

        // varchar called name, 128 long, unique, not null
        tbl.string('name', 128)
        .unique()
        .notNullable();
        
    })
};

exports.down = function(knex, Promise) {
      // remove table with drop
      return knex.schema.dropTableIfExists('cohorts2');
};
 