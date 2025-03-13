const express = require('express');
require('dotenv').config();
const { connectToDatabase } = require('./db/db.js');
const syncDatabase = require('./db/config/syncDatabase.js');
const authRoutes = require('./routes/authRoutes.js'); 
const gameProgressRoutes = require('./routes/gameProgressRoutes.js');

const app = express();
const port = process.env.PORT || 8084;

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/game-progress', gameProgressRoutes);

app.listen(port, async () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);

  await connectToDatabase();

  await syncDatabase(); 
});
