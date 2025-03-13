const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');
const { User } = require('./userModel');
const { Level } = require('./levelModel');

const GameProgress = sequelize.define('GameProgress', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
    allowNull: false,
  },
  levelId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Level, 
      key: 'id',
    },
  },
}, {
  tableName: 'game_progress',
  timestamps: true,
});

User.hasOne(GameProgress, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', 
});

GameProgress.belongsTo(User, {
  foreignKey: 'userId',
});

Level.hasMany(GameProgress, {
  foreignKey: 'levelId',
});

GameProgress.belongsTo(Level, {
  foreignKey: 'levelId',
});

module.exports = { GameProgress };
