const knex = require('knex')(require('../knexfile'));
const express = require('express');
const router = express.Router();

// GET ALL BONDS ENDPOINT

// router.get('/', async (req, res) => {
//   const bonds = await knex('bonds');
//   res.json(bonds);
// });

router.get('/', (req, res) => {
  res.send('ciao bello!');
});

module.exports = router;
