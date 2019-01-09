let router = require('express').Router();
let OrderController = require('../controllers/Orders')

router.post("/orders", OrderController.createOrder);

router.patch("/orders/:id", OrderController.takeOrder);

router.get("/orders", OrderController.getOrders);

module.exports = router