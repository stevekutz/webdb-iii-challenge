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

// DEFINE ENDPOINTS
// list cohorts
server.get('/api/cohorts', async (req, res) => {
    // get the roles from the database
    try {
      const cohorts = await db('cohorts'); // GET all the records from the table
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json(error);
    }
  });


// list a cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
    // get the roles from the database
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
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
  
  // remove roles (inactivate the role)
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





// SETUP environment
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);


// Create cohorts table
// yarn knex


// seed cohorts table
// yarn knex seed:make 01-roles
// yarn knex seed:run