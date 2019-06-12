
exports.up = function(knex, Promise) {
          // we created students table
          return knex.schema.createTable('students', tbl => {
            // pk called id, auto-incr, int   >> tbl.icrements()  DOES THIS !!!
            tbl.increments();
        
            // varchar called name, 128 long, unique, not null
            tbl.string('name', 128)
                .unique()
                .notNullable();
            // FOREIGN key 'cohort_id' in students 
            // to access PRIMARY key 'id' in cohorts    
            tbl.integer('cohort_id').unsigned()
                .references('id').inTable('cohorts')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');    
          })
};

exports.down = function(knex, Promise) {
  // remove table with drop
  return knex.schema.dropTableIfExists('students');   //   !!!!! 
};
