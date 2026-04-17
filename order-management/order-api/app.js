const express = require("express");
const orderRoutes = require("./orders/routes");

const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

module.exports = app;
