const express = require('express');
const GetUsers = require('../functions/public/getUsers');
const ServeImage = require('../controllers/public/ServeImage');
const router = express.Router();

router.get('/users',GetUsers);
router.get('/image/:id', ServeImage)


module.exports = router;