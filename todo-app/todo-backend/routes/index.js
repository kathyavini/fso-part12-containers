const express = require('express');
const router = express.Router();

const configs = require('../util/config');

const redis = require('../redis');

let visits = 0;

let redisTestCounter = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

/* Exercise 12.10 - Query Redis for number of added todos */
router.get('/statistics', async (req, res) => {
  const result = await redis.getAsync('added_todos');

  res.send({
    added_todos: result || 0, // returns null when key is missing
  });
});

module.exports = router;
