const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('AUTOMATAS', 'automatas', 'Automatas1@', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false, 
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('❌ Error en la conexión a la base de datos:', error.message);
  }
};

module.exports = { sequelize, connectToDatabase };
