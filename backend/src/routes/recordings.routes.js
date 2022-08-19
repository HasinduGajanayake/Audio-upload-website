const express = require('express');
const router = express.Router();

let recordingsController = require('../controllers/recording.controller');

router.get('/', recordingsController.getFiles);
router.post('/', recordingsController.uploadFiles);


module.exports = router;