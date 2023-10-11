const router = require("express").Router();
const { getUserOrders } = require("../controllers/orderController");

router.get("/:id", getUserOrders);


module.exports = router;