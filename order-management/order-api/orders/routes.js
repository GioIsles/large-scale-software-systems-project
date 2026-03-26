const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.createOrder);
router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrderById);
router.patch("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;
