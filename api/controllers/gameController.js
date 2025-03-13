const { GameProgress } = require('../models/gameProgress.js');
const { Level } = require('../models/levelModel');
const { User } = require('../models/userModel.js');

const getProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await GameProgress.findOne({
      where: { userId },
      include: {
        model: Level, 
        as: 'Level',
      },
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    return res.status(200).json(progress);
  } catch (error) {
    console.error('Error getting progress:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const saveProgress = async (req, res) => {
  const { userId, score, level } = req.body;

  if (!userId || !score || !level) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let progress = await GameProgress.findOne({ where: { userId } });

    if (progress) {
      progress.score = score;
      progress.level = level;
      await progress.save();
      return res.status(200).json({ message: 'Progress updated successfully', progress });
    } else {
      progress = await GameProgress.create({ userId, score, level });
      return res.status(201).json({ message: 'Progress created successfully', progress });
    }
  } catch (error) {
    console.error('Error saving progress:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const resetProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await GameProgress.findOne({ where: { userId } });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    progress.score = 0;
    progress.level = 1;
    await progress.save();

    return res.status(200).json({ message: 'Progress reset successfully', progress });
  } catch (error) {
    console.error('Error resetting progress:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getProgress,
  saveProgress,
  resetProgress,
};
