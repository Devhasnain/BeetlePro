const express = require('express');
const ServeImage = require('../controllers/public/ServeImage');
const router = express.Router();

router.get('/image/:id', ServeImage)


module.exports = router;