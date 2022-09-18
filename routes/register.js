const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/', registerController.handleNewUser);
console.log("Register1");

module.exports = router;