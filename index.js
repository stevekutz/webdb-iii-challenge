const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const port = process.env.PORT || 5002;   // PORT location defined


// SET LOCATION of knexfile to ROOT
const knexConfig = require('./knexfile.js');

// DEFINE how we access db
const db = knex(knexConfig.development);

// DEFINE express app as server
const server = express();  

// 
server.use(helmet());
server.use(express.json());

// DEFINE ENDPOINTS   >>>>>>>>>>>>>>>>>>>>>>>>     cohorts
// list cohorts
server.get('/api/cohorts', async (req, res) => {
    // get the cohort from the database
    try {
      const cohorts = await db('cohorts'); // GET all the records from the table
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json(error);
    }
  });


// list a cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
    // get the cohort by from the database
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
// list ALL STUDENTS in a cohort with given idS
server.get('/api/cohorts/:id/students', async (req, res) => {
    try {   
        const {id} = req.params;
        const students = await db('students')
            .where('cohort_id', id);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json(error);
      }
  });



// add cohort
server.post('/api/cohorts', async (req, res) => {
    try {
      const [id] = await db('cohorts').insert(req.body);
  
      const cohort = await db('cohorts')
        .where({ id })
        .first();
  
      res.status(201).json(cohort);
    } catch (err) {
      res.status(500).json({ err });
    }
  });


// update cohorts
server.put('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const cohort = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'COHORT not found' });
      }
    } catch (error) {}
  });
  
  // remove cohort
  server.delete('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204)
        .json({messsage: ` cohort with id ${id } removed `})   // Message never shows up
        .end();
      } else {
        res.status(404).json({ message: `COHORT can't be deleted, not found` });
      }
    } catch (error) {}
  });


// DEFINE ENDPOINTS   >>>>>>>>>>>>>>>>>>>>>>>>     students
// list students
server.get('/api/students', async (req, res) => {
    // get the students from the database
    try {
      const students = await db('students'); // GET all the records from the table
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });


// list a cohort by id
server.get('/api/students/:id', async (req, res) => {
    // get the student by id from the database
    try {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  




// add student
server.post('/api/students', async (req, res) => {
    try {
      const [id] = await db('students').insert(req.body);
  
      const student = await db('students')
        .where({ id })
        .first();
  
      res.status(201).json(student);
    } catch (err) {
      res.status(500).json({ err });
    }
  });


// update cohorts
server.put('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const student = await db('students')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'That STUDENT not found' });
      }
    } catch (error) {}
  });
  
  // remove roles (inactivate the role)
  server.delete('/api/students/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const count = await db('students')
        .where({ id: id })
        .del();
  
      if (count > 0) {
        res.status(204)
        .json({messsage: ` The STUDENT with id ${id } removed `})   // WHY THIS not show message?
        .end();
      } else {
        res.status(404).json({ message: `STUDENT can't be deleted, not found` });
      }
    } catch (error) {}
  });






// SETUP environment
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);


// Create cohorts table
// yarn knex


// seed cohorts table
// yarn knex seed:make 01-roles
// yarn knex seed:run

// Create students table
// yarn knex migrate:make students_table
    // update the code in latest migrations that references students

    // yarn knex migrate:latest


// yarn knex seed:make 01-students


// yarn knex seed:run