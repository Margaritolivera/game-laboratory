const express = require('express');
const { getProgress, saveProgress, resetProgress } = require('../controllers/gameController.js');

const router = express.Router();

router.get('/:userId', getProgress); 
router.post('/', saveProgress); 
router.put('/reset/:userId', resetProgress); 

module.exports = router;
