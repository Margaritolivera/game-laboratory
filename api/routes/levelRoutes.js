const express = require('express');
const router = express.Router();
const { createLevel, getAllLevels, getLevelById, updateLevel, deleteLevel,} = require('../controllers/levelController');

router.post('/levels', createLevel);

router.get('/levels', getAllLevels);

router.get('/levels/:id', getLevelById);

router.put('/levels/:id', updateLevel);

router.delete('/levels/:id', deleteLevel);

module.exports = router;
