const { User } = require('../../models/userModel.js'); 
const { GameProgress } = require('../../models/gameProgress.js'); 
const { Level} = require ('../../models/levelModel.js');

const syncDatabase = async () => {
  try {
    await Level.sync({ alter: true });  
    console.log('✅ Tabla "levels" sincronizada correctamente');

    await User.sync({ alter: true });
    console.log('✅ Tabla "users" sincronizada correctamente');

    await GameProgress.sync({ alter: true });
    console.log('✅ Tabla "game_progress" sincronizada correctamente');
  } catch (error) {
    console.error('❌ Error al sincronizar las tablas:', error.message);
  }
};


module.exports = syncDatabase;
