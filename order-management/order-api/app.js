const express = require('express');
const sequelize = require('./common/database');
const orderRoutes = require('./orders/routes');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);

// Start server
const PORT = 3000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});