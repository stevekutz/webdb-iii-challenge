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

/*
 /Users/skutz/Documents/GitHub/webdb-iii-challenge/node_modules/.bin/knex seed:run
Using environment: development
sqlite does not support inserting default values. 
Set the `useNullAsDefault` flag to hide this warning. (see docs http://knexjs.org/#Builder-insert).
Error: Error while executing "/Users/skutz/Documents/GitHub/webdb-iii-challenge/seeds/01-students.js" seed: 
`sqlite` does not support inserting default values. Specify values explicitly or use the `useNullAsDefault` config flag. 
(see docs http://knexjs.org/#Builder-insert).
*/


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
 // return knex('students').del()
 // truncate deletes all the data AND
 //    resets primary key back to one
  return knex('students')     // !!!!  CHANGED tablename here
    .truncate() // changed to truncate !!!
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([   // !!! CHANGED tablename here
        {name: 'Myron', cohort_id: 1},     
        {name: 'Melvin', cohort_id: 1}, 
        {name: 'Dexter', cohort_id: 2},
        {name: 'Norman', cohort_id: 3}
      ]);           //  .into('students');  // does not help


    });
};
