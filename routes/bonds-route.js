const express = require('express');
const router = express.Router();
const responseController = require('../controller/response-controller');

router.route('/').get(responseController.getAll);
router.route('/detail/:id').get(responseController.getOne);

module.exports = router;
