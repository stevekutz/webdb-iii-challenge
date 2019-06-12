

/*   DEFAULT SEED file
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
*/

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
 // return knex('cohorts').del()
 // truncate deletes all the data AND
 //    resets primary key back to one
  return knex('cohorts')     // !!!!  CHANGED tablename here
    .truncate() // changed to truncate !!!
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([   // !!! CHANGED tablename here
        {name: 'PT'},  // notice ids not needed
        {name: 'FULL TIME'},  // they are auto-generated
        {name: 'NightTime'},
        {name: 'Twilight'}
      ]);
    });
};