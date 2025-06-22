const express = require('express');
const cors = require('cors');
const { connectionToDb, sequelize } = require("./config/db");
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
sequelize.sync({ alter: true })
  .then(() => {
    console.log(" Tables synced with Clever Cloud DB");
  })
  .catch((err) => {
    console.error(" Sync failed:", err);
  });



app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, async () => {
  await connectionToDb();
  console.log(`Server is running on port ${PORT}`);
});
