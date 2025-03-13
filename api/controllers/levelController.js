const { Level } = require('../models/levelModel');

const createLevel = async (req, res) => {
  const { description, regexPattern, difficulty } = req.body;

  if (!description || !regexPattern || !difficulty) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newLevel = await Level.create({ 
      description, 
      regexPattern, 
      difficulty 
    });

    return res.status(201).json({
      message: 'Level created successfully',
      level: newLevel,
    });
  } catch (error) {
    console.error('Error creating level:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.findAll();

    return res.status(200).json(levels);
  } catch (error) {
    console.error('Error getting levels:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getLevelById = async (req, res) => {
  const { id } = req.params;

  try {
    const level = await Level.findByPk(id);

    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }

    return res.status(200).json(level);
  } catch (error) {
    console.error('Error getting level:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLevel = async (req, res) => {
  const { id } = req.params;
  const { description, regexPattern, difficulty } = req.body;

  try {
    const level = await Level.findByPk(id);

    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }

    if (description !== undefined) level.description = description;
    if (regexPattern !== undefined) level.regexPattern = regexPattern;
    if (difficulty !== undefined) level.difficulty = difficulty;

    await level.save();

    return res.status(200).json({
      message: 'Level updated successfully',
      level,
    });
  } catch (error) {
    console.error('Error updating level:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteLevel = async (req, res) => {
  const { id } = req.params;

  try {
    const level = await Level.findByPk(id);

    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }

    await level.destroy();

    return res.status(200).json({ message: 'Level deleted successfully' });
  } catch (error) {
    console.error('Error deleting level:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createLevel,
  getAllLevels,
  getLevelById,
  updateLevel,
  deleteLevel,
};
