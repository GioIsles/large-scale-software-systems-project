const app = require("./app");
const sequelize = require("./common/database");

const PORT = 3000;

sequelize.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Database error:", err);
  });