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

// SETUP environment
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);