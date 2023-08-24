const express = require('express');
const router = express.Router();
const responseController = require('../controller/response-controller');

router.route('/').get(responseController.getAll);

module.exports = router;
