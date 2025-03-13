const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

const Level = sequelize.define('Level', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regexPattern: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  tableName: 'levels',
  timestamps: true,
});

module.exports = { Level };
