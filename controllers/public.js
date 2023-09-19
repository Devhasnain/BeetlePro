const express = require('express');
const GetUsers = require('../functions/public/getUsers');
const router = express.Router();

router.get('/users',GetUsers);


module.exports = router;